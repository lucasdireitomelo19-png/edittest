"""Trilha ambiente original do canal, gerada por código (sem samples, sem direitos de terceiros).

Uso: python3 musica.py <saida.wav> <duracao_s> [semente]
Pad espacial lento: acordes menores com notas longas, sub grave, brilhos esparsos e reverb longo.
"""
import subprocess, sys, wave
import numpy as np

SR = 44100
saida, DUR = sys.argv[1], float(sys.argv[2])
rng = np.random.default_rng(int(sys.argv[3]) if len(sys.argv) > 3 else 7)
N = int(SR * DUR)
t = np.arange(N) / SR

def hz(m):  # nota MIDI -> Hz
    return 440.0 * 2 ** ((m - 69) / 12)

# progressão lenta em Ré menor (i - VI - III - VII), sétimas e nonas para soar "espacial"
ACORDES = [[50, 57, 62, 65, 69, 76],   # Dm9
           [46, 53, 58, 62, 65, 72],   # Bbmaj7
           [53, 60, 64, 67, 72, 76],   # Fadd9
           [48, 55, 60, 64, 67, 74]]   # C(add9)
PASSO = 24.0  # segundos por acorde
esq, dir_ = np.zeros(N), np.zeros(N)

def envelope(ini, dur, ataque=7.0, solta=9.0):
    e = np.zeros(N)
    a, b = int(ini * SR), int(min(N, (ini + dur + solta) * SR))
    if a >= N: return e
    x = (np.arange(a, b) / SR) - ini
    up = np.clip(x / ataque, 0, 1)
    down = np.clip(1 - (x - dur) / solta, 0, 1)
    e[a:b] = np.sin(np.pi / 2 * np.minimum(up, down)) ** 2
    return e

k = 0
inicio = 0.0
while inicio < DUR:
    acorde = ACORDES[k % len(ACORDES)]
    for j, m in enumerate(acorde):
        env = envelope(inicio, PASSO, ataque=6 + j, solta=10)
        sl = env > 0
        if not sl.any(): continue
        f = hz(m)
        som = np.zeros(N)
        # três osciladores levemente desafinados + harmônicos suaves (timbre de "pad")
        for det, pan in ((-0.11, 0.2), (0.0, 0.5), (0.13, 0.8)):
            ff = f * 2 ** (det / 12)
            fase = rng.uniform(0, 2 * np.pi)
            onda = (np.sin(2 * np.pi * ff * t[sl] + fase)
                    + 0.28 * np.sin(4 * np.pi * ff * t[sl] + fase)
                    + 0.08 * np.sin(6 * np.pi * ff * t[sl] + fase))
            trem = 1 + 0.15 * np.sin(2 * np.pi * rng.uniform(0.05, 0.12) * t[sl] + rng.uniform(0, 6))
            v = onda * trem * env[sl] / (1 + j * 0.25)
            esq[sl] += v * (1 - pan); dir_[sl] += v * pan
    # sub grave na fundamental do acorde
    env = envelope(inicio, PASSO, ataque=8, solta=10)
    sl = env > 0
    sub = 0.9 * np.sin(2 * np.pi * hz(acorde[0] - 12) * t[sl]) * env[sl]
    esq[sl] += sub; dir_[sl] += sub
    # brilhos: notas agudas esparsas tipo "sino de vidro"
    for _ in range(rng.integers(1, 3)):
        tb = inicio + rng.uniform(3, PASSO - 3)
        m = rng.choice(acorde[2:]) + 12
        a = int(tb * SR); b = min(N, a + int(7 * SR))
        if a >= N: continue
        x = np.arange(b - a) / SR
        sino = (np.sin(2 * np.pi * hz(m) * x) + 0.3 * np.sin(2 * np.pi * hz(m) * 2.76 * x)) * np.exp(-x / 2.2) * 0.22
        pan = rng.uniform(0.15, 0.85)
        esq[a:b] += sino * (1 - pan); dir_[a:b] += sino * pan
    inicio += PASSO
    k += 1

# fade geral de entrada e saída
fade = np.clip(t / 6, 0, 1) * np.clip((DUR - t) / 8, 0, 1)
est = np.stack([esq * fade, dir_ * fade], axis=1)
est /= np.abs(est).max() + 1e-9
bruto = saida + ".bruto.wav"
with wave.open(bruto, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((est * 0.8 * 32767).astype("<i2").tobytes())
# reverb longo + filtro suave + normalização
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", bruto, "-af",
                "lowpass=f=5200,highpass=f=35,"
                "aecho=0.8:0.85:120|260|430|610|900:0.45|0.36|0.28|0.2|0.14,"
                "aecho=0.8:0.7:1300|1900:0.18|0.1,"
                f"loudnorm=I=-20:TP=-2:LRA=7,atrim=0:{DUR}",
                "-ar", str(SR), saida], check=True)
print("musica:", saida)
