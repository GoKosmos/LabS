import React from 'react';

// Персонажи Lool & Jool. Цвета задаются темой через CSS-классы c-*.
// Глаза — «цифровые»: моргают, как экран будущей игрушки.

export function Sloth({className = '', title = 'Ленивец'}) {
  return <svg className={`character sloth ${className}`} viewBox="0 0 220 240" role="img" aria-label={title}>
    <ellipse className="c-fur" cx="110" cy="172" rx="62" ry="58"/>
    <ellipse className="c-face" cx="110" cy="180" rx="36" ry="38"/>
    <path className="c-arm" d="M64 138 C28 168 44 214 96 204"/>
    <path className="c-arm" d="M156 138 C192 168 176 214 124 204"/>
    <path className="c-claw" d="M92 196 l8 6 M94 206 l8 2"/>
    <path className="c-claw" d="M128 196 l-8 6 M126 206 l-8 2"/>
    <circle className="c-fur" cx="110" cy="92" r="62"/>
    <path className="c-fur-dark" d="M92 34 q8 -14 18 -4 q10 -12 18 4 q-18 -6 -36 0z"/>
    <ellipse className="c-face" cx="110" cy="100" rx="50" ry="41"/>
    <ellipse className="c-mask" cx="84" cy="98" rx="20" ry="12" transform="rotate(22 84 98)"/>
    <ellipse className="c-mask" cx="136" cy="98" rx="20" ry="12" transform="rotate(-22 136 98)"/>
    <rect className="c-eye" x="78" y="89" width="12" height="15" rx="6"/>
    <rect className="c-eye" x="130" y="89" width="12" height="15" rx="6"/>
    <circle className="c-shine" cx="86" cy="93" r="2.2"/>
    <circle className="c-shine" cx="138" cy="93" r="2.2"/>
    <circle className="c-cheek" cx="76" cy="118" r="7"/>
    <circle className="c-cheek" cx="144" cy="118" r="7"/>
    <ellipse className="c-nose" cx="110" cy="113" rx="9" ry="6"/>
    <path className="c-mouth" d="M101 124 Q110 132 119 124"/>
  </svg>;
}

export function Monkey({className = '', title = 'Обезьянка'}) {
  return <svg className={`character monkey ${className}`} viewBox="0 0 220 240" role="img" aria-label={title}>
    <path className="c-tail" d="M158 206 C206 210 210 150 184 150 C170 150 170 168 182 170"/>
    <ellipse className="c-fur" cx="110" cy="176" rx="54" ry="54"/>
    <ellipse className="c-face" cx="110" cy="184" rx="32" ry="34"/>
    <path className="c-arm wave" d="M152 158 C182 140 190 116 184 98"/>
    <circle className="c-face wave" cx="184" cy="94" r="11"/>
    <circle className="c-fur" cx="48" cy="94" r="24"/>
    <circle className="c-face" cx="48" cy="94" r="13"/>
    <circle className="c-fur" cx="172" cy="94" r="24"/>
    <circle className="c-face" cx="172" cy="94" r="13"/>
    <circle className="c-fur" cx="110" cy="92" r="60"/>
    <circle className="c-face" cx="90" cy="88" r="24"/>
    <circle className="c-face" cx="130" cy="88" r="24"/>
    <ellipse className="c-face" cx="110" cy="116" rx="40" ry="29"/>
    <rect className="c-eye" x="83" y="80" width="12" height="15" rx="6"/>
    <rect className="c-eye" x="125" y="80" width="12" height="15" rx="6"/>
    <circle className="c-shine" cx="91" cy="84" r="2.2"/>
    <circle className="c-shine" cx="133" cy="84" r="2.2"/>
    <circle className="c-cheek" cx="78" cy="112" r="7"/>
    <circle className="c-cheek" cx="142" cy="112" r="7"/>
    <circle className="c-nose" cx="104" cy="108" r="3"/>
    <circle className="c-nose" cx="116" cy="108" r="3"/>
    <path className="c-mouth" d="M96 121 Q110 134 124 121"/>
  </svg>;
}
