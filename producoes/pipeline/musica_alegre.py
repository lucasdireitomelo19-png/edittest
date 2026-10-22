"""Trilha alegre e acelerada própria do canal (sem samples), para trechos de euforia.
Uso: python3 musica_alegre.py <saida.wav> <duracao_s> [bpm]
"""
import subprocess, sys, wave
import numpy as np
SR = 44100
saida, DUR = sys.argv[1], float(sys.argv[2]); BPM = float(sys.argv[3]) if len(sys.argv) > 3 else 124
N = int(SR * DUR); t = np.arange(N) / SR; mix = np.zeros(N); b = 60 / BPM
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
def env(n, a=0.005, d=0.25):
    x = np.arange(n) / SR; return np.minimum(1, x / a) * np.exp(-x / d)
def put(sig, t0):
    i = int(t0 * SR); j = min(N, i + len(sig)); mix[i:j] += sig[:j - i]
rng = np.random.default_rng(3)
PROG = [[60, 64, 67, 72], [55, 59, 62, 67], [57, 60, 64, 69], [53, 57, 60, 65]]   # C G Am F
nb = int(DUR / b) + 1
for k in range(nb):
    t0 = k * b
    n = int(0.35 * SR); x = np.arange(n) / SR; f = 50 + 90 * np.exp(-x * 30)    # kick
    put(0.9 * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.12), t0)
    if k % 2: put(0.25 * rng.standard_normal(int(0.18 * SR)) * env(int(0.18 * SR), 0.001, 0.06), t0)   # palma
    for h in (0, 0.5):   # chimbal
        nn = int(0.05 * SR); put(0.08 * np.diff(np.r_[0, rng.standard_normal(nn)]) * env(nn, 0.001, 0.02), t0 + h * b)
    ac = PROG[(k // 4) % 4]
    nn = int(b * SR); x = np.arange(nn) / SR; fb = hz(ac[0] - 24)      # baixo
    put(0.35 * np.tanh(2 * np.sin(2 * np.pi * fb * x)) * env(nn, 0.005, 0.3), t0)
    for h, nota in zip((0, 0.25, 0.5, 0.75), (ac[1], ac[2], ac[3], ac[2] + 12)):   # arpejo
        nn = int(0.22 * SR); x = np.arange(nn) / SR; f = hz(nota + 12)
        put(0.12 * (np.sin(2 * np.pi * f * x) + 0.4 * np.sin(4 * np.pi * f * x)) * env(nn, 0.003, 0.12), t0 + h * b)
mix = np.tanh(mix * 1.2); mix /= np.max(np.abs(mix)) + 1e-9; mix *= 0.85
est = np.stack([mix, np.roll(mix, 220)], 1)
with wave.open(saida, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((est * 32767).astype(np.int16).tobytes())
print(saida, DUR, "s")
