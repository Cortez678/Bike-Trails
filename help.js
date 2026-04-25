// Простой и надёжный help.js
console.log('help.js загружен');

// Ключ для хранения
const QUESTIONS_KEY = 'bike_trails_questions';

// База ответов
const answers = {
    'колесо': '🔧 При проколе колеса: снимите колесо, найдите место прокола, наклейте заплатку, накачайте. Всегда имейте запасную камеру!',
    'прокол': '🔧 При проколе колеса: снимите колесо, найдите место прокола, наклейте заплатку, накачайте. Всегда имейте запасную камеру!',
    'цепь': '🔧 Если слетела цепь: поставьте её на маленькую звезду, аккуратно покрутите педали. Если застряла - снимите колесо.',
    'тормоз': '🔧 Проблемы с тормозами: проверьте колодки, отцентрируйте суппорт, притрите колодки резкими торможениями.',
    'скрип': '🔧 Скрип в педалях или каретке: смажьте крепления, проверьте затяжку шатунов.',
    'переключение': '🔧 Не переключает скорости: подкрутите натяжение тросика на манетке, проверьте целостность тросика.',
    'седло': '🔧 Неудобное седло: отрегулируйте высоту и наклон, купите велошорты с памперсом.',
    'руль': '🔧 Болят руки: отрегулируйте руль, купите перчатки с гелем, делайте перерывы.',
    'грязь': '🔧 Уход за велосипедом: мойте после грязных поездок, смазывайте цепь, не используйте керхер.',
    'свет': '🔧 Не работает фонарь: проверьте батарейки, протрите контакты, возьмите запасной налобник.',
    'навигация': '🔧 Заблудились: включите GPS, используйте Maps.me или Komoot, скачивайте офлайн-карты.',
    'погода': '🔧 Плохая погода: всегда берите дождевик, при грозе держитесь подальше от деревьев.'
};

// Функция поиска ответа
function getAutoAnswer(text) {
    const lowerText = text.toLowerCase();
    for (const [keyword, answer] of Object.entries(answers)) {
        if (lowerText.includes(keyword)) {
            return answer;
        }
    }
    return '❓ Ответ не найден. Попробуйте переформулировать вопрос или напишите в Telegram @ogmark17';
}

// Получить вопросы
function getQuestions() {
    const saved = localStorage.getItem(QUESTIONS_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}

// Сохранить вопросы
function saveQuestions(questions) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

// Добавить вопрос
function addQuestion(title, text) {
    const questions = getQuestions();
    const fullText = title + ' ' + text;
    const answer = getAutoAnswer(fullText);
    
    const newQuestion = {
        id: Date.now(),
        title: title,
        text: text,
        answer: answer,
        date: new Date().toLocaleString('ru-RU')
    };
    
    questions.push(newQuestion);
    saveQuestions(questions);
    return newQuestion;
}

// Показать вопросы
function showQuestions() {
    const container = document.getElementById('questionsList');
    if (!container) {
        console.error('Контейнер questionsList не найден');
        return;
    }
    
    const questions = getQuestions();
    
    if (questions.length === 0) {
        container.innerHTML = '<div class="empty-questions">🤔 Пока нет вопросов. Будьте первым!</div>';
        return;
    }
    
    const reversed = [...questions].reverse();
    container.innerHTML = reversed.map(q => `
        <div class="question-item" onclick="this.classList.toggle('open')">
            <div class="question-title">
                <span>❓ ${escapeHtml(q.title)}</span>
                <span class="answer-badge">✅ Есть ответ</span>
            </div>
            <div class="question-meta">
                📅 ${q.date}
            </div>
            <div class="question-text">
                ${escapeHtml(q.text)}
            </div>
            <div class="question-answer">
                <strong>💡 Ответ:</strong><br>
                ${escapeHtml(q.answer).replace(/\n/g, '<br>')}
            </div>
        </div>
    `).join('');
}

// Защита от спецсимволов
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница помощи загружена');
    showQuestions();
    
    const submitBtn = document.getElementById('submitQuestionBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const title = document.getElementById('questionTitle').value.trim();
            const text = document.getElementById('questionText').value.trim();
            
            if (!title || !text) {
                alert('Заполните оба поля');
                return;
            }
            
            addQuestion(title, text);
            document.getElementById('questionTitle').value = '';
            document.getElementById('questionText').value = '';
            showQuestions();
            alert('Вопрос отправлен! Нажмите на него, чтобы увидеть ответ.');
        });
    }
});
