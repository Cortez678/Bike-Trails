// Ключи для хранения
const PREMIUM_KEY = 'bike_trails_premium';
const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

// Проверка премиум-статуса
function isPremium() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (!expiry) return false;
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    
    if (expiryDate > now) {
        return true;
    } else {
        // Если срок истёк — удаляем
        localStorage.removeItem(PREMIUM_KEY);
        localStorage.removeItem(PREMIUM_EXPIRY_KEY);
        return false;
    }
}

// Активация премиум-подписки
function activatePremium(plan = 'monthly') {
    let days = 30;
    let price = 299;
    let planName = 'Месячная';
    
    if (plan === 'yearly') {
        days = 365;
        price = 2990;
        planName = 'Годовая';
    }
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    
    localStorage.setItem(PREMIUM_KEY, 'active');
    localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
    
    // Сохраняем информацию об активации
    const activationInfo = {
        plan: plan,
        planName: planName,
        price: price,
        activatedAt: new Date().toISOString(),
        expiresAt: expiryDate.toISOString()
    };
    localStorage.setItem('premium_activation_info', JSON.stringify(activationInfo));
    
    // Обновляем статус в текущем пользователе
    const user = getCurrentUserFromAuth();
    if (user) {
        user.isPremium = true;
        user.premiumExpiry = expiryDate.toISOString();
        localStorage.setItem('bike_trails_current_user', JSON.stringify(user));
        
        // Обновляем в массиве пользователей
        const users = JSON.parse(localStorage.getItem('bike_trails_users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].isPremium = true;
            users[userIndex].premiumExpiry = expiryDate.toISOString();
            localStorage.setItem('bike_trails_users', JSON.stringify(users));
        }
    }
    
    return {
        success: true,
        expiry: expiryDate,
        plan: plan,
        planName: planName,
        days: days
    };
}

// Получить дату окончания подписки
function getPremiumExpiry() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (!expiry) return null;
    return new Date(expiry);
}

// Получить оставшиеся дни
function getPremiumDaysLeft() {
    const expiry = getPremiumExpiry();
    if (!expiry) return 0;
    
    const now = new Date();
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Получить информацию об активации
function getPremiumActivationInfo() {
    const info = localStorage.getItem('premium_activation_info');
    if (!info) return null;
    return JSON.parse(info);
}

// Вспомогательная функция для получения текущего пользователя
function getCurrentUserFromAuth() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}
