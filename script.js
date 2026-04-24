const trailsData = [
    {
        id: 1,
        name: "Воробьёвы горы",
        description: "Легендарный маршрут по Москве-реке с панорамным видом на город.",
        difficulty: "easy",
        distance: 15.5,
        elevation: 120,
        rating: 4.8,
        location: "Москва",
        previewImage: "https://images.pexels.com/photos/2048733/pexels-photo-2048733.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/2048733/pexels-photo-2048733.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1474111/pexels-photo-1474111.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/2078209/pexels-photo-2078209.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
    },
    {
        id: 2,
        name: "Куршская коса",
        description: "Маршрут по нацпарку между морем и заливом. Песчаные дюны и сосновый лес.",
        difficulty: "medium",
        distance: 22.0,
        elevation: 180,
        rating: 4.9,
        location: "Калининградская область",
        previewImage: "https://images.pexels.com/photos/189762/pexels-photo-189762.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/189762/pexels-photo-189762.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/316518/pexels-photo-316518.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1547882/pexels-photo-1547882.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
    },
    {
        id: 3,
        name: "Лаго-Наки",
        description: "Высокогорный маршрут по альпийским лугам Адыгеи. Горы и водопады.",
        difficulty: "hard",
        distance: 28.5,
        elevation: 850,
        rating: 5.0,
        location: "Адыгея",
        previewImage: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
    },
    {
        id: 4,
        name: "Алтайский Марс",
        description: "Космические пейзажи Алтая: красные скалы и бирюзовые реки.",
        difficulty: "hard",
        distance: 32.0,
        elevation: 620,
        rating: 4.9,
        location: "Республика Алтай",
        previewImage: "https://images.pexels.com/photos/1043814/pexels-photo-1043814.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/1043814/pexels-photo-1043814.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/5689667/pexels-photo-5689667.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/235722/pexels-photo-235722.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
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
        previewImage: "https://images.pexels.com/photos/3984354/pexels-photo-3984354.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/3984354/pexels-photo-3984354.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/3788987/pexels-photo-3788987.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/1301308/pexels-photo-1301308.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
    },
    {
        id: 6,
        name: "Долина гейзеров",description: "Экстремальный маршрут Камчатки. Термальные источники и вулканы.",
        difficulty: "hard",
        distance: 18.0,
        elevation: 950,
        rating: 5.0,
        location: "Камчатский край",
        previewImage: "https://images.pexels.com/photos/259568/pexels-photo-259568.jpeg?auto=compress&cs=tinysrgb&w=600",
        gallery: [
            "https://images.pexels.com/photos/259568/pexels-photo-259568.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/2942808/pexels-photo-2942808.jpeg?auto=compress&cs=tinysrgb&w=800",
            "https://images.pexels.com/photos/14055297/pexels-photo-14055297.jpeg?auto=compress&cs=tinysrgb&w=800"
        ]
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

function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    return `
        <div class="trail-card" data-difficulty="${trail.difficulty}" data-id="${trail.id}">
            <div class="card-image" style="background-image: url('${trail.previewImage}'); background-size: cover; background-position: center;">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${trail.name}</h3>
                <p class="trail-description">${trail.description}</p>
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

document.addEventListener('DOMContentLoaded', () => {
    filterTrails('all');
    setupFilters();
});
