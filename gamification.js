// ========== ДОСТИЖЕНИЯ (АЧИВКИ) ==========
const achievements = [
    {
        id: "first_favorite",
        name: "🌟 Первый маршрут",
        description: "Добавьте первый маршрут в избранное",
        icon: "🌟",
        xpReward: 10
    },
    {
        id: "favorite_collector",
        name: "📚 Коллекционер",
        description: "Добавьте 5 маршрутов в избранное",
        icon: "📚",
        xpReward: 25
    },
    {
        id: "favorite_master",
        name: "🏆 Мастер избранного",
        description: "Добавьте 10 маршрутов в избранное",
        icon: "🏆",
        xpReward: 50
    },
    {
        id: "first_route",
        name: "🗺️ Первый маршрут",
        description: "Постройте маршрут (нажмите 'Построить маршрут')",
        icon: "🗺️",
        xpReward: 25
    },
    {
        id: "route_master",
        name: "🚴‍♂️ Исследователь",
        description: "Постройте 5 разных маршрутов",
        icon: "🚴‍♂️",
        xpReward: 100
    },
    {
        id: "daily_streak_3",
        name: "⚡ 3 дня подряд",
        description: "Заходите в приложение 3 дня подряд",
        icon: "⚡",
        xpReward: 30
    },
    {
        id: "daily_streak_7",
        name: "🔥 Неделя активности",
        description: "Заходите в приложение 7 дней подряд",
        icon: "🔥",
        xpReward: 70
    },
    {
        id: "premium_user",
        name: "💎 Премиум райдер",
        description: "Оформите премиум-подписку",
        icon: "💎",
        xpReward: 100
    },
    {
        id: "all_routes",
        name: "🌍 Покоритель России",
        description: "Посмотрите все 6 маршрутов",
        icon: "🌍",
        xpReward: 150
    }
];

// Уровни и требуемый XP
const levels = [
    { level: 1, name: "🚲 Новичок", xpRequired: 0 },
    { level: 2, name: "🚲🚲 Любознательный", xpRequired: 100 },
    { level: 3, name: "🚲🚲🚲 Опытный", xpRequired: 300 },
    { level: 4, name: "🚴‍♂️ Профи", xpRequired: 600 },
    { level: 5, name: "🚴‍♂️🚴‍♂️ Мастер", xpRequired: 1000 },
    { level: 6, name: "🚴‍♂️🚴‍♂️🚴‍♂️ Эксперт", xpRequired: 1500 },
    { level: 7, name: "🏆 Легенда", xpRequired: 2200 },
    { level: 8, name: "👑 Король дорог", xpRequired: 3000 }
];

// Ключи для localStorage
const USER_XP_KEY = 'bike_trails_user_xp';
const USER_ACHIEVEMENTS_KEY = 'bike_trails_achievements';
const USER_FAVORITES_COUNT_KEY = 'bike_trails_favorites_count';
const USER_ROUTES_BUILT_KEY = 'bike_trails_routes_built';
const USER_LAST_LOGIN_KEY = 'bike_trails_last_login';
const USER_DAILY_STREAK_KEY = 'bike_trails_daily_streak';

// Получение XP пользователя
function getUserXP(userId) {
    const key = `${USER_XP_KEY}_${userId}`;
    return parseInt(localStorage.getItem(key)) || 0;
}

// Сохранение XP пользователя
function saveUserXP(userId, xp) {
    const key = `${USER_XP_KEY}_${userId}`;
    localStorage.setItem(key, xp);
    return xp;
}

// Добавление XP с проверкой уровня
function addXP(userId, amount, action) {
    let currentXP = getUserXP(userId);
    let newXP = currentXP + amount;
    saveUserXP(userId, newXP);
    
    // Получаем текущий и новый уровень
    const currentLevel = getUserLevel(currentXP);
    const newLevel = getUserLevel(newXP);
    
    // Если уровень повысился
    if (newLevel.level > currentLevel.level) {
        showLevelUpNotification(newLevel, currentLevel);
    }
    
    // Сохраняем действие в историю
    addXPHistory(userId, amount, action, newXP);
    
    return { newXP, levelUp: newLevel.level > currentLevel.level, newLevel };
}

// Получение уровня по XP
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

// Прогресс к следующему уровню (в процентах)
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

// ========== ДОСТИЖЕНИЯ ==========

// Получение достижений пользователя
function getUserAchievements(userId) {
    const key = `${USER_ACHIEVEMENTS_KEY}_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Сохранение достижений
function saveUserAchievements(userId, achievements) {
    const key = `${USER_ACHIEVEMENTS_KEY}_${userId}`;
    localStorage.setItem(key, JSON.stringify(achievements));
}

// Добавление достижения
function unlockAchievement(userId, achievementId) {
    const userAchievements = getUserAchievements(userId);
    
    if (userAchievements.includes(achievementId)) {
        return false;
    }
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return false;
    
    userAchievements.push(achievementId);
    saveUserAchievements(userId, userAchievements);
    
    // Добавляем XP за достижение
    addXP(userId, achievement.xpReward, `Достижение: ${achievement.name}`);
    
    // Показываем уведомление
    showAchievementNotification(achievement);
    
    return true;
}

// Проверка условий для достижений
function checkAchievements(userId, userData) {
    const favoritesCount = userData.favoritesCount || 0;
    const routesBuilt = userData.routesBuilt || 0;
    const isPremium = userData.isPremium || false;
    const viewedRoutes = userData.viewedRoutes || [];
    
    // Первый избранный маршрут
    if (favoritesCount >= 1) {
        unlockAchievement(userId, "first_favorite");
    }
    
    // Коллекционер (5 избранных)
    if (favoritesCount >= 5) {
        unlockAchievement(userId, "favorite_collector");
    }
    
    // Мастер избранного (10 избранных)
    if (favoritesCount >= 10) {
        unlockAchievement(userId, "favorite_master");
    }
    
    // Первый построенный маршрут
    if (routesBuilt >= 1) {
        unlockAchievement(userId, "first_route");
    }
    
    // Исследователь (5 маршрутов)
    if (routesBuilt >= 5) {
        unlockAchievement(userId, "route_master");
    }
    
    // Все маршруты просмотрены
    if (viewedRoutes.length >= 6) {
        unlockAchievement(userId, "all_routes");
    }
    
    // Премиум пользователь
    if (isPremium) {
        unlockAchievement(userId, "premium_user");
    }
}

// ========== ИСТОРИЯ XP ==========

function addXPHistory(userId, amount, action, newTotal) {
    const key = `xp_history_${userId}`;
    const history = JSON.parse(localStorage.getItem(key)) || [];
    history.unshift({
        date: new Date().toISOString(),
        amount: amount,
        action: action,
        total: newTotal
    });
    // Сохраняем только последние 50 записей
    if (history.length > 50) history.pop();
    localStorage.setItem(key, JSON.stringify(history));
}

function getXPHistory(userId) {
    const key = `xp_history_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// ========== ЕЖЕДНЕВНЫЙ БОНУС ==========

function checkDailyBonus(userId) {
    const today = new Date().toDateString();
    const lastLoginKey = `${USER_LAST_LOGIN_KEY}_${userId}`;
    const streakKey = `${USER_DAILY_STREAK_KEY}_${userId}`;
    
    const lastLogin = localStorage.getItem(lastLoginKey);
    let streak = parseInt(localStorage.getItem(streakKey)) || 0;
    
    if (lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastLogin === yesterdayStr) {
            streak++;
        } else {
            streak = 1;
        }
        
        localStorage.setItem(streakKey, streak);
        localStorage.setItem(lastLoginKey, today);
        
        // Бонусные XP за ежедневный вход
        const dailyBonus = 5 + Math.floor(streak / 3) * 2;
        addXP(userId, dailyBonus, `Ежедневный бонус (день ${streak})`);
        
        // Достижения за стрик
        if (streak >= 3) unlockAchievement(userId, "daily_streak_3");
        if (streak >= 7) unlockAchievement(userId, "daily_streak_7");
        
        return { streak, bonus: dailyBonus };
    }
    return { streak, bonus: 0 };
}

// ========== УВЕДОМЛЕНИЯ ==========

function showAchievementNotification(achievement) {
    // Создаём HTML уведомление
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
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function showLevelUpNotification(newLevel, oldLevel) {
    const notification = document.createElement('div');
    notification.className = 'levelup-notification';
    notification.innerHTML = `
        <div class="levelup-icon">🎉</div>
        <div class="levelup-text">
            <strong>Новый уровень!</strong>
            <span>${oldLevel.name} → ${newLevel.name}</span>
            <small>Продолжайте в том же духе!</small>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ========== СТАТИСТИКА ПОЛЬЗОВАТЕЛЯ ==========

function getUserStats(userId) {
    const key = `user_stats_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || {
        favoritesCount: 0,
        routesBuilt: 0,
        viewedRoutes: [],
        ratingsGiven: 0,
        reviewsWritten: 0
    };
}

function updateUserStats(userId, updates) {
    const stats = getUserStats(userId);
    Object.assign(stats, updates);
    localStorage.setItem(`user_stats_${userId}`, JSON.stringify(stats));
    return stats;
}

// ========== ОБЩИЕ ФУНКЦИИ ==========

function addFavoriteXP(userId) {
    const stats = getUserStats(userId);
    stats.favoritesCount++;
    updateUserStats(userId, stats);
    addXP(userId, 10, 'Добавлен маршрут в избранное');
    checkAchievements(userId, stats);
}

function addRouteBuiltXP(userId, routeId) {
    const stats = getUserStats(userId);
    if (!stats.routesBuilt) stats.routesBuilt = 0;
    stats.routesBuilt++;
    if (!stats.viewedRoutes.includes(routeId)) {
        stats.viewedRoutes.push(routeId);
    }
    updateUserStats(userId, stats);
    addXP(userId, 25, 'Построен маршрут');
    checkAchievements(userId, stats);
}

function addRatingXP(userId) {
    const stats = getUserStats(userId);
    stats.ratingsGiven = (stats.ratingsGiven || 0) + 1;
    updateUserStats(userId, stats);
    addXP(userId, 15, 'Оценён маршрут');
}

function addReviewXP(userId) {
    const stats = getUserStats(userId);
    stats.reviewsWritten = (stats.reviewsWritten || 0) + 1;
    updateUserStats(userId, stats);
    addXP(userId, 30, 'Написан отзыв');
}
