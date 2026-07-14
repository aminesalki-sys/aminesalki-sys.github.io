
(() => {
  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));

  const onReady = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  onReady(() => {
    initMenu();
    markCurrentPage();
    updateYear();
    initForms();
    initLogoCarousels();
    initSlider({ outer: '#servicesTrackOuter', track: '#servicesTrack', prev: '#servicesPrev', next: '#servicesNext', dots: '#servicesDots', autoplay: 4200 });
    initSlider({ outer: '#portTrackOuter', track: '#portfolioTrack', prev: '#portPrev', next: '#portNext', dots: '#portDots', autoplay: 4600 });
    initSlider({ outer: '#testiTrackOuter', track: '#testiTrack', prev: '#testiPrev', next: '#testiNext', dots: '#testiDots', autoplay: 5200 });
  });

  function initMenu() {
    const nav = qs('.nav-links');
    const btn = qs('.menu-btn') || qs('.mobile-toggle');
    if (!nav || !btn) return;
    if (!nav.id) nav.id = 'navLinks';
    btn.setAttribute('aria-controls', nav.id);

    const close = () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };
    const open = () => {
      nav.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = nav.classList.contains('open');
      isOpen ? close() : open();
    });

    qsa('a', nav).forEach((a) => a.addEventListener('click', close));
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || btn.contains(e.target)) return;
      close();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 1050) close(); });
  }

  function markCurrentPage() {
    qsa('.nav-links a').forEach(a => {
      try {
        const here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '/');
        const there = new URL(a.href, location.href).pathname.replace(/index\.html$/, '').replace(/\/$/, '/');
        if (here === there) a.setAttribute('aria-current', 'page');
      } catch (_) {}
    });
  }

  function updateYear() {
    qsa('[data-year], #year').forEach(el => { el.textContent = new Date().getFullYear(); });
  }

  function initForms() {
    qsa('form').forEach(form => {
      form.addEventListener('submit', () => {
        const submit = qs('button[type="submit"], input[type="submit"]', form);
        if (!submit) return;
        submit.disabled = true;
        if (submit.tagName === 'INPUT') submit.value = 'Envoi…';
        else submit.textContent = document.documentElement.lang.startsWith('ar') ? 'جارٍ الإرسال…' : document.documentElement.lang.startsWith('en') ? 'Sending…' : 'Envoi…';
      });
    });
  }

  function initLogoCarousels() {
    qsa('.reference-logo-grid').forEach((list) => {
      if (list.dataset.sliderBuilt === 'true') return;
      const items = Array.from(list.children);
      if (!items.length) return;
      const viewport = document.createElement('div');
      viewport.className = 'reference-slider-viewport';
      const track = document.createElement('div');
      track.className = 'reference-slider-track';
      track.setAttribute('role', 'list');
      const label = list.getAttribute('aria-label');
      if (label) track.setAttribute('aria-label', label);

      const promoteLink = (li) => {
        li.classList.add('reference-logo-card');
        const img = qs('img', li);
        if (!img) return li;
        const alt = (img.getAttribute('alt') || '').trim();
        const file = (img.getAttribute('src') || '').split('/').pop() || '';
        const lookup = {
          '2.webp': 'https://taxinavette.ma/',
          '4.webp': 'https://sononedmedical.com/',
          '11.webp': 'https://aviation-solidaire.fr/',
          '12.webp': 'https://soprofeu.com/',
          '19.webp': 'https://next-flight.fr/'
        };
        const byAlt = {
          'taxi navette': 'https://taxinavette.ma/',
          'sono-ned medical': 'https://sononedmedical.com/',
          'aviation solidaire': 'https://aviation-solidaire.fr/',
          'soprofeu': 'https://soprofeu.com/',
          'next flight': 'https://next-flight.fr/',
          'switch care': 'https://switch-care.fr/',
          'perfeo': 'https://perfeo.energy/',
          'metrikx': 'https://metrikx.perfeo.energy/',
          'air antilles': 'https://www.airantilles.com/'
        };
        const url = byAlt[alt.toLowerCase()] || lookup[file];
        if (url && !qs('a', li)) {
          const a = document.createElement('a');
          a.href = url; a.target = '_blank'; a.rel = 'noopener';
          a.setAttribute('aria-label', `Visiter ${alt || 'ce projet'}`);
          img.replaceWith(a); a.appendChild(img);
        }
        return li;
      };

      const originals = items.map(li => promoteLink(li));
      originals.forEach(li => track.appendChild(li));
      originals.forEach(li => {
        const clone = li.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        qsa('a', clone).forEach(a => a.setAttribute('tabindex', '-1'));
        track.appendChild(clone);
      });

      viewport.appendChild(track);
      list.replaceWith(viewport);
      list.dataset.sliderBuilt = 'true';
    });
  }

  function initSlider({ outer, track, prev, next, dots, autoplay = 0 }) {
    const viewport = qs(outer);
    const rail = qs(track);
    if (!viewport || !rail) return;
    const slides = Array.from(rail.children);
    if (!slides.length) return;

    const prevBtn = qs(prev), nextBtn = qs(next), dotsWrap = qs(dots);
    let index = 0, timer = null;

    const buildDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.className = 'slider-dot';
        b.type = 'button';
        b.setAttribute('aria-label', `Aller à l’élément ${i + 1}`);
        if (i === index) b.classList.add('active');
        b.addEventListener('click', () => { index = i; goTo(index); restart(); });
        dotsWrap.appendChild(b);
      });
    };

    const updateDots = () => {
      if (!dotsWrap) return;
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === index));
    };

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      const target = slides[index];
      const left = target.offsetLeft - (parseFloat(getComputedStyle(rail).paddingLeft) || 0);
      viewport.scrollTo({ left, behavior: 'smooth' });
      updateDots();
    };

    const nextSlide = () => goTo(index + 1);
    const prevSlide = () => goTo(index - 1);

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevSlide(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextSlide(); restart(); });

    const restart = () => {
      if (!autoplay) return;
      stop();
      timer = setInterval(nextSlide, autoplay);
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };

    ['mouseenter','focusin','touchstart'].forEach(ev => viewport.addEventListener(ev, stop, { passive: true }));
    ['mouseleave','focusout','touchend'].forEach(ev => viewport.addEventListener(ev, restart, { passive: true }));

    // lightweight swipe support
    let startX = 0;
    viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      dx < 0 ? nextSlide() : prevSlide();
      restart();
    }, { passive: true });

    buildDots();
    goTo(0);
    restart();
    window.addEventListener('resize', () => goTo(index));
  }
})();
