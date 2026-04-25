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
        gallery: [
            "images/vorobyovy-gory-1.jpg",
            "images/vorobyovy-gory-2.jpg",
            "images/vorobyovy-gory-3.jpg"
        ]
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
        gallery: [
            "images/kurshskaya-kosa-1.jpg",
            "images/kurshskaya-kosa-2.jpg",
            "images/kurshskaya-kosa-3.jpg"
        ]
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
        previewImage: "images/lago-naki-1.jpg",
        gallery: [
            "images/lago-naki-1.jpg",
            "images/lago-naki-2.jpg",
            "images/lago-naki-3.jpg"
        ]
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
        previewImage: "images/altai-mars-1.jpg",
        gallery: [
            "images/altai-mars-1.jpg",
            "images/altai-mars-2.jpg",
            "images/altai-mars-3.jpg"
        ]
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
        previewImage: "images/baikal-loop-1.jpg",
        gallery: [
            "images/baikal-loop-1.jpg",
            "images/baikal-loop-2.jpg",
            "images/baikal-loop-3.jpg"
        ]
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
        previewImage: "images/kamchatka-1.jpg",
        gallery: [
            "images/kamchatka-1.jpg",
            "images/kamchatka-2.jpg",
            "images/kamchatka-3.jpg"
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

function createTrailCard(trail) {const diff = getDifficultyColor(trail.difficulty);
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
});// Функция для добавления в избранное (вызывается на странице маршрута)
function getCurrentUserForFav() {
    const user = localStorage.getItem('bike_trails_current_user');
    return user ? JSON.parse(user) : null;
}

// Добавить в избранное
function addToFavoritesFromPage(trailId) {
    const user = getCurrentUserForFav();
    if (!user) {
        alert('Войдите в аккаунт, чтобы добавить маршрут в избранное');
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('bike_trails_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1 && !users[userIndex].favorites.includes(trailId)) {
        users[userIndex].favorites.push(trailId);
        localStorage.setItem('bike_trails_users', JSON.stringify(users));
        
        // Обновляем текущего пользователя
        user.favorites = users[userIndex].favorites;
        localStorage.setItem('bike_trails_current_user', JSON.stringify(user));
        
        alert('Маршрут добавлен в избранное!');
        return true;
    } else if (users[userIndex]?.favorites.includes(trailId)) {
        alert('Маршрут уже в избранном');
        return true;
    }
    return false;
}
