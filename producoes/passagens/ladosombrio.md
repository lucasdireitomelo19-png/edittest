# Passagem · LadoSombrio (direção do Canal 1)

Atualizado em 07/11/2026, na troca da conversa `session_014uAw8A8j8RoZaxo26zVPpt` (contexto em ~48%).
Leia este arquivo, o `CLAUDE.md` e as seções de `producoes/DIRETRIZES.md` que o pedido envolver.

## Papel
Direção do canal "Lado Sombrio do Universo", em pt-BR: estratégia e métricas, coordenação dos agentes, Observatório e repasse das entregas ao dono. A produção é do Gerador de Vídeos; a pesquisa, da Pesquisas; os roteiros, do Roteirista.

## Links e ids
- **Observatório** (painel oficial desde 31/10): https://claude.ai/artifact/G6YahQcE96GqFd1VcSmFDH
  - Coleções `agentes` (doc por agente, campo `sessao` e `anteriores`), `eventos` e `videos`.
  - Cada vídeo pode ser marcado Pronto / Programado / Postado; tem botão de baixar vídeo e thumb.
  - Página em `producoes/observatorio.html`; para republicar, leia a versão no ar antes (`Artifact` read).
- **Central dos Canais** (arquivo antigo): https://claude.ai/artifact/UZ3YFHzLpBjiJj3Mskzj1q. O armazenamento está cheio (1 GB); os vídeos novos vão só para o Observatório.
- **Painel dos Agentes** antigo (MYN7cXDqxFUwnWPJCYtSWM): não recebe mais avisos.
- **Agentes** (fale por `send_message`):
  - Gerador de Vídeos: `session_014uAw8CcRpbapyaEFWGsSPQ`. Troca de conversa com frequência; a cada troca, atualize `agentes/videos` no Observatório e arquive a conversa antiga.
  - Roteirista: `session_01SHrzyZioTiFba7qKi3g3kj`, na branch `claude/practical-cannon-ly7fw1`, com ~69% de contexto em 31/10.
  - Pesquisas: `session_01LAsqdhNS2ebk9jvKN6smN2`.
    - Grava na branch `claude/happy-volta-d7td40`; a mudança de branch espera autorização do dono.
    - Copie o `producoes/fatos.md` dela para a nossa branch quando ela entregar algo novo (`git checkout origin/claude/happy-volta-d7td40 -- producoes/fatos.md`, se a nossa não mudou o arquivo).
    - Ela só manda pacotes ao Roteirista depois que o dono aprova na conversa dela.
  - Carrosséis: `session_019KYTeVZcURhxGac3ijKjZn`.
- **YouTube via Supermetrics:** fonte `YT2`, conta `UCbCxssrFpoxRyF58RLdt5Ng`. O teste grátis acabava em 04/11; se não funcionar, peça os números ao dono.
- **Branch:** `claude/vigilant-edison-nwymat`. Faça `git pull --rebase` antes do push; não abra PR.

## Regras do dono (além das DIRETRIZES)
- Só ficam abertas as conversas em funcionamento: arquive as antigas ao trocar. As conversas "Gerador De Videos" e "Gerador de Carrosseis" de 17/10 são do Inquérito Sombrio (repositório novodark); não mexer sem pedido.
- Vídeos 100% Remotion 3D, sem texto solto e sem selos na tela, com legenda menor. A voz é Brian (ElevenLabs, saldo ~123 mil caracteres em 04/11); sem ElevenLabs, Antonio.
- O ritmo é de 2 Shorts por dia e 2 longos por semana, com temas na "linha dos campeões".

## Análise (dados até 01/11)
- 243 mil views e +825 inscritos. Em 30/10 o dono informou 730 inscritos e 201 mil views.
- Por volta de 1.160 h assistidas em vídeo longo, de 4.000 h exigidas.
- **Campeões:** "Esta estrela vai explodir" (57,8 mil, 84%, 244 inscritos), "Buraco negro passando pelo Sistema Solar" (30,8 mil, 197 inscritos), o longo "Você é a ÚLTIMA pessoa da Terra!" (44,5 mil), "Planetas entre a Terra e a Lua" (12,2 mil) e "Fim do Sistema Solar" (10,4 mil).
- **Fracos:** POV em Short, física abstrata (multiverso, paradoxos), Terra e geologia, radiação e longos abstratos.
- Padrão dos vencedores: objeto cósmico gigante e real ameaçando a Terra, com algo visível ou data concreta.
- Refazer a análise por volta de 10/11.

## Estado atual (07/11)
- No Observatório, como Pronto e sem data:
  - lado-76 (Big Rip);
  - lado-78, 80 e 81;
  - lado-82 a 91 (Shorts da linha dos campeões; o lado-86 sai perto de 02/12);
  - lado-92 e 93 (longos buraco negro e estrela que explodiu);
  - lado-96 (Lua bate na Terra, primeiro 100% 3D);
  - lado-97 a 99 (π e GPS, vulcões, ataque alienígena);
  - lado-100 (buraco negro na sala, primeiro sem texto e sem selo).
- lado-94 e 95 são testes 3D (Remotion e Blender).
- Calendário sugerido ao dono, sem resposta: 2 Shorts por dia a partir de 05/11, longos às terças e sextas.
- Fila do Gerador vazia; o longo dos gêmeos está parado.

## Pendências
1. O dono definir as datas de publicação (ou autorizar que a direção marque no Observatório).
2. Pedir à Pesquisas o próximo lote na linha dos campeões (oferecido ao dono, sem resposta).
3. Roteirista e Pesquisas acima de 50% de contexto: oferecido trocar as duas para a branch principal; o dono não respondeu.
4. Carrosséis estava esperando o dono confirmar os avisos no Observatório.
5. Segundo canal: sugeridos Oceano/Terra sombria, Lado Sombrio em inglês ou religioso (arqueologia bíblica). O dono não decidiu.

## Pedidos pelo Observatório (11/11)
- O dono pede trabalho aos agentes pelo Observatório (estações Agentes e Produção).
- O envio direto pela conexão "Claude Code Remote" pode não estar disponível para ele. Nesse caso, o pedido fica na coleção `pedidos` com `status: "pendente"`.
- A tarefa agendada "Repassar pedidos do Observatório" (`trig_01J2QKPFXbPn8APXnjkG3SgU`) dispara nesta conversa de hora em hora, das 9h às 23h de Brasília. Ela entrega os pendentes por `send_message` e marca "entregue".
- Se a direção trocar de conversa, atualize o `persistent_session_id` da tarefa com `update_trigger`.
- Números do YouTube ficam em `metricas/youtube` (estação Insights). Supermetrics no plano grátis só traz dados desde 28/10, até 100 linhas por consulta e uma consulta por dia.

- Desde 11/11 o pedido também vai como comentário "enviado ao Claude" no Observatório (`[Pedido do Observatório p-…]`). Ele acorda a direção, que vigia o artefato com ArtifactComments watch; ela entrega por send_message, marca `pedidos/<id>` como entregue, responde e resolve o thread.
