// Ключ для хранения в localStorage
const USERS_KEY = 'bike_trails_users';
const CURRENT_USER_KEY = 'bike_trails_current_user';

// Получить всех пользователей
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Сохранить пользователей
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Текущий пользователь
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

// Регистрация
function register(username, password) {
    const users = getUsers();
    
    // Проверка на существование
    if (users.find(u => u.username === username)) {
        return { success: false, error: 'Пользователь уже существует' };
    }
    
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

// Вход
function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        setCurrentUser({ id: user.id, username: user.username, favorites: user.favorites });
        return { success: true };
    }
    
    return { success: false, error: 'Неверное имя пользователя или пароль' };
}

// Выход
function logout() {
    setCurrentUser(null);
    window.location.href = 'index.html';
}

// Проверка авторизации на странице кабинета
function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

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
        }
    }
}

// Удалить из избранного
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
    }
}

// Проверить, в избранном ли маршрут
function isFavorite(userId, trailId) {
    const user = getUsers().find(u => u.id === userId);
    return user ? user.favorites.includes(trailId) : false;
}
