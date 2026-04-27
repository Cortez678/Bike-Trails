// ========== КЛЮЧИ ДЛЯ ХРАНЕНИЯ ==========
const QUESTIONS_KEY = 'bike_trails_questions';

// ========== БАЗА ЗНАНИЙ ДЛЯ АВТОМАТИЧЕСКИХ ОТВЕТОВ (на двух языках) ==========
const knowledgeBase = {
    ru: [
        {
            keywords: ["колесо", "прокол", "спустило", "камера", "шина", "покрышка"],
            answer: "🔧 **Что делать при проколе колеса:**\n\n1. Снимите колесо\n2. Достаньте камеру и найдите место прокола (поможет вода или дыхание)\n3. Загрунтуйте место, наклейте заплатку\n4. Проверьте, нет ли в покрышке осколка\n5. Установите камеру и накачайте колесо\n\n💡 **Совет:** Всегда имейте с собой насос, запасную камеру и набор заплаток!"
        },
        {
            keywords: ["цепь", "соскочила", "слетела", "застряла", "звезда"],
            answer: "🔧 **Что делать, если слетела цепь:**\n\n1. Установите цепь на маленькую звезду спереди и сзади\n2. Аккуратно проворачивайте педали назад\n3. Если застряла между рамой и звездой — покачайте педали назад\n\n💡 **Совет:** Регулярно проверяйте натяжение цепи и смазывайте её."
        },
        {
            keywords: ["тормоз", "скрип", "плохо тормозит", "визг", "колодки"],
            answer: "🔧 **Что делать, если тормоза скрипят или плохо тормозят:**\n\n1. Проверьте, не масляные ли колодки\n2. Отцентрируйте суппорт\n3. Притрите колодки — сделайте несколько резких торможений\n\n💡 **Совет:** При замене колодок всегда меняйте их парами."
        },
        {
            keywords: ["каретка", "стук", "скрип педали", "шатун"],
            answer: "🔧 **Что делать, если стучит каретка:**\n\n1. Проверьте затяжку шатунов\n2. Если не помогает — возможно, износ подшипников\n3. До сервиса можно ехать без резких нагрузок"
        },
        {
            keywords: ["переключение", "не переключает", "манетка", "тросик", "скорость"],
            answer: "🔧 **Что делать, если проблемы с переключением:**\n\n1. Проверьте натяжение тросика\n2. Очистите и смажьте тросик\n3. Проверьте, не погнут ли переключатель\n\n💡 **Совет:** Если не уверены — лучше обратиться к механику."
        },
        {
            keywords: ["седло", "сиденье", "больно", "неудобно"],
            answer: "🔧 **Что делать, если неудобно сидеть:**\n\n1. Отрегулируйте высоту и наклон седла\n2. Попробуйте другое седло с выемкой\n\n💡 **Совет:** Велошорты с памперсом решают 80% проблем!"
        }
    ],
    en: [
        {
            keywords: ["wheel", "flat", "puncture", "tire", "tube"],
            answer: "🔧 **What to do if you get a flat tire:**\n\n1. Remove the wheel\n2. Take out the tube and find the puncture\n3. Sand the area, apply a patch\n4. Check the tire for debris\n5. Install the tube and inflate the tire\n\n💡 **Tip:** Always carry a pump, spare tube and patch kit!"
        },
        {
            keywords: ["chain", "fell off", "dropped", "stuck"],
            answer: "🔧 **What to do if the chain falls off:**\n\n1. Put the chain on the small sprocket\n2. Carefully turn the pedals backward\n3. If stuck between frame and sprocket — rock the pedals back\n\n💡 **Tip:** Regularly check chain tension and lubricate it."
        },
        {
            keywords: ["brake", "squeak", "squeal", "noise", "pad"],
            answer: "🔧 **What to do if brakes squeak or work poorly:**\n\n1. Check if pads are contaminated\n2. Center the caliper\n3. Bed in the pads with several hard stops\n\n💡 **Tip:** Always replace pads in pairs."
        },
        {
            keywords: ["bottom bracket", "creak", "pedal", "crank"],
            answer: "🔧 **What to do if the bottom bracket is creaking:**\n\n1. Check crank arm bolts\n2. If not fixed — bearings may be worn\n3. Ride gently until you can get service"
        },
        {
            keywords: ["shift", "gears", "derailleur", "cable"],
            answer: "🔧 **What to do if shifting is problematic:**\n\n1. Check cable tension\n2. Clean and lubricate the cable\n3. Check if derailleur is bent\n\n💡 **Tip:** If unsure, better see a mechanic."
        },
        {
            keywords: ["saddle", "seat", "uncomfortable", "pain"],
            answer: "🔧 **What to do if the saddle is uncomfortable:**\n\n1. Adjust height and tilt\n2. Try a different saddle with a cutout\n\n💡 **Tip:** Quality cycling shorts solve 80% of comfort issues!"
        }
    ]
};

// ========== ФУНКЦИЯ АВТОМАТИЧЕСКОГО ОТВЕТА ==========
function findAutoAnswer(questionText, lang = 'ru') {
    const lowerText = questionText.toLowerCase();
    const kb = knowledgeBase[lang] || knowledgeBase.ru;
    
    for (const category of kb) {
        for (const keyword of category.keywords) {
            if (lowerText.includes(keyword)) {
                return category.answer;
            }
        }
    }
    
    if (lang === 'en') {
        return "❓ **Answer not found in knowledge base.**\n\nPlease rephrase your question or contact administrator in Telegram: @ogmark17\n\nMeanwhile, here is general advice: check all bolts, lubricate the chain and inspect wheels for damage. 🚴‍♂️";
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
        const currentLang = localStorage.getItem('bike_trails_lang') || 'ru';
        const defaultQuestions = [
            {
                id: 1,
                title: currentLang === 'ru' ? "Проколол колесо, что делать?" : "Got a flat tire, what to do?",
                text: currentLang === 'ru' ? "Еду по маршруту, внезапно спустило колесо. Рядом нет веломастерской." : "Riding along, suddenly got a flat tire. No bike shop nearby.",
                answer: findAutoAnswer("проколол колесо", currentLang),
                isAutoAnswer: true,
                author: currentLang === 'ru' ? "Райдер" : "Rider",
                date: new Date().toISOString()
            },
            {
                id: 2,
                title: currentLang === 'ru' ? "Слетела цепь, как исправить?" : "Chain fell off, how to fix?",
                text: currentLang === 'ru' ? "Цепь соскочила и застряла между рамой и звездой" : "Chain came off and got stuck between frame and sprocket",
                answer: findAutoAnswer("слетела цепь", currentLang),
                isAutoAnswer: true,
                author: currentLang === 'ru' ? "Райдер" : "Rider",
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
    const currentLang = localStorage.getItem('bike_trails_lang') || 'ru';
    const fullText = title + " " + text;
    const autoAnswer = findAutoAnswer(fullText, currentLang);
    
    const newQuestion = {
        id: Date.now(),
        title: title,
        text: text,
        answer: autoAnswer,
        isAutoAnswer: true,
        author: currentLang === 'ru' ? "Пользователь" : "User",
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

// Форматирование текста
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
    const currentLang = localStorage.getItem('bike_trails_lang') || 'ru';
    
    if (sortedQuestions.length === 0) {
        container.innerHTML = `<div class="empty-questions">${currentLang === 'ru' ? '🤔 Пока нет вопросов. Будьте первым!' : '🤔 No questions yet. Be the first!'}</div>`;
        return;
    }
    
    container.innerHTML = sortedQuestions.map(q => `
        <div class="question-item" data-id="${q.id}">
            <div class="question-title">
                <span>❓ ${escapeHtml(q.title)}</span>
                <span class="answer-badge">${currentLang === 'ru' ? '✅ Есть ответ' : '✅ Has answer'}</span>
            </div>
            <div class="question-meta">
                👤 ${escapeHtml(q.author)} • 📅 ${formatDate(q.date)}
                ${q.isAutoAnswer ? (currentLang === 'ru' ? '<span style="margin-left: 0.5rem;">🤖 Автоответ</span>' : '<span style="margin-left: 0.5rem;">🤖 Auto-reply</span>') : ''}
            </div>
            <div class="question-text">
                📝 ${escapeHtml(q.text)}
            </div>
            <div class="question-answer">
                <strong>${currentLang === 'ru' ? '💡 Ответ:' : '💡 Answer:'}</strong><br>
                ${formatText(escapeHtml(q.answer))}
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.question-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('open');
        });
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    initDefaultQuestions();
    displayQuestions();
    
    const submitBtn = document.getElementById('submitQuestionBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const title = document.getElementById('questionTitle').value.trim();
            const text = document.getElementById('questionText').value.trim();
            const currentLang = localStorage.getItem('bike_trails_lang') || 'ru';
            
            if (!title || !text) {
                alert(currentLang === 'ru' ? '❌ Пожалуйста, заполните и тему, и описание проблемы' : '❌ Please fill in both subject and description');
                return;
            }
            
            addQuestion(title, text);
            document.getElementById('questionTitle').value = '';
            document.getElementById('questionText').value = '';
            displayQuestions();
            
            alert(currentLang === 'ru' ? '✅ Ваш вопрос отправлен! Нажмите на него, чтобы увидеть ответ.' : '✅ Your question has been sent! Click on it to see the answer.');
        });
    }
});
