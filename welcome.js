// ========== УПРАВЛЕНИЕ ЗАСТАВКОЙ ==========

document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    
    // Проверяем, показывали ли уже заставку при первом запуске
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    
    if (!hasSeenSplash && splashScreen) {
        // Первый запуск — показываем заставку 2.5 секунды
        setTimeout(function() {
            splashScreen.classList.add('fade-out');
            // Запоминаем, что заставку уже показывали
            localStorage.setItem('hasSeenSplash', 'true');
        }, 2500);
    } else if (splashScreen) {
        // При повторном запуске сразу скрываем заставку
        splashScreen.style.display = 'none';
    }
});

// ========== APPLE-ПРИВЕТСТВИЕ ==========

// Функция для получения текущего пользователя
function getCurrentUserApple() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}

// Обновление приветствия в стиле Apple
function updateAppleGreeting() {
    const user = getCurrentUserApple();
    const hour = new Date().getHours();
    
    let timeMsg = '';
    if (hour < 12) timeMsg = 'Доброе утро';
    else if (hour < 18) timeMsg = 'Добрый день';
    else timeMsg = 'Добрый вечер';

    const greetingEl = document.getElementById('appleGreeting');
    const subEl = document.getElementById('appleSubgreeting');
    
    if (!greetingEl) return;

    if (user) {
        const appleGreetings = [
            `${timeMsg}, ${user.username} 👋`,
            `С возвращением, ${user.username}! ⭐`,
            `${timeMsg}, чемпион! 🏆`,
            `Рады видеть вас, ${user.username} 🚴‍♂️`
        ];
        const randomGreeting = appleGreetings[Math.floor(Math.random() * appleGreetings.length)];
        greetingEl.innerHTML = randomGreeting;
        subEl.innerHTML
