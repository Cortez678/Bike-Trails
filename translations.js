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
        login_btn: "🔑 Вход",
        // Данные маршрутов (для карточек)
        trails: {
            1: { name: "Воробьёвы горы", desc: "Легендарный маршрут по Москве-реке с панорамным видом на город." },
            2: { name: "Куршская коса", desc: "Уникальный маршрут по национальному парку между морем и заливом." },
            3: { name: "Лаго-Наки", desc: "Высокогорный маршрут по альпийским лугам Адыгеи." },
            4: { name: "Алтайский Марс", desc: "Космические пейзажи Алтая: красные скалы и бирюзовые реки." },
            5: { name: "Байкальская петля", desc: "Кольцевой маршрут вдоль озера Байкал." },
            6: { name: "Долина гейзеров", desc: "Экстремальный маршрут Камчатки." }
        }
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
        login_btn: "🔑 Login",
        trails: {
            1: { name: "Vorobyovy Gory", desc: "Legendary route along the Moscow River with panoramic views of the city." },
            2: { name: "Curonian Spit", desc: "Unique route through the national park between the sea and the bay." },
            3: { name: "Lago-Naki", desc: "High-altitude route through the alpine meadows of Adygea." },
            4: { name: "Altai Mars", desc: "Cosmic landscapes of Altai: red rocks and turquoise rivers." },
            5: { name: "Baikal Loop", desc: "Circular route along Lake Baikal." },
            6: { name: "Valley of Geysers", desc: "Extreme route in Kamchatka." }
        }
    }
};

let currentLang = localStorage.getItem('language') || 'ru';

function translate(key) {
    return translations[currentLang][key] || translations['ru'][key] || key;
}

function translateTrail(id, field) {
    return translations[currentLang].trails?.[id]?.[field] || translations['ru'].trails?.[id]?.[field] || '';
}

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
    if (typeof window.filterTrails === 'function') {
        const activeFilter = document.querySelector('.filter-btn.active');
        const level = activeFilter ? activeFilter.getAttribute('data-level') : 'all';
        window.filterTrails(level);
    }
}

function getCurrentUserFromLocal() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateAllTexts();
    
    // Обновляем кнопку языка в меню
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский';
    }
    
    // Обновляем модальное окно
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle && modalTitle.innerText) {
        const isLogin = modalTitle.innerText === 'Вход' || modalTitle.innerText === 'Login';
        if (currentLang === 'en') {
            modalTitle.innerText = isLogin ? 'Login' : 'Register';
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) submitBtn.innerText = isLogin ? 'Login' : 'Register';
            const switchMode = document.getElementById('switchMode');
            if (switchMode) {
                switchMode.innerHTML = isLogin 
                    ? "Don't have an account? <span>Register</span>" 
                    : "Already have an account? <span>Login</span>";
            }
            if (document.getElementById('username')) document.getElementById('username').placeholder = 'Username';
            if (document.getElementById('password')) document.getElementById('password').placeholder = 'Password';
        } else {
            modalTitle.innerText = isLogin ? 'Вход' : 'Регистрация';
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) submitBtn.innerText = isLogin ? 'Войти' : 'Зарегистрироваться';
            const switchMode = document.getElementById('switchMode');
            if (switchMode) {
                switchMode.innerHTML = isLogin 
                    ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
                    : 'Уже есть аккаунт? <span>Войти</span>';
            }
            if (document.getElementById('username')) document.getElementById('username').placeholder = 'Имя пользователя';
            if (document.getElementById('password')) document.getElementById('password').placeholder = 'Пароль';
        }
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    changeLanguage(newLang);
}

document.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('language') || 'ru';
    updateAllTexts();
    
    setTimeout(() => {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }, 500);
});

window.translate = translate;
window.translateTrail = translateTrail;
window.changeLanguage = changeLanguage;
window.toggleLanguage = toggleLanguage;
window.updateAllTexts = updateAllTexts;
window.currentLang = currentLang;
