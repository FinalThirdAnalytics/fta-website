// Ligações antigas (#fta, #performance, ...) do site de separadores
(function () {
  var old = { fta: '/clubes', performance: '/jogadores', manager: '/treinadores', consulting: '/consultoria', pt: '/#primeiro-toque', institute: '/#institute', academy: '/#institute' };
  var h = (location.hash || '').slice(1).toLowerCase();
  var home = location.pathname === '/' || /index\.html$/.test(location.pathname);
  if (home && old[h] && old[h].charAt(1) !== '#') location.replace(old[h]);
  else if (home && old[h]) location.hash = old[h].slice(2);
})();

// Formulário de contacto (Netlify Forms)
document.querySelectorAll('form.f').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    var ok = form.querySelector('.ok');
    var err = form.querySelector('.err');
    btn.disabled = true;
    btn.textContent = 'A enviar…';
    ok.style.display = 'none';
    err.style.display = 'none';
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      ok.style.display = 'block';
      btn.textContent = 'Mensagem enviada';
    }).catch(function () {
      err.style.display = 'block';
      btn.disabled = false;
      btn.textContent = label;
    });
  });
});
