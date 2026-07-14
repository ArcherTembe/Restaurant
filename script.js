const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');
const toggleIcon = navbarToggle.querySelector('i'); 

// Toggle menu on hamburger button click
navbarToggle.addEventListener('click', (e) => {
    e.stopPropagation(); 
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    if (navbarToggle.classList.contains('active')) {
        toggleIcon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        toggleIcon.classList.replace('fa-xmark', 'fa-bars');
    }
});

// Close menu when the navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

//Close menu when clicking anywhere on the page outside the menu
window.addEventListener('click', (e) => {
    // Check if the menu is open AND the user clicked outside both the menu and toggle button
    if (navbarMenu.classList.contains('active') && 
        !navbarMenu.contains(e.target) && 
        !navbarToggle.contains(e.target)) {
        closeMenu();
    }
});

function closeMenu() {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    toggleIcon.classList.replace('fa-xmark', 'fa-bars');
}

const sections = document.querySelectorAll('section');

function updateActiveLinkOnScroll() {
    const top = window.scrollY;
    let found = false;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));

            const currentLink = document.querySelector(`.navbar-menu a[href*="${id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
                found = true;
            }
        }
    });

    if (!found) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.navbar-menu a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

window.addEventListener('scroll', updateActiveLinkOnScroll);
window.addEventListener('load', updateActiveLinkOnScroll);
window.addEventListener('hashchange', updateActiveLinkOnScroll);

// Mobile Swiping Implementation for Menu Carousel Slider
const menuSlider = document.getElementById('slider');
if (menuSlider) {
   const sliderRadios = Array.from(menuSlider.querySelectorAll('input[name="slider"]'));
   let startX = 0;
   let endX = 0;

   // Monitors screen location where finger initiates contact
   menuSlider.addEventListener('touchstart', (event) => {
      startX = event.changedTouches[0].screenX;
   }, { passive: true });

   // Monitors coordinates where finger leaves viewport surface
   menuSlider.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].screenX;
      evaluateSwipeGesture();
   }, { passive: true });

   function evaluateSwipeGesture() {
      const thresholdPixels = 60; // Structural buffer setting required to validate swipe action
      const activeIndex = sliderRadios.findIndex(radio => radio.checked);

      if (startX - endX > thresholdPixels) {
         // Swiped Left -> Advances forward to the next menu category card
         const nextIndex = (activeIndex + 1) % sliderRadios.length;
         sliderRadios[nextIndex].checked = true;
      } else if (endX - startX > thresholdPixels) {
         // Swiped Right -> Pulls backward onto the previous category list
         const prevIndex = (activeIndex - 1 + sliderRadios.length) % sliderRadios.length;
         sliderRadios[prevIndex].checked = true;
      }
   }
}
