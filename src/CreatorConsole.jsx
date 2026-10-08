import React, {useEffect, useRef, useState} from 'react';
import {ChevronDown} from 'lucide-react';

const items = [
  ['✨', 'Образ Творца'], ['🌟', 'Ресурсы творения'],
  ['🤝', 'Пригласи друзей'], ['🎁', 'Код Изобилия'], ['📖', 'Мануал Реальности'],
  ['🧩', 'Архитектура Вселенной'], ['🌌', 'МультиВселенная'],
  ['🔔', 'Уведомления'], ['💌', 'Центр Связи'],
  ['🔑', 'Профиль'], ['🚪', 'Выйти'],
];

export default function CreatorConsole({onSelect, disabled}) {
  const [expanded, setExpanded] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!expanded) return;
    const outside = event => {
      if (!container.current?.contains(event.target)) setExpanded(false);
    };
    const escape = event => {
      if (event.key === 'Escape') {
        setExpanded(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [expanded]);
  return <div className="creator-console" ref={container} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
  }}>
    <button ref={trigger} className="creator-trigger" aria-expanded={expanded}
      aria-controls="creator-panel" onClick={() => setExpanded(value => !value)}>
      Центр управления <ChevronDown size={16}/>
    </button>
    {expanded && <nav id="creator-panel" className="creator-panel" aria-label="Центр управления">
      {items.map(([icon, title]) => <button key={title}
        className={`creator-item${title === 'Выйти' ? ' creator-exit' : ''}`}
        disabled={title === 'Выйти' && disabled}
        onClick={() => {setExpanded(false); trigger.current?.focus(); onSelect(title);}}>
        <span className="creator-icon" aria-hidden="true">{icon}</span><span>{title}</span>
      </button>)}
    </nav>}
  </div>;
}
