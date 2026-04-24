const trailsData = [
    {
        id: 1,
        name: "Воробьёвы горы",
        description: "Легендарный маршрут по Москве-реке с панорамным видом на город. Проходит через парк, набережную и смотровые площадки.",
        difficulty: "easy",
        distance: 15.5,
        elevation: 120,
        rating: 4.8,
        location: "Москва"
    },
    {
        id: 2,
        name: "Куршская коса",
        description: "Уникальный маршрут по национальному парку между морем и заливом. Песчаные дюны, сосновый лес и побережье Балтики.",
        difficulty: "medium",
        distance: 22.0,
        elevation: 180,
        rating: 4.9,
        location: "Калининградская область"
    },
    {
        id: 3,
        name: "Лаго-Наки",
        description: "Высокогорный маршрут по альпийским лугам Адыгеи. Горы, водопады и виды, которые захватывают дух.",
        difficulty: "hard",
        distance: 28.5,
        elevation: 850,
        rating: 5.0,
        location: "Адыгея"
    },
    {
        id: 4,
        name: "Алтайский Марс",
        description: "Космические пейзажи Алтая: красные скалы, бирюзовые реки и горные тропы в долине реки Чуя.",
        difficulty: "hard",
        distance: 32.0,
        elevation: 620,
        rating: 4.9,
        location: "Республика Алтай"
    },
    {
        id: 5,
        name: "Байкальская петля",
        description: "Кольцевой маршрут вдоль озера Байкал с заездом в пик Черского и живописные бухты.",
        difficulty: "medium",
        distance: 35.0,
        elevation: 540,
        rating: 4.8,
        location: "Иркутская область / Бурятия"
    },
    {
        id: 6,
        name: "Долина гейзеров",
        description: "Сложнейший маршрут Камчатки. Термальные источники, вулканы, медвежьи тропы и дикая природа.",
        difficulty: "hard",
        distance: 18.0,
        elevation: 950,
        rating: 5.0,
        location: "Камчатский край"
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

function getImageGradient(id) {
    const gradients = {
        1: 'linear-gradient(135deg, #2d5a2c, #1a3d19)',
        2: 'linear-gradient(135deg, #c2a559, #8b6b3d)',
        3: 'linear-gradient(135deg, #2c5a5a, #1a3d3d)',
        4: 'linear-gradient(135deg, #8b3d3d, #5a2c2c)',
        5: 'linear-gradient(135deg, #2c5a8b, #1a3d5a)',
        6: 'linear-gradient(135deg, #3d3d5a, #2c2c3d)'
    };
    return gradients[id] || 'linear-gradient(135deg, #2b2d42, #353b48)';
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
    const backgroundGradient = getImageGradient(trail.id);
    return `
        <div class="trail-card" data-difficulty="${trail.difficulty}" data-id="${trail.id}">
            <div class="card-image" style="background: ${backgroundGradient};">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${trail.name}</h3>
                <p class="trail-description">${trail.description}</p>
                <div class="trail-stats">
                    <span class="stat-item">📏 ${trail.distance} км</span><span class="stat-item">⛰️ ${trail.elevation} м</span>
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

document.addEventListener('DOMContentLoaded', () => {
    filterTrails('all');
    setupFilters();
});
