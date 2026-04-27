// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

// ========== ТЕМА ==========
function initTheme() {
    const savedTheme = localStorage.getItem('bike_trails_theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('bike_trails_theme', isLight ? 'light' : 'dark');
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
        setCurrentUser({ 
            id: user.id, 
            username: user.username, 
            favorites: user.favorites || [],
            isPremium: user.isPremium || false,
            premiumExpiry: user.premiumExpiry
        });
        return { success: true };
    }
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ==========
function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        const premiumBadge = user.isPremium ? '<span class="premium-badge-mini">💎</span>' : '';
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}${premiumBadge}</span>
                <button class="theme-btn" id="themeBtn">🌓</button>
                <div class="dropdown">
                    <button class="dropdown-btn" id="dropdownBtn">⚙️</button>
                    <div class="dropdown-content" id="dropdownContent">
                        <a href="cabinet.html">👨‍💼 Личный кабинет</a>
                        <a href="favorites.html">❤️ Избранное</a>
                        <a href="help.html">🆘 Помощь</a>
                        <a href="premium.html">💎 Premium</a>
                        <a href="#" id="logoutDropdown">🚪 Выйти</a>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
        
        const dropdownBtn = document.getElementById('dropdownBtn');
        const dropdownContent = document.getElementById('dropdownContent');
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownContent.classList.toggle('show');
            });
        }
        document.getElementById('logoutDropdown')?.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
        window.addEventListener('click', () => {
            dropdownContent?.classList.remove('show');
        });
    } else {
        container.innerHTML = `
            <div class="user-info">
                <button class="theme-btn" id="themeBtn">🌓</button>
                <button class="btn-login" id="openLoginBtn">🔑 Вход</button>
            </div>
        `;
        document.getElementById('themeBtn')?.addEventListener('click', toggleTheme);
        document.getElementById('openLoginBtn')?.addEventListener('click', () => {
            document.getElementById('authModal')?.classList.add('active');
        });
    }
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function initModal() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    
    document.getElementById('closeModal')?.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    let isLoginMode = true;
    const switchBtn = document.getElementById('switchMode');
    const submitBtn = document.getElementById('submitBtn');
    const modalTitle = document.getElementById('modalTitle');
    const errorDiv = document.getElementById('errorMessage');
    
    switchBtn?.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        modalTitle.innerText = isLoginMode ? 'Вход' : 'Регистрация';
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

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateAuthUI();
    initModal();
});
