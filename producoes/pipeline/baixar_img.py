import json,sys,urllib.request,urllib.parse
nid,out=sys.argv[1],sys.argv[2]
files=json.load(urllib.request.urlopen("https://images-assets.nasa.gov/image/"+urllib.parse.quote(nid)+"/collection.json"))
pick=None
for suf in ("~large.jpg","~orig.jpg","~orig.png","~medium.jpg"):
    c=[f for f in files if f.endswith(suf)]
    if c: pick=c[0]; break
urllib.request.urlretrieve(urllib.parse.quote(pick.replace("http://","https://"),safe=":/~"),out); print(out,pick.rsplit("/",1)[-1])
