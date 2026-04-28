// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

// ========== ПРЕМИУМ ФУНКЦИИ ==========
function isPremium() {
    const expiry = localStorage.getItem('bike_trails_premium_expiry');
    if (!expiry) return false;
    const expiryDate = new Date(expiry);
    const now = new Date();
    return expiryDate > now;
}

function getPremiumBadge() {
    if (isPremium()) {
        return '<span class="premium-gold-badge">💎</span>';
    }
    return '';
}

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
        let isPremiumValid = false;
        if (user.premiumExpiry) {
            const expiryDate = new Date(user.premiumExpiry);
            const now = new Date();
            if (expiryDate > now) {
                isPremiumValid = true;
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
    return { success: false, error: 'Неверное имя или пароль' };
}

function logout() {
    setCurrentUser(null);
    location.reload();
}

// ========== ИЗБРАННОЕ ==========
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

// ========== ОБНОВЛЕНИЕ ШАПКИ (С ШЕСТЕРЁНКОЙ) ==========
function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        const premiumBadge = getPremiumBadge();
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}${premiumBadge}</span>
                <div class="dropdown">
                    <button class="dropdown-btn" id="dropdownBtn">⚙️</button>
                    <div class="dropdown-content" id="dropdownContent">
                        <a href="cabinet.html">👨‍💼 Личный кабинет</a>
                        <a href="favorites.html">❤️ Избранное</a>
                        <a href="planner.html">📅 Планировщик</a>
                        <a href="map.html">🗺️ Карта маршрутов</a>
                        <a href="weather.html">🌤️ Прогноз погоды</a>
                        <a href="help.html">🆘 Помощь</a>
                        <a href="premium.html">💎 Premium</a>
                        <a href="download.html">📱 Скачать приложение</a>
                        <a href="#" id="logoutDropdown">🚪 Выйти</a>
                    </div>
                </div>
            </div>
        `;
        
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
        
        window.addEventListener('click', () => {
            dropdownContent?.classList.remove('show');
        });
    } else {
        container.innerHTML = `<button class="btn-login" id="openLoginBtn">🔑 Вход</button>`;
        
        const loginBtn = document.getElementById('openLoginBtn');
        const modal = document.getElementById('authModal');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (modal) modal.style.display = 'flex';
            });
        }
    }
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function initModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    
    document.getElementById('closeModal')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    let isLoginMode = false;
    const title = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const switchBtn = document.getElementById('switchMode');
    const errorDiv = document.getElementById('errorMessage');
    
    switchBtn?.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        title.innerText = isLoginMode ? 'Вход' : 'Регистрация';
        submitBtn.innerText = isLoginMode ? 'Войти' : 'Зарегистрироваться';
        switchBtn.innerHTML = isLoginMode 
            ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
            : 'Уже есть аккаунт? <span>Войти</span>';
        errorDiv.innerText = '';
    });
    
    submitBtn?.addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            errorDiv.innerText = 'Заполните все поля';
            return;
        }
        
        const result = isLoginMode ? login(username, password) : register(username, password);
        
        if (result.success) {
            modal.style.display = 'none';
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

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initModal();
});
