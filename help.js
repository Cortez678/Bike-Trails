// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const QUESTIONS_KEY = 'bike_trails_questions';

// ========== НАЧАЛЬНЫЕ ВОПРОСЫ С ОТВЕТАМИ ==========
const defaultQuestions = [
    {
        id: 1,
        title: "Проколол колесо, что делать?",
        text: "Еду по маршруту, внезапно спустило колесо. Рядом нет веломастерской.",
        answer: "1. Снимите колесо. 2. Достаньте камеру и найдите место прокола (поможет вода или дыхание). 3. Загрунтуйте место, наклейте заплатку. 4. Проверьте, нет ли в покрышке осколка. 5. Установите камеру и накачайте колесо. Всегда имейте с собой насос, запасную камеру и заплатки!",
        author: "Райдер",
        date: new Date().toISOString()
    },
    {
        id: 2,
        title: "Как подготовиться к долгой поездке?",
        text: "Планирую проехать 50+ км. Что взять с собой?",
        answer: "Минимальный набор: запасная камера, насос, набор шестигранников, влажные салфетки, батарейка для фонаря, аптечка (пластыри, бинт, обезбол), 1.5-2 литра воды, энергетические батончики, заряженный телефон. И обязательно — сообщите кому-то свой маршрут!",
        author: "Бывалый",
        date: new Date().toISOString()
    },
    {
        id: 3,
        title: "Цепь соскочила и застряла между рамой и звездой",
        text: "Не могу вытащить цепь, всё заклинило.",
        answer: "Не тяните с силой! Аккуратно покачайте педали назад — часто цепь сама выходит. Если нет — снимите заднее колесо, тогда появится доступ. После этого установите цепь на маленькую звезду. Совет: всегда проверяйте натяжение цепи перед поездкой.",
        author: "Механик",
        date: new Date().toISOString()
    },
    {
        id: 4,
        title: "Застучал каретка, что делать?",
        text: "При нажатии на педали слышен стук в районе каретки.",
        answer: "Стук каретки часто появляется из-за разболтанных винтов или износа подшипников. Срочно: проверьте затяжку шатунов (шестигранник на 8). Если не помогает — каретку нужно менять. До сервиса можно ехать, но без резких нагрузок.",
        author: "Мастер",
        date: new Date().toISOString()
    },
    {
        id: 5,
        title: "Тормоза скрипят и плохо тормозят",
        text: "Дисковые тормоза. Шумят и эффективность упала.",
        answer: "1. Проверьте, не масляные ли колодки (замените, если да). 2. Отцентрируйте суппорт: отпустите болты, зажмите тормоз и затяните. 3. Притрите колодки — сделайте несколько резких торможений на скорости. Для дисков также можно использовать специальный очиститель.",
        author: "Сервис",
        date: new Date().toISOString()
    }
];

// ========== ФУНКЦИИ РАБОТЫ С ВОПРОСАМИ ==========

function getQuestions() {
    const questions = localStorage.getItem(QUESTIONS_KEY);
    if (questions) {
        return JSON.parse(questions);
    } else {
        // Если вопросов нет — сохраняем начальные
        saveQuestions(defaultQuestions);
        return defaultQuestions;
    }
}

function saveQuestions(questions) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

// Добавить новый вопрос
function addQuestion(title, text) {
    const questions = getQuestions();
    const newQuestion = {
        id: Date.now(),
        title: title,
        text: text,
        answer: null,
        author: "Пользователь",
        date: new Date().toISOString()
    };
    questions.push(newQuestion);
    saveQuestions(questions);
    return newQuestion;
}

// Добавить ответ на вопрос (только для администратора, но пока простая версия)
function addAnswer(questionId, answer) {
    const questions = getQuestions();
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
        questions[questionIndex].answer = answer;
        saveQuestions(questions);
        return true;
    }
    return false;
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

// Отображение списка вопросовfunction displayQuestions() {
    const container = document.getElementById('questionsList');
    const questions = getQuestions();
    
    // Сортируем от новых к старым
    const sortedQuestions = [...questions].reverse();
    
    if (sortedQuestions.length === 0) {
        container.innerHTML = '<div class="empty-questions">🤔 Пока нет вопросов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = sortedQuestions.map(q => `
        <div class="question-item" data-id="${q.id}">
            <div class="question-title">
                <span>❓ ${escapeHtml(q.title)}</span>
                ${q.answer ? '<span class="answer-badge">✅ Есть ответ</span>' : '<span class="no-answer">⏳ Ждёт ответа</span>'}
            </div>
            <div class="question-meta">
                👤 ${escapeHtml(q.author || 'Райдер')} • 📅 ${formatDate(q.date)}
            </div>
            <div class="question-text">
                ${escapeHtml(q.text)}
            </div>
            <div class="question-answer">
                <strong>💡 Ответ:</strong><br>
                ${q.answer ? escapeHtml(q.answer) : '<em>Скоро появится ответ от сообщества или администратора...</em>'}
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики для раскрытия ответов
    document.querySelectorAll('.question-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
}

// Простая защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========

document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();
    
    // Обработчик отправки вопроса
    const submitBtn = document.getElementById('submitQuestionBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const title = document.getElementById('questionTitle').value.trim();
            const text = document.getElementById('questionText').value.trim();
            
            if (!title || !text) {
                alert('Пожалуйста, заполните и тему, и описание проблемы');
                return;
            }
            
            addQuestion(title, text);
            
            // Очищаем поля
            document.getElementById('questionTitle').value = '';
            document.getElementById('questionText').value = '';
            
            // Обновляем список
            displayQuestions();
            
            alert('Ваш вопрос отправлен! Ответ появится скоро.');
        });
    }
});
