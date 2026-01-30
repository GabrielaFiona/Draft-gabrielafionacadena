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
    const href = this.getAttribute('href');
    // Only intercept if it's a valid ID selector
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// 3. Dynamic Year
const yearSpan = document.getElementById('year');
if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 4. Smart Header (Hide on scroll down, show on scroll up)
let lastScrollTop = 0;
const navBar = document.querySelector('.smart-nav');

if (navBar) {
  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      if (scrollTop > lastScrollTop) {
        // Scrolling Down - Hide Nav
        navBar.classList.add('nav-hidden');
      } else {
        // Scrolling Up - Show Nav
        navBar.classList.remove('nav-hidden');
      }
    } else {
      navBar.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// 5. Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) { 
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.btn-next');
  const prevButton = document.querySelector('.btn-prev');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);

  const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
    track.style.transform = 'translateX(-' + targetIndex * 100 + '%)';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = dots[targetIndex];
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  if (nextButton) {
    nextButton.addEventListener('click', e => {
      const currentSlide = track.querySelector('.current-slide');
      let nextSlide = currentSlide.nextElementSibling;
      let nextIndex = slides.indexOf(nextSlide);
      
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

      if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
        prevIndex = slides.length - 1;
      }

      moveToSlide(currentSlide, prevSlide, prevIndex);
    });
  }

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

  // Swipe Support
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
      let nextSlide = currentSlide.nextElementSibling;
      let nextIndex = slides.indexOf(nextSlide);
      if (!nextSlide) { nextSlide = slides[0]; nextIndex = 0; }
      moveToSlide(currentSlide, nextSlide, nextIndex);
    }
    
    if (touchEndX - touchStartX > 50) {
      let prevSlide = currentSlide.previousElementSibling;
      let prevIndex = slides.indexOf(prevSlide);
      if (!prevSlide) { prevSlide = slides[slides.length - 1]; prevIndex = slides.length - 1; }
      moveToSlide(currentSlide, prevSlide, prevIndex);
    }
  }
}

// 6. TOGGLE FORMS LOGIC (NEW)
const toggleButtons = document.querySelectorAll('.toggle-form-btn');

toggleButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetForm = document.getElementById(targetId);
    
    if (targetForm) {
      // Toggle the active class on the target form
      const isActive = targetForm.classList.contains('active');
      
      // Optional: Close other forms first (Accordion behavior)
      document.querySelectorAll('.dropdown-form-container').forEach(form => {
        form.classList.remove('active');
      });

      // If it wasn't active before, open it now
      if (!isActive) {
        targetForm.classList.add('active');
      }
    }
  });
});

// 7. Header "Start a Project" Logic
const startProjectLink = document.querySelector('.open-form-link');

if (startProjectLink) {
  startProjectLink.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href'); // #name
    const targetInput = document.querySelector(targetId);
    
    if (targetInput) {
      e.preventDefault();
      
      // 1. Find the parent dropdown container and open it
      const parentContainer = targetInput.closest('.dropdown-form-container');
      if (parentContainer) {
        parentContainer.classList.add('active');
      }

      // 2. Smooth scroll to the form
      parentContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // 3. Focus the input so the user can start typing immediately
      setTimeout(() => {
        targetInput.focus();
      }, 500); // Small delay to allow scroll animation to finish
    }
  });
}
