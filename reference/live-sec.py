import io,sys,re
sec=sys.argv[1]
maxw=int(sys.argv[2]) if len(sys.argv)>2 else 200
txt=io.open('.live-reference.css',encoding='utf-8').read().split('\n')
media='BASE'; cur=None; out={}
for ln in txt:
    m=re.match(r'/\* @media (.+) \*/',ln)
    if m: media=m.group(1).replace('screen and ','')
    m=re.match(r'/\* --- (.+) --- \*/',ln)
    if m: cur=m.group(1); continue
    if ln.startswith('/*') or not ln.strip(): continue
    if cur==sec: out.setdefault(media,[]).append(ln[:maxw])
for k in out:
    print('#### '+k)
    for r in out[k]: print(r)
