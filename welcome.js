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
        // Для авторизованного пользователя
        const appleGreetings = [
            `${timeMsg}, ${user.username} 👋`,
            `С возвращением, ${user.username}! ⭐`,
            `${timeMsg}, чемпион! 🏆`,
            `Рады видеть вас, ${user.username} 🚴‍♂️`
        ];
        const randomGreeting = appleGreetings[Math.floor(Math.random() * appleGreetings.length)];
        greetingEl.innerHTML = randomGreeting;
        subEl.innerHTML = 'Ваши избранные маршруты и персональные рекомендации ждут вас.';
    } else {
        // Для гостя
        const guestGreetings = [
            'Приветствую, искатель приключений! 👋',
            'Добро пожаловать в Bike Trails 🚴‍♂️',
            'Здравствуйте, райдер! 🌟',
            'С возвращением, друг! 🎉'
        ];
        const randomGreeting = guestGreetings[Math.floor(Math.random() * guestGreetings.length)];
        greetingEl.innerHTML = randomGreeting;
        subEl.innerHTML = 'Войдите в аккаунт, чтобы сохранять любимые маршруты и получать персональные рекомендации.';
    }
}

// ========== ЧАСТИЦЫ ДЛЯ ФОНА ==========
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 12 + 6}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);
    }
}

// ========== ПРИВЕТСТВЕННОЕ МОДАЛЬНОЕ ОКНО ==========
function initWelcomeModal() {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeApple');
    
    if (!hasSeenWelcome) {
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.style.display = 'flex';
            localStorage.setItem('hasSeenWelcomeApple', 'true');
        }
    }
    
    const closeBtn = document.getElementById('closeWelcomeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const welcomeModal = document.getElementById('welcomeModal');
            if (welcomeModal) welcomeModal.style.display = 'none';
        });
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    updateAppleGreeting();
    createParticles();
    initWelcomeModal();
});

// Экспортируем функцию для обновления после входа
window.updateAppleGreeting = updateAppleGreeting;
