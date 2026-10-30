# Transcreve trechos de áudio em pt com Whisper (faster-whisper, modelo small) para conferir a pronúncia da narração.
# Uso: python3 ouvir.py arq.mp3 [ini fim]...   (precisa de `pip install faster-whisper`)
import sys, subprocess, numpy as np
from faster_whisper import WhisperModel
m = WhisperModel('small', device='cpu', compute_type='int8')
def pcm(arq, a=None, b=None):
    cmd = ['ffmpeg', '-v', 'error'] + (['-ss', str(a), '-t', str(b - a)] if a is not None else []) + ['-i', arq, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32)
arq, r = sys.argv[1], sys.argv[2:]
pares = [(float(r[i]), float(r[i + 1])) for i in range(0, len(r), 2)] or [(None, None)]
for a, b in pares:
    segs, _ = m.transcribe(pcm(arq, a, b), language='pt', word_timestamps=False)
    print(a, b, '|', ' '.join(s.text.strip() for s in segs), flush=True)
