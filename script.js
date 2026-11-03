// Language switch. index.html sets the initial language before first paint;
// this wires the EN/DE buttons and remembers the choice.
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('[data-set-lang]');

  function apply(lang) {
    root.lang = lang;
    root.dataset.lang = lang;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.setLang);
      try { localStorage.setItem('lang', b.dataset.setLang); } catch (e) { /* private mode */ }
    });
  });

  apply(root.dataset.lang || 'en');
})();
