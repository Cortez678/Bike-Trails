// ========== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

// ========== ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА ==========
function toggleLanguage() {
    const currentLang = localStorage.getItem('language') || 'ru';
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('language', newLang);
    location.reload(); // Просто перезагружаем страницу
}

// ========== НАВЕШИВАЕМ ОБРАБОТЧИКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Ждём появления кнопок в DOM
    setTimeout(function() {
        const themeBtn = document.getElementById('themeToggle');
        const langBtn = document.getElementById('langToggle');
        
        if (themeBtn) {
            themeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleTheme();
                // Обновляем текст кнопки
                const isLight = document.body.classList.contains('light-theme');
                const currentLang = localStorage.getItem('language') || 'ru';
                themeBtn.innerHTML = isLight 
                    ? (currentLang === 'ru' ? '🌙 Тёмная тема' : '🌙 Dark theme')
                    : (currentLang === 'ru' ? '☀️ Светлая тема' : '☀️ Light theme');
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
