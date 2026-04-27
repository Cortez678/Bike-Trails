// Координаты маршрутов
const routesCoordinates = {
    1: { name: "Воробьёвы горы", lat: 55.7106, lon: 37.5436, city: "Москва" },
    2: { name: "Куршская коса", lat: 55.1833, lon: 20.8500, city: "Калининград" },
    3: { name: "Лаго-Наки", lat: 44.1333, lon: 40.2000, city: "Майкоп" },
    4: { name: "Алтайский Марс", lat: 49.9667, lon: 88.9667, city: "Кош-Агач" },
    5: { name: "Байкальская петля", lat: 51.8667, lon: 104.8667, city: "Листвянка" },
    6: { name: "Долина гейзеров", lat: 54.1333, lon: 159.9167, city: "Петропавловск-Камчатский" }
};

// Эмодзи погоды по коду WMO
function getWeatherEmoji(code) {
    const map = {
        0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
        45: "🌫️", 48: "🌫️",
        51: "🌦️", 53: "🌦️", 55: "🌧️",
        61: "🌧️", 63: "🌧️", 65: "🌧️💧",
        71: "❄️", 73: "❄️", 75: "❄️❄️",
        95: "⛈️", 96: "⛈️🌨️", 99: "⛈️🌨️"
    };
    return map[code] || "🌡️";
}

// Описание погоды
function getWeatherDesc(code) {
    const map = {
        0: "ясно", 1: "преимущественно ясно", 2: "переменная облачность", 3: "пасмурно",
        45: "туман", 48: "туман", 51: "морось", 53: "морось", 55: "сильная морось",
        61: "дождь", 63: "дождь", 65: "сильный дождь", 71: "снег", 73: "снег",
        75: "сильный снег", 95: "гроза", 96: "гроза с градом", 99: "гроза с градом"
    };
    return map[code] || "неизвестно";
}

// Форматирование даты
function formatDate(date) {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return `${date.getDate()}.${date.getMonth()+1} (${days[date.getDay()]})`;
}

// Получение реальной погоды
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Ошибка API');
    return await response.json();
}

// Отображение погоды
async function displayWeather(routeId) {
    const route = routesCoordinates[routeId];
    const container = document.getElementById('weatherContainer');
    
    container.innerHTML = '<div class="loading-spinner"></div><div class="loading-text">Загрузка реальной погоды...</div>';
    
    try {
        const data = await fetchWeather(route.lat, route.lon);
        
        // ТЕКУЩАЯ ПОГОДА
        const currentTemp = Math.round(data.current.temperature_2m);
        const currentWind = Math.round(data.current.wind_speed_10m);
        const currentCode = data.current.weather_code;
        const currentEmoji = getWeatherEmoji(currentCode);
        const currentDesc = getWeatherDesc(currentCode);
        
        // Рекомендация на основе ТЕКУЩЕЙ температуры
        let recommendation = '';
        if (currentTemp > 25) recommendation = "☀️ Отличная погода для велопоездки! Не забудьте воду и головной убор.";
        else if (currentTemp > 15) recommendation = "🌡️ Прекрасная погода для катания. Возьмите легкую ветровку.";
        else if (currentTemp > 5) recommendation = "🧥 Прохладно. Одевайтесь теплее, возьмите перчатки и ветрозащитную куртку.";
        else if (currentTemp > 0) recommendation = "❄️ Холодно! Тёплая одежда, шапка и перчатки обязательны. Возьмите термос с чаем.";
        else recommendation = "🥶 Очень холодно! Лучше отложить поездку или максимально утеплиться.";
        
        // Прогноз на 7 дней
        let forecastHtml = '';
        for (let i = 0; i < data.daily.time.length; i++) {
            const date = new Date(data.daily.time[i]);
            const dayMax = Math.round(data.daily.temperature_2m_max[i]);
            const dayMin = Math.round(data.daily.temperature_2m_min[i]);
            const dayCode = data.daily.weather_code[i];
            const dayWind = Math.round(data.daily.wind_speed_10m_max[i]);
            
            forecastHtml += `
                <div class="weather-day">
                    <div class="weather-date">${formatDate(date)}</div>
                    <div class="weather-icon">${getWeatherEmoji(dayCode)}</div>
                    <div class="weather-temp">${dayMax}°C</div>
                    <div class="weather-temp-min">↓ ${dayMin}°C</div>
                    <div class="weather-desc">${getWeatherDesc(dayCode)}</div>
                    <div class="weather-wind">💨 ${dayWind} км/ч</div>
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="weather-info">
                <div class="weather-location">
                    <h2>📍 ${route.name}</h2>
                    <p>${route.city}</p>
                </div>
                
                <div class="current-weather">
                    <div class="current-temp">${currentTemp}°C</div>
                    <div class="current-icon">${currentEmoji}</div>
                    <div class="current-desc">${currentDesc}</div>
                    <div class="current-wind">💨 ветер ${currentWind} км/ч</div>
                </div>
                
                <div class="weather-recommendation current-recommendation">
                    <strong>📋 Рекомендация на сегодня:</strong> ${recommendation}
                </div>
                
                <h3 class="forecast-title">📅 Прогноз на неделю</h3>
                <div class="weather-grid">
                    ${forecastHtml}
                </div>
                
                <div class="weather-source">
                    🌍 Данные: Open-Meteo (обновляется каждый час)
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('Ошибка:', error);
        container.innerHTML = `
            <div class="weather-error">
                <div class="error-icon">🌐</div>
                <h3>Не удалось загрузить погоду</h3>
                <p>Проверьте интернет-соединение</p>
                <button onclick="location.reload()" class="retry-btn">🔄 Повторить</button>
            </div>
        `;
    }
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    const routeSelect = document.getElementById('routeSelect');
    displayWeather(parseInt(routeSelect.value));
    routeSelect.addEventListener('change', () => displayWeather(parseInt(routeSelect.value)));
});
