// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

// Получить всех пользователей
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Сохранить всех пользователей
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Получить текущего пользователя
function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

// Сохранить текущего пользователя
function setCurrentUser(user) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

// Экспорт функции для получения пользователя (для welcome.js)
window.getCurrentUserAuth = function() {
    return getCurrentUser();
};

// ========== РЕГИСТРАЦИЯ, ВХОД, ВЫХОД ==========

// Регистрация нового пользователя
function register(username, password) {
    const users = getUsers();
    
    if (users.find(u => u.username === username)) {
        return { success: false, error: 'Пользователь уже существует' };
    }
    
    if (password.length < 4) {
        return { success: false, error: 'Пароль должен быть не менее 4 символов' };
    }
    
    const newUser = {
        id: Date.now(),
        username: username,
        password: password,
        favorites: [],
        isPremium: false,
        premiumExpiry: null,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true };
}

// Вход пользователя
function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        let isPremiumValid = false;
        if (user.premiumExpiry) {
            const expiryDate = new Date(user.premiumExpiry);
            const now = new Date();
            if (expiryDate > now) {
                isPremiumValid = true;
            } else {
                user.isPremium = false;
                user.premiumExpiry = null;
                const userIndex = users.findIndex(u => u.id === user.id);
                if (userIndex !== -1) {
                    users[userIndex] = user;
                    saveUsers(users);
                }
            }
        }
        
        setCurrentUser({ 
            id: user.id, 
            username: user.username, 
            favorites: user.favorites || [],
            isPremium: isPremiumValid,
            premiumExpiry: user.premiumExpiry
        });
        return { success: true };
    }
    
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

// Выход из аккаунта
function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

// Проверка авторизации для страницы кабинета
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// ========== РАБОТА С ИЗБРАННЫМ ==========

function addToFavorites(userId, trailId) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        if (!users[userIndex].favorites.includes(trailId)) {
            users[userIndex].favorites.push(trailId);
            saveUsers(users);
            
            const current = getCurrentUser();
            if (current && current.id === userId) {
                current.favorites = users[userIndex].favorites;
                setCurrentUser(current);
            }
            return true;
        }
    }
    return false;
}

function removeFromFavorites(userId, trailId) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].favorites = users[userIndex].favorites.filter(id => id !== trailId);
        saveUsers(users);
        
        const current = getCurrentUser();
        if (current && current.id === userId) {
            current.favorites = users[userIndex].favorites;
            setCurrentUser(current);
        }
        return true;
    }
    return false;
}

function isFavorite(userId, trailId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    return user ? user.favorites.includes(trailId) : false;
}

function getUserFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    return user.favorites || [];
}

// ========== ПРЕМИУМ ФУНКЦИИ ==========

function isUserPremium() {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.isPremium) return true;
    
    const users = getUsers();
    const fullUser = users.find(u => u.id === user.id);
    if (fullUser && fullUser.premiumExpiry) {
        const expiryDate = new Date(fullUser.premiumExpiry);
        const now = new Date();
        if (expiryDate > now) {
            return true;
        }
    }
    return false;
}

function activateUserPremium(userId, days = 30) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        
        users[userIndex].isPremium = true;
        users[userIndex].premiumExpiry = expiryDate.toISOString();
        saveUsers(users);
        
        const current = getCurrentUser();
        if (current && current.id === userId) {
            current.isPremium = true;
            current.premiumExpiry = expiryDate.toISOString();
            setCurrentUser(current);
        }
        return true;
    }
    return false;
}

function getPremiumDaysLeft() {
    const user = getCurrentUser();
    if (!user) return 0;
    
    const users = getUsers();
    const fullUser = users.find(u => u.id === user.id);
    if (fullUser && fullUser.premiumExpiry) {
        const expiryDate = new Date(fullUser.premiumExpiry);
        const now = new Date();
        const diffTime = expiryDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    }
    return 0;
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ШАПКИ ==========

function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        const premiumBadge = user.isPremium ? '<span class="premium-badge-mini">💎</span>' : '';
        
        // Определяем текущий язык для текста кнопок в меню
        const currentLang = localStorage.getItem('language') || 'ru';
        
        const menuTexts = {
            cabinet: currentLang === 'ru' ? '👨‍💼 Личный кабинет' : '👨‍💼 Profile',
            favorites: currentLang === 'ru' ? '❤️ Избранное' : '❤️ Favorites',
            help: currentLang === 'ru' ? '🆘 Помощь' : '🆘 Help',
            premium: '💎 Premium',
            theme: currentLang === 'ru' ? '☀️ Сменить тему' : '☀️ Change theme',
            lang: currentLang === 'ru' ? '🇬🇧 English' : '🇷🇺 Русский',
            logout: currentLang === 'ru' ? '🚪 Выйти' : '🚪 Logout'
        };
        
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}${premiumBadge}</span>
                <div class="dropdown">
                    <button class="dropdown-btn" id="dropdownBtn">⚙️</button>
                    <div class="dropdown-content" id="dropdownContent">
                        <a href="cabinet.html">${menuTexts.cabinet}</a>
                        <a href="favorites.html">${menuTexts.favorites}</a>
                        <a href="help.html">${menuTexts.help}</a>
                        <a href="premium.html">${menuTexts.premium}</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" id="themeToggle">${menuTexts.theme}</a>
                        <a href="#" id="langToggle">${menuTexts.lang}</a>
                        <div class="dropdown-divider"></div>
                        <a href="#" id="logoutDropdown">${menuTexts.logout}</a>
                    </div>
                </div>
            </div>
        `;
        
        // Обработчики для выпадающего меню
        const dropdownBtn = document.getElementById('dropdownBtn');
        const dropdownContent = document.getElementById('dropdownContent');
        const logoutDropdown = document.getElementById('logoutDropdown');
        
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
            });
        }
        
        if (logoutDropdown) {
            logoutDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
        
        // Закрытие меню при клике вне
        window.addEventListener('click', () => {
            if (dropdownContent) dropdownContent.classList.remove('show');
        });
        
        // Инициализация кнопок темы и языка
        setTimeout(() => {
            const themeToggle = document.getElementById('themeToggle');
            const langToggle = document.getElementById('langToggle');
            
            if (themeToggle) {
                themeToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof window.toggleTheme === 'function') {
                        window.toggleTheme();
                    } else {
                        // Простое переключение темы
                        if (document.body.classList.contains('light-theme')) {
                            document.body.classList.remove('light-theme');
                            localStorage.setItem('theme', 'dark');
                        } else {
                            document.body.classList.add('light-theme');
                            localStorage.setItem('theme', 'light');
                        }
                        // Обновляем текст кнопки
                        const isLight = document.body.classList.contains('light-theme');
                        const currentLangBtn = localStorage.getItem('language') || 'ru';
                        themeToggle.innerHTML = isLight 
                            ? (currentLangBtn === 'ru' ? '🌙 Тёмная тема' : '🌙 Dark theme')
                            : (currentLangBtn === 'ru' ? '☀️ Светлая тема' : '☀️ Light theme');
                    }
                });
            }
            
            if (langToggle) {
                langToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof window.toggleLanguage === 'function') {
                        window.toggleLanguage();
                    } else {
                        // Простое переключение языка
                        const newLang = localStorage.getItem('language') === 'ru' ? 'en' : 'ru';
                        localStorage.setItem('language', newLang);
                        location.reload();
                    }
                });
            }
        }, 100);
    } else {
        const currentLang = localStorage.getItem('language') || 'ru';
        const loginText = currentLang === 'ru' ? '🔑 Вход' : '🔑 Login';
        container.innerHTML = `<button class="btn-login" id="openLoginBtn">${loginText}</button>`;
        const loginBtn = document.getElementById('openLoginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const modal = document.getElementById('authModal');
                if (modal) modal.classList.add('active');
            });
        }
    }
}

// ========== МОДАЛЬНОЕ ОКНО ВХОДА/РЕГИСТРАЦИИ ==========

function initModal() {
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeModal');
    const switchBtn = document.getElementById('switchMode');
    const submitBtn = document.getElementById('submitBtn');
    const modalTitle = document.getElementById('modalTitle');
    const errorDiv = document.getElementById('errorMessage');
    let isLoginMode = true;

    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    function updateModalTexts() {
        const currentLang = localStorage.getItem('language') || 'ru';
        if (currentLang === 'en') {
            modalTitle.innerText = isLoginMode ? 'Login' : 'Register';
            submitBtn.innerText = isLoginMode ? 'Login' : 'Register';
            switchBtn.innerHTML = isLoginMode 
                ? "Don't have an account? <span>Register</span>" 
                : "Already have an account? <span>Login</span>";
            document.getElementById('username').placeholder = 'Username';
            document.getElementById('password').placeholder = 'Password';
        } else {
            modalTitle.innerText = isLoginMode ? 'Вход' : 'Регистрация';
            submitBtn.innerText = isLoginMode ? 'Войти' : 'Зарегистрироваться';
            switchBtn.innerHTML = isLoginMode 
                ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
                : 'Уже есть аккаунт? <span>Войти</span>';
            document.getElementById('username').placeholder = 'Имя пользователя';
            document.getElementById('password').placeholder = 'Пароль';
        }
    }
    
    if (switchBtn) {
        switchBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            updateModalTexts();
            errorDiv.innerText = '';
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const currentLang = localStorage.getItem('language') || 'ru';
            
            if (!username || !password) {
                errorDiv.innerText = (currentLang === 'en') ? 'Fill in all fields' : 'Заполните все поля';
                return;
            }
            
            const result = isLoginMode ? login(username, password) : register(username, password);
            
            if (result.success) {
                modal.classList.remove('active');
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                errorDiv.innerText = '';
                updateAuthUI();
                
                if (window.updateAppleGreeting) {
                    window.updateAppleGreeting();
                }
                
                const successMsg = (currentLang === 'en') 
                    ? (isLoginMode ? `Welcome back, ${username}!` : `Registration successful! Welcome, ${username}!`)
                    : (isLoginMode ? `Добро пожаловать, ${username}!` : `Регистрация успешна! Добро пожаловать, ${username}!`);
                alert(successMsg);
                location.reload();
            } else {
                errorDiv.innerText = result.error;
            }
        });
    }
    
    updateModalTexts();
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initModal();
});
