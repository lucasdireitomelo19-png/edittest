import json,sys,urllib.request,urllib.parse
q=sys.argv[1]
d=json.load(urllib.request.urlopen("https://images-api.nasa.gov/search?media_type=video&q="+urllib.parse.quote(q)))
for it in d["collection"]["items"][:12]:
    x=it["data"][0]; print(x["nasa_id"],"|",x["title"][:80],"|",x.get("date_created","")[:10])
