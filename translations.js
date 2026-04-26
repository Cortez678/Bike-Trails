// ========== ПОЛНАЯ СИСТЕМА ПЕРЕВОДОВ ==========
const translations = {
    ru: {
        // Шапка
        logo: "🚴‍♂️ Bike Trails",
        login_btn: "🔑 Вход",
        
        // Приветствие
        welcome_guest: "Приветствую, искатель приключений! 👋",
        welcome_guest2: "Добро пожаловать в Bike Trails 🚴‍♂️",
        welcome_guest3: "Здравствуйте, райдер! 🌟",
        welcome_guest4: "С возвращением, друг! 🎉",
        welcome_sub_guest: "Войдите в аккаунт, чтобы сохранять любимые маршруты.",
        welcome_sub_user: "Ваши избранные маршруты и персональные рекомендации ждут вас.",
        
        // Hero секция
        hero_badge: "🚵‍♂️ RIDE RUSSIA",
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
        
        // Карточки маршрутов (названия и описания)
        trails: {
            1: { name: "Воробьёвы горы", desc: "Легендарный маршрут по Москве-реке с панорамным видом на город. Проходит через парк, набережную и смотровые площадки." },
            2: { name: "Куршская коса", desc: "Уникальный маршрут по национальному парку между морем и заливом. Песчаные дюны, сосновый лес и побережье Балтики." },
            3: { name: "Лаго-Наки", desc: "Высокогорный маршрут по альпийским лугам Адыгеи. Горы, водопады и виды, которые захватывают дух." },
            4: { name: "Алтайский Марс", desc: "Космические пейзажи Алтая: красные скалы, бирюзовые реки и горные тропы." },
            5: { name: "Байкальская петля", desc: "Кольцевой маршрут вдоль озера Байкал с заездом на пик Черского." },
            6: { name: "Долина гейзеров", desc: "Экстремальный маршрут Камчатки. Термальные источники, вулканы, медвежьи тропы." }
        },
        
        // Футер
        footer_title: "🚴‍♂️ Bike Trails",
        footer_desc: "Веломаршруты по России для настоящих райдеров",
        footer_contacts: "📞 Контакты",
        footer_collab: "📧 Сотрудничество",
        footer_collab_text: "По вопросам сотрудничества пишите в Telegram",
        footer_copyright: "© 2025 Bike Trails — Все маршруты созданы с ❤️ для райдеров",
        
        // PWA баннер
        install_title: "Установить приложение",
        install_text: "Быстрый доступ с главного экрана",
        install_btn: "Установить",
        
        // Модальное окно
        modal_login: "Вход",
        modal_register: "Регистрация",
        modal_username: "Имя пользователя",
        modal_password: "Пароль",
        modal_submit_login: "Войти",
        modal_submit_register: "Зарегистрироваться",
        modal_switch_login: "Нет аккаунта? <span>Зарегистрироваться</span>",
        modal_switch_register: "Уже есть аккаунт? <span>Войти</span>",
        
        // Меню
        menu_cabinet: "👨‍💼 Личный кабинет",
        menu_favorites: "❤️ Избранное",
        menu_help: "🆘 Помощь",
        menu_premium: "💎 Premium",
        menu_logout: "🚪 Выйти",
        menu_theme: "☀️ Сменить тему",
        menu_lang: "🇬🇧 English",
        
        // Приветственное окно
        welcome_modal_title: "Добро пожаловать в Bike Trails!",
        welcome_modal_text: "Твой персональный гид по лучшим веломаршрутам России.",
        welcome_btn: "Начать путешествие 🚀",
        welcome_features: ["🗺️ 6+ маршрутов", "⭐ Избранное", "🆘 Помощь 24/7", "📊 Трекер скорости"]
    },
    en: {
        // Header
        logo: "🚴‍♂️ Bike Trails",
        login_btn: "🔑 Login",
        
        // Greeting
        welcome_guest: "Greetings, adventurer! 👋",
        welcome_guest2: "Welcome to Bike Trails 🚴‍♂️",
        welcome_guest3: "Hello, rider! 🌟",
        welcome_guest4: "Welcome back, friend! 🎉",
        welcome_sub_guest: "Log in to save your favorite routes.",
        welcome_sub_user: "Your favorite routes and personal recommendations await you.",
        
        // Hero section
        hero_badge: "🚵‍♂️ RIDE RUSSIA",
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
        
        // Trail cards
        trails: {
            1: { name: "Vorobyovy Gory", desc: "Legendary route along the Moscow River with panoramic views of the city. Passes through the park, embankment and observation platforms." },
            2: { name: "Curonian Spit", desc: "Unique route through the national park between the sea and the bay. Sand dunes, pine forest and Baltic coast." },
            3: { name: "Lago-Naki", desc: "High-altitude route through the alpine meadows of Adygea. Mountains, waterfalls and breathtaking views." },
            4: { name: "Altai Mars", desc: "Cosmic landscapes of Altai: red rocks, turquoise rivers and mountain trails." },
            5: { name: "Baikal Loop", desc: "Circular route along Lake Baikal with a visit to Chersky Peak." },
            6: { name: "Valley of Geysers", desc: "Extreme route in Kamchatka. Thermal springs, volcanoes, bear trails." }
        },
        
        // Footer
        footer_title: "🚴‍♂️ Bike Trails",
        footer_desc: "Cycling routes across Russia for real riders",
        footer_contacts: "📞 Contacts",
        footer_collab: "📧 Collaboration",
        footer_collab_text: "For collaboration questions write to Telegram",
        footer_copyright: "© 2025 Bike Trails — All routes created with ❤️ for riders",
        
        // PWA banner
        install_title: "Install app",
        install_text: "Quick access from home screen",
        install_btn: "Install",
        
        // Modal
        modal_login: "Login",
        modal_register: "Register",
        modal_username: "Username",
        modal_password: "Password",
        modal_submit_login: "Login",
        modal_submit_register: "Register",
        modal_switch_login: "Don't have an account? <span>Register</span>",
        modal_switch_register: "Already have an account? <span>Login</span>",
        
        // Menu
        menu_cabinet: "👨‍💼 Profile",
        menu_favorites: "❤️ Favorites",
        menu_help: "🆘 Help",
        menu_premium: "💎 Premium",
        menu_logout: "🚪 Logout",
        menu_theme: "☀️ Change theme",
        menu_lang: "🇷🇺 Русский",
        
        // Welcome modal
        welcome_modal_title: "Welcome to Bike Trails!",
        welcome_modal_text: "Your personal guide to the best cycling routes in Russia.",
        welcome_btn: "Start journey 🚀",
        welcome_features: ["🗺️ 6+ routes", "⭐ Favorites", "🆘 Help 24/7", "📊 Speed tracker"]
    }
};

// Текущий язык
let currentLang = localStorage.getItem('language') || 'ru';

// Функция перевода
function t(key) {
    return translations[currentLang][key] || translations['ru'][key] || key;
}

// Функция перевода маршрутов
function tTrail(id, field) {
    return translations[currentLang].trails?.[id]?.[field] || translations['ru'].trails?.[id]?.[field] || '';
}

// Получение текущего пользователя
function getCurrentUserLocal() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}

// ========== ОБНОВЛЕНИЕ ВСЕХ ЭЛЕМЕНТОВ СТРАНИЦЫ ==========

function updateAllTexts() {
    // Логотип
    const logo = document.querySelector('.logo');
    if (logo) logo.innerHTML = t('logo');
    
    // Hero секция
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = t('hero_badge');
    
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
    
    // PWA баннер
    const installStrong = document.querySelector('.install-text strong');
    if (installStrong) installStrong.innerHTML = t('install_title');
    
    const installSpan = document.querySelector('.install-text span');
    if (installSpan) installSpan.innerHTML = t('install_text');
    
    const installBtn = document.querySelector('.install-btn');
    if (installBtn) installBtn.innerHTML = t('install_btn');
    
    // Кнопка входа
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) loginBtn.innerHTML = t('login_btn');
    
    // Приветствие Apple
    const user = getCurrentUserLocal();
    const appleGreeting = document.getElementById('appleGreeting');
    const appleSubgreeting = document.getElementById('appleSubgreeting');
    
    if (appleGreeting) {
        if (user) {
            const hour = new Date().getHours();
            let timeMsg = '';
            if (hour < 12) timeMsg = currentLang === 'ru' ? 'Доброе утро' : 'Good morning';
            else if (hour < 18) timeMsg = currentLang === 'ru' ? 'Добрый день' : 'Good afternoon';
            else timeMsg = currentLang === 'ru' ? 'Добрый вечер' : 'Good evening';
            
            const greetings = currentLang === 'ru' 
                ? [`${timeMsg}, ${user.username} 👋`, `С возвращением, ${user.username}! ⭐`, `${timeMsg}, чемпион! 🏆`]
                : [`${timeMsg}, ${user.username} 👋`, `Welcome back, ${user.username}! ⭐`, `${timeMsg}, champion! 🏆`];
            appleGreeting.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
            appleSubgreeting.innerHTML = t('welcome_sub_user');
        } else {
            const guestGreetings = currentLang === 'ru'
                ? ['Приветствую, искатель приключений! 👋', 'Добро пожаловать в Bike Trails 🚴‍♂️', 'Здравствуйте, райдер! 🌟']
                : ['Greetings, adventurer! 👋', 'Welcome to Bike Trails 🚴‍♂️', 'Hello, rider! 🌟'];
            appleGreeting.innerHTML = guestGreetings[Math.floor(Math.random() * guestGreetings.length)];
            appleSubgreeting.innerHTML = t('welcome_sub_guest');
        }
    }
    
    // Обновляем карточки маршрутов
    if (typeof window.refreshTrailsLanguage === 'function') {
        window.refreshTrailsLanguage();
    }
    
    // Обновляем модальное окно (если видимо)
    updateModalTexts();
    
    // Обновляем приветственное модальное окно
    updateWelcomeModalTexts();
    
    // Обновляем кнопки в меню (они обновятся при следующем открытии)
    updateMenuTexts();
}

function updateModalTexts() {
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const switchMode = document.getElementById('switchMode');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (!modalTitle) return;
    
    const isLogin = modalTitle.innerText === 'Вход' || modalTitle.innerText === 'Login';
    
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

function updateWelcomeModalTexts() {
    const welcomeTitle = document.querySelector('#welcomeModal h2');
    const welcomeText = document.querySelector('#welcomeModal p');
    const welcomeBtn = document.querySelector('#welcomeModal .welcome-btn');
    const welcomeFeatures = document.querySelectorAll('#welcomeModal .feature');
    
    if (welcomeTitle) welcomeTitle.innerHTML = t('welcome_modal_title');
    if (welcomeText) welcomeText.innerHTML = t('welcome_modal_text');
    if (welcomeBtn) welcomeBtn.innerHTML = t('welcome_btn');
    
    const features = t('welcome_features');
    if (welcomeFeatures.length === features.length) {
        welcomeFeatures.forEach((el, idx) => {
            el.innerHTML = features[idx];
        });
    }
}

function updateMenuTexts() {
    const menuItems = document.querySelectorAll('.dropdown-content a');
    menuItems.forEach(item => {
        const text = item.innerText;
        if (text.includes('Личный кабинет') || text.includes('Profile')) {
            item.innerHTML = t('menu_cabinet');
        } else if (text.includes('Избранное') || text.includes('Favorites')) {
            item.innerHTML = t('menu_favorites');
        } else if (text.includes('Помощь') || text.includes('Help')) {
            item.innerHTML = t('menu_help');
        } else if (text.includes('Premium')) {
            // Premium остаётся
        } else if (text.includes('Выйти') || text.includes('Logout')) {
            item.innerHTML = t('menu_logout');
        } else if (text.includes('Сменить тему') || text.includes('Change theme')) {
            const isLight = document.body.classList.contains('light-theme');
            item.innerHTML = currentLang === 'ru' 
                ? (isLight ? '🌙 Тёмная тема' : '☀️ Сменить тему')
                : (isLight ? '🌙 Dark theme' : '☀️ Change theme');
        } else if (text.includes('English') || text.includes('Русский')) {
            item.innerHTML = t('menu_lang');
        }
    });
}

// ========== СМЕНА ЯЗЫКА ==========

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateAllTexts();
    
    // Обновляем кнопку языка в меню
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = t('menu_lang');
    }
    
    // Обновляем кнопку темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = currentLang === 'ru' 
            ? (isLight ? '🌙 Тёмная тема' : '☀️ Сменить тему')
            : (isLight ? '🌙 Dark theme' : '☀️ Change theme');
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    changeLanguage(newLang);
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    currentLang = localStorage.getItem('language') || 'ru';
    updateAllTexts();
    
    setTimeout(() => {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            const newLangToggle = langToggle.cloneNode(true);
            langToggle.parentNode.replaceChild(newLangToggle, langToggle);
            newLangToggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }, 500);
});

// Экспорт
window.t = t;
window.tTrail = tTrail;
window.changeLanguage = changeLanguage;
window.toggleLanguage = toggleLanguage;
window.updateAllTexts = updateAllTexts;
window.currentLang = currentLang;
