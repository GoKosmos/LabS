import React, {useState} from 'react';
import {Sparkles, ArrowLeft, ArrowRight, Mail, Send, ShieldCheck, Sun} from 'lucide-react';
import {supabase, authRedirect} from './auth';

export default function Auth({onDemo, onClose}) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('email');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setNotice('');
    if (supabase) {
      setBusy(true);
      try {
        const {error} = await supabase.auth.signInWithOtp({email, options:{emailRedirectTo:authRedirect()}});
        if (error) throw error;
      } catch {
        setNotice('Не удалось отправить ссылку. Попробуй позже или проверь адрес почты.');
        return;
      } finally { setBusy(false); }
    }
    setStep('confirmation');
  }
  async function googleLogin() {
    if (!supabase || import.meta.env.VITE_AUTH_GOOGLE_ENABLED !== 'true') {
      setNotice('Вход через Google пока не подключён. После подключения ты сможешь подтвердить доступ к имени и адресу почты в Google.');
      return;
    }
    setBusy(true);
    try {
      const {error} = await supabase.auth.signInWithOAuth({provider:'google', options:{redirectTo:authRedirect()}});
      if (error) throw error;
    } catch {setNotice('Не удалось открыть вход через Google. Попробуй позже.');}
    finally {setBusy(false);}
  }
  return <div className="auth-page">
    <button className="auth-back" type="button" onClick={onClose}><ArrowLeft size={16}/>На главную</button>
    <a className="auth-brand" href="#" aria-label="Лаборатория Счастья"><Sparkles size={24}/><span>Лаборатория Счастья</span></a>
    <div className="auth-layout">
      <section className="auth-intro">
        <span className="auth-eyebrow">ТВОЙ ПУТЬ К СЕБЕ</span>
        <h1>Начни с себя.<br/><em>Мы будем рядом.</em></h1>
        <p>Место, где можно замедлиться, услышать себя и найти новые смыслы. Твоё пространство начинается здесь.</p>
        <div className="auth-art" aria-hidden="true"><div className="auth-orbit"/><div className="auth-orbit second"/><div className="auth-sun"><Sun size={72} strokeWidth={1.2}/></div><span>✧</span></div>
        <div className="auth-caption"><Sparkles size={16}/> В своём темпе. В своём направлении.</div>
      </section>
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-emblem"><Sparkles size={26}/></div>
        <span className="auth-eyebrow">ПРОСТРАНСТВО ВНУТРЕННИХ ОТКРЫТИЙ</span>
        <h2 id="auth-title">{step === 'email' ? 'Добро пожаловать' : 'Следующий шаг — почта'}</h2>
        {step === 'email' ? <>
          <p className="auth-subtitle">Войди или создай аккаунт по почте.<br/>Без лишних шагов и паролей.</p>
          <form onSubmit={submit}>
            <label className="auth-label" htmlFor="auth-email">Электронная почта</label>
            <div className="auth-input"><Mail size={19}/><input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value.trim())}/></div>
            <button className="auth-primary" type="submit" disabled={busy}>{busy ? 'Отправляем ссылку…' : 'Продолжить с почтой'} <ArrowRight size={18}/></button>
          </form>
          <div className="auth-divider"><span>или используй свой аккаунт</span></div>
          <div className="auth-providers">
            <button type="button" disabled={busy} onClick={googleLogin}><span className="google-mark" aria-hidden="true">G</span>Google</button>
            <button type="button" onClick={()=>setNotice('Вход через Яндекс пока не подключён. После подключения ты сможешь подтвердить доступ к имени и адресу почты в Яндексе.')}><span className="yandex-mark" aria-hidden="true">Я</span>Яндекс</button>
          </div>
          <button className="auth-telegram" type="button" onClick={()=>setNotice('Вход через Telegram пока не подключён: нужен Telegram-бот и серверная проверка авторизации. Telegram не передаёт адрес электронной почты — его потребуется указать отдельно.')}><Send size={21}/>Продолжить с Telegram</button>
          {notice && <p className="auth-notice" role="status">{notice}</p>}
          <p className="auth-privacy"><ShieldCheck size={16}/> Ты сам выбираешь, какими данными поделиться.</p>
        </> : <div className="auth-confirmation">
          <div className="auth-mail-icon"><Mail size={30}/></div>
          <p>Для регистрации нужно подтвердить адрес<br/><strong>{email}</strong></p>
          <p className="auth-notice" role="status">{supabase ? 'Если адрес доступен для входа, на него придёт ссылка. Открой её в этом браузере, чтобы подтвердить почту и войти. Проверь также папку «Спам».' : 'Отправка писем пока не подключена. Это демонстрация экрана: письмо не отправлено и аккаунт не создан.'}</p>
          {!supabase && <button className="auth-primary" type="button" onClick={onDemo}>Посмотреть демо <ArrowRight size={18}/></button>}
          <button className="auth-back" type="button" onClick={()=>setStep('email')}><ArrowLeft size={16}/>Изменить почту</button>
        </div>}
        <div className="auth-demo-note">{supabase ? 'Вход по защищённой ссылке · без пароля' : 'Демонстрация · регистрация пока не подключена'}</div>
      </section>
    </div>
    <div className="auth-footer">С заботой о тебе <span>✧</span> Лаборатория Счастья</div>
  </div>;
}
