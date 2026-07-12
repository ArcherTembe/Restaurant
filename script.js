const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));

            const currentLink = document.querySelector(`.navbar-menu a[href*="${id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
});
