// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        // Обновляем иконку в меню, если она есть
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = '🌙 <span>Сменить тему</span>';
        }
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.innerHTML = '☀️ <span>Сменить тему</span>';
        }
    }
}

function toggleTheme() {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

// ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Обновляем кнопку языка в меню
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский';
    }
    
    // Обновляем все тексты на странице
    if (typeof updateAllTexts === 'function') {
        updateAllTexts();
    } else {
        console.log('updateAllTexts not found, reloading page');
        location.reload();
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', function() {
    // Применяем тему
    applyTheme(currentTheme);
    
    // Устанавливаем язык
    setLanguage(currentLang);
    
    // Навешиваем обработчики на кнопки (ищем их по ID)
    const themeToggleBtn = document.getElementById('themeToggle');
    const langToggleBtn = document.getElementById('langToggle');
    
    if (themeToggleBtn) {
        // Убираем старые обработчики и добавляем новый
        const newThemeBtn = themeToggleBtn.cloneNode(true);
        themeToggleBtn.parentNode.replaceChild(newThemeBtn, themeToggleBtn);
        newThemeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    if (langToggleBtn) {
        // Убираем старые обработчики и добавляем новый
        const newLangBtn = langToggleBtn.cloneNode(true);
        langToggleBtn.parentNode.replaceChild(newLangBtn, langToggleBtn);
        newLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });
    }
});

// Экспортируем функции в глобальный объект window
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
window.applyTheme = applyTheme;
window.setLanguage = setLanguage;
