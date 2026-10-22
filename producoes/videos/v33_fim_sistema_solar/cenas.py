# "O fim do Sistema Solar": 100% motion graphics próprio (pipeline/anim/fim.html), 22 cenas, nenhuma repetida.
FINAL = "SIGA PARA MAIS"
FIM = 47.2
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
PROGRESSO = True
LEGENDA_MV = 230
FINAL_ALIN, FINAL_MV = 8, 200
SAIDA = "short_fim_sistema_solar.mp4"
CREDITO = "Animação: Lado Sombrio do Universo"
_T = [(0.0, 'contagem'), (1.6, 'morrer'), (3.1, 'sistema'), (4.8, 'antes'), (6.7, 'brilho'), (10.2, 'ferver'), (11.9, 'seca'), (12.8, 'nucleo'), (15.2, 'incha'), (16.4, 'gigante'), (19.6, 'engole'), (21.3, 'terra'), (22.9, 'lua'), (27.5, 'zona'), (29.6, 'expulsa'), (32.1, 'nebulosa'), (33.7, 'ana'), (35.5, 'tamanho'), (36.6, 'balanca'), (38.3, 'esfria'), (41.4, 'apaga'), (42.7, 'final')]
SONS = {'contagem': ("hit", -14), 'gigante': ("hit", -12), 'ana': ("hit", -14)}
CENAS = []
for i, (t, c) in enumerate(_T):
    d = dict(t=t, src=f"mf_{i:02d}_{c}.mp4", ss=0, zoom=(1.0, 1.03), sat=1.0)
    if c in SONS: d["som"] = SONS[c]
    CENAS.append(d)
