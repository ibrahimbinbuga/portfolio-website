import { useEffect, useRef, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const SHOWCASE_PROJECTS = [
  {
    id: 0,
    name: 'Dream Oracle: Rüya Kahini',
    desc: 'Dünyanın en gelişmiş yapay zeka teknolojilerini kullanarak rüyalarınızı farklı kadim ve modern stille analiz eden benzersiz bir rüya yorumlama uygulaması.',
    stack: ['Flutter', 'Firebase', 'Dart', 'ASO'],
    storeUrl: 'https://apps.apple.com/us/app/dream-oracle-r%C3%BCya-kahini/id6759988615',
    accent: '#00ffaa',
    glow: 'radial-gradient(circle, rgba(0,255,170,0.08) 0%, transparent 70%)',
  },
  {
    id: 1,
    name: 'PomoQuest',
    desc: 'Pomodoro tabanlı derin odak uygulaması tek farkı daha eğlenceli. Oyunlaştırılmış deneyimle odaklanmayı artırırken, SwiftUI ile modern iOS teknolojilerini kullanarak geliştirildi.',
    stack: ['SwiftUI', 'StoreKit', 'App Store', 'Core Data'],
    storeUrl: 'https://apps.apple.com/tr/app/pomoquest/id6764025307?l=tr',
    accent: '#7c5cfc',
    glow: 'radial-gradient(circle, rgba(124,92,252,0.08) 0%, transparent 70%)',
  },
  {
    id: 2,
    name: 'CheckMyBite',
    desc: 'Marketteki ürünlerin içeriğini saniyeler içinde analiz eden akıllı gıda asistanınızdır.',
    stack: ['Flutter', 'Firebase', 'Dart', 'ASO'],
    storeUrl: '#',
    accent: '#ff9f43',
    glow: 'radial-gradient(circle, rgba(255,159,67,0.07) 0%, transparent 70%)',
  },
  {
    id: 3,
    name: 'Giftie: Hediye Bulucu',
    desc: 'Sevdiklerinizi mutlu etmenin en kolay, en akıllı ve eğlenceli yoludur. Gelişmiş yapay zeka teknolojimiz sayesinde annenize, babanıza, sevgilinize veya en yakın arkadaşınıza özel, onların ilgi alanlarına ve sizin bütçenize tam uyan kusursuz hediye fikirlerini saniyeler içinde bulabilirsiniz.',
    stack: ['Flutter', 'Firebase', 'Dart', 'ASO'],
    storeUrl: '#',
    accent: '#54a0ff',
    glow: 'radial-gradient(circle, rgba(84,160,255,0.07) 0%, transparent 70%)',
  },
];

const OTHER_PROJECTS = [
  {
    num: '01',
    name: 'IF22 Software',
    desc: 'iOS ve Android uygulamaları geliştiren yenilikçi ekip, modern teknolojilerle güçlü ve kullanıcı dostu mobil deneyimler sunar.',
    stack: ['iOS', 'Flutter', 'Go', 'Docker', 'Swift'],
    demo: 'https://if22software.github.io/',
    code: 'https://github.com/IF22Software/if22software.github.io',
    flip: false,
    visColor: 'rgba(0,255,170,0.04)',
  },
  {
    num: '02',
    name: 'IFlow',
    desc: 'Görevlerinizi takip etmenin en rahat ve akıcı yolu. Ekip arkadaşınızla anlık bilgi paylaşımı ve sezgisel arayüzüyle üretkenliğinizi artırır.',
    stack: ['Vercel', 'React', 'Go', 'Docker'],
    demo: 'https://iflow-orpin.vercel.app/',
    code: 'https://github.com/ibrahimbinbuga/iflow',
    flip: true,
    visColor: 'rgba(124,92,252,0.04)',
  },
  {
    num: '03',
    name: 'Meeting Analyzer',
    desc: 'Toplantı katılımcılarının duygusal durumlarını analiz eden, transkript çıkaran ve özetleyen yapay zeka destekli toplantı asistanı.',
    stack: ['FastAPI', 'React', 'SQLite', 'ML', 'Python'],
    demo: null,
    code: 'https://github.com/ibrahimbinbuga/meeting-app',
    flip: false,
    visColor: 'rgba(255,159,67,0.04)',
  },
  {
    num: '04',
    name: 'Spam Shield',
    desc: 'Öz geliştirilen makine öğrenmesi modelleriyle kullanıcıları spam e-postalardan koruyan ekip projesi. Takım liderliği üstlendi.',
    stack: ['Flask', 'Python', 'ML', 'HTML', 'CSS'],
    demo: '#',
    code: '#',
    flip: true,
    visColor: 'rgba(84,160,255,0.04)',
  },
  {
    num: '05',
    name: 'Drugger Detection',
    desc: 'Öz geliştirilen derin öğrenme modelleriyle yüz tanıma tabanlı madde tespiti. Takım liderliği üstlendi.',
    stack: ['Flutter', 'Python', 'Deep Learning'],
    demo: null,
    code: null,
    flip: false,
    visColor: 'rgba(255,107,107,0.04)',
  },
  {
    num: '06',
    name: 'Emotions of Drawings',
    desc: 'Çocukların çizimlerindeki duygu durumlarını analiz eden derin öğrenme projesi.',
    stack: ['React', 'Flask', 'Deep Learning', 'Python'],
    demo: null,
    code: null,
    flip: true,
    visColor: 'rgba(124,92,252,0.04)',
  },
];

const EXPERIENCE = [
  {
    role: 'Co-founder · Flutter & iOS Developer',
    company: 'IF22 Software',
    companyUrl: 'https://if22software.github.io/',
    period: 'Ocak 2026 — Devam ediyor',
    location: 'Muğla, Türkiye',
    desc: 'Dream Oracle ve PomoQuest projelerini App Store\'a taşıdı. Flutter, Swift, Go, Firebase, Supabase ile geliştirme ve App Store lifecycle yönetimi.',
  },
  {
    role: 'Mobile Application Developer Intern',
    company: 'Virtus R&D Software Inc.',
    companyUrl: '#',
    period: 'Temmuz 2025 — Ağustos 2025',
    location: 'Muğla, Türkiye',
    desc: 'Yeniden kullanılabilir UI bileşenleri geliştirdi. Riverpod ile state management, RESTful API entegrasyonu ve Agile takım ortamında çalışma.',
  },
  {
    role: 'Mobile Application Developer',
    company: 'Softwer Malta',
    companyUrl: '#',
    period: 'Aralık 2024 — Nisan 2025',
    location: 'Malta (Remote)',
    desc: 'Flutter ve Dart ile mobil uygulama geliştirdi. OAuth ve Firebase Authentication ile güvenli kimlik doğrulama, özel widget ve UI bileşenleri.',
  },
  {
    role: 'Software Developer Intern',
    company: 'Mersin International Port (MIP)',
    companyUrl: '#',
    period: 'Temmuz 2024 — Ağustos 2024',
    location: 'Mersin, Türkiye',
    desc: 'ASP.NET MVC ile web uygulamaları geliştirdi. MSSQL çalışan veritabanı yönetimi, C# ve MVC/Dependency Injection prensipleri.',
  },
];

const TECH_ITEMS = [
  'Swift','SwiftUI','Flutter','Firebase','Dart','UIKit',
  'Core Data','StoreKit','Xcode','TestFlight','Go','Docker',
  'React','Vercel','CloudKit','WidgetKit','ASO','App Store',
  'Supabase','PostgreSQL','FastAPI','Python','Riverpod',
];

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap');

:root {
  --bg-deep:       #060609;
  --bg-elevated:   #0d0d14;
  --bg-card:       #111119;
  --text-primary:  #f0f0f3;
  --text-muted:    #5a5a6e;
  --accent:        #00ffaa;
  --accent-glow:   rgba(0,255,170,0.07);
  --accent-alt:    #7c5cfc;
  --border-subtle: rgba(255,255,255,0.04);
  --ease-ios:      cubic-bezier(0.16,1,0.3,1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-deep);
  color: var(--text-primary);
  font-family: 'Space Grotesk', -apple-system, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a { color: inherit; text-decoration: none; }
button { border: none; cursor: pointer; font-family: inherit; background: transparent; }

/* ── Build Loader ───────────────────────────────────── */
.bl {
  position: fixed; inset: 0;
  background: var(--bg-deep);
  z-index: 1000;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 20px;
  transition: opacity 0.6s var(--ease-ios), visibility 0.6s;
}
.bl.out { opacity: 0; visibility: hidden; pointer-events: none; }
.bl-lines {
  display: flex; flex-direction: column; gap: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.72rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  min-height: 90px;
}
.bl-line { opacity: 0; transform: translateX(-6px); animation: bl-in 0.25s var(--ease-ios) forwards; }
.bl-line.ok { color: var(--accent); }
.bl-bar { width: 220px; height: 1px; background: rgba(255,255,255,0.06); border-radius: 1px; overflow: hidden; }
.bl-fill { height: 100%; background: var(--accent); animation: bl-prog 1.3s var(--ease-ios) forwards; }
@keyframes bl-in  { to { opacity: 1; transform: translateX(0); } }
@keyframes bl-prog { from { width: 0; } to { width: 100%; } }

/* ── Fixed UI ───────────────────────────────────────── */
.status-badge {
  position: fixed; top: 28px; left: 32px;
  display: flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.62rem; letter-spacing: 0.14em;
  color: var(--text-muted); z-index: 100; text-transform: uppercase;
}
.sdot {
  width: 6px; height: 6px;
  background: var(--accent); border-radius: 50%;
  animation: sdot-pulse 2s ease infinite;
}
@keyframes sdot-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,255,170,0.5); }
  50%      { box-shadow: 0 0 0 5px rgba(0,255,170,0); }
}
.corner-links { position: fixed; top: 24px; right: 28px; display: flex; gap: 14px; z-index: 100; }
.corner-link {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-muted);
  transition: color 0.2s ease;
}
.corner-link:hover { color: var(--accent); }
.corner-link svg { width: 17px; height: 17px; fill: currentColor; }

/* ── Hero ───────────────────────────────────────────── */
.hero {
  min-height: 100svh;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.hero-blob {
  position: absolute; top: -30%; left: -15%;
  width: 80vw; height: 80vw; max-width: 900px;
  background: radial-gradient(ellipse, rgba(0,255,170,0.055) 0%, transparent 65%);
  pointer-events: none;
}
.hero-spotlight {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(0,255,170,0.025), transparent 70%);
}
.hero-content { position: relative; z-index: 1; text-align: center; padding: 0 24px; }
.hero-name {
  display: block;
  font-size: clamp(2.6rem, 9vw, 7.5rem);
  font-weight: 800; line-height: 0.92; letter-spacing: -0.03em;
  color: var(--text-primary);
  opacity: 0; transform: translateY(24px);
  animation: fade-up 0.8s 1.7s var(--ease-ios) forwards;
}
.hero-role {
  display: block; margin-top: 22px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(0.7rem, 1.6vw, 0.95rem);
  letter-spacing: 0.2em; color: var(--accent);
  text-transform: lowercase; font-weight: 400;
  opacity: 0; transform: translateY(12px);
  animation: fade-up 0.6s 2.1s var(--ease-ios) forwards;
}
@keyframes fade-up { to { opacity: 1; transform: translateY(0); } }
.scroll-hint {
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  opacity: 0; animation: fade-up 0.5s 2.6s ease forwards;
}
.scroll-line {
  width: 1px; height: 44px;
  background: linear-gradient(to bottom, rgba(90,90,110,0.8), transparent);
  animation: line-breathe 2s ease-in-out infinite;
}
.scroll-txt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.52rem; letter-spacing: 0.22em;
  color: var(--text-muted); text-transform: uppercase;
  writing-mode: vertical-lr; transform: rotate(180deg);
}
@keyframes line-breathe {
  0%,100% { transform: scaleY(1); opacity: 0.5; }
  50%      { transform: scaleY(1.15); opacity: 1; }
}

/* ── About ──────────────────────────────────────────── */
.about { padding: 120px 0 80px; }
.about-text {
  max-width: 580px; margin: 0 auto 56px; padding: 0 24px;
  text-align: center;
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  line-height: 1.85; color: var(--text-muted); font-weight: 300;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.7s var(--ease-ios), transform 0.7s var(--ease-ios);
}
.about-text.vis { opacity: 1; transform: translateY(0); }
.about-text em { color: var(--text-primary); font-style: normal; font-weight: 400; }
.marquee-outer {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
  padding: 8px 0;
}
.marquee-track { display: flex; width: max-content; animation: marquee 38s linear infinite; }
.marquee-item {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(1.2rem, 2.8vw, 2rem);
  font-weight: 500; opacity: 0.11;
  letter-spacing: 0.04em; white-space: nowrap; padding: 0 36px;
  color: var(--text-primary);
}
.mq-sep { color: var(--accent); opacity: 0.3; padding: 0 4px; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── Showcase ───────────────────────────────────────── */
.showcase-section { position: relative; }
.showcase-sticky {
  position: sticky; top: 0; height: 100svh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: 1100px; margin: 0 auto;
  padding: 0 48px; gap: 48px; overflow: hidden;
}

/* Info panel */
.sc-info { display: flex; flex-direction: column; gap: 18px; }
.sc-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.2em;
  color: var(--accent); text-transform: uppercase;
}
.sc-heading {
  font-size: clamp(2.2rem, 4.5vw, 3.6rem);
  font-weight: 800; line-height: 1; letter-spacing: -0.025em;
  background: linear-gradient(125deg, var(--accent) 0%, var(--accent-alt) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.pj-info { min-height: 170px; display: flex; flex-direction: column; gap: 12px; }
.pj-name {
  font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 700;
  letter-spacing: -0.025em; color: var(--text-primary);
  transition: opacity 0.3s ease, transform 0.35s var(--ease-ios);
}
.pj-name.swap { opacity: 0; transform: translateY(-8px); }
.pj-desc {
  font-size: 0.92rem; color: var(--text-muted);
  line-height: 1.75; font-weight: 300; max-width: 360px;
  transition: opacity 0.3s ease;
}
.pj-desc.swap { opacity: 0; }
.pj-stack { display: flex; flex-wrap: wrap; gap: 7px; }
.pill {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 4px 10px; border-radius: 20px;
  transition: color 0.2s, border-color 0.2s;
}
.pill.hi { color: var(--accent); border-color: rgba(0,255,170,0.18); }
.store-btn {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 0.82rem; font-weight: 500; color: var(--accent);
  transition: gap 0.25s ease;
}
.store-btn:hover { gap: 12px; }
.dots { display: flex; gap: 8px; align-items: center; }
.dot-item {
  height: 7px; width: 7px; border-radius: 4px;
  background: var(--text-muted); opacity: 0.25;
  transition: all 0.35s var(--ease-ios); cursor: pointer;
}
.dot-item.on { width: 22px; opacity: 1; background: var(--accent); }

/* Phone wrapper */
.phone-wrap { display: flex; align-items: center; justify-content: center; position: relative; }
.phone-glow {
  position: absolute; width: 360px; height: 360px;
  border-radius: 50%; pointer-events: none;
  transition: background 0.8s ease;
}
.iphone-scene {
  transition: transform 0.8s var(--ease-ios), opacity 0.8s var(--ease-ios);
  transform-style: preserve-3d; perspective: 1200px;
}
.iphone-scene.hidden { opacity: 0; transform: translateY(100px) scale(0.9); }
.iphone-scene.shown  { opacity: 1; transform: translateY(0) scale(1); }

/* iPhone Mockup */
.iphone {
  position: relative; width: 272px; height: 572px;
  background: linear-gradient(165deg, #3c3c3e 0%, #2a2a2c 30%, #1c1c1e 70%, #0e0e10 100%);
  border-radius: 52px;
  box-shadow:
    0 50px 100px rgba(0,0,0,0.7),
    0 0 0 1px rgba(255,255,255,0.07),
    inset 0 1.5px 0 rgba(255,255,255,0.12),
    inset 0 -1px 0 rgba(255,255,255,0.03);
  transition: transform 0.25s ease;
}
.iphone-screen {
  position: absolute; top: 11px; left: 7px; right: 7px; bottom: 11px;
  background: #000; border-radius: 46px; overflow: hidden;
}
.iphone-di {
  position: absolute; top: 13px; left: 50%; transform: translateX(-50%);
  width: 108px; height: 30px;
  background: #000; border-radius: 18px; z-index: 20;
}
.iphone-bl {
  position: absolute; left: -3px; top: 108px;
  width: 3px; height: 30px;
  background: linear-gradient(to right, #111, #2c2c2e);
  border-radius: 3px 0 0 3px;
  box-shadow: 0 46px 0 #2c2c2e, 0 86px 0 #2c2c2e;
}
.iphone-br {
  position: absolute; right: -3px; top: 148px;
  width: 3px; height: 66px;
  background: linear-gradient(to left, #111, #2c2c2e);
  border-radius: 0 3px 3px 0;
}
.iphone-shine {
  position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
  width: 56px; height: 3px;
  background: rgba(255,255,255,0.1); border-radius: 2px; filter: blur(1px);
}

/* Screenshot track */
.sc-track { position: absolute; inset: 0; border-radius: 46px; overflow: hidden; }
.sc-slide {
  position: absolute; inset: 0;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s var(--ease-ios);
  will-change: opacity, transform;
}
.sc-slide.on { opacity: 1; transform: translateY(0); }

/* ── App Screens ────────────────────────────────────── */
.app-sb {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 24px 0;
  font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem; color: rgba(255,255,255,0.8);
}
.sb-time { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; }
.sb-icons { display: flex; gap: 5px; align-items: center; font-size: 0.55rem; }

.app-body {
  padding: 14px 20px 24px;
  display: flex; flex-direction: column; gap: 11px;
  height: calc(100% - 42px); overflow: hidden;
}
.app-lbl {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5rem; letter-spacing: 0.14em;
  text-transform: uppercase; opacity: 0.35;
}
.app-ttl { font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em; color: #fff; }

/* Habitus */
.app-habitus { background: linear-gradient(160deg, #081a0f 0%, #04100a 100%); height: 100%; }
.h-rings { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; padding-top: 2px; }
.h-ring {
  aspect-ratio: 1; border-radius: 50%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative;
}
.h-ring-bg { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid rgba(255,255,255,0.06); }
.h-ring-fill { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid transparent; }
.h-ring-em { position: relative; z-index: 1; font-size: 0.9rem; }
.h-ring-pct { position: relative; z-index: 1; font-size: 0.44rem; opacity: 0.45; font-family: 'IBM Plex Mono', monospace; }
.h-streak {
  display: flex; gap: 6px; align-items: center;
  padding: 9px 12px;
  background: rgba(0,255,170,0.05); border: 1px solid rgba(0,255,170,0.1); border-radius: 12px;
}
.h-snum { font-size: 1.3rem; font-weight: 800; color: var(--accent); letter-spacing: -0.03em; }
.h-stxt { font-size: 0.5rem; opacity: 0.45; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; }
.h-pbars { display: flex; flex-direction: column; gap: 6px; }
.h-pb { display: flex; flex-direction: column; gap: 2px; }
.h-pb-l { font-size: 0.48rem; opacity: 0.35; letter-spacing: 0.06em; }
.h-pb-t { height: 3px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
.h-pb-f { height: 100%; border-radius: 2px; }

/* Fokus */
.app-fokus { background: linear-gradient(160deg, #0d0818 0%, #07040f 100%); height: 100%; }
.fk-wrap { display: flex; justify-content: center; padding: 6px 0; }
.fk-circle {
  width: 142px; height: 142px; border-radius: 50%;
  border: 2px solid rgba(124,92,252,0.15);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  position: relative;
}
.fk-ring {
  position: absolute; inset: -2px; border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: #7c5cfc; border-right-color: rgba(124,92,252,0.3);
  animation: spin 4s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.fk-time { font-family: 'IBM Plex Mono', monospace; font-size: 1.85rem; font-weight: 500; color: #fff; letter-spacing: 0.05em; }
.fk-mode { font-size: 0.48rem; opacity: 0.3; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 2px; }
.fk-tasks { display: flex; flex-direction: column; gap: 5px; }
.fk-task {
  display: flex; align-items: center; gap: 9px;
  padding: 7px 11px;
  background: rgba(124,92,252,0.06); border: 1px solid rgba(124,92,252,0.08); border-radius: 9px;
}
.fk-chk {
  width: 13px; height: 13px; border-radius: 50%;
  border: 1.5px solid rgba(124,92,252,0.4); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.fk-chk.done { background: #7c5cfc; border-color: #7c5cfc; }
.fk-chk.done::after { content: '✓'; font-size: 0.42rem; color: #fff; }
.fk-txt { font-size: 0.58rem; opacity: 0.65; }
.fk-txt.done { opacity: 0.3; text-decoration: line-through; }
.fk-btns { display: flex; gap: 7px; justify-content: center; }
.fk-btn {
  flex: 1; padding: 9px 8px; border-radius: 10px;
  font-size: 0.56rem; letter-spacing: 0.08em; text-transform: uppercase;
  font-family: 'IBM Plex Mono', monospace;
}
.fk-btn.p { background: #7c5cfc; color: #fff; }
.fk-btn.s { background: rgba(124,92,252,0.08); color: rgba(255,255,255,0.35); border: 1px solid rgba(124,92,252,0.1); }

/* Luma AR */
.app-luma { background: linear-gradient(160deg, #0f0a00 0%, #070500 100%); height: 100%; }
.ar-vf {
  flex: 1; border: 1px solid rgba(255,159,67,0.2); border-radius: 12px;
  position: relative; overflow: hidden; background: rgba(255,159,67,0.02); min-height: 155px;
}
.ar-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,159,67,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,159,67,0.06) 1px, transparent 1px);
  background-size: 22px 22px;
}
.ar-c { position: absolute; width: 13px; height: 13px; border-color: rgba(255,159,67,0.5); border-style: solid; }
.ar-c.tl { top: 7px; left: 7px; border-width: 1.5px 0 0 1.5px; border-radius: 2px 0 0; }
.ar-c.tr { top: 7px; right: 7px; border-width: 1.5px 1.5px 0 0; border-radius: 0 2px 0; }
.ar-c.bl { bottom: 7px; left: 7px; border-width: 0 0 1.5px 1.5px; border-radius: 0 0 0 2px; }
.ar-c.br { bottom: 7px; right: 7px; border-width: 0 1.5px 1.5px 0; border-radius: 0 0 2px; }
.ar-obj {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 68px; height: 68px; border: 1px solid rgba(255,159,67,0.3);
  border-radius: 8px; display: flex; align-items: center; justify-content: center;
  font-size: 1.9rem; background: rgba(255,159,67,0.04);
}
.ar-lbl {
  position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
  font-family: 'IBM Plex Mono', monospace; font-size: 0.45rem;
  letter-spacing: 0.12em; color: rgba(255,159,67,0.55);
  text-transform: uppercase; white-space: nowrap;
}
.ar-ctrls { display: flex; gap: 5px; justify-content: center; padding-top: 3px; }
.ar-ctrl {
  flex: 1; padding: 7px 4px; border-radius: 9px;
  background: rgba(255,159,67,0.06); border: 1px solid rgba(255,159,67,0.1);
  font-size: 0.5rem; text-align: center; font-family: 'IBM Plex Mono', monospace;
  letter-spacing: 0.07em; text-transform: uppercase; opacity: 0.65;
}

/* Cipher */
.app-cipher { background: linear-gradient(160deg, #04081a 0%, #020408 100%); height: 100%; }
.ci-search {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 11px;
  background: rgba(84,160,255,0.05); border: 1px solid rgba(84,160,255,0.08); border-radius: 9px;
}
.ci-ph { font-size: 0.56rem; opacity: 0.22; font-family: 'IBM Plex Mono', monospace; }
.ci-notes { display: flex; flex-direction: column; gap: 6px; flex: 1; overflow: hidden; }
.ci-item {
  padding: 9px 11px; border-radius: 10px;
  background: rgba(84,160,255,0.04); border: 1px solid rgba(84,160,255,0.07);
  display: flex; gap: 9px; align-items: flex-start;
}
.ci-item.ft { border-color: rgba(84,160,255,0.14); background: rgba(84,160,255,0.07); }
.ci-lck { font-size: 0.65rem; opacity: 0.3; margin-top: 1px; }
.ci-body { flex: 1; }
.ci-ttl { font-size: 0.68rem; font-weight: 600; color: rgba(255,255,255,0.8); letter-spacing: -0.01em; }
.ci-pre { font-size: 0.52rem; opacity: 0.28; margin-top: 2px; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.03em; }
.ci-time { font-size: 0.45rem; opacity: 0.18; font-family: 'IBM Plex Mono', monospace; margin-top: 2px; }

/* ── Experience ─────────────────────────────────────── */
.exp-section {
  max-width: 800px; margin: 0 auto; padding: 80px 48px 60px;
}
.exp-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.2em;
  color: var(--accent); text-transform: uppercase;
  margin-bottom: 40px; display: block;
}
.exp-list { display: flex; flex-direction: column; }
.exp-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--border-subtle);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s var(--ease-ios), transform 0.6s var(--ease-ios);
}
.exp-item:first-child { border-top: 1px solid var(--border-subtle); }
.exp-item.vis { opacity: 1; transform: translateY(0); }
.exp-role {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  font-weight: 600; color: var(--text-primary);
  letter-spacing: -0.01em; grid-column: 1;
}
.exp-period {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; color: var(--text-muted);
  letter-spacing: 0.06em; grid-column: 2;
  white-space: nowrap; padding-top: 3px;
}
.exp-company {
  font-size: 0.85rem; color: var(--accent);
  font-weight: 500; grid-column: 1;
  transition: opacity 0.2s;
}
.exp-company:hover { opacity: 0.75; }
.exp-location {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem; color: var(--text-muted);
  grid-column: 2; text-align: right; opacity: 0.6;
}
.exp-desc {
  font-size: 0.88rem; color: var(--text-muted);
  line-height: 1.7; font-weight: 300;
  grid-column: 1 / -1; margin-top: 4px;
}

/* ── Senior Project ─────────────────────────────────── */
.sp-section {
  max-width: 800px; margin: 0 auto; padding: 80px 48px 60px;
}
.sp-card {
  border: 1px solid rgba(255,107,107,0.15);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255,107,107,0.04) 0%, rgba(255,107,107,0.01) 100%);
  padding: 40px;
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.7s var(--ease-ios), transform 0.7s var(--ease-ios);
}
.sp-card.vis { opacity: 1; transform: translateY(0); }
.sp-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800; letter-spacing: -0.03em;
  color: var(--text-primary); margin-bottom: 8px;
}
.sp-subtitle {
  font-size: 0.9rem; color: var(--text-muted);
  line-height: 1.7; font-weight: 300; margin-bottom: 24px;
}
.sp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 12px; margin-bottom: 28px;
}
.sp-stat {
  background: rgba(255,107,107,0.06);
  border: 1px solid rgba(255,107,107,0.12);
  border-radius: 12px; padding: 14px 10px; text-align: center;
}
.sp-stat-val {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 800; color: #ff6b6b; letter-spacing: -0.02em;
  display: block;
}
.sp-stat-lbl {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5rem; letter-spacing: 0.1em;
  color: var(--text-muted); text-transform: uppercase;
  display: block; margin-top: 4px;
}
.sp-bullets {
  display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px;
}
.sp-bullet {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 0.88rem; color: var(--text-muted); line-height: 1.65; font-weight: 300;
}
.sp-bullet::before {
  content: ''; width: 5px; height: 5px; border-radius: 50%;
  background: #ff6b6b; flex-shrink: 0; margin-top: 7px; opacity: 0.7;
}
.sp-stack { display: flex; flex-wrap: wrap; gap: 7px; }

/* ── Other Projects ─────────────────────────────────── */
.other-section { max-width: 1100px; margin: 0 auto; padding: 80px 0 60px; }
.pb {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px;
  align-items: center; padding: 60px 48px;
  opacity: 0; transform: translateY(36px);
  transition: opacity 0.75s var(--ease-ios), transform 0.75s var(--ease-ios);
}
.pb.vis { opacity: 1; transform: translateY(0); }
.pb.flip { direction: rtl; }
.pb.flip > * { direction: ltr; }
.pb-text { display: flex; flex-direction: column; gap: 14px; }
.pb-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 2.2rem; font-weight: 500;
  color: var(--accent); opacity: 0.25; line-height: 1; letter-spacing: -0.02em;
}
.pb-name { font-size: clamp(1.6rem,3vw,2.2rem); font-weight: 700; letter-spacing: -0.03em; color: var(--text-primary); line-height: 1.05; }
.pb-desc { font-size: 0.92rem; line-height: 1.75; color: var(--text-muted); font-weight: 300; }
.pb-stack { display: flex; flex-wrap: wrap; gap: 7px; }
.pb-links { display: flex; gap: 20px; }
.pb-link {
  font-size: 0.82rem; color: var(--accent); font-weight: 500;
  display: inline-flex; align-items: center; gap: 6px;
  border-bottom: 1px solid transparent; padding-bottom: 1px;
  transition: gap 0.2s, border-color 0.2s;
}
.pb-link:hover { gap: 10px; border-color: var(--accent); }
.pb-visual {
  aspect-ratio: 4/3; border-radius: 14px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  overflow: hidden;
  transform: perspective(1000px) rotateY(-3deg) rotateX(1deg);
  transition: transform 0.4s var(--ease-ios);
  display: flex; flex-direction: column;
  justify-content: flex-end; padding: 24px; gap: 9px;
  position: relative;
}
.pb.flip .pb-visual { transform: perspective(1000px) rotateY(3deg) rotateX(1deg); }
.pb-visual:hover { transform: perspective(1000px) rotateY(0) rotateX(0) scale(1.015) !important; }
.pb-vis-lines { display: flex; flex-direction: column; gap: 5px; position: relative; z-index: 1; }
.pb-vis-line { height: 5px; border-radius: 3px; background: rgba(255,255,255,0.05); }
.pb-vis-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 5px; position: relative; z-index: 1; }
.pb-vis-block { height: 30px; border-radius: 6px; background: rgba(255,255,255,0.04); }

/* ── Contact ────────────────────────────────────────── */
.contact-section {
  padding: 140px 24px 80px;
  display: flex; flex-direction: column;
  align-items: center; text-align: center; gap: 28px;
  opacity: 0; transform: translateY(28px);
  transition: opacity 0.8s var(--ease-ios), transform 0.8s var(--ease-ios);
}
.contact-section.vis { opacity: 1; transform: translateY(0); }
.contact-headline {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
  color: var(--text-primary); max-width: 680px;
}
.contact-email {
  display: inline-flex; align-items: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--accent); font-weight: 400; letter-spacing: 0.04em;
  padding: 14px 28px;
  border: 1px solid rgba(0,255,170,0.18); border-radius: 50px;
  transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
}
.contact-email:hover {
  background: rgba(0,255,170,0.05);
  box-shadow: 0 0 40px rgba(0,255,170,0.1);
  transform: translateY(-2px);
}
.contact-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; align-items: center; }
.cv-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--text-muted); font-weight: 400; letter-spacing: 0.04em;
  padding: 14px 28px;
  border: 1px solid rgba(255,255,255,0.08); border-radius: 50px;
  transition: color 0.25s, border-color 0.25s, transform 0.25s, background 0.25s;
}
.cv-btn:hover {
  color: var(--text-primary);
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.03);
  transform: translateY(-2px);
}
.cv-btn svg { width: 15px; height: 15px; stroke: currentColor; fill: none; flex-shrink: 0; }
.contact-socials { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; justify-content: center; }
.soc-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-muted); transition: color 0.2s;
}
.soc-link:hover { color: var(--text-primary); }
.soc-sep { color: rgba(255,255,255,0.08); }
.footer {
  padding: 28px 24px; text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem; letter-spacing: 0.1em;
  color: var(--text-muted); opacity: 0.35;
}

/* ── Easter Egg ─────────────────────────────────────── */
.egg-overlay {
  position: fixed; inset: 0; z-index: 900;
  background: rgba(6,6,9,0.97);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px;
  opacity: 0; pointer-events: none;
  transition: opacity 0.5s ease;
}
.egg-overlay.show { opacity: 1; pointer-events: auto; }
.egg-tag { font-family: 'IBM Plex Mono', monospace; font-size: 0.6rem; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; }
.egg-ttl { font-size: clamp(1.6rem,4vw,2.4rem); font-weight: 800; letter-spacing: -0.03em; }
.egg-code {
  font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; line-height: 1.75;
  padding: 20px 24px;
  background: var(--bg-card); border: 1px solid rgba(0,255,170,0.1); border-radius: 12px;
  max-width: 330px; width: 90%;
}
.egg-close {
  margin-top: 12px;
  font-family: 'IBM Plex Mono', monospace; font-size: 0.62rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--text-muted); padding-bottom: 1px;
  transition: color 0.2s, border-color 0.2s;
}
.egg-close:hover { color: var(--accent); border-color: var(--accent); }
.kw { color: #fc5fa3; }
.fn { color: #5dd8ff; }
.str { color: #fc6a5d; }
.cm { color: #6c7986; }
.acc-c { color: var(--accent); }
.num { color: #d9c97c; }

/* ── Education & Languages ──────────────────────────── */
.edu-section {
  max-width: 800px; margin: 0 auto; padding: 80px 48px 60px;
}
.edu-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4px 24px;
  padding: 28px 0;
  border-bottom: 1px solid var(--border-subtle);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.6s var(--ease-ios), transform 0.6s var(--ease-ios);
}
.edu-item:first-of-type { border-top: 1px solid var(--border-subtle); }
.edu-item.vis { opacity: 1; transform: translateY(0); }
.edu-degree {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  font-weight: 600; color: var(--text-primary);
  letter-spacing: -0.01em; grid-column: 1;
}
.edu-period {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem; color: var(--text-muted);
  letter-spacing: 0.06em; grid-column: 2;
  white-space: nowrap; padding-top: 3px;
}
.edu-school {
  font-size: 0.85rem; color: var(--accent);
  font-weight: 500; grid-column: 1;
}
.edu-meta {
  font-size: 0.88rem; color: var(--text-muted);
  line-height: 1.7; font-weight: 300;
  grid-column: 1 / -1; margin-top: 4px;
}
.lang-row {
  display: flex; flex-wrap: wrap; gap: 10px;
  padding: 24px 0 0;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.6s 0.15s var(--ease-ios), transform 0.6s 0.15s var(--ease-ios);
}
.lang-row.vis { opacity: 1; transform: translateY(0); }
.lang-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 50px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
  font-size: 0.78rem; color: var(--text-muted);
}
.lang-chip em { font-style: normal; color: var(--text-primary); font-weight: 500; }

/* ── Responsive ─────────────────────────────────────── */
@media (max-width: 900px) {
  .showcase-sticky { padding: 0 28px; gap: 28px; }
  .pb { padding: 50px 28px; gap: 40px; }
}
@media (max-width: 768px) {
  .status-badge { display: none; }
  .corner-links { top: 18px; right: 18px; }
  .about { padding: 80px 0 60px; }
  .about-text { margin-bottom: 36px; }
  .showcase-sticky {
    grid-template-columns: 1fr;
    padding: 72px 20px 20px;
    align-items: flex-start; gap: 20px;
  }
  .sc-info { order: 1; }
  .phone-wrap { order: 2; }
  .iphone-scene { transform: scale(0.82) !important; transform-origin: top center !important; }
  .iphone-scene.hidden { transform: scale(0.82) translateY(60px) !important; opacity: 0; }
  .exp-section { padding: 60px 20px 40px; }
  .sp-section { padding: 60px 20px 40px; }
  .sp-card { padding: 24px; }
  .sp-stats { grid-template-columns: repeat(2, 1fr); }
  .edu-section { padding: 60px 20px 40px; }
  .edu-item { grid-template-columns: 1fr; }
  .edu-period { grid-column: 1; }
  .exp-item { grid-template-columns: 1fr; }
  .exp-period { grid-column: 1; }
  .exp-location { grid-column: 1; text-align: left; }
  .other-section { padding: 40px 0; }
  .pb { grid-template-columns: 1fr; padding: 36px 20px; gap: 24px; direction: ltr; }
  .pb.flip { direction: ltr; }
  .pb-text { order: 2; }
  .pb-visual { order: 1; transform: none !important; }
  .contact-section { padding: 100px 24px 60px; }
  .contact-socials { gap: 16px; }
  .contact-btns { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; }
  .contact-email, .cv-btn { justify-content: center; }
}
@media (max-width: 480px) {
  .hero-name { white-space: normal; word-break: break-word; }
  .iphone-scene { transform: scale(0.76) !important; }
}
`;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════ */

function useReveal(ref, threshold = 0.2) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vis'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
}

/* ═══════════════════════════════════════════════════════════════
   APP SCREENS
═══════════════════════════════════════════════════════════════ */

function StatusBar() {
  return (
    <div className="app-sb">
      <span className="sb-time">9:41</span>
      <span className="sb-icons">▌▌▌ ᯤ ▊</span>
    </div>
  );
}

/* Dream Oracle: Rüya Kahini */
function DreamOracleScreen() {
  const interpretations = [
    { style: 'Kadim Mısır', icon: '𓂀', color: '#c9a227' },
    { style: 'Jung Analizi', icon: '◎', color: '#7c5cfc' },
    { style: 'Sufizm', icon: '☽', color: '#00ffaa' },
  ];
  return (
    <div style={{ background: 'linear-gradient(160deg, #0a0618 0%, #050210 100%)', height: '100%' }}>
      <StatusBar />
      <div className="app-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.1rem' }}>🌙</span>
          <span className="app-ttl">Dream Oracle</span>
        </div>
        {/* Dream input area */}
        <div style={{
          padding: '12px 14px', borderRadius: 14,
          background: 'rgba(124,92,252,0.06)',
          border: '1px solid rgba(124,92,252,0.15)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <span style={{ fontSize: '0.48rem', opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'IBM Plex Mono, monospace' }}>Bu gece gördüğün rüya</span>
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            "Uçtuğumu ve yüksek bir dağın tepesinde durduğumu gördüm..."
          </span>
        </div>
        {/* Style chips */}
        <span className="app-lbl">Yorum Stili</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {interpretations.map((it, i) => (
            <div key={i} style={{
              flex: 1, padding: '8px 6px', borderRadius: 10,
              background: i === 2 ? `${it.color}18` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${i === 2 ? `${it.color}30` : 'rgba(255,255,255,0.06)'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}>
              <span style={{ fontSize: '0.9rem', color: it.color }}>{it.icon}</span>
              <span style={{ fontSize: '0.45rem', opacity: 0.6, letterSpacing: '0.08em', textAlign: 'center' }}>{it.style}</span>
            </div>
          ))}
        </div>
        {/* AI result */}
        <div style={{
          flex: 1, padding: '12px 14px', borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(0,255,170,0.04), rgba(124,92,252,0.04))',
          border: '1px solid rgba(0,255,170,0.1)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ffaa', animation: 'sdot-pulse 2s ease infinite' }} />
            <span style={{ fontSize: '0.5rem', color: '#00ffaa', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'IBM Plex Mono, monospace' }}>AI Yorumu</span>
          </div>
          <span style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
            Uçmak, özgürlük arzusunu ve engelleri aşma isteğini simgeler. Dağ tepesi, ulaşılmak istenen hedefleri ve başarıyı temsil eder...
          </span>
        </div>
        {/* Analyze button */}
        <div style={{
          padding: '10px', borderRadius: 12, textAlign: 'center',
          background: 'linear-gradient(135deg, #7c5cfc, #00ffaa40)',
          fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          fontFamily: 'IBM Plex Mono, monospace', color: '#fff',
        }}>
          ✦ Rüyamı Yorumla
        </div>
      </div>
    </div>
  );
}

/* PomoQuest */
function PomoQuestScreen() {
  const quests = [
    { name: 'Swift Savaşçısı', xp: 340, max: 500, done: true },
    { name: 'Kod Ustası', xp: 120, max: 300, done: false },
  ];
  return (
    <div style={{ background: 'linear-gradient(160deg, #0d0818 0%, #07040f 100%)', height: '100%' }}>
      <StatusBar />
      <div className="app-body">
        {/* XP Bar top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.9rem' }}>⚔️</span>
            <span className="app-ttl">PomoQuest</span>
          </div>
          <div style={{
            padding: '3px 8px', borderRadius: 8,
            background: 'rgba(124,92,252,0.15)', border: '1px solid rgba(124,92,252,0.3)',
            fontSize: '0.52rem', color: '#7c5cfc', fontFamily: 'IBM Plex Mono, monospace',
          }}>Lv.12</div>
        </div>
        {/* Timer ring */}
        <div className="fk-wrap">
          <div className="fk-circle" style={{ width: 130, height: 130 }}>
            <div className="fk-ring" />
            <span style={{ fontSize: '0.5rem', opacity: 0.35, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>⚔ QUEST</span>
            <span className="fk-time" style={{ fontSize: '1.65rem' }}>18:42</span>
            <span className="fk-mode">+25 XP kazanıyorsun</span>
          </div>
        </div>
        {/* Active quest */}
        <div style={{
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(124,92,252,0.08)', border: '1px solid rgba(124,92,252,0.15)',
        }}>
          <div style={{ fontSize: '0.5rem', opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'IBM Plex Mono, monospace' }}>Aktif Görev</div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: 6 }}>🗡 Portfolio geliştir</div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68%', background: 'linear-gradient(90deg, #7c5cfc, #a29bfe)', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: '0.45rem', opacity: 0.35, marginTop: 3, textAlign: 'right', fontFamily: 'IBM Plex Mono, monospace' }}>340 / 500 XP</div>
        </div>
        {/* Quest list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {quests.map((q, i) => (
            <div key={i} className="fk-task">
              <div className={`fk-chk${q.done ? ' done' : ''}`} />
              <div style={{ flex: 1 }}>
                <div className="fk-txt">{q.name}</div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, marginTop: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(q.xp / q.max) * 100}%`, background: q.done ? '#7c5cfc' : 'rgba(124,92,252,0.4)', borderRadius: 1 }} />
                </div>
              </div>
              <span style={{ fontSize: '0.48rem', color: '#7c5cfc', fontFamily: 'IBM Plex Mono, monospace', opacity: 0.7 }}>+{q.done ? q.max : q.xp}xp</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* CheckMyBite */
function CheckMyBiteScreen() {
  const nutrients = [
    { label: 'Kalori', val: '247 kcal', pct: 62, c: '#ff6b6b' },
    { label: 'Protein', val: '8.2g', pct: 40, c: '#00ffaa' },
    { label: 'Yağ', val: '11.4g', pct: 75, c: '#ffd43b' },
    { label: 'Karbonhidrat', val: '31.8g', pct: 55, c: '#54a0ff' },
  ];
  const flags = [
    { label: 'Gluten', ok: false },
    { label: 'Laktoz', ok: false },
    { label: 'Vegan', ok: true },
    { label: 'Organik', ok: true },
  ];
  return (
    <div style={{ background: 'linear-gradient(160deg, #051a0a 0%, #020d05 100%)', height: '100%' }}>
      <StatusBar />
      <div className="app-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.9rem' }}>🔬</span>
          <span className="app-ttl">CheckMyBite</span>
        </div>
        {/* Scanned product */}
        <div style={{
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(0,255,170,0.05)', border: '1px solid rgba(0,255,170,0.15)',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0,
          }}>🍪</div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600 }}>Çikolatalı Bisküvi</div>
            <div style={{ fontSize: '0.52rem', opacity: 0.4, marginTop: 2, fontFamily: 'IBM Plex Mono, monospace' }}>8690526050049 · 100g başına</div>
          </div>
          <div style={{
            marginLeft: 'auto', padding: '3px 7px', borderRadius: 6,
            background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.25)',
            fontSize: '0.5rem', color: '#ff6b6b', fontWeight: 700,
          }}>C</div>
        </div>
        {/* Nutrient bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {nutrients.map((n, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontSize: '0.52rem', opacity: 0.6 }}>{n.label}</span>
                <span style={{ fontSize: '0.52rem', color: n.c, fontFamily: 'IBM Plex Mono, monospace' }}>{n.val}</span>
              </div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${n.pct}%`, background: n.c, borderRadius: 2, opacity: 0.8 }} />
              </div>
            </div>
          ))}
        </div>
        {/* Flags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {flags.map((f, i) => (
            <div key={i} style={{
              padding: '4px 8px', borderRadius: 8,
              background: f.ok ? 'rgba(0,255,170,0.08)' : 'rgba(255,107,107,0.08)',
              border: `1px solid ${f.ok ? 'rgba(0,255,170,0.2)' : 'rgba(255,107,107,0.2)'}`,
              fontSize: '0.5rem', color: f.ok ? '#00ffaa' : '#ff6b6b',
            }}>
              {f.ok ? '✓' : '✗'} {f.label}
            </div>
          ))}
        </div>
        {/* Scan btn */}
        <div style={{
          padding: '9px', borderRadius: 12, textAlign: 'center',
          background: 'rgba(0,255,170,0.1)', border: '1px dashed rgba(0,255,170,0.25)',
          fontSize: '0.58rem', color: '#00ffaa', letterSpacing: '0.08em',
          fontFamily: 'IBM Plex Mono, monospace',
        }}>
          📷 Yeni Ürün Tara
        </div>
      </div>
    </div>
  );
}

/* Giftie: Hediye Bulucu */
function GiftieScreen() {
  const gifts = [
    { name: 'Kahve Seti', price: '₺450', match: 96, emoji: '☕', color: '#c9a227' },
    { name: 'Kitap Seti', price: '₺320', match: 91, emoji: '📚', color: '#54a0ff' },
    { name: 'Bitki Bakım', price: '₺280', match: 88, emoji: '🌿', color: '#00ffaa' },
  ];
  return (
    <div style={{ background: 'linear-gradient(160deg, #140a1a 0%, #0a0410 100%)', height: '100%' }}>
      <StatusBar />
      <div className="app-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.9rem' }}>🎁</span>
          <span className="app-ttl">Giftie</span>
        </div>
        {/* Recipient card */}
        <div style={{
          padding: '10px 12px', borderRadius: 12,
          background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.15)',
          display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>👩 Annem</span>
            <span style={{ fontSize: '0.5rem', color: '#c9a227', fontFamily: 'IBM Plex Mono, monospace' }}>Bütçe: ₺500</span>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {['Bahçe', 'Kitap', 'Kahve', 'Müzik'].map((tag, i) => (
              <span key={i} style={{
                padding: '2px 7px', borderRadius: 6,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '0.46rem', opacity: 0.6,
              }}>{tag}</span>
            ))}
          </div>
        </div>
        {/* AI tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c9a227', animation: 'sdot-pulse 2s ease infinite' }} />
          <span style={{ fontSize: '0.5rem', color: '#c9a227', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'IBM Plex Mono, monospace' }}>AI Önerileri · 12 seçenek</span>
        </div>
        {/* Gift cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {gifts.map((g, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 11,
              background: i === 0 ? `${g.color}10` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${i === 0 ? `${g.color}25` : 'rgba(255,255,255,0.06)'}`,
            }}>
              <span style={{ fontSize: '1.1rem' }}>{g.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 600 }}>{g.name}</div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, marginTop: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${g.match}%`, background: g.color, borderRadius: 1, opacity: 0.7 }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <span style={{ fontSize: '0.58rem', fontWeight: 700, color: g.color }}>{g.price}</span>
                <span style={{ fontSize: '0.44rem', opacity: 0.4, fontFamily: 'IBM Plex Mono, monospace' }}>{g.match}% eşleşme</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyWatchScreen() {
  const violations = [
    { type: 'Kask Eksik', cam: 'Kamera 3', time: '14:22', color: '#ff6b6b' },
    { type: 'Yelek Eksik', cam: 'Kamera 1', time: '14:19', color: '#ffd43b' },
    { type: 'Düşme Algılandı', cam: 'Kamera 5', time: '14:11', color: '#ff6b6b' },
  ];
  return (
    <div style={{ background: 'linear-gradient(160deg, #1a0505 0%, #0d0202 100%)', height: '100%' }}>
      <StatusBar />
      <div className="app-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.9rem' }}>🦺</span>
          <span className="app-ttl">SafetyWatch AI</span>
          <div style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
            padding: '2px 7px', borderRadius: 6,
            background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.3)',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff6b6b', animation: 'sdot-pulse 2s ease infinite' }} />
            <span style={{ fontSize: '0.46rem', color: '#ff6b6b', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}>CANLI</span>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {[['Kamera', '8'], ['İhlal', '3'], ['Aktif', '6']].map(([label, val]) => (
            <div key={label} style={{
              padding: '8px 6px', borderRadius: 10, textAlign: 'center',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: label === 'İhlal' ? '#ff6b6b' : 'var(--text-primary)' }}>{val}</div>
              <div style={{ fontSize: '0.45rem', opacity: 0.4, marginTop: 2, fontFamily: 'IBM Plex Mono, monospace' }}>{label}</div>
            </div>
          ))}
        </div>
        {/* Violations list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {violations.map((v, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 10,
              background: 'rgba(255,107,107,0.06)', border: `1px solid ${v.color}28`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 600, color: v.color }}>{v.type}</div>
                <div style={{ fontSize: '0.46rem', opacity: 0.5, fontFamily: 'IBM Plex Mono, monospace', marginTop: 1 }}>{v.cam}</div>
              </div>
              <span style={{ fontSize: '0.44rem', color: 'var(--text-muted)', fontFamily: 'IBM Plex Mono, monospace' }}>{v.time}</span>
            </div>
          ))}
        </div>
        {/* YOLOv11 tag */}
        <div style={{
          padding: '7px 10px', borderRadius: 10, textAlign: 'center',
          background: 'rgba(255,107,107,0.08)', border: '1px dashed rgba(255,107,107,0.25)',
          fontSize: '0.52rem', color: '#ff6b6b', letterSpacing: '0.08em',
          fontFamily: 'IBM Plex Mono, monospace',
        }}>
          YOLOv11 · Gerçek Zamanlı İşleme
        </div>
      </div>
    </div>
  );
}

const APP_SCREENS = [DreamOracleScreen, PomoQuestScreen, CheckMyBiteScreen, GiftieScreen];

/* ═══════════════════════════════════════════════════════════════
   BUILD LOADER
═══════════════════════════════════════════════════════════════ */

function BuildLoader({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 250),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setOut(true), 1500),
      setTimeout(() => onDone(), 2100),
    ];
    return () => t.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={`bl${out ? ' out' : ''}`}>
      <div className="bl-lines">
        <div className="bl-line" style={{ animationDelay: '0.1s' }}>▶ Building portfolio.xcodeproj...</div>
        {phase >= 1 && <div className="bl-line" style={{ animationDelay: '0s' }}>   Compiling Portfolio.swift</div>}
        {phase >= 2 && <div className="bl-line" style={{ animationDelay: '0s' }}>   Linking dependencies...</div>}
        {phase >= 3 && <div className="bl-line ok" style={{ animationDelay: '0s' }}>✓ Build Succeeded — 0 errors, 0 warnings</div>}
      </div>
      <div className="bl-bar"><div className="bl-fill" /></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════ */

function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      ref.current.style.setProperty('--mx', `${e.clientX}px`);
      ref.current.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="hero" ref={ref}>
      <div className="hero-blob" />
      <div className="hero-spotlight" />
      <div className="hero-content">
        <span className="hero-name"> İbrahim Binbuğa</span>
        <span className="hero-role">Flutter & iOS Developer</span>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span className="scroll-txt">scroll</span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT / MARQUEE
═══════════════════════════════════════════════════════════════ */

function About() {
  const ref = useRef(null);
  useReveal(ref, 0.3);

  const items = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="about">
      <p className="about-text" ref={ref}>
        <em>2 yıldır mobil ekosisteminde</em> kullanıcı odaklı uygulamalar geliştiriyorum.
        Flutter ve Swift ile iOS & Android deneyimi, App Store'a taşınan projeler ve
        <em> kusursuz kullanıcı deneyimi</em> — bunlara önem veriyorum.
      </p>
      <div className="marquee-outer">
        <div className="marquee-track">
          {items.map((t, i) => (
            <span key={i} className="marquee-item">
              {t}<span className="mq-sep"> · </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IPHONE MOCKUP
═══════════════════════════════════════════════════════════════ */

function IPhoneMockup({ activeIndex, tiltX, tiltY }) {
  return (
    <div
      className="iphone"
      style={{ transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}
    >
      <div className="iphone-screen">
        <div className="sc-track">
          {APP_SCREENS.map((Screen, i) => (
            <div key={i} className={`sc-slide${activeIndex === i ? ' on' : ''}`}>
              <Screen />
            </div>
          ))}
        </div>
      </div>
      <div className="iphone-di" />
      <div className="iphone-bl" />
      <div className="iphone-br" />
      <div className="iphone-shine" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SHOWCASE SECTION
═══════════════════════════════════════════════════════════════ */

function ShowcaseSection() {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const prevIndex = useRef(0);
  const autoTimer = useRef(null);

  // Phone entrance via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setPhoneVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Desktop: scroll-driven index
  useEffect(() => {
    if (isMobile) return;
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionH = rect.height;
      const progress = (window.scrollY - sectionTop) / (sectionH - window.innerHeight);
      const idx = Math.min(
        Math.floor(Math.max(0, progress) * SHOWCASE_PROJECTS.length),
        SHOWCASE_PROJECTS.length - 1
      );
      if (idx !== prevIndex.current) {
        prevIndex.current = idx;
        setSwapping(true);
        setTimeout(() => { setActiveIndex(idx); setSwapping(false); }, 300);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isMobile]);

  // Mobile: auto-play
  useEffect(() => {
    if (!isMobile) return;
    autoTimer.current = setInterval(() => {
      setSwapping(true);
      setTimeout(() => {
        setActiveIndex(i => (i + 1) % SHOWCASE_PROJECTS.length);
        setSwapping(false);
      }, 300);
    }, 3200);
    return () => clearInterval(autoTimer.current);
  }, [isMobile]);

  // Swipe support (mobile)
  const touchStart = useRef(null);
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = useCallback((e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) {
      clearInterval(autoTimer.current);
      setSwapping(true);
      setTimeout(() => {
        setActiveIndex(i =>
          dx > 0 ? Math.max(0, i - 1) : Math.min(SHOWCASE_PROJECTS.length - 1, i + 1)
        );
        setSwapping(false);
      }, 300);
    }
    touchStart.current = null;
  }, []);

  // Mouse parallax on phone
  useEffect(() => {
    const handler = (e) => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      setTilt({ x: dy * -2.5, y: dx * 2.5 });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const p = SHOWCASE_PROJECTS[activeIndex];

  return (
    <section
      className="showcase-section"
      ref={sectionRef}
      style={{ height: `${(SHOWCASE_PROJECTS.length + 1) * 100}vh` }}
    >
      <div
        className="showcase-sticky"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Left: info */}
        <div className="sc-info">
          <span className="sc-label">// ios apps</span>
          <h2 className="sc-heading">iOS Developer</h2>

          <div className="pj-info">
            <div className={`pj-name${swapping ? ' swap' : ''}`}>{p.name}</div>
            <div className={`pj-desc${swapping ? ' swap' : ''}`}>{p.desc}</div>
            <div className="pj-stack">
              {p.stack.map((s, i) => (
                <span key={i} className={`pill${i === 0 ? ' hi' : ''}`}>{s}</span>
              ))}
            </div>
            {p.storeUrl && (
              <a href={p.storeUrl} className="store-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store'da Gör →
              </a>
            )}
          </div>

          <div className="dots">
            {SHOWCASE_PROJECTS.map((_, i) => (
              <button
                key={i}
                className={`dot-item${i === activeIndex ? ' on' : ''}`}
                onClick={() => {
                  setSwapping(true);
                  setTimeout(() => { setActiveIndex(i); setSwapping(false); }, 300);
                }}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: phone */}
        <div className="phone-wrap" ref={phoneRef}>
          <div
            className="phone-glow"
            style={{ background: SHOWCASE_PROJECTS[activeIndex].glow }}
          />
          <div className={`iphone-scene${phoneVisible ? ' shown' : ' hidden'}`}>
            <IPhoneMockup
              activeIndex={activeIndex}
              tiltX={tilt.x}
              tiltY={tilt.y}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OTHER PROJECTS
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   EXPERIENCE
═══════════════════════════════════════════════════════════════ */

function ExpItem({ item, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('vis'); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="exp-item" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <span className="exp-role">{item.role}</span>
      <span className="exp-period">{item.period}</span>
      <a href={item.companyUrl} className="exp-company" target="_blank" rel="noreferrer">
        {item.company}
      </a>
      <span className="exp-location">{item.location}</span>
      <p className="exp-desc">{item.desc}</p>
    </div>
  );
}

function Experience() {
  return (
    <section className="exp-section">
      <span className="exp-label">// experience</span>
      <div className="exp-list">
        {EXPERIENCE.map((item, i) => (
          <ExpItem key={i} item={item} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function ProjectBand({ project }) {
  const ref = useRef(null);
  useReveal(ref, 0.15);

  return (
    <div
      ref={ref}
      className={`pb${project.flip ? ' flip' : ''}`}
    >
      <div className="pb-text">
        <div className="pb-num">{project.num}</div>
        <div className="pb-name">{project.name}</div>
        <div className="pb-desc">{project.desc}</div>
        <div className="pb-stack">
          {project.stack.map((s, i) => <span key={i} className="pill">{s}</span>)}
        </div>
        <div className="pb-links">
          {project.demo && <a href={project.demo} className="pb-link">Demo →</a>}
          <a href={project.code} className="pb-link">Kod →</a>
        </div>
      </div>

      <div className="pb-visual" style={{ background: `linear-gradient(135deg, ${project.visColor}, var(--bg-card))` }}>
        <div className="pb-vis-grid">
          {[...Array(8)].map((_, i) => <div key={i} className="pb-vis-block" />)}
        </div>
        <div className="pb-vis-lines">
          {[100, 75, 55, 85].map((w, i) => (
            <div key={i} className="pb-vis-line" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OtherProjects() {
  return (
    <section className="other-section">
      {OTHER_PROJECTS.map((p, i) => <ProjectBand key={i} project={p} />)}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SENIOR PROJECT
═══════════════════════════════════════════════════════════════ */

function SeniorProject() {
  const ref = useRef(null);
  useReveal(ref, 0.2);

  return (
    <section className="sp-section">
      <span className="exp-label">// bitirme projesi</span>
      <div className="sp-card" ref={ref}>
        <h2 className="sp-title">SafetyWatch AI</h2>
        <p className="sp-subtitle">
          YOLOv11 bilgisayarlı görü modelleriyle kask/yelek ihlallerini ve düşme vakalarını gerçek zamanlı tespit eden çok kiracılı iş yeri güvenlik izleme platformu.
        </p>
        <div className="sp-stats">
          <div className="sp-stat">
            <span className="sp-stat-val">93</span>
            <span className="sp-stat-lbl">Birim Testi</span>
          </div>
          <div className="sp-stat">
            <span className="sp-stat-val">3</span>
            <span className="sp-stat-lbl">Platform</span>
          </div>
          <div className="sp-stat">
            <span className="sp-stat-val">∞</span>
            <span className="sp-stat-lbl">Multi-tenant</span>
          </div>
          <div className="sp-stat">
            <span className="sp-stat-val">v11</span>
            <span className="sp-stat-lbl">YOLO</span>
          </div>
        </div>
        <div className="sp-bullets">
          <span className="sp-bullet">Gerçek zamanlı push bildirimleri, ihlal takibi ve RBAC içeren Flutter mobil uygulama geliştirildi.</span>
          <span className="sp-bullet">Canlı kamera yönetimi, ihlal inceleme iş akışları ve PDF/CSV/Excel dışa aktarımı içeren React 19 web panosu oluşturuldu.</span>
          <span className="sp-bullet">WebSocket canlı yayın ve YOLO çıkarım entegrasyonlu asenkron ihlal kuyruğuyla çok kiracılı FastAPI backend yazıldı.</span>
          <span className="sp-bullet">Vitest, React Testing Library, MSW ile auth, API ve CRUD kapsamlı 93 birim testi yazıldı.</span>
        </div>
        <div className="sp-stack">
          {['Flutter', 'React 19', 'FastAPI', 'PostgreSQL', 'WebSocket', 'Firebase Cloud Messaging', 'Docker', 'YOLOv11', 'Render', 'Vercel'].map((t, i) => (
            <span key={i} className={`pill${i === 0 ? ' hi' : ''}`}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <a
            href="https://ibrahimbinbuga.github.io/SafetyWatchWebsite/"
            target="_blank"
            rel="noreferrer"
            className="pb-link"
          >
            Proje Sitesi
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EDUCATION & LANGUAGES
═══════════════════════════════════════════════════════════════ */

function Education() {
  const itemRef = useRef(null);
  const langRef = useRef(null);
  useReveal(itemRef, 0.3);
  useReveal(langRef, 0.3);

  return (
    <section className="edu-section">
      <span className="exp-label">// education</span>
      <div>
        <div className="edu-item" ref={itemRef}>
          <span className="edu-degree">Yazılım Mühendisliği Lisans</span>
          <span className="edu-period">Eylül 2021 — Temmuz 2026</span>
          <a href="https://www.mu.edu.tr/" className="edu-school">Muğla Sıtkı Koçman Üniversitesi</a>
          <span className="edu-meta">GPA: 3.48 / 4.00 · Mühendislik Fakültesi · Muğla, Türkiye</span>
        </div>
      </div>
      <div className="lang-row" ref={langRef}>
        <div className="lang-chip"><em>Türkçe</em> Anadil</div>
        <div className="lang-chip"><em>İngilizce</em> Upper Intermediate</div>
        <div className="lang-chip"><em>İspanyolca</em> Başlangıç</div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════ */

function Contact() {
  const ref = useRef(null);
  useReveal(ref, 0.2);

  return (
    <>
      <section className="contact-section" ref={ref}>
        <h2 className="contact-headline">
          Bir sonraki projenizi birlikte inşa edelim.
        </h2>
        <div className="contact-btns">
          <a href="mailto:ibrahimbinbugaa@gmail.com" className="contact-email">
            ibrahimbinbugaa@gmail.com
          </a>
          <a href="/portfolio-website/ibrahim_binbuga_resume.docx" download="ibrahim_binbuga_resume.docx" className="cv-btn">
            <svg viewBox="0 0 24 24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            CV İndir
          </a>
        </div>
        <div className="contact-socials">
          <a href="https://github.com/ibrahimbinbuga" className="soc-link">GitHub</a>
          <span className="soc-sep">·</span>
          <a href="https://www.linkedin.com/in/ibrahim-binbu%C4%9Fa/" className="soc-link">LinkedIn</a>
          
        </div>
      </section>
      <footer className="footer">© 2026 İbrahim Binbuğa</footer>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EASTER EGG
═══════════════════════════════════════════════════════════════ */

function EasterEgg({ show, onClose }) {
  return (
    <div className={`egg-overlay${show ? ' show' : ''}`} onClick={onClose}>
      <span className="egg-tag">// Swift Playground</span>
      <h3 className="egg-ttl">Konami Unlock 🎮</h3>
      <div className="egg-code" onClick={e => e.stopPropagation()}>
        <div><span className="kw">import</span> <span className="fn">SwiftUI</span></div>
        <div><span className="cm">// Merhaba, meraklı ziyaretçi 👋</span></div>
        <div>&nbsp;</div>
        <div><span className="kw">struct</span> <span className="fn">Developer</span> {'{'}</div>
        <div>{'  '}<span className="kw">let</span> name<span className="cm"> = </span><span className="str">"İbrahim Binbuğa"</span></div>
        <div>{'  '}<span className="kw">let</span> passion<span className="cm"> = </span><span className="str">"iOS"</span></div>
        <div>{'  '}<span className="kw">var</span> isHiring<span className="cm">: </span><span className="fn">Bool</span> {'{'}</div>
        <div>{'    '}<span className="kw">return</span> <span className="acc-c">true</span></div>
        <div>{'  }}'}</div>
        <div>{'}'}</div>
      </div>
      <button className="egg-close" onClick={onClose}>Kapat — Esc</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [ready, setReady] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  // Konami code
  useEffect(() => {
    const KONAMI = [38,38,40,40,37,39,37,39,66,65];
    let idx = 0;
    const handler = (e) => {
      if (e.keyCode === KONAMI[idx]) { idx++; }
      else { idx = e.keyCode === KONAMI[0] ? 1 : 0; }
      if (idx === KONAMI.length) { setEasterEgg(true); idx = 0; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close easter egg on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setEasterEgg(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {!ready && <BuildLoader onDone={() => setReady(true)} />}

      <div style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        {/* Fixed UI */}
        <div className="status-badge">
          <div className="sdot" />
          <span>open to work</span>
        </div>
        <div className="corner-links">
          <a href="https://github.com/ibrahimbinbuga" target="_blank" rel="noreferrer" className="corner-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/ibrahim-binbu%C4%9Fa/" target="_blank" rel="noreferrer" className="corner-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>

        {/* Content */}
        <main>
          <Hero />
          <About />
          <ShowcaseSection />
          <Experience />
          <SeniorProject />
          <OtherProjects />
          <Education />
          <Contact />
        </main>
      </div>

      <EasterEgg show={easterEgg} onClose={() => setEasterEgg(false)} />
    </>
  );
}
