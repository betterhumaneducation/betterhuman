document.addEventListener('DOMContentLoaded', () => {
  // 1. Inyectamos los estilos de animación directamente desde JS
  const style = document.createElement('style');
  style.innerHTML = `
    .ux-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1), transform 0.9s cubic-bezier(0.25, 1, 0.5, 1);
      will-change: opacity, transform;
    }
    .ux-reveal.ux-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // 2. Seleccionamos automáticamente qué elementos van a tener este efecto de lujo
  const elementsToReveal = document.querySelectorAll(
    'p, h2, h3, .program-card, .photo-frame, .pillar-card, .gallery-cell, .photo-row-cell, .ms-box, .stat, .timeline-item'
  );

  // Aplicamos la clase base y un retraso dinámico (stagger) para que aparezcan en cascada
  elementsToReveal.forEach((el, index) => {
    el.classList.add('ux-reveal');
    el.style.transitionDelay = `${(index % 3) * 0.15}s`;
  });

  // 3. Creamos el observador: cuando el usuario hace scroll y ve el elemento, ¡lo animamos!
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ux-visible');
      } else {
        entry.target.classList.remove('ux-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px"
  });

  elementsToReveal.forEach(el => observer.observe(el));
});
