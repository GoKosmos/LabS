import React from 'react';
import {createRoot} from 'react-dom/client';
import {Heart, Sparkles, Hammer, ShieldCheck, Eye, Clock, Lock, MessageCircleHeart, ArrowRight, Lightbulb, Footprints, HandHeart} from 'lucide-react';
import {Sloth, Monkey} from './Characters.jsx';
import TutorDemo from './TutorDemo.jsx';
import './lool-jool.css';

const whales = [
  {icon: Heart, title: 'Связь', text: 'Тёплая нить между ребёнком и родителем. Помощник не заменяет маму и папу — он помогает ребёнку делиться с ними своими открытиями.'},
  {icon: Sparkles, title: 'Инновации', text: 'Умный ИИ, который подстраивается под возраст, темп и интересы ребёнка. Технологии — мягкие, понятные и безопасные.'},
  {icon: Hammer, title: 'Созидание', text: 'Учимся, чтобы делать мир добрее. Часть прибыли — на детские площадки, программы для семей и поддержку педагогов.'},
];

const steps = [
  {icon: MessageCircleHeart, title: 'Ребёнок приносит задание', text: 'Пишет его или читает вслух. Помощник уточняет, что нужно сделать.'},
  {icon: Lightbulb, title: 'Помощник задаёт вопросы', text: 'Не даёт готовый ответ, а подводит: «Сколько было сначала? Больше или меньше стало?»'},
  {icon: Footprints, title: 'Маленькими шагами', text: 'Если трудно — подсказка попроще, пример с игрушками, пальчики. Ошибка — это нормально.'},
  {icon: HandHeart, title: 'Ребёнок решает сам', text: 'И объясняет, как у него получилось. Родитель получает короткий отчёт.'},
];

const parents = [
  {icon: ShieldCheck, title: 'Безопасные темы', text: 'Только учёба и добрые игры. Неподходящие темы помощник мягко обходит и возвращает к заданию.'},
  {icon: Eye, title: 'Вы видите всё', text: 'Аккаунт родителя, внутри — профиль ребёнка. Отчёт после каждого занятия: что получилось и что повторить.'},
  {icon: Clock, title: 'Время под контролем', text: 'Занятие по умолчанию — до 20 минут, потом помощник предлагает отдохнуть. Лимит задаёте вы.'},
  {icon: Lock, title: 'Без лишних данных', text: 'Помощник не спрашивает адрес, школу, телефон и фото. Данные ребёнка — только с вашего согласия.'},
];

function App() {
  return <div className="lj">
    <header className="lj-header">
      <a className="lj-logo" href="#top" aria-label="Lool & Jool — наверх"><span>Lool</span><i>&amp;</i><span>Jool</span></a>
      <nav>
        <a href="#tutor">Репетитор</a>
        <a href="#parents">Родителям</a>
        <a href="#toys">Игрушки</a>
        <a href="#heart">Сердце</a>
      </nav>
      <a className="lj-btn small" href="#tutor">Попробовать</a>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-text">
          <span className="pill">Тёплые технологии для детей и семьи</span>
          <h1>Учимся играя.<br/><span className="accent">Понимаем сами.</span></h1>
          <p>Lool & Jool — ИИ-помощник для младших школьников. Он не решает за ребёнка, а подводит к ответу вопросами — так, чтобы ребёнок почувствовал: «Я могу!»</p>
          <div className="hero-actions">
            <a className="lj-btn" href="#tutor">Попробовать репетитора <ArrowRight size={18}/></a>
            <a className="lj-btn ghost" href="#parents">Для родителей</a>
          </div>
          <div className="hero-grades"><b>1–4 класс</b><span>математика · русский язык · чтение · окружающий мир</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="blob b1"/><div className="blob b2"/>
          <Sloth className="hero-sloth"/>
          <Monkey className="hero-monkey"/>
          <div className="speech s1">Сколько было сначала?</div>
          <div className="speech s2">Я сам понял!</div>
        </div>
      </section>

      <section className="name-story">
        <div className="letters" aria-hidden="true"><span>L</span><span>o</span><span>o</span><span>l</span></div>
        <div>
          <h2>Откуда имя</h2>
          <p><b>Jool</b> — это Юлия, основатель проекта: забота, структура и развитие. <b>Lool</b> — творческий импульс её сына Артёма, который в детстве слепил эти буквы из пластилина. Lool & Jool — это ребёнок и взрослый, которые учатся и растут вместе.</p>
        </div>
      </section>

      <section className="whales">
        <h2 className="section-title">Три кита Lool & Jool</h2>
        <div className="grid three">
          {whales.map(({icon: Icon, title, text}, i) => <article key={title} className={`card tone-${i + 1}`}>
            <div className="card-icon"><Icon size={26}/></div><h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </section>

      <section className="tutor-section" id="tutor">
        <div className="tutor-intro">
          <span className="pill">Первый помощник</span>
          <h2 className="section-title left">Репетитор, который<br/>не решает за ребёнка</h2>
          <p>Попробуйте сами: выберите предмет и отвечайте за ребёнка. Нажмите «Просто скажи ответ» — и посмотрите, что сделает помощник.</p>
          <ol className="how">
            {steps.map(({icon: Icon, title, text}) => <li key={title}><span className="how-icon"><Icon size={20}/></span><div><b>{title}</b><p>{text}</p></div></li>)}
          </ol>
        </div>
        <TutorDemo/>
      </section>

      <section className="parents" id="parents">
        <h2 className="section-title">Родителям: спокойно и прозрачно</h2>
        <div className="grid four">
          {parents.map(({icon: Icon, title, text}, i) => <article key={title} className={`card tone-${(i % 3) + 1}`}>
            <div className="card-icon"><Icon size={24}/></div><h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
        <div className="care-note">
          <ShieldCheck size={22}/>
          <p>Если ребёнок напишет, что ему страшно, больно или его обижают, помощник прекращает урок, бережно советует рассказать взрослому, которому он доверяет, и даёт номер детского телефона доверия <b>8-800-2000-122</b>. Родитель получает сигнал.</p>
        </div>
      </section>

      <section className="toys" id="toys">
        <div className="toys-art" aria-hidden="true">
          <div className="toy-frame"><Monkey/><span className="screen">А + Б</span></div>
        </div>
        <div>
          <span className="pill">В разработке</span>
          <h2 className="section-title left">Друг, которого можно обнять</h2>
          <p>Мягкие игрушки Lool & Jool — Ленивец, Обезьянка и их друзья. Цифровые глаза, которые отражают эмоции, экран для букв и сказок, голосовой помощник и тот же бережный подход к учёбе.</p>
          <p className="muted">Безопасность — с первого дня: детские стандарты, никаких опасных деталей, прозрачные правила для голосовых данных.</p>
        </div>
      </section>

      <section className="heart" id="heart">
        <Heart size={34} className="heart-icon"/>
        <h2>Сердце Lool & Jool</h2>
        <blockquote>«Мы верим, что технологии имеют смысл только тогда, когда они служат добру. Мы обнимаем не только ребёнка — мы обнимаем города, помогая тем, кто помогает другим».</blockquote>
        <div className="heart-list">
          <span>Инклюзивные детские площадки</span>
          <span>Программы для семей</span>
          <span>Гранты учителям и наставникам</span>
          <span>Игры о доброте и взаимопомощи</span>
        </div>
      </section>
    </main>

    <footer className="lj-footer">
      <span>Lool & Jool — «Здесь рождается то, чего ещё не было»</span>
      <a href="../">Часть экосистемы Лаборатории Счастья</a>
    </footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
