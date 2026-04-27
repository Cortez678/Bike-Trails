// Простые функции премиум
function isPremium() {
    const expiry = localStorage.getItem('bike_trails_premium_expiry');
    if (!expiry) return false;
    const expiryDate = new Date(expiry);
    const now = new Date();
    return expiryDate > now;
}

function getPremiumDaysLeft() {
    const expiry = localStorage.getItem('bike_trails_premium_expiry');
    if (!expiry) return 0;
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffDays = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

function activatePremium(days) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    localStorage.setItem('bike_trails_premium_expiry', expiryDate.toISOString());
    return true;
}

console.log('premium.js загружен');
