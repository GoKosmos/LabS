import React, {useState} from 'react';
import {Users, Copy, Share2, ArrowLeft, ArrowUpRight} from 'lucide-react';
import {referralLink} from './referrals';

export default function Referrals({user, onLogin, onBack}) {
  const [status, setStatus] = useState('');
  const link = user ? referralLink(user.id) : '';
  async function copy() {
    try {await navigator.clipboard.writeText(link); setStatus('Ссылка скопирована. Можно отправить её друзьям.');}
    catch {setStatus('Выдели ссылку в поле и скопируй её вручную.');}
  }
  async function share() {
    if (!navigator.share) return copy();
    try {await navigator.share({title:'Лаборатория Счастья', text:'Приглашаю тебя в пространство внутренних открытий.', url:link});}
    catch (error) {if (error.name !== 'AbortError') setStatus('Не удалось поделиться. Попробуй скопировать ссылку.');}
  }
  return <section className="resources-page" aria-labelledby="referrals-title">
    <button className="resources-back" onClick={onBack}><ArrowLeft size={16}/> На главную</button>
    <div className="resources-heading"><span className="eyebrow">ОТКРЫТИЯ, КОТОРЫМИ ХОЧЕТСЯ ДЕЛИТЬСЯ</span>
      <h1 id="referrals-title"><Users size={28}/> Пригласи друзей</h1>
      <p>Поделись своим пространством с теми, кому оно может быть близко.</p>
    </div>
    <article className="referral-card glass"><div className="resource-symbol"><Share2 size={30}/></div>
      <h2>Твоя личная ссылка</h2>
      {user ? <><p>Отправь её другу, чтобы он познакомился с ИИ-проводниками.</p>
        <label className="referral-label" htmlFor="referral-link">Реферальная ссылка</label>
        <input id="referral-link" className="referral-input" value={link} readOnly onFocus={event=>event.target.select()}/>
        <div className="referral-actions"><button className="resource-buy" onClick={copy}><Copy size={17}/> Скопировать</button><button className="resource-buy" onClick={share}><Share2 size={17}/> Поделиться</button></div>
        <p className="referral-status" role="status">{status}</p>
      </> : <><p>Войди в аккаунт, чтобы получить свою ссылку и пригласить друзей.</p><button className="primary-button" onClick={onLogin}>Войти <ArrowUpRight size={16}/></button></>}
    </article>
    <div className="resource-info glass"><Users size={22}/><div><h3>Вместе идти интереснее</h3><p>Приглашённый открывает ссылку и регистрируется по почте. Правила партнёрских вознаграждений появятся здесь после запуска программы.</p></div></div>
  </section>;
}
