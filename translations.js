// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        // Шапка
        logo: "🚴‍♂️ Bike Trails",
        
        // Приветствие
        welcome_guest: "Приветствую, искатель приключений! 👋",
        welcome_guest2: "Добро пожаловать в Bike Trails 🚴‍♂️",
        welcome_guest3: "Здравствуйте, райдер! 🌟",
        welcome_guest4: "С возвращением, друг! 🎉",
        welcome_sub_guest: "Войдите в аккаунт, чтобы сохранять любимые маршруты.",
        welcome_sub_user: "Ваши избранные маршруты и персональные рекомендации ждут вас.",
        
        // Hero секция
        hero_badge: "🚵‍♂️ RIDE RUSSIA",
        hero_title: "Bike Trails",
        hero_subtitle: "Лучшие веломаршруты России",
        stats_routes: "Маршрутов",
        stats_regions: "Регионов",
        stats_levels: "Уровня",
        
        // Фильтры
        filter_title: "Выбери свой маршрут",
        filter_all: "Все маршруты",
        filter_easy: "🟢 Лёгкие",
        filter_medium: "🔵 Средние",
        filter_hard: "⚫ Сложные",
        
        // Футер
        footer_title: "🚴‍♂️ Bike Trails",
        footer_desc: "Веломаршруты по России для настоящих райдеров",
        footer_contacts: "📞 Контакты",
        footer_collab: "📧 Сотрудничество",
        footer_collab_text: "По вопросам сотрудничества<br>пишите в Telegram",
        footer_copyright: "© 2025 Bike Trails — Все маршруты созданы с ❤️ для райдеров",
        
        // Меню
        menu_cabinet: "👨‍💼 Личный кабинет",
        menu_favorites: "❤️ Избранное",
        menu_help: "🆘 Помощь",
        menu_premium: "💎 Premium",
        menu_logout: "🚪 Выйти",
        menu_settings: "⚙️ Настройки",
        
        // Кнопки
        btn_login: "🔑 Вход",
        btn_theme_dark: "🌙 Тёмная тема",
        btn_theme_light: "☀️ Светлая тема",
        btn_lang_ru: "🇷🇺 Русский",
        btn_lang_en: "🇬🇧 English",
        
        // Модальное окно
        modal_login: "Вход",
        modal_register: "Регистрация",
        modal_username: "Имя пользователя",
        modal_password: "Пароль",
        modal_submit_login: "Войти",
        modal_submit_register: "Зарегистрироваться",
        modal_switch_login: "Нет аккаунта? <span>Зарегистрироваться</span>",
        modal_switch_register: "Уже есть аккаунт? <span>Войти</span>",
        
        // Приветственное окно
        welcome_modal_title: "Добро пожаловать в Bike Trails!",
        welcome_modal_text: "Твой персональный гид по лучшим веломаршрутам России.",
        welcome_btn: "Начать путешествие 🚀",
        
        // Установка PWA
        install_title: "Установить приложение",
        install_text: "Быстрый доступ с главного экрана",
        install_btn: "Установить"
    },
    en: {
        // Header
        logo: "🚴‍♂️ Bike Trails",
        
        // Greeting
        welcome_guest: "Greetings, adventurer! 👋",
        welcome_guest2: "Welcome to Bike Trails 🚴‍♂️",
        welcome_guest3: "Hello, rider! 🌟",
        welcome_guest4: "Welcome back, friend! 🎉",
        welcome_sub_guest: "Log in to save your favorite routes.",
        welcome_sub_user: "Your favorite routes and personal recommendations await you.",
        
        // Hero section
        hero_badge: "🚵‍♂️ RIDE RUSSIA",
        hero_title: "Bike Trails",
        hero_subtitle: "Best cycling routes in Russia",
        stats_routes: "Routes",
        stats_regions: "Regions",
        stats_levels: "Levels",
        
        // Filters
        filter_title: "Choose your route",
        filter_all: "All routes",
        filter_easy: "🟢 Easy",
        filter_medium: "🔵 Medium",
        filter_hard: "⚫ Hard",
        
        // Footer
        footer_title: "🚴‍♂️ Bike Trails",
        footer_desc: "Cycling routes across Russia for real riders",
        footer_contacts: "📞 Contacts",
        footer_collab: "📧 Collaboration",
        footer_collab_text: "For collaboration questions<br>write to Telegram",
        footer_copyright: "© 2025 Bike Trails — All routes created with ❤️ for riders",
        
        // Menu
        menu_cabinet: "👨‍💼 Profile",
        menu_favorites: "❤️ Favorites",
        menu_help: "🆘 Help",
        menu_premium: "💎 Premium",
        menu_logout: "🚪 Logout",
        menu_settings: "⚙️ Settings",
        
        // Buttons
        btn_login: "🔑 Login",
        btn_theme_dark: "🌙 Dark theme",
        btn_theme_light: "☀️ Light theme",
        btn_lang_ru: "🇷🇺 Russian",
        btn_lang_en: "🇬🇧 English",
        
        // Modal
        modal_login: "Login",
        modal_register: "Register",
        modal_username: "Username",
        modal_password: "Password",
        modal_submit_login: "Login",
        modal_submit_register: "Register",
        modal_switch_login: "Don't have an account? <span>Register</span>",
        modal_switch_register: "Already have an account? <span>Login</span>",
        
        // Welcome modal
        welcome_modal_title: "Welcome to Bike Trails!",
        welcome_modal_text: "Your personal guide to the best cycling routes in Russia.",
        welcome_btn: "Start journey 🚀",
        
        // PWA install
        install_title: "Install app",
        install_text: "Quick access from home screen",
        install_btn: "Install"
    }
};

// Текущий язык
let currentLang = localStorage.getItem('language') || 'ru';

// Функция для получения перевода
function t(key) {
    return translations[currentLang][key] || translations['ru'][key] || key;
}

// Функция для смены языка
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateAllTexts();
}

// Обновление всех текстов на странице
function updateAllTexts() {
    // Шапка
    const logo = document.querySelector('.logo');
    if (logo) logo.innerHTML = t('logo');
    
    // Приветствие
    updateAppleGreeting();
    
    // Hero секция
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = t('hero_badge');
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = `Bike <span class="gradient-text">Trails</span>`;
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = t('hero_subtitle');
    
    // Статистика
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].innerHTML = t('stats_routes');
    if (statLabels[1]) statLabels[1].innerHTML = t('stats_regions');
    if (statLabels[2]) statLabels[2].innerHTML = t('stats_levels');
    
    // Фильтры
    const filterTitle = document.querySelector('.section-title');
    if (filterTitle) filterTitle.innerHTML = t('filter_title');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns[0]) filterBtns[0].innerHTML = t('filter_all');
    if (filterBtns[1]) filterBtns[1].innerHTML = t('filter_easy');
    if (filterBtns[2]) filterBtns[2].innerHTML = t('filter_medium');
    if (filterBtns[3]) filterBtns[3].innerHTML = t('filter_hard');
    
    // Футер
    const footerTitles = document.querySelectorAll('.footer-section h3');
    if (footerTitles[0]) footerTitles[0].innerHTML = t('footer_title');
    if (footerTitles[1]) footerTitles[1].innerHTML = t('footer_contacts');
    if (footerTitles[2]) footerTitles[2].innerHTML = t('footer_collab');
    
    const footerDesc = document.querySelector('.footer-section p');
    if (footerDesc) footerDesc.innerHTML = t('footer_desc');
    
    const footerCollabText = document.querySelectorAll('.footer-section p')[2];
    if (footerCollabText) footerCollabText.innerHTML = t('footer_collab_text');
    
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) footerCopyright.innerHTML = t('footer_copyright');
    
    // Модальное окно
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        const isLogin = modalTitle.innerText === 'Вход' || modalTitle.innerText === 'Login';
        modalTitle.innerText = isLogin ? t('modal_login') : t('modal_register');
    }
    
    const usernameInput = document.getElementById('username');
    if (usernameInput) usernameInput.placeholder = t('modal_username');
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) passwordInput.placeholder = t('modal_password');
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const isLogin = submitBtn.innerText === 'Войти' || submitBtn.innerText === 'Login';
        submitBtn.innerText = isLogin ? t('modal_submit_login') : t('modal_submit_register');
    }
    
    const switchMode = document.getElementById('switchMode');
    if (switchMode) {
        const isLogin = switchMode.innerHTML.includes('Нет аккаунта') || switchMode.innerHTML.includes('account');
        switchMode.innerHTML = isLogin ? t('modal_switch_login') : t('modal_switch_register');
    }
    
    // PWA баннер
    const installTextStrong = document.querySelector('.install-text strong');
    if (installTextStrong) installTextStrong.innerHTML = t('install_title');
    
    const installTextSpan = document.querySelector('.install-text span');
    if (installTextSpan) installTextSpan.innerHTML = t('install_text');
    
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) installBtn.innerHTML = t('install_btn');
    
    // Кнопка входа
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) loginBtn.innerHTML = t('btn_login');
}
