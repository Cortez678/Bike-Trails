// Ключи для хранения
const PREMIUM_KEY = 'bike_trails_premium';
const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

function isPremium() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (!expiry) return false;
    const expiryDate = new Date(expiry);
    const now = new Date();
    if (expiryDate > now) {
        return true;
    } else {
        localStorage.removeItem(PREMIUM_KEY);
        localStorage.removeItem(PREMIUM_EXPIRY_KEY);
        return false;
    }
}

function activatePremium(plan = 'monthly') {
    let days = 30;
    if (plan === 'yearly') days = 365;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    localStorage.setItem(PREMIUM_KEY, 'active');
    localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
    return { success: true, expiry: expiryDate, plan: plan };
}

function getPremiumDaysLeft() {
    const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
    if (!expiry) return 0;
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}
