"""Busca e baixa imagens do Openverse só com licenças seguras para canal monetizado.

Uso:
  python3 openverse.py busca "<termo>" [fonte]       -> lista resultados (CC0, PDM, CC BY, CC BY-SA)
  python3 openverse.py baixa <id> <arquivo_saida>    -> baixa e grava o crédito em src/creditos_openverse.json

Regras: nunca NC (não comercial) nem ND (sem derivações). CC BY/BY-SA exigem crédito no vídeo e na descrição.
Prefira fontes institucionais (nasa, smithsonian, met, etc.): o Openverse não confere se a licença é verdadeira.
"""
import json, os, sys, urllib.parse, urllib.request

API = "https://api.openverse.org/v1/images/"
OK = {"cc0", "pdm", "by", "by-sa"}
BASE = os.path.dirname(os.path.abspath(__file__))
CRED = os.path.join(BASE, "src", "creditos_openverse.json")
HDR = {"User-Agent": "LadoSombrioDoUniverso/1.0 (producao de video)"}

def get(url):
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=HDR), timeout=90))

def credito(r):
    lic = {"cc0": "CC0", "pdm": "Domínio público", "by": "CC BY", "by-sa": "CC BY-SA"}[r["license"]]
    autor = (r.get("creator") or r.get("source") or "").strip()
    return f"{autor} ({lic})" if lic.startswith("CC B") else f"{autor} · {lic}"

if sys.argv[1] == "busca":
    q = {"q": sys.argv[2], "license": ",".join(sorted(OK)), "page_size": 20, "mature": "false"}
    if len(sys.argv) > 3: q["source"] = sys.argv[3]
    for r in get(API + "?" + urllib.parse.urlencode(q))["results"]:
        print(r["id"], "|", r["license"], "|", r["source"], "|", r.get("width"), "x", r.get("height"), "|", (r.get("title") or "")[:70])
elif sys.argv[1] == "baixa":
    r = get(API + sys.argv[2] + "/")
    if r["license"] not in OK:
        raise SystemExit(f"Licença {r['license']} não permitida")
    open(sys.argv[3], "wb").write(urllib.request.urlopen(urllib.request.Request(r["url"], headers=HDR), timeout=120).read())
    creds = json.load(open(CRED)) if os.path.exists(CRED) else {}
    creds[os.path.basename(sys.argv[3])] = dict(id=r["id"], titulo=r.get("title"), autor=r.get("creator"), licenca=r["license"],
                                                versao=r.get("license_version"), pagina=r.get("foreign_landing_url"), credito=credito(r))
    json.dump(creds, open(CRED, "w"), ensure_ascii=False, indent=1)
    print(sys.argv[3], "|", credito(r), "|", r.get("foreign_landing_url"))
