// ========== ПРОСТАЯ СИСТЕМА ПЕРЕВОДОВ С ПЕРЕЗАГРУЗКОЙ ==========

// Тексты на русском
const ruTexts = {
    logo: "🚴‍♂️ Bike Trails",
    login_btn: "🔑 Вход",
    hero_badge: "🚵‍♂️ RIDE RUSSIA",
    hero_subtitle: "Лучшие веломаршруты России",
    stats_routes: "Маршрутов",
    stats_regions: "Регионов",
    stats_levels: "Уровня",
    filter_title: "Выбери свой маршрут",
    filter_all: "Все маршруты",
    filter_easy: "🟢 Лёгкие",
    filter_medium: "🔵 Средние",
    filter_hard: "⚫ Сложные",
    footer_title: "🚴‍♂️ Bike Trails",
    footer_desc: "Веломаршруты по России для настоящих райдеров",
    footer_contacts: "📞 Контакты",
    footer_collab: "📧 Сотрудничество",
    footer_collab_text: "По вопросам сотрудничества пишите в Telegram",
    footer_copyright: "© 2025 Bike Trails — Все маршруты созданы с ❤️ для райдеров",
    install_title: "Установить приложение",
    install_text: "Быстрый доступ с главного экрана",
    install_btn: "Установить",
    welcome_guest: "Приветствую, искатель приключений! 👋",
    welcome_sub_guest: "Войдите, чтобы сохранять любимые маршруты",
    cabinet: "👨‍💼 Личный кабинет",
    favorites: "❤️ Избранное",
    help: "🆘 Помощь",
    premium: "💎 Premium",
    logout: "🚪 Выйти",
    theme: "☀️ Сменить тему",
    lang: "🇬🇧 English",
    modal_login: "Вход",
    modal_register: "Регистрация",
    modal_username: "Имя пользователя",
    modal_password: "Пароль",
    modal_submit_login: "Войти",
    modal_submit_register: "Зарегистрироваться",
    modal_switch_login: 'Нет аккаунта? <span>Зарегистрироваться</span>',
    modal_switch_register: 'Уже есть аккаунт? <span>Войти</span>',
    welcome_modal_title: "Добро пожаловать в Bike Trails!",
    welcome_modal_text: "Твой персональный гид по лучшим веломаршрутам России.",
    welcome_btn: "Начать путешествие 🚀",
    feature1: "🗺️ 6+ маршрутов",
    feature2: "⭐ Избранное",
    feature3: "🆘 Помощь 24/7",
    feature4: "📊 Трекер скорости"
};

// Тексты на английском
const enTexts = {
    logo: "🚴‍♂️ Bike Trails",
    login_btn: "🔑 Login",
    hero_badge: "🚵‍♂️ RIDE RUSSIA",
    hero_subtitle: "Best cycling routes in Russia",
    stats_routes: "Routes",
    stats_regions: "Regions",
    stats_levels: "Levels",
    filter_title: "Choose your route",
    filter_all: "All routes",
    filter_easy: "🟢 Easy",
    filter_medium: "🔵 Medium",
    filter_hard: "⚫ Hard",
    footer_title: "🚴‍♂️ Bike Trails",
    footer_desc: "Cycling routes across Russia for real riders",
    footer_contacts: "📞 Contacts",
    footer_collab: "📧 Collaboration",
    footer_collab_text: "For collaboration questions write to Telegram",
    footer_copyright: "© 2025 Bike Trails — All routes created with ❤️ for riders",
    install_title: "Install app",
    install_text: "Quick access from home screen",
    install_btn: "Install",
    welcome_guest: "Greetings, adventurer! 👋",
    welcome_sub_guest: "Log in to save your favorite routes",
    cabinet: "👨‍💼 Profile",
    favorites: "❤️ Favorites",
    help: "🆘 Help",
    premium: "💎 Premium",
    logout: "🚪 Logout",
    theme: "☀️ Change theme",
    lang: "🇷🇺 Русский",
    modal_login: "Login",
    modal_register: "Register",
    modal_username: "Username",
    modal_password: "Password",
    modal_submit_login: "Login",
    modal_submit_register: "Register",
    modal_switch_login: "Don't have an account? <span>Register</span>",
    modal_switch_register: "Already have an account? <span>Login</span>",
    welcome_modal_title: "Welcome to Bike Trails!",
    welcome_modal_text: "Your personal guide to the best cycling routes in Russia.",
    welcome_btn: "Start journey 🚀",
    feature1: "🗺️ 6+ routes",
    feature2: "⭐ Favorites",
    feature3: "🆘 Help 24/7",
    feature4: "📊 Speed tracker"
};

// Текущий язык
let currentLang = localStorage.getItem('language') || 'ru';

// Получить текст
function getText(key) {
    if (currentLang === 'en') {
        return enTexts[key] || ruTexts[key] || key;
    }
    return ruTexts[key] || key;
}

// Применить переводы на странице
function applyTranslations() {
    // Логотип
    const logo = document.querySelector('.logo');
    if (logo) logo.innerHTML = getText('logo');
    
    // Hero
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = getText('hero_badge');
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = getText('hero_subtitle');
    
    // Статистика
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].innerHTML = getText('stats_routes');
    if (statLabels[1]) statLabels[1].innerHTML = getText('stats_regions');
    if (statLabels[2]) statLabels[2].innerHTML = getText('stats_levels');
    
    // Фильтры
    const filterTitle = document.querySelector('.section-title');
    if (filterTitle) filterTitle.innerHTML = getText('filter_title');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns[0]) filterBtns[0].innerHTML = getText('filter_all');
    if (filterBtns[1]) filterBtns[1].innerHTML = getText('filter_easy');
    if (filterBtns[2]) filterBtns[2].innerHTML = getText('filter_medium');
    if (filterBtns[3]) filterBtns[3].innerHTML = getText('filter_hard');
    
    // Футер
    const footerTitles = document.querySelectorAll('.footer-section h3');
    if (footerTitles[0]) footerTitles[0].innerHTML = getText('footer_title');
    if (footerTitles[1]) footerTitles[1].innerHTML = getText('footer_contacts');
    if (footerTitles[2]) footerTitles[2].innerHTML = getText('footer_collab');
    
    const footerDesc = document.querySelector('.footer-section p');
    if (footerDesc) footerDesc.innerHTML = getText('footer_desc');
    
    const footerCollabText = document.querySelectorAll('.footer-section p')[2];
    if (footerCollabText) footerCollabText.innerHTML = getText('footer_collab_text');
    
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) footerCopyright.innerHTML = getText('footer_copyright');
    
    // PWA баннер
    const installStrong = document.querySelector('.install-text strong');
    if (installStrong) installStrong.innerHTML = getText('install_title');
    
    const installSpan = document.querySelector('.install-text span');
    if (installSpan) installSpan.innerHTML = getText('install_text');
    
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) installBtn.innerHTML = getText('install_btn');
    
    // Кнопка входа
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) loginBtn.innerHTML = getText('login_btn');
    
    // Приветствие
    const appleGreeting = document.getElementById('appleGreeting');
    const appleSubgreeting = document.getElementById('appleSubgreeting');
    if (appleGreeting) {
        appleGreeting.innerHTML = getText('welcome_guest');
        appleSubgreeting.innerHTML = getText('welcome_sub_guest');
    }
    
    // Модальное окно
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        const isLogin = modalTitle.innerText === 'Вход' || modalTitle.innerText === 'Login';
        modalTitle.innerHTML = getText(isLogin ? 'modal_login' : 'modal_register');
        
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) submitBtn.innerHTML = getText(isLogin ? 'modal_submit_login' : 'modal_submit_register');
        
        const switchMode = document.getElementById('switchMode');
        if (switchMode) switchMode.innerHTML = getText(isLogin ? 'modal_switch_login' : 'modal_switch_register');
        
        const usernameInput = document.getElementById('username');
        if (usernameInput) usernameInput.placeholder = getText('modal_username');
        
        const passwordInput = document.getElementById('password');
        if (passwordInput) passwordInput.placeholder = getText('modal_password');
    }
    
    // Приветственное модальное окно
    const welcomeModalTitle = document.querySelector('#welcomeModal h2');
    const welcomeModalText = document.querySelector('#welcomeModal p');
    const welcomeModalBtn = document.querySelector('#welcomeModal .welcome-btn');
    const welcomeFeatures = document.querySelectorAll('#welcomeModal .feature');
    
    if (welcomeModalTitle) welcomeModalTitle.innerHTML = getText('welcome_modal_title');
    if (welcomeModalText) welcomeModalText.innerHTML = getText('welcome_modal_text');
    if (welcomeModalBtn) welcomeModalBtn.innerHTML = getText('welcome_btn');
    if (welcomeFeatures[0]) welcomeFeatures[0].innerHTML = getText('feature1');
    if (welcomeFeatures[1]) welcomeFeatures[1].innerHTML = getText('feature2');
    if (welcomeFeatures[2]) welcomeFeatures[2].innerHTML = getText('feature3');
    if (welcomeFeatures[3]) welcomeFeatures[3].innerHTML = getText('feature4');
}

// Переключение языка
function switchLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('language', newLang);
    location.reload(); // Просто перезагружаем страницу
}

// Загрузка при старте
document.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('language') || 'ru';
    applyTranslations();
    
    // Навешиваем обработчик на кнопку языка
    setTimeout(() => {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                switchLanguage();
            });
        }
    }, 500);
});

window.getText = getText;
window.switchLanguage = switchLanguage;
