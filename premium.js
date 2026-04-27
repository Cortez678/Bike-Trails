// Ключи для хранения
const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

// Проверка премиум-статуса
function isPremium() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    console.log('[Premium] Проверка: expiry =', expiry);
    
    if (!expiry) return false;
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    
    console.log('[Premium] Сейчас:', now);
    console.log('[Premium] Истекает:', expiryDate);
    console.log('[Premium] Активна?', expiryDate > now);
    
    if (expiryDate > now) {
        return true;
    } else {
        localStorage.removeItem(PREMIUM_EXPIRY_KEY);
        return false;
    }
}

// Активация премиум-подписки
function activatePremium(plan = 'monthly') {
    let days = 30;
    if (plan === 'yearly') days = 365;
    
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    
    localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
    
    console.log('[Premium] Активирована до:', expiryDate);
    
    return {
        success: true,
        expiry: expiryDate,
        days: days
    };
}

// Получить оставшиеся дни
function getPremiumDaysLeft() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (!expiry) return 0;
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Сообщаем о загрузке
console.log('[Premium] premium.js загружен');
