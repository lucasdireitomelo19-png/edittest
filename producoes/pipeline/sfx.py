"""Gera os efeitos sonoros originais do canal (sintetizados com ffmpeg, sem material de terceiros).

Uso: python3 sfx.py            -> grava pipeline/sfx/<nome>.wav (só os que ainda não existem)
Nos cenas.py: som="whoosh" (ou som=("boom", -4) com ganho em dB) e AMBIENTE = "drone".
"""
import os, subprocess

PASTA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sfx")
SR = 44100

# nome: (duração, expressão aevalsrc ou None, filtros)
SONS = {
    # passagem rápida de ar: ruído rosa filtrado com subida e descida
    "whoosh": (0.7, None, "anoisesrc=d=0.7:c=pink:r=44100:a=0.9,highpass=f=300,lowpass=f=5000,"
                          "afade=t=in:d=0.42:curve=exp,afade=t=out:st=0.42:d=0.28,volume=12dB"),
    # impacto grave com cauda (supernova, revelações)
    "boom": (2.6, "0.9*sin(2*PI*(38+70*exp(-9*t))*t)*exp(-2.2*t)+0.25*(random(0)-0.5)*exp(-14*t)",
             "lowpass=f=900,aecho=0.8:0.5:60|120:0.25|0.15"),
    # pancada seca para cortes de impacto
    "hit": (0.9, "0.9*sin(2*PI*(60+140*exp(-30*t))*t)*exp(-7*t)+0.35*(random(0)-0.5)*exp(-40*t)",
            "lowpass=f=2500"),
    # tensão subindo antes de uma revelação
    "riser": (2.4, "(0.5*sin(2*PI*(110+500*t*t/5.76)*t)+0.3*(random(0)-0.5))*pow(t/2.4,2)",
              "highpass=f=120,lowpass=f=6000,afade=t=out:st=2.3:d=0.1"),
    # zumbido de pulsar: pulsos cada vez mais rápidos até virar tom
    "pulsar": (2.2, "0.6*sin(2*PI*900*t)*pow(0.5+0.5*sin(2*PI*(4*t+40*t*t)),12)*min(1,t*3)",
               "lowpass=f=4000,afade=t=out:st=1.9:d=0.3"),
    # bipe curto para números na tela
    "tick": (0.12, "0.5*sin(2*PI*1800*t)*exp(-35*t)", ""),
    # ambiente grave contínuo (não é música: um único acorde de ruído e senoides)
    "drone": (64.0, "0.22*sin(2*PI*55*t)*(0.7+0.3*sin(2*PI*0.07*t))+0.12*sin(2*PI*82.4*t)*(0.6+0.4*sin(2*PI*0.05*t+1))"
                    "+0.06*sin(2*PI*164.8*t)*(0.5+0.5*sin(2*PI*0.11*t))",
              "lowpass=f=600,afade=t=in:d=1.5"),
}

def gerar():
    os.makedirs(PASTA, exist_ok=True)
    for nome, (d, expr, filtros) in SONS.items():
        out = os.path.join(PASTA, f"{nome}.wav")
        if os.path.exists(out):
            continue
        fonte = f"aevalsrc='{expr}':s={SR}:d={d}" if expr else ""
        cadeia = ",".join(x for x in (fonte, filtros) if x)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", cadeia,
                        "-ac", "2", "-ar", str(SR), out], check=True)
        print("ok", out)

if __name__ == "__main__":
    gerar()
