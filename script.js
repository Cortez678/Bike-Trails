// Данные маршрутов (оригинальные на русском)
const trailsData = [
    {
        id: 1,
        name: "Воробьёвы горы",
        description: "Легендарный маршрут по Москве-реке с панорамным видом на город. Проходит через парк, набережную и смотровые площадки.",
        difficulty: "easy",
        distance: 15.5,
        elevation: 120,
        rating: 4.8,
        location: "Москва",
        previewImage: "images/vorobyovy-gory-1.jpg",
        nameKey: "trail1_name",
        descKey: "trail1_desc"
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
        previewImage: "images/kurshskaya-kosa-1.jpg",
        nameKey: "trail2_name",
        descKey: "trail2_desc"
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
        previewImage: "",
        nameKey: "trail3_name",
        descKey: "trail3_desc"
    },
    {
        id: 4,
        name: "Алтайский Марс",
        description: "Космические пейзажи Алтая: красные скалы, бирюзовые реки и горные тропы.",
        difficulty: "hard",
        distance: 32.0,
        elevation: 620,
        rating: 4.9,
        location: "Республика Алтай",
        previewImage: "",
        nameKey: "trail4_name",
        descKey: "trail4_desc"
    },
    {
        id: 5,
        name: "Байкальская петля",
        description: "Кольцевой маршрут вдоль озера Байкал с заездом на пик Черского.",
        difficulty: "medium",
        distance: 35.0,
        elevation: 540,
        rating: 4.8,
        location: "Иркутская область / Бурятия",
        previewImage: "",
        nameKey: "trail5_name",
        descKey: "trail5_desc"
    },
    {
        id: 6,
        name: "Долина гейзеров",
        description: "Экстремальный маршрут Камчатки. Термальные источники, вулканы, медвежьи тропы.",
        difficulty: "hard",
        distance: 18.0,
        elevation: 950,
        rating: 5.0,
        location: "Камчатский край",
        previewImage: "",
        nameKey: "trail6_name",
        descKey: "trail6_desc"
    }
];

function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': return { class: 'difficulty-easy', text: '🟢 Лёгкий' };
        case 'medium': return { class: 'difficulty-medium', text: '🔵 Средний' };
        case 'hard': return { class: 'difficulty-hard', text: '⚫ Сложный' };
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

function getTranslatedText(key) {
    if (typeof window.t === 'function') {
        return window.t(key);
    }
    return '';
}

function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    
    // Получаем переведённые название и описание
    let trailName = trail.name;
    let trailDesc = trail.description;
    
    if (typeof window.t === 'function') {
        const translatedName = window.t(trail.nameKey);
        const translatedDesc = window.t(trail.descKey);
        if (translatedName && translatedName !== trail.nameKey) trailName = translatedName;
        if (translatedDesc && translatedDesc !== trail.descKey) trailDesc = translatedDesc;
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
        container.innerHTML = '<div style="text-align:center; padding:3rem; color:#8a9bb5;">🚴 Нет маршрутов с таким уровнем сложности</div>';
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
