// ========== ТЕКУЩИЙ ЯЗЫК ==========
let currentLang = localStorage.getItem('bike_trails_lang') || 'ru';

// ========== ДАННЫЕ МАРШРУТОВ (НА ДВУХ ЯЗЫКАХ) ==========
const trailsData = {
    ru: [
        { id: 1, name: "Воробьёвы горы", description: "Легендарный маршрут по Москве-реке с панорамным видом на город.", difficulty: "easy", distance: 15.5, elevation: 120, rating: 4.8, location: "Москва", previewImage: "images/vorobyovy-gory-1.jpg" },
        { id: 2, name: "Куршская коса", description: "Уникальный маршрут по национальному парку между морем и заливом.", difficulty: "medium", distance: 22.0, elevation: 180, rating: 4.9, location: "Калининградская область", previewImage: "images/kurshskaya-kosa-1.jpg" },
        { id: 3, name: "Лаго-Наки", description: "Высокогорный маршрут по альпийским лугам Адыгеи.", difficulty: "hard", distance: 28.5, elevation: 850, rating: 5.0, location: "Адыгея", previewImage: "" },
        { id: 4, name: "Алтайский Марс", description: "Космические пейзажи Алтая: красные скалы и горные тропы.", difficulty: "hard", distance: 32.0, elevation: 620, rating: 4.9, location: "Республика Алтай", previewImage: "" },
        { id: 5, name: "Байкальская петля", description: "Кольцевой маршрут вдоль озера Байкал.", difficulty: "medium", distance: 35.0, elevation: 540, rating: 4.8, location: "Иркутская область", previewImage: "" },
        { id: 6, name: "Долина гейзеров", description: "Экстремальный маршрут Камчатки.", difficulty: "hard", distance: 18.0, elevation: 950, rating: 5.0, location: "Камчатский край", previewImage: "" }
    ],
    en: [
        { id: 1, name: "Sparrow Hills", description: "A legendary route along the Moscow River with panoramic views.", difficulty: "easy", distance: 15.5, elevation: 120, rating: 4.8, location: "Moscow", previewImage: "images/vorobyovy-gory-1.jpg" },
        { id: 2, name: "Curonian Spit", description: "A unique route through the national park between the sea and the bay.", difficulty: "medium", distance: 22.0, elevation: 180, rating: 4.9, location: "Kaliningrad Region", previewImage: "images/kurshskaya-kosa-1.jpg" },
        { id: 3, name: "Lago-Naki", description: "A high-mountain route through the alpine meadows of Adygea.", difficulty: "hard", distance: 28.5, elevation: 850, rating: 5.0, location: "Adygea", previewImage: "" },
        { id: 4, name: "Altai Mars", description: "Cosmic landscapes of Altai: red cliffs and mountain trails.", difficulty: "hard", distance: 32.0, elevation: 620, rating: 4.9, location: "Altai Republic", previewImage: "" },
        { id: 5, name: "Baikal Loop", description: "A circular route along Lake Baikal.", difficulty: "medium", distance: 35.0, elevation: 540, rating: 4.8, location: "Irkutsk Region", previewImage: "" },
        { id: 6, name: "Valley of Geysers", description: "The most challenging route of Kamchatka.", difficulty: "hard", distance: 18.0, elevation: 950, rating: 5.0, location: "Kamchatka", previewImage: "" }
    ]
};

// Получить маршруты на текущем языке
function getTrails() {
    return trailsData[currentLang] || trailsData.ru;
}

// Получить цвет сложности
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': return { class: 'difficulty-easy', text: currentLang === 'ru' ? '🟢 Лёгкий' : '🟢 Easy' };
        case 'medium': return { class: 'difficulty-medium', text: currentLang === 'ru' ? '🔵 Средний' : '🔵 Medium' };
        case 'hard': return { class: 'difficulty-hard', text: currentLang === 'ru' ? '⚫ Сложный' : '⚫ Hard' };
        default: return { class: '', text: difficulty };
    }
}

// Звёзды рейтинга
function getStarsHTML(rating) {
    let starsHTML = '';
    for (let i = 0; i < Math.floor(rating); i++) starsHTML += '★';
    if (rating % 1 >= 0.5) starsHTML += '½';
    for (let i = 0; i < 5 - Math.ceil(rating); i++) starsHTML += '☆';
    return `<span class="stars">${starsHTML}</span> <span style="font-size:0.8rem;">${rating}</span>`;
}

// Создать карточку
function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    const imageStyle = trail.previewImage ? 
        `background-image: url('${trail.previewImage}'); background-size: cover;` : 
        'background: linear-gradient(135deg, #2b2d42, #353b48);';
    
    return `
        <div class="trail-card" data-id="${trail.id}">
            <div class="card-image" style="${imageStyle}">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${trail.name}</h3>
                <p class="trail-description">${trail.description}</p>
                <div class="trail-stats">
                    <span class="stat-item">📏 ${trail.distance} ${currentLang === 'ru' ? 'км' : 'km'}</span>
                    <span class="stat-item">⛰️ ${trail.elevation} ${currentLang === 'ru' ? 'м' : 'm'}</span>
                    <span class="stat-item">📍 ${trail.location}</span>
                </div>
                <div class="rating">${getStarsHTML(trail.rating)}</div>
            </div>
        </div>
    `;
}

// Показать маршруты
function displayTrails() {
    const container = document.getElementById('trailsContainer');
    if (!container) {
        console.error('trailsContainer не найден');
        return;
    }
    
    const trails = getTrails();
    container.innerHTML = trails.map(trail => createTrailCard(trail)).join('');
    
    // Обработчики кликов
    document.querySelectorAll('.trail-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.href = `trail-${id}.html`;
        });
    });
}

// Фильтрация (пока просто показывает все маршруты)
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const level = btn.getAttribute('data-level');
            
            if (level === 'all') {
                displayTrails();
            } else {
                const trails = getTrails().filter(t => t.difficulty === level);
                const container = document.getElementById('trailsContainer');
                if (trails.length === 0) {
                    container.innerHTML = `<div style="text-align:center; padding:2rem;">${currentLang === 'ru' ? 'Нет маршрутов' : 'No routes'}</div>`;
                } else {
                    container.innerHTML = trails.map(t => createTrailCard(t)).join('');
                }
                // Переназначаем обработчики
                document.querySelectorAll('.trail-card').forEach(card => {
                    card.addEventListener('click', () => {
                        window.location.href = `trail-${card.getAttribute('data-id')}.html`;
                    });
                });
            }
        });
    });
}

// Обновить тексты кнопок фильтров
function updateFilterButtonsText() {
    const btns = document.querySelectorAll('.filter-btn');
    if (btns.length >= 4) {
        btns[0].textContent = currentLang === 'ru' ? 'Все маршруты' : 'All routes';
        btns[1].textContent = currentLang === 'ru' ? '🟢 Лёгкие' : '🟢 Easy';
        btns[2].textContent = currentLang === 'ru' ? '🔵 Средние' : '🔵 Medium';
        btns[3].textContent = currentLang === 'ru' ? '⚫ Сложные' : '⚫ Hard';
    }
}

// Переключение языка
function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('bike_trails_lang', lang);
    updateFilterButtonsText();
    displayTrails();
    
    // Обновляем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========== ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script загружен, отображаем маршруты');
    displayTrails();
    setupFilters();
    updateFilterButtonsText();
    
    // Добавляем переключатель языков, если его нет
    if (!document.querySelector('.lang-switcher-container')) {
        const container = document.createElement('div');
        container.className = 'lang-switcher-container';
        container.style.cssText = 'display: flex; justify-content: flex-end; gap: 0.5rem; margin-bottom: 1rem;';
        container.innerHTML = `
            <button class="lang-btn" data-lang="ru">🇷🇺 Русский</button>
            <button class="lang-btn" data-lang="en">🇬🇧 English</button>
        `;
        const header = document.querySelector('.header-top');
        if (header) {
            header.after(container);
        }
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                setLanguage(btn.getAttribute('data-lang'));
            });
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
        });
    }
});
