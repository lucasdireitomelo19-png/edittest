import json,sys,urllib.request,urllib.parse
nid,out=sys.argv[1],sys.argv[2]
files=json.load(urllib.request.urlopen("https://images-assets.nasa.gov/video/"+urllib.parse.quote(nid)+"/collection.json"))
mp4=[f for f in files if f.endswith(".mp4")]
pick=None
for suf in ("~large.mp4","~medium.mp4","~orig.mp4"):
    c=[f for f in mp4 if f.endswith(suf)]
    if c: pick=c[0]; break
pick=pick or mp4[0]
u=urllib.parse.quote(pick.replace("http://","https://"),safe=":/~")
print(out,"<-",pick.rsplit("/",1)[-1]); urllib.request.urlretrieve(u,out)
