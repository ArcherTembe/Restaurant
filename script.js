// Safe navbar toggle and active-link on scroll with rAF throttling

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');
const sections = document.querySelectorAll('section');

// Toggle menu (safe-guarded)
if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
}

// Close menu when a nav link is clicked (if any links exist)
if (navLinks && navLinks.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarToggle?.classList.remove('active');
      navbarMenu?.classList.remove('active');
    });
  });
}

// Active link on scroll — throttled with requestAnimationFrame
if (sections && sections.length) {
  let ticking = false;

  function updateActiveLink() {
    const scrollTop = window.scrollY || window.pageYOffset;

    // Remove active from all links initially
    navLinks.forEach(link => link.classList.remove('active'));

    let found = false;
    sections.forEach(sec => {
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (!id) return;

      if (scrollTop >= offset && scrollTop < offset + height) {
        const currentLink = document.querySelector(`.navbar-menu a[href*="#${id}"], .navbar-menu a[href*="${id}"]`);
        if (currentLink) {
          currentLink.classList.add('active');
          found = true;
        }
      }
    });

    // Optional: if no section matched (top or bottom), ensure first/last link not stuck
    if (!found) {
      // leave all links without active, or set a default if you prefer:
      // navLinks[0]?.classList.add('active');
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Run once on load to set correct active link
  updateActiveLink();
}
