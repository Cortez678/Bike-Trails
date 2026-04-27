// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const USER_XP_KEY = 'bike_trails_user_xp';
const USER_ACHIEVEMENTS_KEY = 'bike_trails_achievements';

// ========== ДОСТИЖЕНИЯ ==========
const achievements = [
    { id: "first_favorite", name: "🌟 Первый маршрут", description: "Добавьте первый маршрут в избранное", icon: "🌟", xpReward: 10 },
    { id: "favorite_collector", name: "📚 Коллекционер", description: "Добавьте 5 маршрутов в избранное", icon: "📚", xpReward: 25 },
    { id: "first_route", name: "🗺️ Первый маршрут", description: "Постройте маршрут", icon: "🗺️", xpReward: 25 },
    { id: "premium_user", name: "💎 Премиум райдер", description: "Оформите премиум-подписку", icon: "💎", xpReward: 100 }
];

// ========== УРОВНИ ==========
const levels = [
    { level: 1, name: "🚲 Новичок", xpRequired: 0 },
    { level: 2, name: "🚲🚲 Любознательный", xpRequired: 100 },
    { level: 3, name: "🚲🚲🚲 Опытный", xpRequired: 300 },
    { level: 4, name: "🚴‍♂️ Профи", xpRequired: 600 },
    { level: 5, name: "👑 Король дорог", xpRequired: 1000 }
];

// Получить XP пользователя
function getUserXP(userId) {
    const key = `${USER_XP_KEY}_${userId}`;
    return parseInt(localStorage.getItem(key)) || 0;
}

// Сохранить XP
function saveUserXP(userId, xp) {
    const key = `${USER_XP_KEY}_${userId}`;
    localStorage.setItem(key, xp);
}

// Добавить XP
function addXP(userId, amount, action) {
    let currentXP = getUserXP(userId);
    let newXP = currentXP + amount;
    saveUserXP(userId, newXP);
    
    const currentLevel = getUserLevel(currentXP);
    const newLevel = getUserLevel(newXP);
    
    if (newLevel.level > currentLevel.level) {
        showLevelUpNotification(newLevel);
    }
    
    addXPHistory(userId, amount, action, newXP);
    return newXP;
}

// Получить уровень по XP
function getUserLevel(xp) {
    let userLevel = levels[0];
    for (let i = levels.length - 1; i >= 0; i--) {
        if (xp >= levels[i].xpRequired) {
            userLevel = levels[i];
            break;
        }
    }
    return userLevel;
}

// XP до следующего уровня
function getXPToNextLevel(xp) {
    const currentLevel = getUserLevel(xp);
    const nextLevel = levels[currentLevel.level];
    if (!nextLevel) return 0;
    return nextLevel.xpRequired - xp;
}

// Прогресс в процентах
function getLevelProgress(xp) {
    const currentLevel = getUserLevel(xp);
    const nextLevel = levels[currentLevel.level];
    if (!nextLevel) return 100;
    const prevRequired = currentLevel.xpRequired;
    const nextRequired = nextLevel.xpRequired;
    const currentXP = xp - prevRequired;
    const neededXP = nextRequired - prevRequired;
    return Math.min(100, Math.floor((currentXP / neededXP) * 100));
}

// Получить достижения пользователя
function getUserAchievements(userId) {
    const key = `${USER_ACHIEVEMENTS_KEY}_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Сохранить достижения
function saveUserAchievements(userId, achievements) {
    const key = `${USER_ACHIEVEMENTS_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(achievements));
}

// Разблокировать достижение
function unlockAchievement(userId, achievementId) {
    const userAchievements = getUserAchievements(userId);
    if (userAchievements.includes(achievementId)) return false;
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return false;
    
    userAchievements.push(achievementId);
    saveUserAchievements(userId, userAchievements);
    addXP(userId, achievement.xpReward, `Достижение: ${achievement.name}`);
    showAchievementNotification(achievement);
    return true;
}

// История XP
function addXPHistory(userId, amount, action, newTotal) {
    const key = `xp_history_${userId}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.unshift({
        date: new Date().toISOString(),
        amount: amount,
        action: action,
        total: newTotal
    });
    if (history.length > 20) history.pop();
    localStorage.setItem(key, JSON.stringify(history));
}

function getXPHistory(userId) {
    const key = `xp_history_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Уведомления
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-text">
            <strong>Достижение разблокировано!</strong>
            <span>${achievement.name}</span>
            <small>+${achievement.xpReward} XP</small>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function showLevelUpNotification(level) {
    const notification = document.createElement('div');
    notification.className = 'levelup-notification';
    notification.innerHTML = `
        <div class="levelup-icon">🎉</div>
        <div class="levelup-text">
            <strong>Новый уровень!</strong>
            <span>${level.name}</span>
            <small>Продолжайте в том же духе!</small>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Подсчёт избранного для достижений
let favoritesCount = JSON.parse(localStorage.getItem('bike_trails_favorites_count') || '{}');

function addFavoriteCount(userId) {
    favoritesCount[userId] = (favoritesCount[userId] || 0) + 1;
    localStorage.setItem('bike_trails_favorites_count', JSON.stringify(favoritesCount));
    
    if (favoritesCount[userId] >= 1) unlockAchievement(userId, "first_favorite");
    if (favoritesCount[userId] >= 5) unlockAchievement(userId, "favorite_collector");
}

function addRouteBuilt(userId, routeId) {
    const key = `routes_built_${userId}`;
    const routes = JSON.parse(localStorage.getItem(key)) || [];
    if (!routes.includes(routeId)) {
        routes.push(routeId);
        localStorage.setItem(key, JSON.stringify(routes));
        addXP(userId, 25, `Построен маршрут "${routeId}"`);
        if (routes.length >= 1) unlockAchievement(userId, "first_route");
    }
}
