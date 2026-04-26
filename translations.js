// ========== СИСТЕМА ПЕРЕВОДОВ ==========
const translations = {
    ru: {
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
        welcome_guest: "Приветствую, искатель приключений! 👋",
        welcome_sub_guest: "Войдите, чтобы сохранять любимые маршруты",
        install_title: "Установить приложение",
        install_text: "Быстрый доступ с главного экрана",
        install_btn: "Установить",
        login_btn: "🔑 Вход"
    },
    en: {
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
        welcome_guest: "Greetings, adventurer! 👋",
        welcome_sub_guest: "Log in to save your favorite routes",
        install_title: "Install app",
        install_text: "Quick access from home screen",
        install_btn: "Install",
        login_btn: "🔑 Login"
    }
};

// Текущий язык
let currentLang = localStorage.getItem('language') || 'ru';

// Функция перевода
function translate(key) {
    return translations[currentLang][key] || translations['ru'][key] || key;
}

// Функция для получения текущего пользователя
function getCurrentUserFromLocal() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}

// Обновление всех текстов на странице
function updateAllTexts() {
    // Hero секция
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = translate('hero_badge');
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.innerHTML = translate('hero_subtitle');
    
    // Статистика
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].innerHTML = translate('stats_routes');
    if (statLabels[1]) statLabels[1].innerHTML = translate('stats_regions');
    if (statLabels[2]) statLabels[2].innerHTML = translate('stats_levels');
    
    // Фильтры
    const filterTitle = document.querySelector('.section-title');
    if (filterTitle) filterTitle.innerHTML = translate('filter_title');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns[0]) filterBtns[0].innerHTML = translate('filter_all');
    if (filterBtns[1]) filterBtns[1].innerHTML = translate('filter_easy');
    if (filterBtns[2]) filterBtns[2].innerHTML = translate('filter_medium');
    if (filterBtns[3]) filterBtns[3].innerHTML = translate('filter_hard');
    
    // Футер
    const footerTitles = document.querySelectorAll('.footer-section h3');
    if (footerTitles[0]) footerTitles[0].innerHTML = translate('footer_title');
    if (footerTitles[1]) footerTitles[1].innerHTML = translate('footer_contacts');
    if (footerTitles[2]) footerTitles[2].innerHTML = translate('footer_collab');
    
    const footerDesc = document.querySelector('.footer-section p');
    if (footerDesc) footerDesc.innerHTML = translate('footer_desc');
    
    const footerCollabText = document.querySelectorAll('.footer-section p')[2];
    if (footerCollabText) footerCollabText.innerHTML = translate('footer_collab_text');
    
    const footerCopyright = document.querySelector('.footer-bottom p');
    if (footerCopyright) footerCopyright.innerHTML = translate('footer_copyright');
    
    // PWA баннер
    const installStrong = document.querySelector('.install-text strong');
    if (installStrong) installStrong.innerHTML = translate('install_title');
    
    const installSpan = document.querySelector('.install-text span');
    if (installSpan) installSpan.innerHTML = translate('install_text');
    
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) installBtn.innerHTML = translate('install_btn');
    
    // Кнопка входа (если не авторизован)
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) loginBtn.innerHTML = translate('login_btn');
    
    // Приветствие (если не авторизован)
    const user = getCurrentUserFromLocal();
    const appleGreeting = document.getElementById('appleGreeting');
    const appleSubgreeting = document.getElementById('appleSubgreeting');
    if (appleGreeting && !user) {
        appleGreeting.innerHTML = translate('welcome_guest');
        appleSubgreeting.innerHTML = translate('welcome_sub_guest');
    }
    
    // Обновляем карточки маршрутов (перерисовываем)
    if (typeof window.refreshTrailsLanguage === 'function') {
        window.refreshTrailsLanguage();
    }
}

// Смена языка
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateAllTexts();
    
    // Обновляем кнопку языка в меню
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский';
    }
    
    // Обновляем кнопку темы в меню
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isLight = document.body.classList.contains('light-theme');
        if (currentLang === 'ru') {
            themeToggle.innerHTML = isLight ? '🌙 Тёмная тема' : '☀️ Сменить тему';
        } else {
            themeToggle.innerHTML = isLight ? '🌙 Dark theme' : '☀️ Change theme';
        }
    }
    
    // Обновляем модальное окно, если оно открыто
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle && modalTitle.innerText) {
        const isLogin = modalTitle.innerText === 'Вход' || modalTitle.innerText === 'Login';
        const submitBtn = document.getElementById('submitBtn');
        const switchMode = document.getElementById('switchMode');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        if (currentLang === 'en') {
            modalTitle.innerText = isLogin ? 'Login' : 'Register';
            if (submitBtn) submitBtn.innerText = isLogin ? 'Login' : 'Register';
            if (switchMode) {
                switchMode.innerHTML = isLogin 
                    ? "Don't have an account? <span>Register</span>" 
                    : "Already have an account? <span>Login</span>";
            }
            if (usernameInput) usernameInput.placeholder = 'Username';
            if (passwordInput) passwordInput.placeholder = 'Password';
        } else {
            modalTitle.innerText = isLogin ? 'Вход' : 'Регистрация';
            if (submitBtn) submitBtn.innerText = isLogin ? 'Войти' : 'Зарегистрироваться';
            if (switchMode) {
                switchMode.innerHTML = isLogin 
                    ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
                    : 'Уже есть аккаунт? <span>Войти</span>';
            }
            if (usernameInput) usernameInput.placeholder = 'Имя пользователя';
            if (passwordInput) passwordInput.placeholder = 'Пароль';
        }
    }
}

// Переключение языка
function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    changeLanguage(newLang);
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('language') || 'ru';
    updateAllTexts();
    
    // Навешиваем обработчик на кнопку языка
    setTimeout(() => {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            // Убираем старые обработчики
            const newLangToggle = langToggle.cloneNode(true);
            langToggle.parentNode.replaceChild(newLangToggle, langToggle);
            newLangToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }, 500);
});

// Экспортируем функции в глобальный объект
window.translate = translate;
window.changeLanguage = changeLanguage;
window.toggleLanguage = toggleLanguage;
window.updateAllTexts = updateAllTexts;
window.currentLang = currentLang;
