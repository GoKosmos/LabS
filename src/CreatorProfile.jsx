import React, {useEffect, useState} from 'react';
import {ArrowLeft, ArrowUpRight, Check, Compass, IdCard, Sparkles} from 'lucide-react';
import {supabase} from './auth';

const KEY = 'labs-creator-profile';
const empty = {display_name:'', gender:'', environment:'', about:''};
const genders = [['', 'Не указывать'], ['female', 'Женский'], ['male', 'Мужской']];

export function localProfile() {
  try { return {...empty, ...JSON.parse(localStorage.getItem(KEY))}; }
  catch { return empty; }
}

export default function CreatorProfile({user, displayName, onBack, onTopUp, onNameChange}) {
  const remote = Boolean(user && supabase);
  const [form, setForm] = useState(() => remote ? {...empty, display_name:displayName} : {...empty, display_name:displayName, ...localProfile()});
  const [loading, setLoading] = useState(remote);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (!remote) return;
    let active = true;
    supabase.from('profiles').select('display_name, gender, environment, about').eq('id', user.id).single()
      .then(({data, error}) => {
        if (!active) return;
        if (error) setStatus('Не удалось загрузить данные. Попробуй обновить страницу.');
        else setForm({...empty, ...data, display_name:data.display_name || displayName});
        setLoading(false);
      });
    return () => { active = false; };
  }, [remote, user?.id]);
  const change = field => event => { setForm(value => ({...value, [field]:event.target.value})); setStatus(''); };
  async function save(event) {
    event.preventDefault();
    const profile = {...form, display_name:form.display_name.trim(), environment:form.environment.trim(), about:form.about.trim()};
    setStatus('Сохраняю…');
    if (remote) {
      const {error} = await supabase.from('profiles').update(profile).eq('id', user.id);
      if (error) { setStatus('Не удалось сохранить. Проверь соединение и попробуй ещё раз.'); return; }
    } else {
      try { localStorage.setItem(KEY, JSON.stringify(profile)); }
      catch { setStatus('Не удалось сохранить в этом браузере.'); return; }
    }
    setForm(profile);
    onNameChange(profile.display_name);
    setStatus('Сохранено. Теперь я буду обращаться к тебе персонально.');
  }
  return <section className="resources-page" aria-labelledby="creator-profile-title">
    <button className="resources-back" onClick={onBack}><ArrowLeft size={16}/> На главную</button>
    <div className="resources-heading"><span className="eyebrow">ТВОЁ ОТРАЖЕНИЕ В ЛАБОРАТОРИИ</span>
      <h1 id="creator-profile-title"><Sparkles size={28}/> Образ Творца</h1>
      <p>Расскажи о себе, чтобы проводники говорили с тобой на одном языке.</p>
    </div>
    <div className="creator-profile-grid">
      <div className="creator-profile-side">
        <article className="creator-rank glass">
          <div className="creator-rank-orb"><Compass size={54} strokeWidth={1}/></div>
          <span className="eyebrow">ТВОЙ СТАТУС</span>
          <h2>Искатель</h2>
          <p>Первые шаги на пути к себе</p>
        </article>
        <article className="creator-balance glass">
          <span className="eyebrow">БАЛАНС ТОКЕНОВ</span>
          <div className="creator-balance-value"><strong>0</strong><span className="creator-coin" aria-hidden="true"><Sparkles size={18}/></span></div>
          <button className="resource-buy" onClick={onTopUp}>Пополнить <ArrowUpRight size={17}/></button>
        </article>
      </div>
      <form className="creator-about glass" onSubmit={save}>
        <h2><IdCard size={22}/> О себе</h2>
        <p className="creator-about-hint">Эта информация помогает мне общаться персонально.</p>
        <fieldset disabled={loading}>
          <label className="referral-label" htmlFor="creator-name">Имя</label>
          <input id="creator-name" className="referral-input" maxLength={60} autoComplete="given-name" value={form.display_name} onChange={change('display_name')}/>
          <label className="referral-label" htmlFor="creator-gender">Пол</label>
          <select id="creator-gender" className="referral-input" value={form.gender} onChange={change('gender')}>
            {genders.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <label className="referral-label" htmlFor="creator-environment">Окружение</label>
          <textarea id="creator-environment" className="referral-input" rows={4} maxLength={1000} placeholder="Например: семья, близкие, друзья" value={form.environment} onChange={change('environment')}/>
          <label className="referral-label" htmlFor="creator-about">О себе</label>
          <textarea id="creator-about" className="referral-input" rows={4} maxLength={1000} placeholder="Чем ты занимаешься, что тебя вдохновляет" value={form.about} onChange={change('about')}/>
          <button className="resource-buy creator-save">Сохранить <Check size={17}/></button>
        </fieldset>
        <p className="referral-status" role="status">{loading ? 'Загружаю…' : status}</p>
      </form>
    </div>
  </section>;
}
