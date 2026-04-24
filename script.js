// Данные маршрутов
const trailsData = [
    {
        id: 1,
        name: "Forest Loop Trail",
        description: "Живописный маршрут через сосновый лес с плавными подъёмами. Отлично подходит для начинающих райдеров.",
        difficulty: "easy",
        distance: 12.5,
        elevation: 210,
        rating: 4.5,
        imageColor: "forest"
    },
    {
        id: 2,
        name: "Mountain Ridge",
        description: "Техничная трасса по горному хребту с захватывающими видами на долину.",
        difficulty: "medium",
        distance: 24.8,
        elevation: 680,
        rating: 4.8,
        imageColor: "mountain"
    },
    {
        id: 3,
        name: "Lake Circuit",
        description: "Маршрут вокруг озера с гравийными участками и несколькими техничными поворотами.",
        difficulty: "medium",
        distance: 18.3,
        elevation: 340,
        rating: 4.3,
        imageColor: "lake"
    },
    {
        id: 4,
        name: "Downhill Rush",
        description: "Экстремальный скоростной спуск с большими дропами и каменистыми участками. Только для опытных райдеров!",
        difficulty: "hard",
        distance: 8.7,
        elevation: 520,
        rating: 4.9,
        imageColor: "downhill"
    },
    {
        id: 5,
        name: "Coastal Ride",
        description: "Расслабленная езда вдоль побережья с панорамными видами на океан и лёгкими ветрами.",
        difficulty: "easy",
        distance: 15.2,
        elevation: 95,
        rating: 4.6,
        imageColor: "coastal"
    },
    {
        id: 6,
        name: "Night Enduro",
        description: "Ночная эндуро-трасса с техничными секциями и искусственными препятствиями.",
        difficulty: "hard",
        distance: 14.5,
        elevation: 390,
        rating: 4.7,
        imageColor: "night"
    }
];

// Функция для получения цвета в зависимости от сложности
function getDifficultyColor(difficulty) {
    switch(difficulty) {
        case 'easy': return { class: 'difficulty-easy', text: '🟢 Лёгкий' };
        case 'medium': return { class: 'difficulty-medium', text: '🔵 Средний' };
        case 'hard': return { class: 'difficulty-hard', text: '⚫ Сложный' };
        default: return { class: '', text: difficulty };
    }
}

// Функция для генерации фонового изображения (градиент вместо реальных картинок)
function getImageGradient(imageColor) {
    const gradients = {
        forest: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
        mountain: 'linear-gradient(135deg, #4a4e69, #22223b)',
        lake: 'linear-gradient(135deg, #0077b6, #00b4d8)',
        downhill: 'linear-gradient(135deg, #9d0208, #dc2f02)',
        coastal: 'linear-gradient(135deg, #0077b6, #48cae4)',
        night: 'linear-gradient(135deg, #10002b, #240046)'
    };
    return gradients[imageColor] || 'linear-gradient(135deg, #2b2d42, #353b48)';
}

// Функция для отображения рейтинга звёздами
function getStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '½';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return `<span class="stars">${starsHTML}</span> <span style="font-size:0.8rem; color:#8a9bb5;">${rating}</span>`;
}

// Функция для создания карточки маршрута
function createTrailCard(trail) {
    const diff = getDifficultyColor(trail.difficulty);
    const backgroundGradient = getImageGradient(trail.imageColor);
    
    return `
        <div class="trail-card" data-difficulty="${trail.difficulty}">
            <div class="card-image" style="background: ${backgroundGradient};">
                <span class="difficulty-badge ${diff.class}">${diff.text}</span>
            </div>
            <div class="card-content">
                <h3 class="trail-title">${trail.name}</h3><p class="trail-description">${trail.description}</p>
                <div class="trail-stats">
                    <span class="stat-item">📏 ${trail.distance} км</span>
                    <span class="stat-item">⛰️ ${trail.elevation} м</span>
                </div>
                <div class="rating">
                    ${getStarsHTML(trail.rating)}
                </div>
            </div>
        </div>
    `;
}

// Фильтрация маршрутов
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
}

// Обработчики для фильтров
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Обновляем активную кнопку
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Фильтруем маршруты
            const level = btn.getAttribute('data-level');
            filterTrails(level);
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    filterTrails('all');
    setupFilters();
});
