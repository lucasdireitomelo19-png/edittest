"""Busca e baixa vídeos da ESO, ESA/Hubble e ESA/Webb (CC BY 4.0: crédito obrigatório).

Uso:
  python3 eso.py busca "betelgeuse" [eso|hubble|webb]   -> lista id | título
  python3 eso.py baixa <id> <saida.mp4> [eso|hubble|webb] -> baixa a versão 1080p
Crédito: "ESO/<autor>" (ESO), "ESA/Hubble" ou "ESA/Webb", conforme a página do vídeo.
"""
import html, re, sys, urllib.parse, urllib.request

SITES = {
    "eso": ("https://www.eso.org/public/videos/", "https://cdn.eso.org/videos/hd_1080p25_screen/"),
    "hubble": ("https://esahubble.org/videos/", "https://cdn.esahubble.org/archives/videos/hd_1080p25_screen/"),
    "webb": ("https://esawebb.org/videos/", "https://cdn.esawebb.org/archives/videos/hd_1080p25_screen/"),
}
UA = {"User-Agent": "Mozilla/5.0 (LadoSombrioDoUniverso)"}

def ler(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read().decode("utf-8", "replace")

cmd, arg = sys.argv[1], sys.argv[2]
if cmd == "busca":
    pagina, _ = SITES[sys.argv[3] if len(sys.argv) > 3 else "eso"]
    txt = ler(pagina + "?search=" + urllib.parse.quote(arg))
    vistos = set()
    for vid, titulo in re.findall(r'videoframe/([a-z0-9]+)\.jpg"[^>]*alt="([^"]+)"', txt):
        if vid not in vistos:
            vistos.add(vid); print(vid, "|", html.unescape(titulo))
elif cmd == "baixa":
    _, cdn = SITES[sys.argv[4] if len(sys.argv) > 4 else "eso"]
    with urllib.request.urlopen(urllib.request.Request(cdn + arg + ".mp4", headers=UA), timeout=300) as r, open(sys.argv[3], "wb") as f:
        while b := r.read(1 << 20):
            f.write(b)
    print(sys.argv[3], "<-", arg)
