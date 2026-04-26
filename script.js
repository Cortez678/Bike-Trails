// Данные маршрутов
const trailsData = [
    {
        id: 1,
        difficulty: "easy",
        distance: 15.5,
        elevation: 120,
        rating: 4.8,
        location: "Москва",
        previewImage: "images/vorobyovy-gory-1.jpg"
    },
    {
        id: 2,
        difficulty: "medium",
        distance: 22.0,
        elevation: 180,
        rating: 4.9,
        location: "Калининградская область",
        previewImage: "images/kurshskaya-kosa-1.jpg"
    },
    {
        id: 3,
        difficulty: "hard",
        distance: 28.5,
        elevation: 850,
        rating: 5.0,
        location: "Адыгея",
        previewImage: ""
    },
    {
        id: 4,
        difficulty: "hard",
        distance: 32.0,
        elevation: 620,
        rating: 4.9,
        location: "Республика Алтай",
        previewImage: ""
    },
    {
        id: 5,
        difficulty: "medium",
        distance: 35.0,
        elevation: 540,
        rating: 4.8,
        location: "Иркутская область / Бурятия",
        previewImage: ""
    },
    {
        id: 6,
        difficulty: "hard",
        distance: 18.0,
        elevation: 950,
        rating: 5.0,
        location: "Камчатский край",
        previewImage: ""
    }
];

function getDifficultyColor(difficulty) {
    const currentLang = localStorage.getItem('language') || 'ru';
    switch(difficulty) {
        case 'easy': return { class: 'difficulty-easy', text: currentLang === 'ru' ? '🟢 Лёгкий' : '🟢 Easy' };
        case 'medium': return { class: 'difficulty-medium', text: currentLang === 'ru' ? '🔵 Средний' : '🔵 Medium' };
        case 'hard': return { class: 'difficulty-hard', text: currentLang === 'ru' ? '⚫ Сложный' : '⚫ Hard' };
        default: return { class: '', text: difficulty };
    }
}

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

function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    
    // Получаем переведённые название и описание из language.js
    let trailName = '';
    let trailDesc = '';
    
    if (typeof window.getTrailName === 'function') {
        trailName = window.getTrailName(trail.id);
        trailDesc = window.getTrailDesc(trail.id);
    }
    
    // Если перевод не загрузился, используем заглушку
    if (!trailName) {
        trailName = 'Маршрут ' + trail.id;
        trailDesc = 'Описание маршрута';
    }
    
    const imageStyle = trail.previewImage ? `background-image: url('${trail.previewImage}');` : 'background: linear-gradient(135deg, #2b2d42, #353b48);';
    
    return `
        <div class="trail-card" data-difficulty="${trail.difficulty}" data-id="${trail.id}">
            <div class="card-image" style="${imageStyle} background-size: cover; background-position: center;">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${trailName}</h3>
                <p class="trail-description">${trailDesc}</p>
                <div class="trail-stats">
                    <span class="stat-item">📏 ${trail.distance} км</span>
                    <span class="stat-item">⛰️ ${trail.elevation} м</span>
                    <span class="stat-item">📍 ${trail.location}</span>
                </div>
                <div class="rating">${getStarsHTML(trail.rating)}</div>
            </div>
        </div>
    `;
}

function filterTrails(level) {
    const filteredTrails = level === 'all' 
        ? trailsData 
        : trailsData.filter(trail => trail.difficulty === level);
    const container = document.getElementById('trailsContainer');
    if (filteredTrails.length === 0) {
        const currentLang = localStorage.getItem('language') || 'ru';
        const emptyText = currentLang === 'ru' 
            ? '🚴 Нет маршрутов с таким уровнем сложности' 
            : '🚴 No routes with this difficulty level';
        container.innerHTML = `<div style="text-align:center; padding:3rem; color:#8a9bb5;">${emptyText}</div>`;
        return;
    }
    container.innerHTML = filteredTrails.map(trail => createTrailCard(trail)).join('');
    
    document.querySelectorAll('.trail-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.href = `trail-${id}.html`;
        });
    });
}

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

// Функция для обновления карточек при смене языка
window.refreshTrails = function() {
    const activeFilter = document.querySelector('.filter-btn.active');
    const level = activeFilter ? activeFilter.getAttribute('data-level') : 'all';
    filterTrails(level);
};

document.addEventListener('DOMContentLoaded', () => {
    filterTrails('all');
    setupFilters();
});
