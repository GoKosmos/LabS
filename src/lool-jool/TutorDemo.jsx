import React, {useEffect, useRef, useState} from 'react';
import {Calculator, BookA, BookOpen, Leaf, RotateCcw, ClipboardList, Sparkles} from 'lucide-react';
import {Sloth, Monkey} from './Characters.jsx';

// Демо-сценарии репетитора: показывают педагогику из
// docs/agents/lool-jool-repetitor-system-prompt.md — подводим к ответу, а не решаем.
// Уроки ведут разные герои (как в Duolingo), Джул — главный наставник.
// Настоящий ИИ пока не подключён.

const math = {
  teacher: 'Обезьянка',
  grade: '2 класс',
  task: 'У Маши было 7 яблок. Она дала 3 яблока брату. Потом мама дала ей ещё 5. Сколько яблок стало у Маши?',
  start: 'start',
  steps: {
    start: {bot: 'Привет! Давай решим задачу вместе. С чего начнём?', options: [['Сначала 7 − 3', 'count1'], ['Просто скажи ответ', 'noAnswer'], ['Не знаю, с чего начать', 'begin']]},
    noAnswer: {bot: 'Я хочу, чтобы у тебя получилось без готового ответа — это быстро, обещаю! Сколько яблок было у Маши в самом начале?', options: [['7', 'gave'], ['3', 'wrongStart']]},
    begin: {bot: 'Давай по порядку, как в истории. Сколько яблок было у Маши в самом начале?', options: [['7', 'gave'], ['3', 'wrongStart']]},
    wrongStart: {bot: '3 — это сколько она отдала брату. Прочитай начало ещё раз: «У Маши было…»', options: [['7', 'gave']]},
    gave: {bot: 'Верно, 7! Потом она дала 3 яблока брату. Яблок стало больше или меньше?', options: [['Меньше', 'sign1'], ['Больше', 'wrongMore']]},
    wrongMore: {bot: 'Представь: у тебя 7 конфет, и 3 ты отдаёшь другу. Конфет станет больше или меньше?', options: [['Меньше', 'sign1']]},
    sign1: {bot: 'Да! Значит, какое действие?', options: [['7 − 3', 'count1'], ['7 + 3', 'wrongPlus']]},
    wrongPlus: {bot: 'Когда отдаём, становится меньше. Плюс или минус?', options: [['7 − 3', 'count1']]},
    count1: {bot: 'Отличное начало! Сколько получится 7 − 3?', options: [['4', 'step2'], ['5', 'fingers']]},
    fingers: {bot: 'Давай проверим на пальчиках: покажи 7, а теперь загни 3. Сколько осталось?', options: [['4', 'step2']]},
    step2: {bot: 'Да, у Маши осталось 4 яблока 🍎 А потом мама дала ещё 5. Что делаем теперь?', options: [['4 + 5', 'count2'], ['4 − 5', 'wrongMinus']]},
    wrongMinus: {bot: 'Мама дала яблоки — их стало больше. Какой знак нужен?', options: [['4 + 5', 'count2']]},
    count2: {bot: 'Сколько будет 4 + 5?', options: [['9', 'done'], ['8', 'countOn']]},
    countOn: {bot: 'Почти! Начни с 5 и досчитай ещё 4 шага: 6, 7, 8…', options: [['9', 'done']]},
    done: {bot: 'Ура, 9 яблок! Задача в два действия решена: сначала минус, потом плюс. Хочешь похожую задачу или закончим?', options: [['Закончим', 'end']]},
    end: {bot: 'Хорошо поработали! Расскажи маме или папе, как ты решал(а) задачу — им будет интересно.', report: ['Математика, 2 класс: задача в два действия.', 'Сам(а) выбрал(а) действия и посчитал(а).', 'Подсказок понадобилось: {hints}.', 'Дома: задачи «было — отдали — дали ещё» с игрушками.'], options: []},
  },
};

const russian = {
  teacher: 'Ленивец',
  grade: '2 класс',
  task: 'Вставь пропущенную букву: в_да.',
  start: 'start',
  steps: {
    start: {bot: 'Привет! В слове «в_да» пропала буква. Как думаешь, какая?', options: [['о', 'how'], ['а', 'trick'], ['Скажи ответ', 'noAnswer']]},
    noAnswer: {bot: 'Давай найдём вместе — этот способ пригодится ещё много раз! Измени слово: одна вода, а много…?', options: [['вОды', 'found'], ['водА', 'stress']]},
    how: {bot: 'А как проверить, что там «о»? Нужно слово, где эта буква под ударением. Одна вода, а много…?', options: [['вОды', 'found'], ['Не знаю', 'stress']]},
    trick: {bot: 'Гласная без ударения иногда обманывает — слышится не то, что пишется. Давай проверим: одна вода, а много…?', options: [['вОды', 'found'], ['водА', 'stress']]},
    stress: {bot: 'В слове «вода» ударная — последняя буква. А нам нужно, чтобы ударной стала первая. Скажи: «много в_ды»?', options: [['вОды', 'found']]},
    found: {bot: 'Точно — вОды! Слышишь, «о» звучит ясно. Значит, пишем «вода». Попробуем ещё одно слово?', options: [['Давай', 'task2'], ['Закончим', 'end']]},
    task2: {bot: 'Слово «л_са». Подбери проверочное слово.', options: [['лИсы', 'done'], ['лЕс', 'forest']]},
    forest: {bot: 'Лес — это другое слово, там растут деревья 🌲 А нам нужна сама лиса. Одна лиса, а много…?', options: [['лИсы', 'done']]},
    done: {bot: 'Верно, лИсы — значит, «лиса». Ты нашёл(ла) проверочное слово — это главный способ!', options: [['Закончим', 'end']]},
    end: {bot: 'Хорошо поработали! Покажи дома, как ты проверяешь безударную гласную.', report: ['Русский язык, 2 класс: безударная гласная в корне.', 'Понимает, что проверочное слово меняет ударение.', 'Подсказок понадобилось: {hints}.', 'Дома: игра «одно — много» с любыми словами.'], options: []},
  },
};

const subjects = [
  {id: 'math', title: 'Математика', icon: Calculator, script: math},
  {id: 'russian', title: 'Русский язык', icon: BookA, script: russian},
  {id: 'reading', title: 'Чтение', icon: BookOpen},
  {id: 'world', title: 'Окружающий мир', icon: Leaf},
];

const hintSteps = new Set(['noAnswer', 'begin', 'wrongStart', 'wrongMore', 'wrongPlus', 'fingers', 'wrongMinus', 'countOn', 'trick', 'stress', 'forest']);

export default function TutorDemo() {
  const [subject, setSubject] = useState(subjects[0]);
  const [log, setLog] = useState([]);
  const [step, setStep] = useState(null);
  const [typing, setTyping] = useState(false);
  const scroller = useRef(null);
  const script = subject.script;

  const reset = (s = subject) => {
    setSubject(s);
    if (!s.script) {setLog([]); setStep(null); return;}
    setLog([{who: 'task', text: s.script.task}, {who: 'bot', text: s.script.steps[s.script.start].bot}]);
    setStep(s.script.start);
  };
  useEffect(() => reset(subjects[0]), []);
  useEffect(() => {const el = scroller.current; if (el) el.scrollTop = el.scrollHeight;}, [log, typing]);

  const choose = ([label, next]) => {
    setLog(l => [...l, {who: 'kid', text: label}]);
    setTyping(true);
    setStep(null);
    setTimeout(() => {
      setTyping(false);
      setLog(l => [...l, {who: 'bot', text: script.steps[next].bot, step: next}]);
      setStep(next);
    }, 650);
  };

  const current = step && script?.steps[step];
  const hints = log.filter(m => hintSteps.has(m.step)).length;

  return <div className="tutor">
    <div className="tutor-subjects" role="tablist" aria-label="Предмет">
      {subjects.map(s => {const Icon = s.icon; return <button key={s.id} role="tab" aria-selected={subject.id === s.id} className={`subject ${subject.id === s.id ? 'on' : ''}`} onClick={() => reset(s)}>
        <Icon size={18}/><span>{s.title}</span>{!s.script && <em>скоро</em>}
      </button>;})}
    </div>
    <div className="tutor-window">
      <div className="tutor-head">
        <div className={`tutor-avatar ${script ? '' : 'jool'}`}>{!script ? <Sparkles size={22}/> : script.teacher === 'Обезьянка' ? <Monkey/> : <Sloth/>}</div>
        <div><b>{script ? script.teacher : 'Джул'}</b><span>{script ? script.grade + ' · ' + subject.title : subject.title}</span></div>
        {script && <button className="tutor-reset" onClick={() => reset()} aria-label="Начать заново"><RotateCcw size={17}/></button>}
      </div>
      <div className="tutor-log" ref={scroller} aria-live="polite">
        {!script && <p className="tutor-soon">Этот предмет скоро появится — я уже подбираю для него героя. А пока попробуй математику с Обезьянкой или русский язык с Ленивцем.</p>}
        {log.map((m, i) => m.who === 'task'
          ? <div key={i} className="task-card"><small>Задание</small>{m.text}</div>
          : <div key={i} className={`bubble ${m.who}`}>{m.text}</div>)}
        {typing && <div className="bubble bot typing"><i/><i/><i/></div>}
        {step && current?.report && <div className="report-card">
          <b><ClipboardList size={16}/> Отчёт для родителя</b>
          <ul>{current.report.map(r => <li key={r}>{r.replace('{hints}', hints)}</li>)}</ul>
        </div>}
      </div>
      <div className="tutor-options">
        {current?.options.map(o => <button key={o[0]} onClick={() => choose(o)}>{o[0]}</button>)}
        {current && !current.options.length && <button className="again" onClick={() => reset()}><RotateCcw size={15}/> Ещё раз</button>}
      </div>
      <small className="tutor-note">Демонстрация · ИИ пока не подключён · ответы выбираются кнопками</small>
    </div>
  </div>;
}
