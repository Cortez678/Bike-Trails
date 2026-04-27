/* Стили для загрузки и ошибок */
.loading-text {
    text-align: center;
    padding: 1rem;
    color: #8a9bb5;
}

.weather-error {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 59, 48, 0.1);
    border-radius: 1rem;
    border: 1px solid rgba(255, 59, 48, 0.3);
}

.error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.weather-error h3 {
    color: #ff3b30;
    margin-bottom: 0.5rem;
}

.weather-error p {
    color: #8a9bb5;
    margin-bottom: 1rem;
}

.retry-btn {
    background: linear-gradient(135deg, #4a90e2, #7b3fe4);
    border: none;
    padding: 0.6rem 1.5rem;
    border-radius: 2rem;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
}

.retry-btn:hover {
    transform: scale(1.02);
}

.weather-source {
    font-size: 0.7rem;
    color: #6e85a8;
    margin-top: 0.3rem;
}

.weather-dayname {
    font-size: 0.7rem;
    color: #4a90e2;
    margin-bottom: 0.3rem;
}

/* Светлая тема */
body.light-theme .weather-source {
    color: #718096;
}

body.light-theme .weather-error {
    background: rgba(255, 59, 48, 0.05);
}

body.light-theme .loading-text {
    color: #4a5568;
}
