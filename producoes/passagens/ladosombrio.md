# Passagem · LadoSombrio (direção do Canal 1)

Atualizado em 28/10/2026, na troca da conversa `session_015e2JLC4tKSvXxCwAtgDrdG` por uma nova (economia de tokens).
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver. Não releia o resto do repositório sem necessidade.

## Papel desta conversa
Direção do canal "Lado Sombrio do Universo" (@ladosombriodouniverso), em pt-BR: estratégia e métricas, roteiros quando o dono pede direto, ferramentas (Central, Painel, Remotion) e coordenação dos outros agentes. A produção dos vídeos é do Gerador de Vídeos.

## Links e ids
- **Central dos Canais:** https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q
  - Coleção `videos`, linhas `lado-NN` (a última é lado-61).
  - Só o Lado Sombrio: o Inquérito Sombrio foi removido em 28/10.
  - Tem seleção para apagar vários vídeos de uma vez; o arquivo é apagado junto.
  - O armazenamento está em ~99% de 1 GB.
  - Não republicar a página sem ler a versão no ar antes.
- **Painel dos Agentes:** https://claude.ai/artifact/MYN7cXDqxFUwnWPJCYtSWM
  - Coleções `agentes` e `eventos`; regra de aviso no `CLAUDE.md`.
  - O Zelador e a tarefa agendada dele foram excluídos em 28/10. O painel se atualiza só pelos avisos.
- **Agentes:**
  - Gerador de Vídeos: `session_01RMuyuTR7uKM4etrPUUhNcQ`
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`
  - Pesquisas: `session_01LAsqdhNS2ebk9jvKN6smN2`
  - Gerador de Carrosséis: `session_019KYTeVZcURhxGac3ijKjZn`
  - Para falar com eles, use `send_message` do conector claude-code-remote.
- **YouTube via Supermetrics:**
  - Fonte `YT2`, conta `UCbCxssrFpoxRyF58RLdt5Ng`.
  - Relatórios `LatestVideos`, `ChannelTotals` e `TrafficSources`.
  - Os dados têm ~2 dias de atraso.
- **Branch:** `claude/vigilant-edison-nwymat`. Sempre `git pull --rebase` antes do push, porque outras conversas também enviam para essa branch. Sem PR.

## Regras do dono que valem sempre
- Descrições sem fontes. Nunca inventar fatos (use `producoes/fatos.md`). Nada gráfico ou sensível, só estilizado.
- Voz padrão: Brian (ElevenLabs). O edge-tts só serve para narração provisória.
- Motion graphics no Remotion (`producoes/remotion/`).
- **Desde 28/10 o vídeo vai direto para a versão final, sem storyboard nem prévia** (o Gerador registrou em `3c6b5a5`). Antes era "nada é renderizado sem aprovação". Ainda falta o dono confirmar que pediu isso; perguntei e ele não respondeu.
- Estratégia de conteúdo (`DIRETRIZES.md`, de 28/10):
  - longos em POV, com título curto em 2ª pessoa e "!", ~7 min;
  - Shorts de fim do mundo cósmico + algo concreto;
  - nada de POV em Short;
  - meta de 80% de retenção;
  - a fila priorizada fica no topo de `temas.md`.
- Nunca pedir chave ou token no chat; chaves ficam nas variáveis de ambiente. Não publicar em redes sociais.
- Commits terminam com as linhas `Co-Authored-By` e `Claude-Session` da sessão atual.

## Números de referência (YouTube, 16–25/10)
- 82 mil views, +280 inscritos.
- Campeão: o longo "Você é a ÚLTIMA pessoa da Terra!", com 15,6 mil views e 55 inscritos.
- Melhores Shorts:
  - FIM do Sistema Solar (8,2 mil)
  - Sexta-feira 13 / asteroide (6,7 mil)
  - Cair num buraco negro (5,9 mil, 87% de retenção)
- Os Shorts em POV ficaram em 1,1–1,6 mil.
- Refazer a análise por volta de 10/11.

## Pendências
1. O dono confirmar a regra "direto para o final, sem prévia".
2. 1 arquivo do Inquérito ficou na Central, sem linha apontando para ele: `692ae084a5e10af15e957ad57b6ba16e`, 13 MB. A exclusão foi barrada pelo sistema de permissões; só tentar de novo se o dono pedir.
3. Economia de tokens, medidas ainda não aplicadas:
   - o Gerador parar de mandar aviso para esta conversa e só gravar no Painel;
   - Gerador e Carrosséis no Sonnet.
4. Open Generative AI: precisa de uma chave da MuAPI. Esperando o dono decidir.

## Instalado só na sessão antiga (some com ela)
FreeLLMAPI, Open-Generative-AI e o teste do Remotion no scratchpad. O modelo do Remotion está salvo no repositório.
