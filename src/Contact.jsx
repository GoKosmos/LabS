import React, {useState} from 'react';
import {ArrowLeft, ArrowUpRight, Copy, Mail} from 'lucide-react';

export default function Contact({user, onLogin, onBack}) {
  const [status, setStatus] = useState('');
  async function copy() {
    try {await navigator.clipboard.writeText(user.id); setStatus('ID скопирован. Вставь его в письмо или сообщение.');}
    catch {setStatus('Выдели ID в поле и скопируй его вручную.');}
  }
  return <section className="resources-page" aria-labelledby="contact-title">
    <button className="resources-back" onClick={onBack}><ArrowLeft size={16}/> На главную</button>
    <div className="resources-heading"><span className="eyebrow">МЫ ВСЕГДА НА СВЯЗИ</span>
      <h1 id="contact-title"><Mail size={28}/> Центр Связи</h1>
      <p>Если что-то пошло не так или появился вопрос — напиши нам.</p>
    </div>
    <div className="contact-grid">
      <article className="manual-card glass">
        <h2>Техподдержка</h2>
        <p>С любым вопросом пиши на почту:<br/><b>(контакт)</b></p>
        <p>Или в Telegram:<br/><b>(контакт)</b></p>
        <p>Обязательно добавь в письмо или сообщение свой ID аккаунта — по нему мы быстро найдём тебя в системе.</p>
      </article>
      <article className="manual-card glass">
        <h2>ID аккаунта</h2>
        {user ? <>
          <input className="referral-input contact-id" value={user.id} readOnly aria-label="ID аккаунта" onFocus={event => event.target.select()}/>
          <button className="resource-buy contact-copy" onClick={copy}><Copy size={17}/> Копировать ID</button>
          <p className="referral-status" role="status">{status}</p>
        </> : <>
          <p>ID появится здесь, когда ты войдёшь в аккаунт.</p>
          <button className="primary-button contact-login" onClick={onLogin}>Войти <ArrowUpRight size={16}/></button>
        </>}
      </article>
    </div>
  </section>;
}
