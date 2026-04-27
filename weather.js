// Координаты маршрутов для API погоды
const routesCoordinates = {
    1: { name: "Воробьёвы горы", lat: 55.7106, lon: 37.5436, city: "Москва" },
    2: { name: "Куршская коса", lat: 55.1833, lon: 20.8500, city: "Калининград" },
    3: { name: "Лаго-Наки", lat: 44.1333, lon: 40.2000, city: "Майкоп" },
    4: { name: "Алтайский Марс", lat: 49.9667, lon: 88.9667, city: "Кош-Агач" },
    5: { name: "Байкальская петля", lat: 51.8667, lon: 104.8667, city: "Листвянка" },
    6: { name: "Долина гейзеров", lat: 54.1333, lon: 159.9167, city: "Петропавловск-Камчатский" }
};

// Эмодзи для погоды (на основе WMO кодов)
function getWeatherEmoji(weatherCode) {
    // WMO Weather Interpretation Codes (WW)
    // https://open-meteo.com/en/docs
    const emojiMap = {
        0: "☀️",      // Ясно
        1: "🌤️",      // В основном ясно
        2: "⛅",       // Переменная облачность
        3: "☁️",       // Пасмурно
        45: "🌫️",     // Туман
        48: "🌫️",     // Туман с изморозью
        51: "🌦️",     // Морось
        53: "🌦️",     // Морось
        55: "🌧️",     // Морось
        56: "🌧️",     // Ледяная морось
        57: "🌧️",     // Ледяная морось
        61: "🌧️",     // Дождь
        63: "🌧️",     // Дождь
        65: "🌧️💧",   // Сильный дождь
        66: "🌧️❄️",   // Ледяной дождь
        67: "🌧️❄️",   // Ледяной дождь
        71: "❄️",     // Снег
        73: "❄️",     // Снег
        75: "❄️❄️",   // Сильный снег
        77: "🌨️",     // Снежные зёрна
        80: "🌦️",     // Ливень
        81: "🌧️",     // Ливень
        82: "🌧️💧",   // Сильный ливень
        85: "❄️🌨️",   // Снегопад
        86: "❄️🌨️",   // Сильный снегопад
        95: "⛈️",     // Гроза
        96: "⛈️🌨️",   // Гроза с градом
        99: "⛈️🌨️"    // Гроза с градом
    };
    return emojiMap[weatherCode] || "🌡️";
}

// Описание погоды на русском
function getWeatherDescription(weatherCode) {
    const descMap = {
        0: "ясно",
        1: "преимущественно ясно",
        2: "переменная облачность",
        3: "пасмурно",
        45: "туман",
        48: "туман",
        51: "морось",
        53: "морось",
        55: "сильная морось",
        56: "ледяная морось",
        57: "ледяная морось",
        61: "дождь",
        63: "дождь",
        65: "сильный дождь",
        66: "ледяной дождь",
        67: "ледяной дождь",
        71: "снег",
        73: "снег",
        75: "сильный снег",
        77: "снежные зёрна",
        80: "ливень",
        81: "ливень",
        82: "сильный ливень",
        85: "снегопад",
        86: "сильный снегопад",
        95: "гроза",
        96: "гроза с градом",
        99: "гроза с градом"
    };
    return descMap[weatherCode] || "неизвестно";
}

// Получение рекомендации на основе погоды
function getRecommendation(temp, weatherCode, windSpeed) {
    const condition = getWeatherDescription(weatherCode);
    
    if (temp > 30) {
        return "🥵 Очень жарко! Возьмите много воды (2+ литра), наденьте светлую дышащую одежду и головной убор. Лучше ехать утром или вечером.";
    } else if (temp > 25) {
        return "☀️ Отличная солнечная погода для велопоездки! Не забудьте воду и солнцезащитный крем.";
    } else if (temp > 15) {
        return "🌡️ Идеальная температура для катания. Можно брать с собой лёгкую ветровку на случай ветра.";
    } else if (temp > 5) {
        return "🧥 Прохладно. Одевайтесь теплее, возьмите ветрозащитную куртку, перчатки и шапку под шлем.";
    } else if (temp > 0) {
        return "❄️ Холодно! Обязательно возьмите тёплую одежду, шапку, перчатки и термос с горячим чаем.";
    } else {
        return "🥶 Очень холодно! Рекомендуем отложить поездку или максимально утеплиться. Смотрите под колёса — возможен гололёд!";
    }
}

// Получение реальной погоды через Open-Meteo API
async function fetchRealWeather(routeId) {
    const route = routesCoordinates[routeId];
    const container = document.getElementById('weatherContainer');
    
    // Показываем загрузку
    container.innerHTML = '<div class="loading-spinner"></div><div class="loading-text">Загрузка реальных данных погоды...</div>';
    
    try {
        // Open-Meteo API (бесплатно, без ключа)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${route.lat}&longitude=${route.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto&forecast_days=7`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.daily) {
            throw new Error('Нет данных о погоде');
        }
        
        return data;
    } catch (error) {
        console.error('Ошибка получения погоды:', error);
        container.innerHTML = `
            <div class="weather-error">
                <div class="error-icon">🌐</div>
                <h3>Не удалось загрузить данные погоды</h3>
                <p>Проверьте подключение к интернету и попробуйте снова.</p>
                <button onclick="location.reload()" class="retry-btn">🔄 Повторить</button>
            </div>
        `;
        return null;
    }
}

// Форматирование даты
function formatDate(dateStr) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const date = new Date(dateStr);
    return {
        full: `${date.getDate()}.${date.getMonth()+1} (${shortDays[date.getDay()]})`,
        dayName: days[date.getDay()]
    };
}

// Отображение погоды на странице
async function displayWeather(routeId) {
    const route = routesCoordinates[routeId];
    const weatherData = await fetchRealWeather(routeId);
    
    if (!weatherData) return;
    
    const container = document.getElementById('weatherContainer');
    const daily = weatherData.daily;
    
    const todayWeatherCode = daily.weather_code[0];
    const todayTemp = daily.temperature_2m_max[0];
    const todayWind = daily.wind_speed_10m_max[0];
    const recommendation = getRecommendation(todayTemp, todayWeatherCode, todayWind);
    
    let weatherHtml = `
        <div class="weather-info">
            <div class="weather-location">
                <h2>📍 ${route.name}</h2>
                <p>${route.city} и окрестности</p>
                <p class="weather-source">🌍 Данные: Open-Meteo (бесплатный API)</p>
            </div>
            <div class="weather-recommendation">
                <strong>💡 Рекомендация на сегодня:</strong><br>
                ${recommendation}
            </div>
        </div>
        <div class="weather-grid">
    `;
    
    for (let i = 0; i < daily.time.length; i++) {
        const date = formatDate(daily.time[i]);
        const weatherCode = daily.weather_code[i];
        const tempMax = Math.round(daily.temperature_2m_max[i]);
        const tempMin = Math.round(daily.temperature_2m_min[i]);
        const windSpeed = Math.round(daily.wind_speed_10m_max[i]);
        const emoji = getWeatherEmoji(weatherCode);
        const description = getWeatherDescription(weatherCode);
        
        weatherHtml += `
            <div class="weather-day">
                <div class="weather-date">${date.full}</div>
                <div class="weather-dayname">${date.dayName}</div>
                <div class="weather-icon">${emoji}</div>
                <div class="weather-temp">${tempMax}°C</div>
                <div class="weather-temp-min">↓ ${tempMin}°C</div>
                <div class="weather-desc">${description}</div>
                <div class="weather-wind">💨 ветер ${windSpeed} км/ч</div>
            </div>
        `;
    }
    
    weatherHtml += `</div>`;
    container.innerHTML = weatherHtml;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const routeSelect = document.getElementById('routeSelect');
    
    async function updateWeather() {
        const routeId = parseInt(routeSelect.value);
        await displayWeather(routeId);
    }
    
    updateWeather();
    routeSelect.addEventListener('change', updateWeather);
});
