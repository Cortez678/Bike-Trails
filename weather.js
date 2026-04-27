// Координаты маршрутов для API погоды
const routesCoordinates = {
    1: { name: "Воробьёвы горы", lat: 55.7106, lon: 37.5436, city: "Москва" },
    2: { name: "Куршская коса", lat: 55.1833, lon: 20.8500, city: "Калининград" },
    3: { name: "Лаго-Наки", lat: 44.1333, lon: 40.2000, city: "Майкоп" },
    4: { name: "Алтайский Марс", lat: 49.9667, lon: 88.9667, city: "Кош-Агач" },
    5: { name: "Байкальская петля", lat: 51.8667, lon: 104.8667, city: "Листвянка" },
    6: { name: "Долина гейзеров", lat: 54.1333, lon: 159.9167, city: "Петропавловск-Камчатский" }
};

// Эмодзи для погоды
const weatherEmojis = {
    "ясно": "☀️",
    "солнечно": "☀️",
    "облачно": "☁️",
    "пасмурно": "☁️",
    "небольшая облачность": "⛅",
    "переменная облачность": "⛅",
    "дождь": "🌧️",
    "небольшой дождь": "🌦️",
    "ливень": "🌧️💧",
    "гроза": "⛈️",
    "снег": "❄️",
    "небольшой снег": "🌨️",
    "туман": "🌫️",
    "ветер": "💨"
};

// Получить рекомендацию на основе погоды
function getRecommendation(temp, condition, windSpeed) {
    if (temp > 30) {
        return "🥵 Очень жарко! Возьмите много воды, наденьте светлую одежду. Лучше ехать утром или вечером.";
    } else if (temp > 25) {
        return "☀️ Отличная погода для велопоездки! Не забудьте воду и головной убор.";
    } else if (temp > 15) {
        return "🌡️ Идеальная температура для катания. Можно брать с собой лёгкую ветровку.";
    } else if (temp > 5) {
        return "🧥 Прохладно. Одевайтесь теплее, возьмите перчатки и ветрозащитную куртку.";
    } else if (temp > 0) {
        return "❄️ Холодно! Обязательно возьмите тёплую одежду, шапку и перчатки.";
    } else {
        return "🥶 Очень холодно! Рекомендуем отложить поездку или хорошо утеплиться.";
    }
}

// Форматирование даты
function formatDate(dateStr) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth()+1} (${days[date.getDay()]})`;
}

// Получение погоды (демо-данные, так как бесплатные API требуют ключ)
function getWeatherData(routeId) {
    // В демо-режиме используем реалистичные сгенерированные данные
    const route = routesCoordinates[routeId];
    const today = new Date();
    const weatherData = [];
    
    // Типы погоды для разных регионов
    const weatherTypes = [
        { condition: "солнечно", temp: 22, tempMin: 15, wind: 5 },
        { condition: "облачно", temp: 18, tempMax: 20, tempMin: 12, wind: 8 },
        { condition: "небольшой дождь", temp: 14, tempMin: 9, wind: 12 },
        { condition: "ясно", temp: 24, tempMin: 16, wind: 4 },
        { condition: "пасмурно", temp: 16, tempMin: 10, wind: 10 },
        { condition: "гроза", temp: 13, tempMin: 8, wind: 18 },
        { condition: "переменная облачность", temp: 20, tempMin: 13, wind: 6 }
    ];
    
    // Региональные особенности
    let regionalOffset = 0;
    if (routeId === 3) regionalOffset = -5; // Лаго-Наки холоднее
    if (routeId === 4) regionalOffset = -8; // Алтай холоднее
    if (routeId === 6) regionalOffset = -3; // Камчатка прохладнее
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Выбираем тип погоды
        let weatherIndex;
        if (i === 0) weatherIndex = 0;
        else if (i === 1) weatherIndex = 1;
        else if (i === 2) weatherIndex = 4;
        else if (i === 3) weatherIndex = 2;
        else if (i === 4) weatherIndex = 6;
        else if (i === 5) weatherIndex = 3;
        else weatherIndex = 5;
        
        const weather = { ...weatherTypes[weatherIndex] };
        
        // Добавляем региональный сдвиг
        let temp = weather.temp + regionalOffset + (Math.random() - 0.5) * 3;
        let tempMin = (weather.tempMin || weather.temp - 6) + regionalOffset + (Math.random() - 0.5) * 2;
        
        weatherData.push({
            date: date.toISOString().split('T')[0],
            temp: Math.round(temp),
            tempMin: Math.round(tempMin),
            condition: weather.condition,
            windSpeed: Math.round(weather.wind + (Math.random() - 0.5) * 4)
        });
    }
    
    return weatherData;
}

// Отображение погоды
function displayWeather(routeId) {
    const container = document.getElementById('weatherContainer');
    const route = routesCoordinates[routeId];
    const weatherData = getWeatherData(routeId);
    
    const today = weatherData[0];
    const recommendation = getRecommendation(today.temp, today.condition, today.windSpeed);
    
    let weatherHtml = `
        <div class="weather-info">
            <div class="weather-location">
                <h2>📍 ${route.name}</h2>
                <p>${route.city} и окрестности</p>
            </div>
            <div class="weather-recommendation">
                <strong>💡 Рекомендация на сегодня:</strong> ${recommendation}
            </div>
        </div>
        <div class="weather-grid">
    `;
    
    weatherData.forEach(day => {
        const emoji = weatherEmojis[day.condition] || "🌡️";
        const dateStr = formatDate(day.date);
        
        weatherHtml += `
            <div class="weather-day">
                <div class="weather-date">${dateStr}</div>
                <div class="weather-icon">${emoji}</div>
                <div class="weather-temp">${day.temp}°C</div>
                <div class="weather-temp-min">↓ ${day.tempMin}°C</div>
                <div class="weather-desc">${day.condition}</div>
                <div class="weather-wind">💨 ветер ${day.windSpeed} м/с</div>
            </div>
        `;
    });
    
    weatherHtml += `</div>`;
    container.innerHTML = weatherHtml;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const routeSelect = document.getElementById('routeSelect');
    
    function updateWeather() {
        const routeId = parseInt(routeSelect.value);
        displayWeather(routeId);
    }
    
    updateWeather();
    routeSelect.addEventListener('change', updateWeather);
});
