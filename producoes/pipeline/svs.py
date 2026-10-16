import json,sys,urllib.request,urllib.parse,re,html
a=sys.argv[1]
if a.isdigit():
    d=json.load(urllib.request.urlopen(f"https://svs.gsfc.nasa.gov/api/{a}"))
    print("#",d.get("title"))
    if "-d" in sys.argv: print(re.sub("<[^>]+>"," ",html.unescape(d.get("description","")))[:3000])
    seen=set()
    for m in d.get("media_groups",[]):
        for it in m.get("items",[]):
            x=it.get("instance") or {}; u=x.get("url","")
            if u.endswith(".mp4") and u not in seen:
                seen.add(u); print(x.get("width"),x.get("height"),u)
else:
    d=json.load(urllib.request.urlopen("https://svs.gsfc.nasa.gov/api/search/?limit=15&search="+urllib.parse.quote(a)))
    for r in d["results"]: print(r["id"],"|",r["result_type"],"|",r["release_date"][:10],"|",r["title"][:90])
