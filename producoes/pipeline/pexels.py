"""Busca e baixa vídeos (e fotos) do Pexels para B-roll.

Precisa da chave da API na variável de ambiente PEXELS_API_KEY (Network secrets do ambiente).
Nunca cole a chave no código nem no chat.

Uso:
  python3 pexels.py busca "<termo>" [vertical|horizontal]   -> lista vídeos (id, duração, resolução, autor)
  python3 pexels.py baixa <id> <arquivo_saida.mp4>          -> baixa a melhor versão até 4K e grava o crédito
  python3 pexels.py fotos "<termo>"                          -> lista fotos
  python3 pexels.py foto <id> <arquivo_saida.jpg>            -> baixa a foto original e grava o crédito

Licença Pexels: uso comercial gratuito, crédito não obrigatório (mas damos: "Pexels/<autor>").
Proibido: vender o material sem alteração, sugerir que pessoas ou marcas que aparecem endossam o canal.
Cuidado: quase todo vídeo "espacial" do Pexels é CGI → etiqueta ANIMAÇÃO/ILUSTRAÇÃO, nunca IMAGEM REAL.
Céu noturno, telescópios e pessoas observando o céu filmados de verdade podem ser IMAGEM REAL.
"""
import json, os, sys, urllib.parse, urllib.request

BASE = os.path.dirname(os.path.abspath(__file__))
CRED = os.path.join(BASE, "src", "creditos_pexels.json")
CHAVE = os.environ.get("PEXELS_API_KEY")
if not CHAVE:
    raise SystemExit("PEXELS_API_KEY não definida: adicione a chave em Network secrets do ambiente e abra uma nova sessão.")
HDR = {"Authorization": CHAVE, "User-Agent": "LadoSombrioDoUniverso/1.0"}

def get(url):
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=60))

def baixar(url, saida):
    req = urllib.request.Request(url, headers={"User-Agent": HDR["User-Agent"]})
    with urllib.request.urlopen(req, timeout=300) as r, open(saida, "wb") as f:
        while bloco := r.read(1 << 20):
            f.write(bloco)

def registrar(saida, **info):
    creds = json.load(open(CRED)) if os.path.exists(CRED) else {}
    creds[os.path.basename(saida)] = info
    os.makedirs(os.path.dirname(CRED), exist_ok=True)
    json.dump(creds, open(CRED, "w"), ensure_ascii=False, indent=1)

cmd = sys.argv[1]
if cmd == "busca":
    q = {"query": sys.argv[2], "per_page": 20, "size": "medium"}
    if len(sys.argv) > 3:
        q["orientation"] = {"vertical": "portrait", "horizontal": "landscape"}[sys.argv[3]]
    for v in get("https://api.pexels.com/videos/search?" + urllib.parse.urlencode(q))["videos"]:
        print(v["id"], "|", f'{v["duration"]}s', "|", f'{v["width"]}x{v["height"]}', "|", v["user"]["name"], "|", v["url"])
elif cmd == "baixa":
    v = get(f"https://api.pexels.com/videos/videos/{sys.argv[2]}")
    arqs = [f for f in v["video_files"] if f.get("file_type") == "video/mp4" and f.get("height")]
    arqs.sort(key=lambda f: (min(f["width"], f["height"]) <= 2160, f["width"] * f["height"]), reverse=True)
    escolhido = arqs[0]
    baixar(escolhido["link"], sys.argv[3])
    registrar(sys.argv[3], fonte="Pexels", id=v["id"], autor=v["user"]["name"], pagina=v["url"],
              resolucao=f'{escolhido["width"]}x{escolhido["height"]}', credito=f'Pexels/{v["user"]["name"]}')
    print(sys.argv[3], "|", f'{escolhido["width"]}x{escolhido["height"]}', "|", f'Pexels/{v["user"]["name"]}', "|", v["url"])
elif cmd == "fotos":
    for p in get("https://api.pexels.com/v1/search?" + urllib.parse.urlencode({"query": sys.argv[2], "per_page": 20}))["photos"]:
        print(p["id"], "|", f'{p["width"]}x{p["height"]}', "|", p["photographer"], "|", (p.get("alt") or "")[:60])
elif cmd == "foto":
    p = get(f"https://api.pexels.com/v1/photos/{sys.argv[2]}")
    baixar(p["src"]["original"], sys.argv[3])
    registrar(sys.argv[3], fonte="Pexels", id=p["id"], autor=p["photographer"], pagina=p["url"], credito=f'Pexels/{p["photographer"]}')
    print(sys.argv[3], "|", f'Pexels/{p["photographer"]}', "|", p["url"])
