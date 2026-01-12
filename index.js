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
