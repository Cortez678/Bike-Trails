// Единый ключ для хранения
const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

// Проверка премиум-статуса
function isPremium() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    console.log('[Premium] Проверка: expiry =', expiry);
    
    if (!expiry) return false;
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    const isActive = expiryDate > now;
    
    console.log('[Premium] Активна?', isActive);
    
    if (!isActive) {
        localStorage.removeItem(PREMIUM_EXPIRY_KEY);
    }
    
    return isActive;
}

// Активация премиум (на определенное количество дней)
function activatePremium(days) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
    console.log('[Premium] Активирована до:', expiryDate);
    return true;
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

// Деактивация
function deactivatePremium() {
    localStorage.removeItem(PREMIUM_EXPIRY_KEY);
    console.log('[Premium] Деактивирована');
}

console.log('[Premium] premium.js загружен');
