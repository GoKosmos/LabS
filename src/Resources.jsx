import React, {useState} from 'react';
import {Sparkles, ArrowLeft, ArrowUpRight, Compass, Dna, Leaf} from 'lucide-react';

const packages = [
  {tokens:300000, price:350, title:'Первый шаг', caption:'Чтобы познакомиться с проводниками', Icon:Leaf},
  {tokens:1000000, price:1000, title:'В своём ритме', caption:'Для регулярных разговоров и открытий', Icon:Compass},
  {tokens:3500000, price:2500, title:'Глубже в себя', caption:'Больше пространства для исследования себя', Icon:Dna, featured:true},
];
const format = value => new Intl.NumberFormat('ru-RU').format(value);

export default function Resources({user, onLogin, onBack}) {
  const [selected, setSelected] = useState(null);
  return <section className="resources-page" aria-labelledby="resources-title">
    <button className="resources-back" onClick={onBack}><ArrowLeft size={16}/> На главную</button>
    <div className="resources-heading"><span className="eyebrow">ПРОСТРАНСТВО ДЛЯ НОВЫХ ОТКРЫТИЙ</span>
      <h1 id="resources-title"><Sparkles size={28}/> Ресурсы творения</h1>
      <p>Пополни запас токенов для общения с ИИ-проводниками.</p>
    </div>
    <div className="resource-account glass"><div><span className="eyebrow">АККАУНТ ДЛЯ ПОПОЛНЕНИЯ</span>
      {user?.email ? <strong>{user.email}</strong> : <><strong>Войди в своё пространство</strong><p>Чтобы связать покупку с твоим аккаунтом.</p></>}
    </div>{!user && <button className="primary-button" onClick={onLogin}>Войти <ArrowUpRight size={16}/></button>}</div>
    <h2 className="resources-subtitle">Выбери свой запас токенов</h2>
    <div className="resource-packages">{packages.map(({tokens, price, title, caption, Icon, featured}) =>
      <article key={tokens} className={`resource-package glass${featured?' resource-featured':''}`}>
        {featured && <span className="resource-badge">Выгоднее за токен</span>}
        <div className="resource-symbol"><Icon size={34} strokeWidth={1.4}/></div>
        <h3>{title}</h3><p className="resource-caption">{caption}</p>
        <div className="resource-price"><strong>{format(price)} ₽</strong><span>{format(tokens)} токенов</span></div>
        <p className="resource-use">Интеграция, Проводник<br/>и личный ИИ-консультант</p>
        <button className="resource-buy" onClick={() => setSelected(tokens)}>Пополнить <ArrowUpRight size={17}/></button>
      </article>)}
    </div>
    {selected && <div className="resource-payment-notice glass" role="status"><strong>Выбран пакет {format(selected)} токенов</strong><p>Онлайн-оплата пока недоступна. Возможность покупки появится после подключения платёжного сервиса.</p><button className="resources-back" onClick={()=>setSelected(null)}>Понятно</button></div>}
    <div className="resource-info glass"><Sparkles size={22}/><div><h3>Единый баланс для всех проводников</h3><p>Выбирай, что нужно прямо сейчас: работа с убеждениями, разговор с Проводником или свободный диалог с личным ИИ-консультантом.</p><p>Покупка пакета — разовое пополнение, без подписки и автоматических платежей.</p></div></div>
  </section>;
}
