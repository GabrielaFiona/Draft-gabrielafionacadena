// 1. Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// 2. Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"], button[data-scroll-to]').forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href') || this.getAttribute('data-scroll-to');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 3. Dynamic Year
document.getElementById('year').textContent = new Date().getFullYear();

// 4. Smart Header (Hide on scroll down, show on scroll up)
let lastScrollTop = 0;
const navBar = document.querySelector('.smart-nav');

window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Optional: Only trigger after scrolling past a certain point (e.g., 50px)
  if (scrollTop > 50) {
    if (scrollTop > lastScrollTop) {
      // Scrolling Down - Hide Nav
      navBar.classList.add('nav-hidden');
    } else {
      // Scrolling Up - Show Nav
      navBar.classList.remove('nav-hidden');
    }
  } else {
    // At the very top, always show
    navBar.classList.remove('nav-hidden');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// 5. Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) { // Check if track exists to avoid errors on pages without carousel
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.btn-next');
  const prevButton = document.querySelector('.btn-prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);

  const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
    // Move track
    track.style.transform = 'translateX(-' + targetIndex * 100 + '%)';
    // Update Current Slide Class
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    // Update Dots
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = dots[targetIndex];
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  // Button Events
  if (nextButton) {
    nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let nextSlide = currentSlide.nextElementSibling;
      let nextIndex = slides.indexOf(nextSlide);
      
      // Loop back to start if at end
      if (!nextSlide) {
        nextSlide = slides[0];
        nextIndex = 0;
      }
      
      moveToSlide(currentSlide, nextSlide, nextIndex);
    });
  }

  if (prevButton) {
    prevButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let prevSlide = currentSlide.previousElementSibling;
      let prevIndex = slides.indexOf(prevSlide);

      // Loop to end if at start
      if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
        prevIndex = slides.length - 1;
      }

      moveToSlide(currentSlide, prevSlide, prevIndex);
    });
  }

  // Dot Events
  if (dotsNav) {
    dotsNav.addEventListener('click', e => {
      const targetDot = e.target.closest('button');
      if (!targetDot) return;

      const currentSlide = track.querySelector('.current-slide');
      const targetIndex = dots.findIndex(dot => dot === targetDot);
      const targetSlide = slides[targetIndex];

      moveToSlide(currentSlide, targetSlide, targetIndex);
    });
  }

  // Swipe Support (Touch Events)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const currentSlide = track.querySelector('.current-slide');
    
    if (touchStartX - touchEndX > 50) {
      // Swiped Left (Next)
      let nextSlide = currentSlide.nextElementSibling;
      let nextIndex = slides.indexOf(nextSlide);
      if (!nextSlide) { nextSlide = slides[0]; nextIndex = 0; }
      moveToSlide(currentSlide, nextSlide, nextIndex);
    }
    
    if (touchEndX - touchStartX > 50) {
      // Swiped Right (Prev)
      let prevSlide = currentSlide.previousElementSibling;
      let prevIndex = slides.indexOf(prevSlide);
      if (!prevSlide) { prevSlide = slides[slides.length - 1]; prevIndex = slides.length - 1; }
      moveToSlide(currentSlide, prevSlide, prevIndex);
    }
  }
}
