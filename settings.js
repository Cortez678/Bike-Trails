// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
}

// ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
let currentLang = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Обновляем кнопку языка
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.innerHTML = currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский';
    }
    
    // Обновляем все тексты
    updateAllTexts();
    
    // Обновляем меню настроек
    updateSettingsMenuTexts();
}

function toggleLanguage() {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
}

// Обновление текстов в меню настроек
function updateSettingsMenuTexts() {
    const themeText = document.querySelector('#themeToggle span:not(#themeIcon)');
    if (themeText) {
        themeText.textContent = currentLang === 'ru' ? 'Сменить тему' : 'Change theme';
    }
    
    const langText = document.querySelector('#langToggle span:not(#langIcon)');
    if (langText) {
        langText.textContent = currentLang === 'ru' ? 'Сменить язык' : 'Change language';
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    setLanguage(currentLang);
    
    // Обработчики кнопок
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});
