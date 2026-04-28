// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

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
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

function logout() {
    setCurrentUser(null);
    location.reload();
}

function isPremium() {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.isPremium) return true;
    const users = getUsers();
    const fullUser = users.find(u => u.id === user.id);
    if (fullUser && fullUser.premiumExpiry) {
        const expiryDate = new Date(fullUser.premiumExpiry);
        const now = new Date();
        if (expiryDate > now) return true;
    }
    return false;
}

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

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ==========
function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        const premiumBadge = isPremium() ? '<span style="background:linear-gradient(135deg,#ffd700,#ff9500); color:#1a1a2e; font-size:0.7rem; padding:0.1rem 0.4rem; border-radius:1rem; margin-left:0.3rem;">💎</span>' : '';
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}${premiumBadge}</span>
                <button class="btn-logout" id="logoutBtn">🚪 Выйти</button>
            </div>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', logout);
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
    
    // Закрытие
    document.getElementById('closeModal')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    let isLoginMode = false; // По умолчанию регистрация
    const title = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    const switchBtn = document.getElementById('switchMode');
    const errorDiv = document.getElementById('errorMessage');
    
    // Переключение режима
    switchBtn?.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        title.innerText = isLoginMode ? 'Вход' : 'Регистрация';
        submitBtn.innerText = isLoginMode ? 'Войти' : 'Зарегистрироваться';
        switchBtn.innerHTML = isLoginMode 
            ? 'Нет аккаунта? <span>Зарегистрироваться</span>' 
            : 'Уже есть аккаунт? <span>Войти</span>';
        errorDiv.innerText = '';
    });
    
    // Отправка формы
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
