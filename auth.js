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

// ========== РЕГИСТРАЦИЯ, ВХОД, ВЫХОД ==========

// Регистрация нового пользователя
function register(username, password) {
    const users = getUsers();
    
    // Проверка на существование
    if (users.find(u => u.username === username)) {
        return { success: false, error: 'Пользователь уже существует' };
    }
    
    // Проверка длины пароля
    if (password.length < 4) {
        return { success: false, error: 'Пароль должен быть не менее 4 символов' };
    }
    
    // Создаём нового пользователя
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

// Вход пользователя
function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        setCurrentUser({ 
            id: user.id, 
            username: user.username, 
            favorites: user.favorites || [] 
        });
        return { success: true };
    }
    
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

// Выход из аккаунта
function logout() {
    setCurrentUser(null);
    updateAuthUI();
    // Перенаправляем на главную страницу
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

// Добавить маршрут в избранное
function addToFavorites(userId, trailId) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        if (!users[userIndex].favorites.includes(trailId)) {
            users[userIndex].favorites.push(trailId);
            saveUsers(users);
            
            // Обновляем текущего пользователя
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

// Удалить маршрут из избранного
function removeFromFavorites(userId, trailId) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex].favorites = users[userIndex].favorites.filter(id => id !== trailId);
        saveUsers(users);
        
        // Обновляем текущего пользователя
        const current = getCurrentUser();
        if (current && current.id === userId) {
            current.favorites = users[userIndex].favorites;
            setCurrentUser(current);
        }
        return true;
    }
    return false;
}

// Проверить, в избранном ли маршрут
function isFavorite(userId, trailId) {
    const users = getUsers();
    const user = users.find(u => u.id === userId);return user ? user.favorites.includes(trailId) : false;
}

// Получить избранные маршруты текущего пользователя
function getUserFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    return user.favorites || [];
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ШАПКИ ==========

function updateAuthUI() {
    const user = getCurrentUser();
    const container = document.getElementById('authButtons');
    if (!container) return;
    
    if (user) {
        // Пользователь авторизован — показываем имя и кнопки
        container.innerHTML = `
            <div class="user-info">
                <span class="user-name">👤 ${user.username}</span>
                <button class="btn-cabinet" id="cabinetBtn">👨‍💼 Личный кабинет</button>
                <button class="btn-favorites" id="favoritesBtn">❤️ Избранные</button>
                <button class="btn-logout" id="logoutBtn">🚪 Выйти</button>
            </div>
        `;
        
        // Обработчики кнопок
        const cabinetBtn = document.getElementById('cabinetBtn');
        const favoritesBtn = document.getElementById('favoritesBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (cabinetBtn) {
            cabinetBtn.addEventListener('click', () => {
                window.location.href = 'cabinet.html';
            });
        }
        if (favoritesBtn) {
            favoritesBtn.addEventListener('click', () => {
                window.location.href = 'favorites.html';
            });
        }
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }
    } else {
        // Пользователь не авторизован — показываем кнопку входа
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

    // Закрытие по крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    
    // Закрытие по клику вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    // Переключение режима Вход/Регистрация
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

    // Обработка отправки формы
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                errorDiv.innerText = 'Заполните все поля';
                return;
            }
            
            const result = isLoginMode ? login(username, password) : register(username, password);if (result.success) {
                // Закрываем модальное окно
                modal.classList.remove('active');
                
                // Очищаем поля
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                errorDiv.innerText = '';
                
                // Обновляем интерфейс
                updateAuthUI();
                
                // Показываем приветствие
                alert(isLoginMode ? `Добро пожаловать, ${username}!` : `Регистрация успешна! Добро пожаловать, ${username}!`);
                
                // Перезагружаем страницу для синхронизации
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
