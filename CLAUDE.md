# Canal 1 · Lado Sombrio do Universo

Regras do canal: `producoes/DIRETRIZES.md` (roteiro, vídeo, aprovação antes de renderizar e fluxo econômico) e `producoes/fatos.md` (fatos já checados).

## Observatório (status em tempo real)
Desde 31/10/2026 o dono acompanha todas as conversas do Canal 1 e os vídeos no artefato "Observatório Lado Sombrio" (https://claude.ai/artifact/G6YahQcE96GqFd1VcSmFDH). Ele substitui o antigo "Painel dos Agentes" (MYN7cXDqxFUwnWPJCYtSWM), que não deve mais receber avisos. Vídeo entregue também vai para a coleção `videos` do Observatório (mesmo formato da Central, `video_url`/`thumb_url` apontando para assets do próprio Observatório). Cada conversa avisa o próprio status gravando **um** documento novo na coleção `eventos` do banco desse artefato, com a ferramenta `ArtifactData` (carregue com ToolSearch `select:ArtifactData` na primeira vez).

**Quando avisar:** duas vezes por pedido do dono, e só nesses dois momentos:
1. **Ao começar** a trabalhar num pedido que vai levar mais que uma resposta rápida: `estado: "work"`, `faz` = o que vai fazer (1 frase curta), `pedido` = o pedido do dono resumido (até 120 caracteres).
2. **Ao terminar** a resposta: `estado` = `"idle"` (concluído), `"wait"` (esperando o dono aprovar ou responder algo) ou `"fail"` (não conseguiu). `faz` = o que entregou ou o que está esperando (1 frase curta).

Não avise em notificações automáticas nem em respostas de uma linha, e não leia o banco antes de gravar.

**Como gravar** (uma chamada, sem `if_version`, porque o documento é sempre novo):
- `action: "set"`, `url`: o do Observatório, `collection: "eventos"`
- `doc_id`: `<id da sessão>-<timestamp em ms>`. O id da sessão é a variável de ambiente `CLAUDE_CODE_REMOTE_SESSION_ID` com o prefixo `cse_` trocado por `session_` (ex.: `cse_01AB…` → `session_01AB…`).
- `data`: `{ "sessao": "<id da sessão>", "titulo": "<título curto desta conversa>", "estado": "...", "faz": "...", "pedido": "...", "ts": "<agora em ISO UTC>", "andar": "<setor>" }`. `andar` é o setor da conversa: "Direção & Roteiros", "Produção de Vídeo" ou "Carrosséis".

Se a gravação falhar, siga o trabalho normalmente e não tente de novo.

## Conversas longas: trocar por uma nova (economia de tokens, pedido do dono em 28/10/2026)
Cada mensagem relê todo o histórico da conversa, então conversa comprida custa caro. Troque de conversa quando **o uso de contexto passar de ~50%** ou **ao fechar um lote de trabalho** (um lote de vídeos, uma semana).

Para trocar:
1. Escreva ou atualize `producoes/passagens/<agente>.md`, curto e direto:
   - papel da conversa;
   - links e ids;
   - regras do dono que valem;
   - estado atual;
   - pendências com o próximo passo;
   - onde estão os arquivos.
   O que já está nas DIRETRIZES fica lá; não copie.
2. Faça commit e push (com `git pull --rebase` antes).
3. Crie a sucessora com `create_session` do conector claude-code-remote:
   - `source_url` = este repositório;
   - `source_revision` e `outcome_branch` = `claude/vigilant-edison-nwymat`;
   - mesmo título;
   - `prompt`: "Você continua o trabalho do agente <nome> do Canal 1. Leia o CLAUDE.md e producoes/passagens/<agente>.md, grave o aviso inicial no Observatório (estado idle, faz = 'Assumiu no lugar da conversa anterior', com o andar certo) e espere o dono."
4. Grave o último aviso desta conversa no Observatório com `estado: "arq"` (ela sai do painel) e mande ao dono o link da conversa nova.
5. Avise a troca por `send_message` aos agentes que mandam mensagens para esta conversa, informando o id novo.
