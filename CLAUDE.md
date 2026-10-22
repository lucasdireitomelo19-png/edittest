# Canal 1 · Lado Sombrio do Universo

Regras do canal: `producoes/DIRETRIZES.md` (roteiro, vídeo, aprovação antes de renderizar e fluxo econômico) e `producoes/fatos.md` (fatos já checados).

## Prédio dos Agentes (status em tempo real)
O dono acompanha todas as conversas do Canal 1 no artefato "Prédio dos Agentes" (https://claude.ai/artifact/MYN7cXDqxFUwnWPJCYtSWM). Cada conversa avisa o próprio status gravando **um** documento novo na coleção `eventos` do banco desse artefato, com a ferramenta `ArtifactData` (carregue com ToolSearch `select:ArtifactData` na primeira vez).

**Quando avisar:** duas vezes por pedido do dono, e só nesses dois momentos:
1. **Ao começar** a trabalhar num pedido que vai levar mais que uma resposta rápida: `estado: "work"`, `faz` = o que vai fazer (1 frase curta), `pedido` = o pedido do dono resumido (até 120 caracteres).
2. **Ao terminar** a resposta: `estado` = `"idle"` (concluído), `"wait"` (esperando o dono aprovar ou responder algo) ou `"fail"` (não conseguiu). `faz` = o que entregou ou o que está esperando (1 frase curta).

Não avise em notificações automáticas nem em respostas de uma linha, e não leia o banco antes de gravar.

**Como gravar** (uma chamada, sem `if_version`, porque o documento é sempre novo):
- `action: "set"`, `url`: o do Prédio, `collection: "eventos"`
- `doc_id`: `<id da sessão>-<timestamp em ms>`. O id da sessão é a variável de ambiente `CLAUDE_CODE_REMOTE_SESSION_ID` com o prefixo `cse_` trocado por `session_` (ex.: `cse_01AB…` → `session_01AB…`).
- `data`: `{ "sessao": "<id da sessão>", "titulo": "<título curto desta conversa>", "estado": "...", "faz": "...", "pedido": "...", "ts": "<agora em ISO UTC>" }`

Se a gravação falhar, siga o trabalho normalmente e não tente de novo.
