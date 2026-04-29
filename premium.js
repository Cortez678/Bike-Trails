<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Премиум | Bike Trails</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        .premium-page {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }
        .premium-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .premium-header h1 {
            font-size: 2.5rem;
            color: #ffd700;
            margin-bottom: 0.5rem;
        }
        .premium-header p {
            color: #9aaec5;
        }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .pricing-card {
            background: rgba(20, 30, 45, 0.7);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            padding: 2rem;
            text-align: center;
            transition: transform 0.3s;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .pricing-card:hover {
            transform: translateY(-10px);
        }
        .pricing-card.popular {
            border: 2px solid #ffd700;
            position: relative;
        }
        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffd700;
            color: #1a1a2e;
            padding: 0.3rem 1rem;
            border-radius: 2rem;
            font-size: 0.8rem;
            font-weight: bold;
        }
        .pricing-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .price {
            font-size: 2.5rem;
            font-weight: 800;
            color: #ffd700;
            margin: 1rem 0;
        }
        .price span {
            font-size: 0.9rem;
            color: #8a9bb5;
        }
        .pricing-card ul {
            list-style: none;
            text-align: left;
            margin: 1.5rem 0;
        }
        .pricing-card li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .pricing-card li::before {
            content: "✅";
            color: #4cd964;
        }
        .premium-btn {
            background: linear-gradient(135deg, #ffd700, #ff9500);
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 2rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
            color: #1a1a2e;
        }
        .premium-btn:hover {
            transform: scale(1.02);
        }
        .premium-active {
            background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,149,0,0.1));
            border: 2px solid #ffd700;
            border-radius: 1rem;
            padding: 1rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        .premium-inactive {
            background: rgba(255,255,255,0.03);
            border-radius: 1rem;
            padding: 1rem;
            text-align: center;
            margin-bottom: 2rem;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 1rem;
            color: #4a90e2;
            text-decoration: none;
        }
        .back-link:hover {
            color: #7b3fe4;
        }
        
        /* Светлая тема */
        body.light-theme .pricing-card {
            background: rgba(255,255,255,0.9);
            border: 1px solid rgba(0,0,0,0.1);
        }
        body.light-theme .pricing-card li {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="premium-page">
            <div class="premium-header">
                <a href="index.html" class="back-link">← На главную</a>
                <h1>💎 Premium Bike Trails</h1>
                <p>Получи максимум от велопутешествий с премиум-подпиской</p>
            </div>

            <div id="subscriptionStatus"></div>

            <div class="pricing-grid">
                <!-- Бесплатно -->
                <div class="pricing-card">
                    <h3>🆓 Бесплатно</h3>
                    <div class="price">0 ₽</div>
                    <ul>
                        <li>6 маршрутов по России</li>
                        <li>Избранное и помощь</li>
                        <li>Базовые карты</li>
                    </ul>
                    <button class="premium-btn" disabled style="opacity:0.5; cursor:default;">Текущий план</button>
                </div>

                <!-- Месяц -->
                <div class="pricing-card popular">
                    <div class="popular-badge">🔥 Популярный</div>
                    <h3>📅 Месяц</h3>
                    <div class="price">299 ₽<span>/мес</span></div>
                    <ul>
                        <li>15+ эксклюзивных маршрутов</li>
                        <li>Детальные карты с офлайн-доступом</li>
                        <li>Приоритетные ответы в помощи</li>
                        <li>Без рекламы</li>
                    </ul>
                    <button class="premium-btn" id="monthlyBtn">Оформить за 299 ₽</button>
                </div>

                <!-- Год -->
                <div class="pricing-card">
                    <h3>🌟 Год</h3>
                    <div class="price">2 990 ₽<span>/год</span></div>
                    <div style="color:#4cd964; font-size:0.8rem;">экономия 2 месяца</div>
                    <ul>
                        <li>Все возможности месячного плана</li>
                        <li>🎁 Доступ к закрытым соревнованиям</li>
                        <li>🆘 Приоритетная поддержка 24/7</li>
                        <li>📊 Расширенная статистика поездок</li>
                    </ul>
                    <button class="premium-btn" id="yearlyBtn">Оформить за 2 990 ₽</button>
                </div>
            </div>

            <div class="premium-features" style="text-align:center; margin-top:2rem;">
                <h3>Что вы получите с премиум-подпиской</h3>
                <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:1.5rem; margin-top:1.5rem;">
                    <div style="background:rgba(255,215,0,0.1); border-radius:1rem; padding:1rem;">
                        <div style="font-size:2rem;">🗺️</div>
                        <h4>Детальные карты</h4>
                        <p style="color:#8a9bb5;">Спутниковые снимки, рельеф местности</p>
                    </div>
                    <div style="background:rgba(255,215,0,0.1); border-radius:1rem; padding:1rem;">
                        <div style="font-size:2rem;">⭐</div>
                        <h4>Эксклюзивные маршруты</h4>
                        <p style="color:#8a9bb5;">Секретные тропы и скрытые жемчужины</p>
                    </div>
                    <div style="background:rgba(255,215,0,0.1); border-radius:1rem; padding:1rem;">
                        <div style="font-size:2rem;">🚀</div>
                        <h4>Приоритетная помощь</h4>
                        <p style="color:#8a9bb5;">Ваши вопросы обрабатываются в первую очередь</p>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>© 2025 Bike Trails — веломаршруты по России</p>
        </footer>
    </div>

    <script src="theme.js"></script>
    <script>
        // Ключи для хранения
        const PREMIUM_KEY = 'bike_trails_premium';
        const PREMIUM_EXPIRY_KEY = 'bike_trails_premium_expiry';

        function isPremium() {
            const expiry = localStorage.getItem(PREMIUM_EXPIRY_KEY);
            if (!expiry) return false;
            const expiryDate = new Date(expiry);
            const now = new Date();
            return expiryDate > now;
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

        function activatePremium(plan) {
            let days = 30;
            let price = 299;
            let planName = 'Месячная';
            
            if (plan === 'yearly') {
                days = 365;
                price = 2990;
                planName = 'Годовая';
            }
            
            if (confirm(`Оформить премиум-подписку ${planName} за ${price} ₽?`)) {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + days);
                localStorage.setItem(PREMIUM_KEY, 'active');
                localStorage.setItem(PREMIUM_EXPIRY_KEY, expiryDate.toISOString());
                
                // Обновляем статус в текущем пользователе
                const user = localStorage.getItem('bike_trails_current_user');
                if (user) {
                    const userData = JSON.parse(user);
                    userData.isPremium = true;
                    userData.premiumExpiry = expiryDate.toISOString();
                    localStorage.setItem('bike_trails_current_user', JSON.stringify(userData));
                }
                
                // Обновляем в массиве пользователей
                const users = JSON.parse(localStorage.getItem('bike_trails_users') || '[]');
                const currentUser = JSON.parse(user || '{}');
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex].isPremium = true;
                    users[userIndex].premiumExpiry = expiryDate.toISOString();
                    localStorage.setItem('bike_trails_users', JSON.stringify(users));
                }
                
                alert('✅ Премиум-подписка активирована! Спасибо за поддержку!');
                location.reload();
            }
        }

        function displaySubscriptionStatus() {
            const container = document.getElementById('subscriptionStatus');
            if (!container) return;
            
            if (isPremium()) {
                const daysLeft = getPremiumDaysLeft();
                container.innerHTML = `
                    <div class="premium-active">
                        💎 <strong>У вас активна премиум-подписка!</strong><br>
                        Осталось дней: ${daysLeft}<br>
                        Спасибо, что поддерживаете проект! 🚴‍♂️
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="premium-inactive">
                        💎 У вас нет активной премиум-подписки<br>
                        Оформите подписку, чтобы получить доступ к эксклюзивным функциям!
                    </div>
                `;
            }
        }

        // Навешиваем обработчики
        document.getElementById('monthlyBtn')?.addEventListener('click', () => activatePremium('monthly'));
        document.getElementById('yearlyBtn')?.addEventListener('click', () => activatePremium('yearly'));
        
        // Показываем статус подписки
        displaySubscriptionStatus();
    </script>
</body>
</html>
