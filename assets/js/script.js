// 1. Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, threshold: 0.1, rootMargin: "0px" });
revealElements.forEach((el) => revealObserver.observe(el));

// 2. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }); }
    }
  });
});

// 3. Dynamic Year
const yearSpan = document.getElementById('year');
if(yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

// 4. Smart Header
let lastScrollTop = 0;
const navBar = document.querySelector('.smart-nav');
if (navBar) {
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      if (scrollTop > lastScrollTop) { navBar.classList.add('nav-hidden'); } 
      else { navBar.classList.remove('nav-hidden'); }
    } else { navBar.classList.remove('nav-hidden'); }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// 5. Original Carousel Logic (Preserved)
const track = document.querySelector('.carousel-track');
if (track) { 
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.btn-next');
  const prevButton = document.querySelector('.btn-prev');

  const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
    track.style.transform = 'translateX(-' + targetIndex * 100 + '%)';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  if (nextButton) {
    nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let nextSlide = currentSlide.nextElementSibling || slides[0];
      moveToSlide(currentSlide, nextSlide, slides.indexOf(nextSlide));
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
      moveToSlide(currentSlide, prevSlide, slides.indexOf(prevSlide));
    });
  }
}

// 6. Magnetic Button Effect (Interactive Enhancement)
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const position = btn.getBoundingClientRect();
    const x = e.pageX - position.left - position.width / 2;
    const y = e.pageY - position.top - position.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
  });
  btn.addEventListener('mouseout', function() {
    btn.style.transform = 'translate(0px, 0px)';
  });
});
