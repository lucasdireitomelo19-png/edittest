# "E se a Terra fosse plana?" — 100% motion graphics próprio (pipeline/anim/plana.html), 22 cenas, nenhuma repetida.
FINAL = "SIGA PARA MAIS"
FIM = 47.6
AMBIENTE = "drone"
AMBIENTE_DB = -22
ETIQUETAS = False
PROGRESSO = True
LEGENDA_MV = 230      # legenda falada embaixo, longe dos textos da animação
FINAL_ALIN, FINAL_MV = 8, 200   # "SIGA PARA MAIS" no alto
SAIDA = "short_terra_plana.mp4"
CREDITO = "Animação: Lado Sombrio do Universo"
_T = [(0.0, 'achata'), (2.4, 'disco'), (3.6, 'regua'), (6.7, 'problema'), (8.9, 'setas'), (11.1, 'meio'), (13.2, 'borda'),
      (15.1, 'ladeira'), (17.8, 'oceanos'), (21.5, 'deserto'), (23.3, 'ar'), (24.2, 'everest'), (27.5, 'dia'), (28.3, 'amanhecer'),
      (31.3, 'fusos'), (32.4, 'durar'), (33.6, 'dobra'), (36.3, 'bola'), (38.7, 'batatas'), (40.7, 'limite'), (43.0, 'acaso'), (44.7, 'final')]
SONS = {'regua': ("hit", -14), 'problema': ("hit", -12), 'everest': ("hit", -14), 'bola': ("hit", -12)}
CENAS = []
for i, (t, c) in enumerate(_T):
    d = dict(t=t, src=f"mg_{i:02d}_{c}.mp4", ss=0, zoom=(1.0, 1.03), sat=1.0)
    if c in SONS: d["som"] = SONS[c]
    CENAS.append(d)
