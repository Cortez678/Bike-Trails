// Координаты маршрутов (широта, долгота, название, описание, сложность, id)
const routes = [
    {
        id: 1,
        name: "Воробьёвы горы",
        lat: 55.7106,
        lng: 37.5436,
        description: "Легендарный маршрут по Москве-реке с панорамным видом на город.",
        difficulty: "easy",
        distance: 15.5
    },
    {
        id: 2,
        name: "Куршская коса",
        lat: 55.1833,
        lng: 20.8500,
        description: "Уникальный маршрут по национальному парку между морем и заливом.",
        difficulty: "medium",
        distance: 22.0
    },
    {
        id: 3,
        name: "Лаго-Наки",
        lat: 44.1333,
        lng: 40.2000,
        description: "Высокогорный маршрут по альпийским лугам Адыгеи.",
        difficulty: "hard",
        distance: 28.5
    },
    {
        id: 4,
        name: "Алтайский Марс",
        lat: 49.9667,
        lng: 88.9667,
        description: "Космические пейзажи Алтая: красные скалы и горные тропы.",
        difficulty: "hard",
        distance: 32.0
    },
    {
        id: 5,
        name: "Байкальская петля",
        lat: 51.8667,
        lng: 104.8667,
        description: "Кольцевой маршрут вдоль озера Байкал.",
        difficulty: "medium",
        distance: 35.0
    },
    {
        id: 6,
        name: "Долина гейзеров",
        lat: 54.1333,
        lng: 159.9167,
        description: "Экстремальный маршрут Камчатки.",
        difficulty: "hard",
        distance: 18.0
    }
];

// Цвета для маркеров в зависимости от сложности
const markerColors = {
    easy: '#4cd964',
    medium: '#ff9f0a',
    hard: '#ff3b30'
};

// Инициализация карты
let map;

function initMap() {
    // Центр России (примерно)
    map = L.map('map').setView([60, 100], 4);
    
    // Слой карты (OpenStreetMap)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 3
    }).addTo(map);
    
    // Добавляем маркеры
    routes.forEach(route => {
        const color = markerColors[route.difficulty];
        
        // Создаём кастомный значок
        const customIcon = L.divIcon({
            html: `<div style="background: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
            iconSize: [16, 16],
            className: 'custom-marker'
        });
        
        const marker = L.marker([route.lat, route.lng], { icon: customIcon }).addTo(map);
        
        // Всплывающее окно
        const difficultyText = route.difficulty === 'easy' ? '🟢 Лёгкий' : 
                               (route.difficulty === 'medium' ? '🔵 Средний' : '⚫ Сложный');
        
        marker.bindPopup(`
            <div style="font-family: 'Inter', sans-serif; min-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #1a1a2e;">${route.name}</h3>
                <p style="margin: 0 0 5px 0; font-size: 12px; color: #666;">${difficultyText}</p>
                <p style="margin: 0 0 5px 0; font-size: 12px;">📏 ${route.distance} км</p>
                <p style="margin: 0 0 5px 0; font-size: 12px;">${route.description.substring(0, 100)}${route.description.length > 100 ? '...' : ''}</p>
                <button onclick="window.location.href='trail-${route.id}.html'" style="background: #4a90e2; color: white; border: none; padding: 5px 10px; border-radius: 20px; cursor: pointer; margin-top: 5px; width: 100%;">Подробнее →</button>
            </div>
        `);
    });
    
    // Общая статистика
    const totalDistance = routes.reduce((sum, r) => sum + r.distance, 0);
    document.getElementById('totalDistance').innerText = totalDistance;
}

// Запускаем карту после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    initMap();
});
