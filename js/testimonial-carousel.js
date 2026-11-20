document.querySelectorAll('[data-testimonial-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.testimonial-slide')];
  const dots = [...carousel.querySelectorAll('.testimonial-dot')];
  let current = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== current;
    });
    dots.forEach((dot, position) => {
      if (position === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  carousel.querySelector('[data-testimonial-prev]').addEventListener('click', () => showSlide(current - 1));
  carousel.querySelector('[data-testimonial-next]').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  carousel.querySelector('.testimonial-controls').addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
    dots[current].focus();
  });

  showSlide(0);
  carousel.querySelector('.testimonial-controls').hidden = false;
});
