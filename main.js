// Gentle scroll fades for [data-fade] elements below the hero.
// Content stays visible if this script never runs.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var els = document.querySelectorAll('main section:not(.hero) [data-fade]');
  var reveal = function (el) { el.classList.add('is-visible'); };

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });

  els.forEach(function (el) {
    // Leave anything already on screen alone.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add('fade');
    io.observe(el);
  });

  // Fallback: show everything after 4 seconds.
  setTimeout(function () { els.forEach(reveal); io.disconnect(); }, 4000);
})();
