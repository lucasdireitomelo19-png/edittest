import json,sys,urllib.request,urllib.parse
q=sys.argv[1]
d=json.load(urllib.request.urlopen("https://images-api.nasa.gov/search?media_type=image&q="+urllib.parse.quote(q)))
for it in d["collection"]["items"][:int(sys.argv[2]) if len(sys.argv)>2 else 6]:
    x=it["data"][0]; print(x["nasa_id"],"|",x["title"][:75],"|",x.get("date_created","")[:4])
