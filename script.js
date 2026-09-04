const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const reservationForm = document.querySelector('#reservation-form');
const dateInput = document.querySelector('#date');

function closeMenu() {
    navbarMenu.classList.remove('active');
    navbarToggle.setAttribute('aria-expanded', 'false');
    navbarToggle.setAttribute('aria-label', 'Open menu');
    navbarToggle.classList.remove('active');
}

navbarToggle.addEventListener('click', () => {
    const isOpen = navbarMenu.classList.toggle('active');
    navbarToggle.classList.toggle('active', isOpen);
    navbarToggle.setAttribute('aria-expanded', String(isOpen));
    navbarToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navbarMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const languageToggle = document.querySelector('#language-toggle');
let currentLanguage = localStorage.getItem('bloom-language') || 'en';

const translations = {
    en: {
        '[href="#about"]': 'Our story', '[href="#menu"]': 'Menu', '[href="#visit"]': 'Find us',
        '.nav-reserve': 'Reserve a table <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '.eyebrow': '<span></span> A little joy, served fresh', 'h1': 'Eat well.<br><em>Feel good.</em>',
        '.hero-text': 'Bright plates, beautiful drinks, and a warm table waiting for you.',
        '.button-primary': 'See the menu <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>',
        '.text-link': 'Book your table <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '#about .section-label': '01 / Our story', '#about h2': 'Good food has<br><em>a bright side.</em>',
        '#about .intro-content p': 'Bloom is your sunny corner for clean, colourful food and drinks made with care. Come for a quick refresh, stay for the good conversation.',
        '#about .intro-note span': 'Clean food.<br>Fresh energy.', '#menu .section-label': '02 / From our kitchen',
        '#menu h2': 'Bloom <em>menu</em>', '#menu .section-heading p': 'Simple things, done beautifully.',
        '.menu-image-card:first-child figcaption span': 'Food menu', '.menu-image-card-pink figcaption span': 'Drinks menu',
        '.menu-upload-card strong': 'Menu image', '.menu-upload-card span': 'Replace this card with your menu board',
        '#reserve .section-label': '03 / Make it a date', '#reserve h2': 'Save a seat<br><em>at Bloom.</em>',
        '#reserve .reserve-copy > p': 'Planning a breakfast, lunch, or just a good catch-up? We’ll have your table ready.',
        '#reserve .reserve-contact small': 'Call us to make a group booking',
        'label[for="name"]': 'Your name', 'label[for="date"]': 'Date', 'label[for="time"]': 'Time', 'label[for="guests"]': 'Guests', 'label[for="phone"]': 'Phone',
        '.button-dark': 'Request reservation <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '#visit > .section-label': '04 / Come say hello', '#visit h2': 'Find your way<br><em>to Bloom.</em>',
        '.hours strong': 'Opening hours', 'footer p': 'Clean food. Fresh energy.'
    },
    pt: {
        '[href="#about"]': 'A nossa história', '[href="#menu"]': 'Menu', '[href="#visit"]': 'Onde estamos',
        '.nav-reserve': 'Reserve uma mesa <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '.eyebrow': '<span></span> Um pouco de alegria, servida fresca', 'h1': 'Coma bem.<br><em>Sinta-se bem.</em>',
        '.hero-text': 'Pratos coloridos, bebidas bonitas e uma mesa acolhedora à sua espera.',
        '.button-primary': 'Ver o menu <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>',
        '.text-link': 'Reserve a sua mesa <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '#about .section-label': '01 / A nossa história', '#about h2': 'Comida boa tem<br><em>um lado luminoso.</em>',
        '#about .intro-content p': 'A Bloom é o seu cantinho ensolarado para comida e bebidas frescas, coloridas e feitas com carinho. Venha refrescar-se e fique pela boa conversa.',
        '#about .intro-note span': 'Comida fresca.<br>Energia boa.', '#menu .section-label': '02 / Da nossa cozinha',
        '#menu h2': 'Menu <em>Bloom</em>', '#menu .section-heading p': 'Coisas simples, feitas com beleza.',
        '.menu-image-card:first-child figcaption span': 'Menu de comida', '.menu-image-card-pink figcaption span': 'Menu de bebidas',
        '.menu-upload-card strong': 'Imagem do menu', '.menu-upload-card span': 'Substitua este cartão pela imagem do seu menu',
        '#reserve .section-label': '03 / Marque um encontro', '#reserve h2': 'Guarde um lugar<br><em>na Bloom.</em>',
        '#reserve .reserve-copy > p': 'A planear um pequeno-almoço, almoço ou encontro? Teremos a sua mesa pronta.',
        '#reserve .reserve-contact small': 'Ligue para reservas de grupos',
        'label[for="name"]': 'O seu nome', 'label[for="date"]': 'Data', 'label[for="time"]': 'Hora', 'label[for="guests"]': 'Pessoas', 'label[for="phone"]': 'Telefone',
        '.button-dark': 'Pedir reserva <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        '#visit > .section-label': '04 / Venha visitar-nos', '#visit h2': 'Encontre o caminho<br><em>para a Bloom.</em>',
        '.hours strong': 'Horário de funcionamento', 'footer p': 'Comida fresca. Energia boa.'
    }
};

function setLabel(selector, value) {
    const label = document.querySelector(selector);
    if (label) label.childNodes[0].nodeValue = `${value} `;
}

function applyLanguage(language) {
    Object.entries(translations[language]).forEach(([selector, value]) => {
        if (selector.startsWith('label[')) setLabel(selector, value);
        else {
            const element = document.querySelector(selector);
            if (element) element.innerHTML = value;
        }
    });
    document.querySelector('#time option').textContent = language === 'pt' ? 'Escolha' : 'Choose';
    document.querySelector('#guests option').textContent = language === 'pt' ? 'Escolha' : 'Choose';
    document.querySelector('#name').placeholder = language === 'pt' ? 'ex.: Amara Banda' : 'e.g. Amara Banda';
    document.querySelector('#phone').placeholder = language === 'pt' ? 'O seu número' : 'Your number';
    [...document.querySelectorAll('#guests option')].slice(1).forEach((option, index) => {
        const portugueseGuests = ['1 pessoa', '2 pessoas', '3 pessoas', '4+ pessoas'];
        option.textContent = language === 'pt' ? portugueseGuests[index] : `${index + 1}${index === 3 ? '+' : ''} ${index === 0 ? 'guest' : 'guests'}`;
    });
    languageToggle.querySelector('span').textContent = language === 'pt' ? 'EN' : 'PT';
    languageToggle.setAttribute('aria-label', language === 'pt' ? 'Switch to English' : 'Switch to Portuguese');
    document.documentElement.lang = language;
}

languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    localStorage.setItem('bloom-language', currentLanguage);
    applyLanguage(currentLanguage);
    closeMenu();
});

applyLanguage(currentLanguage);

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
dateInput.min = localToday;

reservationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(reservationForm);
    const name = formData.get('name').trim().split(' ')[0];
    const message = reservationForm.querySelector('.form-message');
    message.textContent = currentLanguage === 'pt'
        ? `Obrigada, ${name}. O seu pedido foi recebido. Vamos ligar para confirmar a sua mesa.`
        : `Thanks, ${name}. Your request is in. We will call to confirm your table.`;
    reservationForm.reset();
    dateInput.min = localToday;
});
