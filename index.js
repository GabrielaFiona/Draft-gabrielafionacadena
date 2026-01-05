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
