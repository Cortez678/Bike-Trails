// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';
const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

// ========== ПРОВЕРКА ПРЕМИУМ-СТАТУСА ==========

function isUserPremium() {
    // Сначала проверяем в localStorage премиум-ключ
    const premiumExpiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (premiumExpiry) {
        const expiryDate = new Date(premiumExpiry);
        if (expiryDate > new Date()) {
            return true;
        } else {
            // Если истёк — удаляем
            localStorage.removeItem(PREMIUM_EXPIRY_KEY);
        }
    }
    
    // Проверяем в данных текущего пользователя
    const user = getCurrentUser();
    if (user && user.isPremium && user.premiumExpiry) {
        const expiryDate = new Date(user.premiumExpiry);
        if (expiryDate > new Date()) {
            return true;
        }
    }
    
    // Проверяем в массиве всех пользователей
    const users = getUsers();
    if (user) {
        const fullUser = users.find(u => u.id === user.id);
        if (fullUser && fullUser.premiumExpiry) {
            const expiryDate = new Date(fullUser.premiumExpiry);
            if (expiryDate > new Date()) {
                return true;
            }
        }
    }
    
    return false;
}

function getPremiumDaysLeft() {
    // Проверяем в localStorage
    const premiumExpiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (premiumExpiry) {
        const expiryDate = new Date(premiumExpiry);
        if (expiryDate > new Date()) {
            const diff = expiryDate - new Date();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
    }
    
    // Проверяем в данных пользователя
    const user = getCurrentUser();
    if (user && user.premiumExpiry) {
        const expiryDate = new Date(user.premiumExpiry);
        if (expiryDate > new Date()) {
            const diff = expiryDate - new Date();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
    }
    
    return 0;
}

// ========== РЕГИСТРАЦИЯ, ВХОД, ВЫХОД ==========

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

function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Проверяем премиум-статус
        let isPremiumValid = false;
        let premiumExpiry = null;
        
        if (user.premiumExpiry) {
            const expiryDate = new Date(user.premiumExpiry);
            if (expiryDate > new Date()) {
                isPremiumValid = true;
                premiumExpiry = user.premiumExpiry;
            }
        }
        
        // Также проверяем глобальный ключ
        const globalExpiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
        if (globalExpiry && new Date(globalExpiry) > new Date()) {
            isPremiumValid = true;
            premiumExpiry = globalExpiry;
        }
        
        setCurrentUser({ 
            id: user.id, 
            username: user.username, 
            favorites: user.favorites || [],
            isPremium: isPremiumValid,
            premiumExpiry: premiumExpiry
        });
        return { success: true };
    }
    
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

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
    
    if (userIndex !== -1 && !users[userIndex].favorites.includes(trailId)) {
        users[userIndex].favorites.push(trailId);
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

function activateUserPremium(userId, days = 30) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        
        users[userIndex].isPremium = true;
        users[userIndex].premiumExpiry = expiryDate.toISOString();
        saveUsers(users);
        
        // Сохраняем глобальный ключ
        localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
        
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

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ШАПКИ ==========

function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        // Проверяем премиум-статус и показываем бриллиантик
        const isPremium = isUserPremium();
        const premiumBadge = isPremium ? '<span class="premium-badge-mini">💎</span>' : '';
        
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}${premiumBadge}</span>
                <div class="dropdown">
                    <button class="dropdown-btn" id="dropdownBtn">⚙️</button>
                    <div class="dropdown-content" id="dropdownContent">
                        <a href="cabinet.html">👨‍💼 Личный кабинет</a>
                        <a href="favorites.html">❤️ Избранное</a>
                        <a href="speed-tracker.html">📊 Трекер скорости</a>
                        <a href="help.html">🆘 Помощь</a>
                        <a href="premium.html">💎 Premium</a>
                        <a href="#" id="themeToggle">🌓 Сменить тему</a>
                        <a href="#" id="logoutDropdown">🚪 Выйти</a>
                    </div>
                </div>
            </div>
        `;
        
        const dropdownBtn = document.getElementById('dropdownBtn');
        const dropdownContent = document.getElementById('dropdownContent');
        const themeToggle = document.getElementById('themeToggle');
        const logoutDropdown = document.getElementById('logoutDropdown');
        
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
            });
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (typeof toggleTheme === 'function') {
                    toggleTheme();
                } else if (typeof window.toggleTheme === 'function') {
                    window.toggleTheme();
                } else {
                    const body = document.body;
                    if (body.classList.contains('light-theme')) {
                        body.classList.remove('light-theme');
                        localStorage.setItem('bike_trails_theme', 'dark');
                    } else {
                        body.classList.add('light-theme');
                        localStorage.setItem('bike_trails_theme', 'light');
                    }
                }
                dropdownContent.classList.remove('show');
            });
        }
        
        if (logoutDropdown) {
            logoutDropdown.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
        
        window.addEventListener('click', () => {
            if (dropdownContent) dropdownContent.classList.remove('show');
        });
    } else {
        container.innerHTML = `<button class="btn-login" id="openLoginBtn">🔑 Вход</button>`;
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
    
    if (switchBtn) {
        switchBtn.addEventListener('click', () => {
            isLoginMode = !isLoginMode;
            modalTitle.innerText = isLoginMode ? 'Вход' : 'Регистрация';
            submitBtn.innerText = isLoginMode ? 'Войти' : 'Зарегистрироваться';
            switchBtn.innerHTML = isLoginMode 
                ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
                : 'Уже есть аккаунт? <span>Войти</span>';
            errorDiv.innerText = '';
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                errorDiv.innerText = 'Заполните все поля';
                return;
            }
            
            const result = isLoginMode ? login(username, password) : register(username, password);
            
            if (result.success) {
                modal.classList.remove('active');
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                errorDiv.innerText = '';
                updateAuthUI();
                alert(isLoginMode ? `Добро пожаловать, ${username}!` : `Регистрация успешна! Добро пожаловать, ${username}!`);
                location.reload();
            } else {
                errorDiv.innerText = result.error;
            }
        });
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initModal();
});
