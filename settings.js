// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        alert('🌙 Тёмная тема включена');
    } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        alert('☀️ Светлая тема включена');
    }
}

// ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Обновляем текст на кнопках
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский';
    }
    
    // Обновляем все тексты на странице
    updatePageLanguage();
}

function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
}

function updatePageLanguage() {
    if (currentLang === 'en') {
        // Перевод на английский
        document.querySelector('.hero-badge').innerHTML = '🚵‍♂️ RIDE RUSSIA';
        document.querySelector('.hero-subtitle').innerHTML = 'Best cycling routes in Russia';
        document.querySelector('.section-title').innerHTML = 'Choose your route';
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns[0]) filterBtns[0].innerHTML = 'All routes';
        if (filterBtns[1]) filterBtns[1].innerHTML = '🟢 Easy';
        if (filterBtns[2]) filterBtns[2].innerHTML = '🔵 Medium';
        if (filterBtns[3]) filterBtns[3].innerHTML = '⚫ Hard';
        
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].innerHTML = 'Routes';
        if (statLabels[1]) statLabels[1].innerHTML = 'Regions';
        if (statLabels[2]) statLabels[2].innerHTML = 'Levels';
        
        const footerTitles = document.querySelectorAll('.footer-section h3');
        if (footerTitles[0]) footerTitles[0].innerHTML = '🚴‍♂️ Bike Trails';
        if (footerTitles[1]) footerTitles[1].innerHTML = '📞 Contacts';
        if (footerTitles[2]) footerTitles[2].innerHTML = '📧 Collaboration';
        
        const footerCopyright = document.querySelector('.footer-bottom p');
        if (footerCopyright) footerCopyright.innerHTML = '© 2025 Bike Trails — All routes created with ❤️ for riders';
        
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) loginBtn.innerHTML = '🔑 Login';
        
        // Меню
        const menuItems = document.querySelectorAll('.dropdown-content a');
        menuItems.forEach(item => {
            if (item.innerHTML.includes('Личный кабинет')) item.innerHTML = '👨‍💼 Profile';
            if (item.innerHTML.includes('Избранное')) item.innerHTML = '❤️ Favorites';
            if (item.innerHTML.includes('Помощь')) item.innerHTML = '🆘 Help';
            if (item.innerHTML.includes('Premium')) item.innerHTML = '💎 Premium';
            if (item.innerHTML.includes('Выйти')) item.innerHTML = '🚪 Logout';
            if (item.innerHTML.includes('Сменить тему')) item.innerHTML = '☀️ Change theme';
            if (item.innerHTML.includes('Русский')) item.innerHTML = '🇬🇧 English';
        });
        
    } else {
        // Перевод на русский
        document.querySelector('.hero-badge').innerHTML = '🚵‍♂️ RIDE RUSSIA';
        document.querySelector('.hero-subtitle').innerHTML = 'Лучшие веломаршруты России';
        document.querySelector('.section-title').innerHTML = 'Выбери свой маршрут';
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns[0]) filterBtns[0].innerHTML = 'Все маршруты';
        if (filterBtns[1]) filterBtns[1].innerHTML = '🟢 Лёгкие';
        if (filterBtns[2]) filterBtns[2].innerHTML = '🔵 Средние';
        if (filterBtns[3]) filterBtns[3].innerHTML = '⚫ Сложные';
        
        const statLabels = document.querySelectorAll('.stat-label');
        if (statLabels[0]) statLabels[0].innerHTML = 'Маршрутов';
        if (statLabels[1]) statLabels[1].innerHTML = 'Регионов';
        if (statLabels[2]) statLabels[2].innerHTML = 'Уровня';
        
        const footerTitles = document.querySelectorAll('.footer-section h3');
        if (footerTitles[0]) footerTitles[0].innerHTML = '🚴‍♂️ Bike Trails';
        if (footerTitles[1]) footerTitles[1].innerHTML = '📞 Контакты';
        if (footerTitles[2]) footerTitles[2].innerHTML = '📧 Сотрудничество';
        
        const footerCopyright = document.querySelector('.footer-bottom p');
        if (footerCopyright) footerCopyright.innerHTML = '© 2025 Bike Trails — Все маршруты созданы с ❤️ для райдеров';
        
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) loginBtn.innerHTML = '🔑 Вход';
        
        // Меню
        const menuItems = document.querySelectorAll('.dropdown-content a');
        menuItems.forEach(item => {
            if (item.innerHTML.includes('Profile')) item.innerHTML = '👨‍💼 Личный кабинет';
            if (item.innerHTML.includes('Favorites')) item.innerHTML = '❤️ Избранное';
            if (item.innerHTML.includes('Help')) item.innerHTML = '🆘 Помощь';
            if (item.innerHTML.includes('Premium')) item.innerHTML = '💎 Premium';
            if (item.innerHTML.includes('Logout')) item.innerHTML = '🚪 Выйти';
            if (item.innerHTML.includes('Change theme')) item.innerHTML = '☀️ Сменить тему';
            if (item.innerHTML.includes('English')) item.innerHTML = '🇷🇺 Русский';
        });
    }
    
    // Обновляем приветствие
    if (window.updateAppleGreeting) {
        window.updateAppleGreeting();
    }
}

// ========== НАВЕШИВАЕМ ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Применяем сохранённую тему
    initTheme();
    
    // Применяем сохранённый язык
    setLanguage(currentLang);
    
    // Находим кнопки в меню
    setTimeout(function() {
        const themeBtn = document.getElementById('themeToggle');
        const langBtn = document.getElementById('langToggle');
        
        if (themeBtn) {
            themeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
            });
        }
        
        if (langBtn) {
            langBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }, 500);
});
