// ========== ДАННЫЕ МАРШРУТОВ (НА ДВУХ ЯЗЫКАХ) ==========
const trailsData = {
    ru: [
        {
            id: 1,
            name: "Воробьёвы горы",
            description: "Легендарный маршрут по Москве-реке с панорамным видом на город. Проходит через парк, набережную и смотровые площадки.",
            difficulty: "easy",
            distance: 15.5,
            elevation: 120,
            rating: 4.8,
            location: "Москва",
            previewImage: "images/vorobyovy-gory-1.jpg"
        },
        {
            id: 2,
            name: "Куршская коса",
            description: "Уникальный маршрут по национальному парку между морем и заливом. Песчаные дюны, сосновый лес и побережье Балтики.",
            difficulty: "medium",
            distance: 22.0,
            elevation: 180,
            rating: 4.9,
            location: "Калининградская область",
            previewImage: "images/kurshskaya-kosa-1.jpg"
        },
        {
            id: 3,
            name: "Лаго-Наки",
            description: "Высокогорный маршрут по альпийским лугам Адыгеи. Горы, водопады и виды, которые захватывают дух.",
            difficulty: "hard",
            distance: 28.5,
            elevation: 850,
            rating: 5.0,
            location: "Адыгея",
            previewImage: ""
        },
        {
            id: 4,
            name: "Алтайский Марс",
            description: "Космические пейзажи Алтая: красные скалы, бирюзовые реки и горные тропы в долине реки Чуя.",
            difficulty: "hard",
            distance: 32.0,
            elevation: 620,
            rating: 4.9,
            location: "Республика Алтай",
            previewImage: ""
        },
        {
            id: 5,
            name: "Байкальская петля",
            description: "Кольцевой маршрут вдоль озера Байкал с заездом в пик Черского и живописные бухты.",
            difficulty: "medium",
            distance: 35.0,
            elevation: 540,
            rating: 4.8,
            location: "Иркутская область / Бурятия",
            previewImage: ""
        },
        {
            id: 6,
            name: "Долина гейзеров",
            description: "Сложнейший маршрут Камчатки. Термальные источники, вулканы, медвежьи тропы и дикая природа.",
            difficulty: "hard",
            distance: 18.0,
            elevation: 950,
            rating: 5.0,
            location: "Камчатский край",
            previewImage: ""
        }
    ],
    en: [
        {
            id: 1,
            name: "Sparrow Hills",
            description: "A legendary route along the Moscow River with panoramic views of the city. Passes through park, embankment and observation decks.",
            difficulty: "easy",
            distance: 15.5,
            elevation: 120,
            rating: 4.8,
            location: "Moscow",
            previewImage: "images/vorobyovy-gory-1.jpg"
        },
        {
            id: 2,
            name: "Curonian Spit",
            description: "A unique route through the national park between the sea and the bay. Sand dunes, pine forest and Baltic coast.",
            difficulty: "medium",
            distance: 22.0,
            elevation: 180,
            rating: 4.9,
            location: "Kaliningrad Region",
            previewImage: "images/kurshskaya-kosa-1.jpg"
        },
        {
            id: 3,
            name: "Lago-Naki",
            description: "A high-mountain route through the alpine meadows of Adygea. Mountains, waterfalls and breathtaking views.",
            difficulty: "hard",
            distance: 28.5,
            elevation: 850,
            rating: 5.0,
            location: "Adygea",
            previewImage: ""
        },
        {
            id: 4,
            name: "Altai Mars",
            description: "Cosmic landscapes of Altai: red cliffs, turquoise rivers and mountain trails in the Chui River valley.",
            difficulty: "hard",
            distance: 32.0,
            elevation: 620,
            rating: 4.9,
            location: "Altai Republic",
            previewImage: ""
        },
        {
            id: 5,
            name: "Baikal Loop",
            description: "A circular route along Lake Baikal with a stop at Chersky Peak and picturesque bays.",
            difficulty: "medium",
            distance: 35.0,
            elevation: 540,
            rating: 4.8,
            location: "Irkutsk Region / Buryatia",
            previewImage: ""
        },
        {
            id: 6,
            name: "Valley of Geysers",
            description: "The most challenging route of Kamchatka. Hot springs, volcanoes, bear trails and wild nature.",
            difficulty: "hard",
            distance: 18.0,
            elevation: 950,
            rating: 5.0,
            location: "Kamchatka Krai",
            previewImage: ""
        }
    ]
};

// Текущий язык
let currentLang = localStorage.getItem('bike_trails_lang') || 'ru';

// Функция получения данных маршрутов на текущем языке
function getTrails() {
    return trailsData[currentLang] || trailsData.ru;
}

// Функция получения цвета сложности
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': 
            return { class: 'difficulty-easy', text: currentLang === 'ru' ? '🟢 Лёгкий' : '🟢 Easy' };
        case 'medium': 
            return { class: 'difficulty-medium', text: currentLang === 'ru' ? '🔵 Средний' : '🔵 Medium' };
        case 'hard': 
            return { class: 'difficulty-hard', text: currentLang === 'ru' ? '⚫ Сложный' : '⚫ Hard' };
        default: 
            return { class: '', text: difficulty };
    }
}

// Функция отображения звёзд рейтинга
function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (hasHalfStar) starsHTML += '½';
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) starsHTML += '☆';
    return `<span class="stars">${starsHTML}</span> <span style="font-size:0.8rem; color:#8a9bb5;">${rating}</span>`;
}

// Функция создания карточки маршрута
function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    const imageStyle = trail.previewImage ? 
        `background-image: url('${trail.previewImage}'); background-size: cover; background-position: center;` : 
        'background: linear-gradient(135deg, #2b2d42, #353b48);';
    
    return `
        <div class="trail-card" data-difficulty="${trail.difficulty}" data-id="${trail.id}">
            <div class="card-image" style="${imageStyle}">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${escapeHtml(trail.name)}</h3>
                <p class="trail-description">${escapeHtml(trail.description)}</p>
                <div class="trail-stats">
                    <span class="stat-item">📏 ${trail.distance} ${currentLang === 'ru' ? 'км' : 'km'}</span>
                    <span class="stat-item">⛰️ ${trail.elevation} ${currentLang === 'ru' ? 'м' : 'm'}</span>
                    <span class="stat-item">📍 ${escapeHtml(trail.location)}</span>
                </div>
                <div class="rating">${getStarsHTML(trail.rating)}</div>
            </div>
        </div>
    `;
}

// Фильтрация маршрутов
function filterTrails(level) {
    const trails = getTrails();
    const filteredTrails = level === 'all' 
        ? trails 
        : trails.filter(trail => trail.difficulty === level);
    const container = document.getElementById('trailsContainer');
    
    if (!container) return;
    
    if (filteredTrails.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:3rem; color:#8a9bb5;">${currentLang === 'ru' ? '🚴 Нет маршрутов с таким уровнем сложности' : '🚴 No routes with this difficulty level'}</div>`;
        return;
    }
    
    container.innerHTML = filteredTrails.map(trail => createTrailCard(trail)).join('');
    
    // Добавляем обработчики кликов на карточки
    document.querySelectorAll('.trail-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.href = `trail-${id}.html`;
        });
    });
}

// Настройка фильтров
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const level = btn.getAttribute('data-level');
            filterTrails(level);
        });
    });
}

// Обновление текстов фильтров при смене языка
function updateFilterTexts() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        const texts = currentLang === 'ru' 
            ? ['Все маршруты', '🟢 Лёгкие', '🔵 Средние', '⚫ Сложные']
            : ['All routes', '🟢 Easy', '🔵 Medium', '⚫ Hard'];
        
        filterBtns.forEach((btn, index) => {
            if (btn.getAttribute('data-level') === 'all') btn.textContent = texts[0];
            if (btn.getAttribute('data-level') === 'easy') btn.textContent = texts[1];
            if (btn.getAttribute('data-level') === 'medium') btn.textContent = texts[2];
            if (btn.getAttribute('data-level') === 'hard') btn.textContent = texts[3];
        });
    }
}

// Обновление всей страницы при смене языка
function refreshPageContent() {
    updateFilterTexts();
    const activeFilter = document.querySelector('.filter-btn.active');
    const currentLevel = activeFilter ? activeFilter.getAttribute('data-level') : 'all';
    filterTrails(currentLevel);
}

// Защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Функция для избранного (из auth.js)
function getCurrentUserForFav() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}

// Добавить в избранное
window.addToFavorites = function(trailId) {
    const user = getCurrentUserForFav();
    if (!user) {
        alert(currentLang === 'ru' ? 'Войдите в аккаунт, чтобы добавить маршрут в избранное' : 'Login to add route to favorites');
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('bike_trails_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1 && !users[userIndex].favorites.includes(trailId)) {
        users[userIndex].favorites.push(trailId);
        localStorage.setItem('bike_trails_users', JSON.stringify(users));
        
        user.favorites = users[userIndex].favorites;
        localStorage.setItem('bike_trails_current_user', JSON.stringify(user));
        
        alert(currentLang === 'ru' ? 'Маршрут добавлен в избранное!' : 'Route added to favorites!');
        return true;
    } else if (users[userIndex]?.favorites.includes(trailId)) {
        alert(currentLang === 'ru' ? 'Маршрут уже в избранном' : 'Route already in favorites');
        return true;
    }
    return false;
};

// ========== PWA УСТАНОВКА ==========
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const closeBannerBtn = document.getElementById('closeBannerBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBanner) installBanner.style.display = 'block';
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('Пользователь установил приложение');
            }
            deferredPrompt = null;
        }
        if (installBanner) installBanner.style.display = 'none';
    });
}

if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', () => {
        if (installBanner) installBanner.style.display = 'none';
    });
}

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Bike-Trails/sw.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован:', registration);
            })
            .catch(error => {
                console.error('Ошибка регистрации SW:', error);
            });
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Получаем текущий язык из localStorage
    currentLang = localStorage.getItem('bike_trails_lang') || 'ru';
    
    // Отображаем маршруты
    filterTrails('all');
    setupFilters();
    
    // Обновляем активную кнопку языка в переключателе
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
});

// Слушаем изменения языка (для обновления карточек)
window.addEventListener('storage', (e) => {
    if (e.key === 'bike_trails_lang') {
        currentLang = e.newValue || 'ru';
        refreshPageContent();
        updateFilterTexts();
    }
});

// Экспортируем функцию для обновления из других файлов
window.refreshTrails = refreshPageContent;
