"""Simulação em primeira pessoa de "a Terra parou": a câmera anda na rua e, no instante da parada,
é arremessada de lado (borrão de movimento, inclinação, rajadas de poeira e escurecimento).

Uso: python3 fx_parada.py <entrada.mp4> <ss> <duracao> <t_parada> <saida.mp4>
  ss         segundo de início no clipe original
  duracao    duração total do clipe gerado
  t_parada   segundo (dentro do clipe gerado) em que a Terra para
Gera um MP4 vertical 1080x1920 para usar como cena com tag="ilus".
"""
import subprocess, sys

ent, ss, dur, t0, saida = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
W, H, FPS = 1080, 1920, 30
CW, CH = 1400, 2112          # janela maior que a saída, para girar sem cantos pretos (até ~8°)
k = f"clip((t-{t0})/0.45,0,1)"  # 0 antes da parada, sobe até 1 em 0,45 s
K = f"clip((T-{t0})/0.30,0,1)"  # o mesmo para o filtro blend (que usa T maiúsculo)

filtro = (
    f"[0:v]fps={FPS},scale=-2:{CH},setsar=1[a];"
    # janela que anda junto (balanço leve da caminhada) e, na parada, chicoteia para o lado
    f"[a]crop={CW}:{CH}:x='max(0,(iw-{CW})/2-(iw-{CW})/2*pow({k},2)+18*sin(2*PI*1.8*t)+40*{k}*sin(31*t))'"
    f":y='12*sin(2*PI*3.6*t)',"
    f"rotate='{k}*(PI/180)*(6*sin(7*(t-{t0}))+3)':ow={CW}:oh={CH}:fillcolor=black,"
    f"crop={W}:{H},split[s][m];"
    # borrão de movimento horizontal entrando com a parada
    f"[m]avgblur=sizeX=55:sizeY=2[mb];"
    f"[s][mb]blend=all_expr='A*(1-0.9*{K})+B*0.9*{K}'[v1];"
    # rajadas de poeira horizontais (ruído esticado), só depois da parada
    f"nullsrc=s={W // 2}x{H // 2}:r={FPS}:d={dur},format=yuv420p,"
    f"geq=lum='if(lt(random(1),0.012),255,0)':cb=128:cr=128,"
    f"avgblur=sizeX=40:sizeY=1,lutyuv=y='min(255,val*10)':u=128:v=128,scale={W}:{H},format=yuv420p[p];"
    f"[v1]format=yuv420p[v1f];"
    f"[v1f][p]blend=c0_expr='min(255,A+B*0.8*clip((T-{t0}-0.15)/0.4,0,1))':c1_expr='A':c2_expr='A'[v2];"
    # escurece e lava as cores quando o vento começa
    f"[v2]eq=brightness='-0.18*{k}':contrast='1+0.15*{k}':eval=frame,"
    f"vignette=angle=0.7,fps={FPS}[v]"
)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(ss), "-t", f"{dur + 0.1:.3f}", "-i", ent,
                "-filter_complex", filtro, "-map", "[v]", "-an", "-t", f"{dur:.3f}",
                "-c:v", "libx264", "-preset", "fast", "-crf", "17", "-pix_fmt", "yuv420p", saida], check=True)
print("ok", saida)
