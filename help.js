// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const QUESTIONS_KEY = 'bike_trails_questions';

// ========== БАЗА ЗНАНИЙ ДЛЯ АВТОМАТИЧЕСКИХ ОТВЕТОВ ==========
const knowledgeBase = [
    {
        keywords: ["колесо", "прокол", "спустило", "камера", "шина", "покрышка"],
        answer: "🔧 **Что делать при проколе колеса:**\n\n1. Снимите колесо\n2. Достаньте камеру и найдите место прокола (поможет вода или дыхание)\n3. Загрунтуйте место, наклейте заплатку\n4. Проверьте, нет ли в покрышке осколка\n5. Установите камеру и накачайте колесо\n\n💡 **Совет:** Всегда имейте с собой насос, запасную камеру и набор заплаток!"
    },
    {
        keywords: ["цепь", "соскочила", "слетела", "застряла", "звезда", "переключение"],
        answer: "🔧 **Что делать, если слетела цепь:**\n\n1. Установите цепь на маленькую звезду спереди и сзади\n2. Аккуратно проворачивайте педали назад\n3. Если застряла между рамой и звездой — покачайте педали назад, цепь часто выходит сама\n4. Если нет — снимите заднее колесо\n\n💡 **Совет:** Регулярно проверяйте натяжение цепи и смазывайте её."
    },
    {
        keywords: ["тормоз", "скрип", "плохо тормозит", "визг", "колодки"],
        answer: "🔧 **Что делать, если тормоза скрипят или плохо тормозят:**\n\n1. Проверьте, не масляные ли колодки (замените, если да)\n2. Отцентрируйте суппорт: отпустите болты, зажмите тормоз и затяните\n3. Притрите колодки — сделайте несколько резких торможений на скорости\n4. Очистите тормозной диск специальным средством или спиртом\n\n💡 **Совет:** При замене колодок всегда меняйте их парами."
    },
    {
        keywords: ["каретка", "стук", "скрип педали", "шатун"],
        answer: "🔧 **Что делать, если стучит каретка:**\n\n1. Проверьте затяжку шатунов (шестигранник на 8)\n2. Если не помогает — возможно, износились подшипники\n3. До сервиса можно ехать, но без резких нагрузок\n4. В долгосрочной перспективе — замена каретки\n\n💡 **Совет:** Регулярно смазывайте крепления педалей и каретку."
    },
    {
        keywords: ["переключение", "не переключает", "манетка", "тросик", "скорость"],
        answer: "🔧 **Что делать, если проблемы с переключением скоростей:**\n\n1. Проверьте натяжение тросика — найдите винт на манетке и подкручивайте по четверти оборота\n2. Очистите и смажьте тросик\n3. Проверьте, не погнут ли переключатель\n4. Отрегулируйте винты ограничения хода (H и L)\n\n💡 **Совет:** Если не уверены — лучше обратиться к механику."
    },
    {
        keywords: ["седло", "сиденье", "больно сидеть", "неудобно"],
        answer: "🔧 **Что делать, если неудобно сидеть:**\n\n1. Отрегулируйте высоту седла — нога должна почти выпрямляться в нижней точке педали\n2. Отрегулируйте наклон — обычно горизонтально или чуть вниз носом\n3. Если всё равно неудобно — попробуйте другое седло с выемкой или гелевое\n\n💡 **Совет:** Качественные велошорты с памперсом решают 80% проблем с дискомфортом."
    },
    {
        keywords: ["руль", "болят руки", "немеют", "хват"],
        answer: "🔧 **Что делать, если болят или немеют руки:**\n\n1. Отрегулируйте высоту и угол наклона руля\n2. Купите хорошие велоперчатки с гелем\n3. Меняйте положение рук во время езды\n4. Проверьте правильность посадки — возможно, руль слишком низко\n\n💡 **Совет:** Делайте перерывы каждые 30-40 минут и разминайте кисти."
    },
    {
        keywords: ["грязь", "чистка", "помыть", "уход", "смазка"],
        answer: "🔧 **Как правильно ухаживать за велосипедом:**\n\n1. После каждой грязной поездки мойте велосипед\n2. Сушите цепь и смазывайте её специальной смазкой\n3. Раз в месяц проверяйте затяжку всех болтов\n4. Раз в сезон — полное ТО в веломастерской\n\n💡 **Совет:** Не используйте керхер — вода попадёт в подшипники!"
    },
    {
        keywords: ["свет", "фара", "фонарь", "не горит"],answer: "🔧 **Что делать, если не работает свет:**\n\n1. Проверьте батарейки/зарядку\n2. Протрите контакты спиртом\n3. Проверьте, не окислились ли контакты\n4. Если питание от динамо-втулки — проверьте провода\n\n💡 **Совет:** Всегда имейте запасной налобный фонарь."
    },
    {
        keywords: ["навигация", "заблудился", "карта", "трек", "компас"],
        answer: "🔧 **Что делать, если заблудились на маршруте:**\n\n1. Сохраняйте спокойствие\n2. Включите GPS на телефоне (приложения: Maps.me, Komoot, Strava)\n3. Отследите свой трек назад\n4. Если связи нет — двигайтесь вниз по течению реки или на юг\n\n💡 **Совет:** Всегда скачивайте офлайн-карты перед поездкой и берите с собой power bank."
    },
    {
        keywords: ["погода", "дождь", "гроза", "холод"],
        answer: "🔧 **Что делать при резкой смене погоды:**\n\n1. У вас с собой всегда должен быть дождевик\n2. При грозе — держитесь подальше от отдельно стоящих деревьев\n3. При сильном ветре — снизьте скорость и держите руль двумя руками\n4. При похолодании — наденьте запасную ветровку\n\n💡 **Совет:** Проверяйте прогноз погоды перед выездом."
    }
];

// ========== ФУНКЦИИ ДЛЯ АВТОМАТИЧЕСКИХ ОТВЕТОВ ==========

// Поиск ответа по ключевым словам
function findAutoAnswer(questionText) {
    const lowerText = questionText.toLowerCase();
    
    // Проверяем каждую категорию знаний
    for (const category of knowledgeBase) {
        for (const keyword of category.keywords) {
            if (lowerText.includes(keyword)) {
                return category.answer;
            }
        }
    }
    
    // Если не нашли совпадений
    return "❓ **Ответ не найден в базе знаний.**\n\nПожалуйста, переформулируйте вопрос или обратитесь к администратору в Telegram: @ogmark17\nМы обязательно поможем! 🚴‍♂️";
}

// ========== ФУНКЦИИ РАБОТЫ С ВОПРОСАМИ ==========

function getQuestions() {
    const questions = localStorage.getItem(QUESTIONS_KEY);
    if (questions) {
        return JSON.parse(questions);
    } else {
        saveQuestions(defaultQuestions);
        return defaultQuestions;
    }
}

function saveQuestions(questions) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questions));
}

// Добавить новый вопрос с автоматическим ответом
function addQuestion(title, text) {
    const questions = getQuestions();
    
    // Генерируем автоматический ответ
    const autoAnswer = findAutoAnswer(title + " " + text);
    
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

// Для администратора — возможность дополнить ответ вручную
function updateAnswer(questionId, manualAnswer) {
    const questions = getQuestions();
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
        questions[questionIndex].manualAnswer = manualAnswer;
        questions[questionIndex].answer = manualAnswer;
        questions[questionIndex].isAutoAnswer = false;
        saveQuestions(questions);
        return true;
    }
    return false;
}

// Форматирование даты
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});
}

// Форматирование текста ответа (замена переносов строк на <br>)
function formatAnswer(text) {
    if (!text) return '<em>Скоро появится ответ...</em>';
    return text.replace(/\n/g, '<br>');
}

// Отображение списка вопросов
function displayQuestions() {
    const container = document.getElementById('questionsList');
    const questions = getQuestions();
    
    // Сортируем от новых к старым
    const sortedQuestions = [...questions].reverse();
    
    if (sortedQuestions.length === 0) {container.innerHTML = '<div class="empty-questions">🤔 Пока нет вопросов. Будьте первым!</div>';
        return;
    }
    
    container.innerHTML = sortedQuestions.map(q => `
        <div class="question-item" data-id="${q.id}">
            <div class="question-title">
                <span>❓ ${escapeHtml(q.title)}</span>
                ${q.answer ? '<span class="answer-badge">✅ Есть ответ</span>' : '<span class="no-answer">⏳ Ждёт ответа</span>'}
            </div>
            <div class="question-meta">
                👤 ${escapeHtml(q.author)} • 📅 ${formatDate(q.date)}
                ${q.isAutoAnswer ? '<span style="margin-left: 1rem;">🤖 Ответ сгенерирован автоматически</span>' : ''}
            </div>
            <div class="question-text">
                ${escapeHtml(q.text)}
            </div>
            <div class="question-answer">
                <strong>💡 Ответ:</strong><br>
                ${q.answer ? formatAnswer(escapeHtml(q.answer)) : '<em>Скоро появится ответ...</em>'}
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

// Обновить счётчик вопросов (для админа)
function updateAdminPanel() {
    const questions = getQuestions();
    const unanswered = questions.filter(q => !q.answer || q.answer === '');
    const unansweredContainer = document.getElementById('unansweredCount');
    if (unansweredContainer) {
        unansweredContainer.textContent = unanswered.length;
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========

document.addEventListener('DOMContentLoaded', () => {
    displayQuestions();
    updateAdminPanel();
    
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
            updateAdminPanel();
            
            alert('Ваш вопрос отправлен! Автоматический ответ подготовлен.');
        });
    }
});
