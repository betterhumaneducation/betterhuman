document.addEventListener('DOMContentLoaded', () => {

  // 1. Efecto de aparición en hero al hacer scroll
  const heroContents = document.querySelectorAll('.hero-content, .page-hero-content');
  heroContents.forEach(heroContent => {
    heroContent.classList.add('ux-reveal');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        heroContent.classList.add('ux-visible');
      } else {
        heroContent.classList.remove('ux-visible');
      }
    });
  });

  // 2. Scroll reveal para todos los elementos de contenido
  const elementsToReveal = document.querySelectorAll([
    '.program-card',
    '.alliance-card',
    '.pop-card',
    '.profile-card',
    '.promise-card',
    '.pillar-card',
    '.photo-frame',
    '.gallery-cell',
    '.photo-row-cell',
    '.ms-box',
    '.stat',
    '.timeline-item',
    '.scope-item',
    '.vision-statement',
    '.about-grid',
    '.section-title',
    '.section-label'
  ].join(', '));

  // Aplicamos clase base con stagger por grupo de 3
  elementsToReveal.forEach((el, index) => {
    el.classList.add('ux-reveal');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
  });

  // 3. IntersectionObserver para activar la animación al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ux-visible');
        // Una vez visible, desconectamos para mejor performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -5% 0px"
  });

  elementsToReveal.forEach(el => observer.observe(el));

  // 4. Header que se vuelve más oscuro al hacer scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.style.background = 'rgba(10, 10, 12, 0.92)';
        header.style.padding = '18px 7vw';
      } else {
        header.style.background = '';
        header.style.padding = '';
      }
    }, { passive: true });
  }

  // 5. Scroll to Top button
  const scrollTopBtn = document.getElementById('scrollToTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
