// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const QUESTIONS_KEY = 'bike_trails_questions';

// ========== БАЗА ЗНАНИЙ ДЛЯ АВТОМАТИЧЕСКИХ ОТВЕТОВ ==========
const knowledgeBase = [
    {
        keywords: ["колесо", "прокол", "спустило", "камера", "шина", "покрышка"],
        answer: "🔧 **Что делать при проколе колеса:**\n\n1. Снимите колесо\n2. Достаньте камеру и найдите место прокола (поможет вода или дыхание)\n3. Загрунтуйте место, наклейте заплатку\n4. Проверьте, нет ли в покрышке осколка\n5. Установите камеру и накачайте колесо\n\n💡 **Совет:** Всегда имейте с собой насос, запасную камеру и набор заплаток!"
    },
    {
        keywords: ["цепь", "соскочила", "слетела", "застряла", "звезда"],
        answer: "🔧 **Что делать, если слетела цепь:**\n\n1. Установите цепь на маленькую звезду спереди и сзади\n2. Аккуратно проворачивайте педали назад\n3. Если застряла между рамой и звездой — покачайте педали назад\n4. Если нет — снимите заднее колесо\n\n💡 **Совет:** Регулярно проверяйте натяжение цепи и смазывайте её."
    },
    {
        keywords: ["тормоз", "скрип", "плохо тормозит", "визг", "колодки"],
        answer: "🔧 **Что делать, если тормоза скрипят или плохо тормозят:**\n\n1. Проверьте, не масляные ли колодки\n2. Отцентрируйте суппорт: отпустите болты, зажмите тормоз и затяните\n3. Притрите колодки — сделайте несколько резких торможений\n4. Очистите тормозной диск спиртом\n\n💡 **Совет:** При замене колодок всегда меняйте их парами."
    },
    {
        keywords: ["каретка", "стук", "скрип педали", "шатун"],
        answer: "🔧 **Что делать, если стучит каретка:**\n\n1. Проверьте затяжку шатунов (шестигранник на 8)\n2. Если не помогает — возможно, износ подшипников\n3. До сервиса можно ехать без резких нагрузок\n4. В долгосрочной перспективе — замена каретки"
    },
    {
        keywords: ["переключение", "не переключает", "манетка", "тросик", "скорость"],
        answer: "🔧 **Что делать, если проблемы с переключением:**\n\n1. Проверьте натяжение тросика — покрутите винт на манетке\n2. Очистите и смажьте тросик\n3. Проверьте, не погнут ли переключатель\n4. Отрегулируйте винты H и L\n\n💡 **Совет:** Если не уверены — лучше обратиться к механику."
    },
    {
        keywords: ["седло", "сиденье", "больно", "неудобно"],
        answer: "🔧 **Что делать, если неудобно сидеть:**\n\n1. Отрегулируйте высоту седла\n2. Отрегулируйте наклон — горизонтально или чуть вниз\n3. Попробуйте другое седло с выемкой\n\n💡 **Совет:** Велошорты с памперсом решают 80% проблем!"
    },
    {
        keywords: ["руль", "болят руки", "немеют"],
        answer: "🔧 **Что делать, если болят или немеют руки:**\n\n1. Отрегулируйте высоту и угол руля\n2. Купите велоперчатки с гелем\n3. Меняйте положение рук во время езды\n4. Делайте перерывы каждые 30-40 минут"
    }
];

// ========== ФУНКЦИЯ АВТОМАТИЧЕСКОГО ОТВЕТА ==========
function findAutoAnswer(questionText) {
    const lowerText = questionText.toLowerCase();
    
    for (const category of knowledgeBase) {
        for (const keyword of category.keywords) {
            if (lowerText.includes(keyword)) {
                return category.answer;
            }
        }
    }
    
    return "❓ **Совет от сообщества:**\n\nК сожалению, автоматический ответ не найден. Попробуйте переформулировать вопрос или обратитесь к администратору в Telegram: @ogmark17\n\nА пока вот универсальный совет: проверьте затяжку всех болтов, смажьте цепь и осмотрите колёса на предмет повреждений. 🚴‍♂️";
}

// ========== ФУНКЦИИ РАБОТЫ С ВОПРОСАМИ ==========
function getQuestions() {
    const questions = localStorage.getItem(QUESTIONS_KEY);
    if (questions) {
        return JSON.parse(questions);
    }
    return [];
}

function saveQuestions(questions) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

// Инициализация начальными вопросами
function initDefaultQuestions() {
    const existing = getQuestions();
    if (existing.length === 0) {
        const defaultQuestions = [{
                id: 1,
                title: "Проколол колесо, что делать?",
                text: "Еду по маршруту, внезапно спустило колесо. Рядом нет веломастерской.",
                answer: findAutoAnswer("проколол колесо что делать"),
                isAutoAnswer: true,
                author: "Райдер",
                date: new Date().toISOString()
            },
            {
                id: 2,
                title: "Слетела цепь, как исправить?",
                text: "Цепь соскочила и застряла между рамой и звездой",
                answer: findAutoAnswer("слетела цепь"),
                isAutoAnswer: true,
                author: "Райдер",
                date: new Date().toISOString()
            },
            {
                id: 3,
                title: "Плохо работают тормоза",
                text: "Тормоза скрипят и плохо тормозят, что делать?",
                answer: findAutoAnswer("тормоза плохо тормозят"),
                isAutoAnswer: true,
                author: "Райдер",
                date: new Date().toISOString()
            }
        ];
        saveQuestions(defaultQuestions);
        return defaultQuestions;
    }
    return existing;
}

// Добавить новый вопрос с автоматическим ответом
function addQuestion(title, text) {
    const questions = getQuestions();
    
    // Генерируем автоматический ответ
    const fullText = title + " " + text;
    const autoAnswer = findAutoAnswer(fullText);
    
    const newQuestion = {
        id: Date.now(),
        title: title,
        text: text,
        answer: autoAnswer,
        isAutoAnswer: true,
        author: "Пользователь",
        date: new Date().toISOString()
    };
    questions.push(newQuestion);
    saveQuestions(questions);
    return newQuestion;
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
}

// Форматирование текста (замена переносов на <br>)
function formatText(text) {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
}

// Защита от XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Отображение списка вопросов
function displayQuestions() {
    const container = document.getElementById('questionsList');
    if (!container) return;
    
    const questions = getQuestions();
    const sortedQuestions = [...questions].reverse();
    
    if (sortedQuestions.length === 0) {
        container.innerHTML = '<div class="empty-questions">🤔 Пока нет вопросов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = sortedQuestions.map(q => `
        <div class="question-item" data-id="${q.id}">
            <div class="question-title">
                <span>❓ ${escapeHtml(q.title)}</span>
                <span class="answer-badge">✅ Есть ответ</span>
            </div>
            <div class="question-meta">
                👤 ${escapeHtml(q.author)} • 📅 ${formatDate(q.date)}
                ${q.isAutoAnswer ? '<span style="margin-left: 0.5rem;">🤖 Автоответ</span>' : ''}
            </div>
            <div class="question-text">
                📝 ${escapeHtml(q.text)}
            </div>
            <div class="question-answer">
                <strong>💡 Ответ:</strong><br>
                ${formatText(escapeHtml(q.answer))}
            </div>
        </div>
    `).join('');
    
    // Обработчики для раскрытия ответов
    document.querySelectorAll('.question-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Не закрываем при клике на кнопку внутри
            if (e.target.tagName === 'BUTTON') return;
            item.classList.toggle('open');
        });
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========document.addEventListener('DOMContentLoaded', () => {
    // Загружаем начальные вопросы, если их нет
    initDefaultQuestions();
    
    // Отображаем вопросы
    displayQuestions();
    
    // Обработчик отправки вопроса
    const submitBtn = document.getElementById('submitQuestionBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const title = document.getElementById('questionTitle').value.trim();
            const text = document.getElementById('questionText').value.trim();
            
            if (!title || !text) {
                alert('❌ Пожалуйста, заполните и тему, и описание проблемы');
                return;
            }
            
            // Добавляем вопрос
            addQuestion(title, text);
            
            // Очищаем поля
            document.getElementById('questionTitle').value = '';
            document.getElementById('questionText').value = '';
            
            // Обновляем список
            displayQuestions();
            
            alert('✅ Ваш вопрос отправлен! Автоматический ответ уже готов. Нажмите на вопрос, чтобы его увидеть.');
        });
    }
});
