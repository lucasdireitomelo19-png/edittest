// Rodapé, degradê e barra de progresso iguais em todos os slides.
  const total = document.querySelectorAll('.s').length;
  const seta = '<svg viewBox="0 0 24 24" fill="none" stroke="#ff7a1a" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  document.querySelectorAll('.s').forEach((s, i) => {
    const n = i + 1;
    s.insertAdjacentHTML('beforeend',
      `<div class="fade"></div><div class="rod"><div class="eu"><img src="../../marca/logo_lado_sombrio_800x800.png">@ladosombriodouniverso</div>` +
      `<div class="c">${n}/${total}${n < total ? seta : ''}</div></div>` +
      `<div class="bar"><i style="width:${n / total * 100}%"></i></div>`);
  });
