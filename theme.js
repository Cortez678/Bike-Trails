// ===== ГЛОБАЛЬНАЯ СИСТЕМА ТЕМ =====
const THEME_KEY = 'bike_trails_theme';

// Получить сохранённую тему
function getSavedTheme() {
    return localStorage.getItem(THEME_KEY);
}

// Применить тему
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Переключить тему
function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
        document.body.classList.add('light-theme');
        localStorage.setItem(THEME_KEY, 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem(THEME_KEY, 'dark');
    }
}

// Инициализация темы при загрузке страницы
function initTheme() {
    const savedTheme = getSavedTheme();
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        // По умолчанию тёмная тема
        document.body.classList.remove('light-theme');
        if (!savedTheme) {
            localStorage.setItem(THEME_KEY, 'dark');
        }
    }
}

// Запускаем при загрузке страницы
initTheme();
