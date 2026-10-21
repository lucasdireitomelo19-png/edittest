"""Busca e baixa vídeos (e fotos) do Pixabay para B-roll.

Precisa da chave da API na variável de ambiente PIXABAY_API_KEY (Network secrets do ambiente).
Nunca cole a chave no código nem no chat.

Uso:
  python3 pixabay.py busca "<termo>" [vertical|horizontal]   -> lista vídeos (id, duração, resolução, autor)
  python3 pixabay.py baixa <id> <arquivo_saida.mp4>          -> baixa a maior versão disponível e grava o crédito
  python3 pixabay.py fotos "<termo>"                          -> lista fotos
  python3 pixabay.py foto <id> <arquivo_saida.jpg>            -> baixa a foto (até 1280 px; maior exige aprovação da API)

Licença Pixabay: uso comercial gratuito, crédito não obrigatório (mas damos: "Pixabay/<autor>").
Proibido: vender ou redistribuir o material sem alteração, sugerir endosso de pessoas, marcas ou lugares que aparecem.
Termos da API: baixe e use o arquivo local (não use o link direto do Pixabay como hospedagem).
Cuidado: vídeos "espaciais" do Pixabay costumam ser CGI → etiqueta ANIMAÇÃO/ILUSTRAÇÃO, nunca IMAGEM REAL.
"""
import json, os, sys, urllib.parse, urllib.request

BASE = os.path.dirname(os.path.abspath(__file__))
CRED = os.path.join(BASE, "src", "creditos_pixabay.json")
CHAVE = os.environ.get("PIXABAY_API_KEY")
if not CHAVE:
    raise SystemExit("PIXABAY_API_KEY não definida: adicione a chave em Network secrets do ambiente e abra uma nova sessão.")
UA = {"User-Agent": "LadoSombrioDoUniverso/1.0"}

def get(caminho, **q):
    url = f"https://pixabay.com/api/{caminho}?" + urllib.parse.urlencode(dict(key=CHAVE, safesearch="true", **q))
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60))

def baixar(url, saida):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r, open(saida, "wb") as f:
        while bloco := r.read(1 << 20):
            f.write(bloco)

def registrar(saida, **info):
    creds = json.load(open(CRED)) if os.path.exists(CRED) else {}
    creds[os.path.basename(saida)] = info
    os.makedirs(os.path.dirname(CRED), exist_ok=True)
    json.dump(creds, open(CRED, "w"), ensure_ascii=False, indent=1)

def melhor(videos):
    ok = [v for v in videos.values() if v.get("url") and v.get("width")]
    teto = int(os.environ.get("PIXABAY_MAX_W", "0"))  # ex.: 1920 para não baixar 4K
    if teto and any(v["width"] <= teto for v in ok):
        ok = [v for v in ok if v["width"] <= teto]
    return max(ok, key=lambda v: v["width"] * v["height"])

cmd = sys.argv[1]
if cmd == "busca":
    for h in get("videos/", q=sys.argv[2], per_page=30)["hits"]:
        m = melhor(h["videos"])
        vertical = m["height"] > m["width"]
        if len(sys.argv) > 3 and (sys.argv[3] == "vertical") != vertical:
            continue
        print(h["id"], "|", f'{h["duration"]}s', "|", f'{m["width"]}x{m["height"]}', "|", h["user"], "|", h["tags"][:50], "|", h["pageURL"])
elif cmd == "baixa":
    hits = get("videos/", id=sys.argv[2])["hits"]
    if not hits:
        raise SystemExit("vídeo não encontrado")
    h = hits[0]; m = melhor(h["videos"])
    baixar(m["url"], sys.argv[3])
    registrar(sys.argv[3], fonte="Pixabay", id=h["id"], autor=h["user"], pagina=h["pageURL"],
              resolucao=f'{m["width"]}x{m["height"]}', credito=f'Pixabay/{h["user"]}')
    print(sys.argv[3], "|", f'{m["width"]}x{m["height"]}', "|", f'Pixabay/{h["user"]}', "|", h["pageURL"])
elif cmd == "fotos":
    for h in get("", q=sys.argv[2], image_type="photo", per_page=30)["hits"]:
        print(h["id"], "|", f'{h["imageWidth"]}x{h["imageHeight"]}', "|", h["user"], "|", h["tags"][:60])
elif cmd == "foto":
    hits = get("", id=sys.argv[2])["hits"]
    if not hits:
        raise SystemExit("foto não encontrada")
    h = hits[0]
    baixar(h.get("fullHDURL") or h["largeImageURL"], sys.argv[3])
    registrar(sys.argv[3], fonte="Pixabay", id=h["id"], autor=h["user"], pagina=h["pageURL"], credito=f'Pixabay/{h["user"]}')
    print(sys.argv[3], "|", f'Pixabay/{h["user"]}', "|", h["pageURL"])
