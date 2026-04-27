// ========== ПЕРЕВОДЫ ДЛЯ ВСЕГО ПРИЛОЖЕНИЯ ==========
const translations = {
    ru: {
        // Шапка
        logo: "🚴‍♂️ Bike Trails",
        login: "🔑 Вход",
        cabinet: "👨‍💼 Личный кабинет",
        favorites: "❤️ Избранное",
        help: "🆘 Помощь",
        premium: "💎 Premium",
        logout: "🚪 Выйти",
        
        // Hero секция
        heroBadge: "🚵‍♂️ RIDE RUSSIA",
        heroTitle: "Bike ",
        heroTitleGradient: "Trails",
        heroSubtitle: "Лучшие веломаршруты России",
        statsRoutes: "Маршрутов",
        statsRegions: "Регионов",
        statsLevels: "Уровня",
        
        // Фильтры
        selectRoute: "Выбери свой маршрут",
        allRoutes: "Все маршруты",
        easy: "🟢 Лёгкие",
        medium: "🔵 Средние",
        hard: "⚫ Сложные",
        
        // Карточки маршрутов
        km: "км",
        elevation: "м",
        
        // Модальное окно
        loginTitle: "Вход",
        registerTitle: "Регистрация",
        username: "Имя пользователя",
        password: "Пароль",
        loginBtn: "Войти",
        registerBtn: "Зарегистрироваться",
        noAccount: "Нет аккаунта? ",
        hasAccount: "Уже есть аккаунт? ",
        registerLink: "Зарегистрироваться",
        loginLink: "Войти",
        
        // Футер
        contacts: "📞 Контакты",
        cooperation: "📧 Сотрудничество",
        cooperationText: "По вопросам сотрудничества\nпишите в Telegram",
        copyright: "© 2025 Bike Trails — Все маршруты созданы с ❤️ для райдеров",
        
        // Уведомления
        welcome: "Добро пожаловать, ",
        registerSuccess: "Регистрация успешна! Добро пожаловать, ",
        fillFields: "Заполните все поля",
        userExists: "Пользователь уже существует",
        passwordShort: "Пароль должен быть не менее 4 символов",
        invalidCredentials: "Неверное имя пользователя или пароль",
        
        // Страница маршрута
        back: "← Назад к маршрутам",
        aboutRoute: "📖 О маршруте",
        features: "📍 Особенности",
        howToGet: "🚗 Как добраться",
        coordinates: "Координаты старта",
        tip: "💡 Совет райдера",
        
        // Трекер скорости
        speedTracker: "📊 Трекер скорости",
        currentSpeed: "⚡ Текущая скорость",
        maxSpeed: "📈 Максимальная скорость",
        minSpeed: "📉 Минимальная скорость",
        avgSpeed: "📊 Средняя скорость",
        timeMoving: "⏱️ Время в движении",
        distance: "📏 Пройденная дистанция",
        resetStats: "🔄 Сбросить статистику",
        saveRide: "💾 Сохранить заезд",
        ridesHistory: "📜 История заездов",
        
        // Помощь
        helpHeader: "🆘 Помощь райдерам",
        helpSubtitle: "Задай вопрос — система автоматически найдёт ответ по ключевым словам",
        autoAnswers: "Автоматические ответы",
        autoAnswersDesc: "Задайте вопрос — наша умная система сама найдёт решение по ключевым словам:",
        askQuestion: "❓ Задать вопрос",
        questionTitle: "Кратко опишите проблему...",
        questionText: "Подробно опишите ситуацию...",
        submitQuestion: "✉️ Отправить вопрос",
        questionsAnswers: "📋 Вопросы и ответы",
        quickTips: "⚡ Быстрые советы на дорогу",
        
        // Быстрые советы
        tip1Title: "Прокол колеса",
        tip1Text: "Всегда имейте с собой запасную камеру, насос и набор заплаток.",
        tip2Title: "Слетела цепь",
        tip2Text: "Установите цепь на маленькую звезду, аккуратно проворачивайте педали.",
        tip3Title: "Проблемы с переключением",
        tip3Text: "Регулировка тросика поможет. Подкручивайте винт на манетке.",
        tip4Title: "Скрип в педалях",
        tip4Text: "Смажьте крепления педалей и каретку.",
        tip5Title: "Уход за велосипедом",
        tip5Text: "Мойте после грязных поездок, смазывайте цепь.",
        tip6Title: "Навигация",
        tip6Text: "Скачивайте офлайн-карты и берите power bank."
    },
    
    en: {
        // Header
        logo: "🚴‍♂️ Bike Trails",
        login: "🔑 Login",
        cabinet: "👨‍💼 Dashboard",
        favorites: "❤️ Favorites",
        help: "🆘 Help",
        premium: "💎 Premium",
        logout: "🚪 Logout",
        
        // Hero section
        heroBadge: "🚵‍♂️ RIDE RUSSIA",
        heroTitle: "Bike ",
        heroTitleGradient: "Trails",
        heroSubtitle: "Best bike trails in Russia",
        statsRoutes: "Routes",
        statsRegions: "Regions",
        statsLevels: "Levels",
        
        // Filters
        selectRoute: "Choose your route",
        allRoutes: "All routes",
        easy: "🟢 Easy",
        medium: "🔵 Medium",
        hard: "⚫ Hard",
        
        // Cards
        km: "km",
        elevation: "m",
        
        // Modal
        loginTitle: "Login",
        registerTitle: "Register",
        username: "Username",
        password: "Password",
        loginBtn: "Login",
        registerBtn: "Register",
        noAccount: "No account? ",
        hasAccount: "Already have an account? ",
        registerLink: "Register",
        loginLink: "Login",
        
        // Footer
        contacts: "📞 Contacts",
        cooperation: "📧 Cooperation",
        cooperationText: "For cooperation\nwrite to Telegram",
        copyright: "© 2025 Bike Trails — All routes made with ❤️ for riders",
        
        // Notifications
        welcome: "Welcome, ",
        registerSuccess: "Registration successful! Welcome, ",
        fillFields: "Please fill all fields",
        userExists: "User already exists",
        passwordShort: "Password must be at least 4 characters",
        invalidCredentials: "Invalid username or password",
        
        // Route page
        back: "← Back to routes",
        aboutRoute: "📖 About the route",
        features: "📍 Features",
        howToGet: "🚗 How to get there",
        coordinates: "Starting coordinates",
        tip: "💡 Rider's tip",
        
        // Speed tracker
        speedTracker: "📊 Speed Tracker",
        currentSpeed: "⚡ Current speed",
        maxSpeed: "📈 Max speed",
        minSpeed: "📉 Min speed",
        avgSpeed: "📊 Average speed",
        timeMoving: "⏱️ Moving time",
        distance: "📏 Distance traveled",
        resetStats: "🔄 Reset stats",
        saveRide: "💾 Save ride",
        ridesHistory: "📜 Ride history",
        
        // Help
        helpHeader: "🆘 Rider Help",
        helpSubtitle: "Ask a question — the system will automatically find an answer by keywords",
        autoAnswers: "🤖 Automatic answers",
        autoAnswersDesc: "Ask a question — our smart system will find a solution by keywords:",
        askQuestion: "❓ Ask a question",
        questionTitle: "Briefly describe the problem...",
        questionText: "Describe the situation in detail...",
        submitQuestion: "✉️ Submit question",
        questionsAnswers: "📋 Questions & Answers",
        quickTips: "⚡ Quick tips on the road",
        
        // Quick tips
        tip1Title: "Flat tire",
        tip1Text: "Always carry a spare tube, pump and patch kit.",
        tip2Title: "Chain fell off",
        tip2Text: "Put the chain on the small sprocket, carefully turn the pedals.",
        tip3Title: "Shifting problems",
        tip3Text: "Adjust the cable by turning the barrel adjuster.",
        tip4Title: "Squeaky pedals",
        tip4Text: "Lubricate pedal mounts and bottom bracket.",
        tip5Title: "Bike maintenance",
        tip5Text: "Wash after dirty rides, lubricate the chain.",
        tip6Title: "Navigation",
        tip6Text: "Download offline maps and take a power bank."
    }
};

// Текущий язык
let currentLang = localStorage.getItem('bike_trails_lang') || 'ru';

// Функция перевода
function t(key) {
    return translations[currentLang][key] || key;
}

// Смена языка
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('bike_trails_lang', lang);
        updateAllTexts();
        location.reload(); // Перезагружаем для обновления динамического контента
    }
}

// Обновление всех текстов на странице
function updateAllTexts() {
    // Элементы с атрибутом data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t(key);
        } else {
            el.innerHTML = t(key);
        }
    });
    
    // Обновляем title страницы
    document.title = t('logo') + ' | ' + t('heroSubtitle');
}

// Получить текущий язык
function getCurrentLang() {
    return currentLang;
}
