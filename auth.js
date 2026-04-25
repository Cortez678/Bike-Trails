const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

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
        setCurrentUser({ id: user.id, username: user.username, favorites: user.favorites });
        return { success: true };
    }
    return { success: false, error: 'Неверное имя или пароль' };
}

function logout() {
    setCurrentUser(null);
    location.reload();
}

// Обновляем интерфейс после входа
function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}</span>
                <button class="btn-cabinet" onclick="location.href='cabinet.html'">Личный кабинет</button>
                <button class="btn-logout" id="logoutBtn">Выйти</button>
            </div>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', logout);
    } else {
        container.innerHTML = `<button class="btn-login" id="openLoginBtn">Вход</button>`;
        document.getElementById('openLoginBtn')?.addEventListener('click', () => {
            document.getElementById('authModal').classList.add('active');
        });
    }
}

// Модальное окно
function initModal() {
    const modal = document.getElementById('authModal');
    const closeBtn = document.getElementById('closeModal');
    const switchBtn = document.getElementById('switchMode');
    const submitBtn = document.getElementById('submitBtn');
    const modalTitle = document.getElementById('modalTitle');
    const errorDiv = document.getElementById('errorMessage');
    let isLoginMode = true;

    closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
    modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    
    switchBtn?.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        modalTitle.innerText = isLoginMode ? 'Вход' : 'Регистрация';
        submitBtn.innerText = isLoginMode ? 'Войти' : 'Зарегистрироваться';
        switchBtn.innerHTML = isLoginMode ? 'Нет аккаунта? <span>Зарегистрироваться</span>' : 'Уже есть аккаунт? <span>Войти</span>';
        errorDiv.innerText = '';
    });

    submitBtn?.addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        if (!username || !password) {
            errorDiv.innerText = 'Заполните все поля';
            return;
        }const result = isLoginMode ? login(username, password) : register(username, password);
        if (result.success) {
            modal.classList.remove('active');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            updateAuthUI();
        } else {
            errorDiv.innerText = result.error;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    initModal();
});
