// Language switch, scroll animations, number count-up and the typed role line.
// index.html sets the initial language before first paint; everything here is
// decoration on top of a page that already works without JS.
(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  // Language
  var buttons = document.querySelectorAll('[data-set-lang]');
  function applyLang(lang) {
    root.lang = lang;
    root.dataset.lang = lang;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.setLang === lang));
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      applyLang(b.dataset.setLang);
      try { localStorage.setItem('lang', b.dataset.setLang); } catch (e) { /* private mode */ }
    });
  });
  applyLang(root.dataset.lang || 'en');

  // Count numbers up from 0 when they come into view
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (reduced || !target) { el.textContent = target; return; }
    var start = null, dur = 1400;
    function step(t) {
      if (start === null) start = t;
      var k = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased);
      if (k < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
    // Land on the real number even if animation frames are throttled (background tab, battery saver).
    setTimeout(function () { el.textContent = target; }, dur + 200);
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Typed role line: types each title, pauses, deletes, next one
  var typed = document.querySelector('.typed');
  if (typed && !reduced) {
    var words = typed.dataset.words.split('|');
    var w = 0, i = 0, deleting = false;
    typed.classList.add('typing');
    typed.textContent = '';
    (function tick() {
      var word = words[w];
      i += deleting ? -1 : 1;
      typed.textContent = word.slice(0, i);
      var wait = deleting ? 35 : 70;
      if (!deleting && i === word.length) { deleting = true; wait = 1800; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }

  // Reading progress bar and active nav link
  var bar = document.querySelector('.progress');
  var links = document.querySelectorAll('nav a');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    var current = -1;
    sections.forEach(function (s, idx) { if (s && s.getBoundingClientRect().top < 120) current = idx; });
    links.forEach(function (a, idx) { a.classList.toggle('active', idx === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
