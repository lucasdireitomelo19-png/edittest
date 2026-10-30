"""Deixa o texto da narração 100% em português para vozes multilíngues (pedido do dono em 30/10/2026: "tem que ser tudo em português").

preparar(texto) -> (texto_falado, trocas): números viram extenso ("2003" -> "dois mil e três"), letras soltas e siglas
viram a pronúncia em português ("T menos" -> "Tê menos", "3D" -> "três dê"), e "Wow!" vira "Uau!".
restaurar(palavras, trocas) -> junta de volta as palavras faladas no token original, para a legenda mostrar "2003", "T", "3D".
"""
import re, unicodedata

UN = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze',
      'dezesseis', 'dezessete', 'dezoito', 'dezenove']
DEZ = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
CEM = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

def _ate999(n):
    if n < 20: return UN[n]
    if n < 100: return DEZ[n // 10] + ('' if n % 10 == 0 else ' e ' + UN[n % 10])
    if n == 100: return 'cem'
    return CEM[n // 100] + ('' if n % 100 == 0 else ' e ' + _ate999(n % 100))

def extenso(n):
    if n < 1000: return _ate999(n)
    grupos = [(10 ** 9, 'bilhão', 'bilhões'), (10 ** 6, 'milhão', 'milhões'), (1000, 'mil', 'mil')]
    for base, sing, plur in grupos:
        if n >= base:
            q, r = divmod(n, base)
            if base == 1000: cab = 'mil' if q == 1 else extenso(q) + ' mil'
            else: cab = extenso(q) + ' ' + (sing if q == 1 else plur)
            if r == 0: return cab
            return cab + (' e ' if r < 100 or r % 100 == 0 else ' ') + extenso(r)
    return str(n)

# trocas fixas (antes dos números): (regex, falado)
FIXAS = [
    (r'\bT(?= menos\b)', 'Tê'),
    (r'\b3D\b', 'três dê'),
    (r'\bWow\b', 'Uau'),
]

def preparar(texto):
    trocas = []   # (original, falado), na ordem em que aparecem
    def sub(m, falado):
        trocas.append((m.group(0), falado)); return falado
    itens = []
    for rx, fal in FIXAS:
        for m in re.finditer(rx, texto): itens.append((m.start(), m.end(), fal))
    for m in re.finditer(r'\d{1,3}(?:\.\d{3})+|\d+', texto):
        if any(a <= m.start() < b for a, b, _ in itens): continue
        itens.append((m.start(), m.end(), extenso(int(m.group(0).replace('.', '')))))
    itens.sort()
    out, p = '', 0
    for a, b, fal in itens:
        out += texto[p:a] + fal; trocas.append((texto[a:b], fal)); p = b
    return out + texto[p:], trocas

def _norm(s):
    s = unicodedata.normalize('NFD', s.lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]', ' ', s)).strip()

def restaurar(W, trocas):
    """Junta as palavras faladas de cada troca num token só, com o texto original (mantém a pontuação da última)."""
    txt, dono = '', []
    for i, w in enumerate(W):
        n = _norm(w['w'])
        if not n: continue
        if txt: txt += ' '; dono.append(i)
        dono += [i] * len(n); txt += n
    juntar, de = [], 0
    for orig, fal in trocas:
        alvo = _norm(fal)
        m = re.compile(r'(?<![a-z0-9])' + re.escape(alvo) + r'(?![a-z0-9])').search(txt, de)   # palavra inteira
        if not m: continue
        p = m.start()
        i0, i1 = dono[p], dono[p + len(alvo) - 1]
        juntar.append((i0, i1, orig)); de = p + len(alvo)
    out, k = [], 0
    for i0, i1, orig in juntar:
        out += W[k:i0]
        pont = re.search(r'[.,:;!?…]+$', W[i1]['w'])
        t0, t1 = W[i0]['t'], W[i1]['t'] + W[i1]['d']
        out.append({'t': t0, 'd': round(t1 - t0, 3), 'w': orig.rstrip('.,:;!?…') + (pont.group(0) if pont else '')})
        k = i1 + 1
    return out + W[k:]

if __name__ == '__main__':
    import sys
    print(preparar(sys.argv[1]))
