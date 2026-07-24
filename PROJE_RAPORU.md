# Portfolyo Websitesi — Proje Raporu

**Proje Adı:** İbrahim Binbuğa Kişisel Portfolyo Sitesi  
**Geliştirici:** İbrahim Binbuğa  
**Tarih:** Mayıs 2026  
**Repository:** https://github.com/ibrahimbinbuga/portfolio-website  

---

## 1. Proje Özeti

Kişisel portfolyo websitesi; deneyimleri, projeleri, eğitim bilgileri ve iletişim detaylarını modern ve etkileşimli biçimde sunan tek sayfalık (SPA) bir web uygulamasıdır. Tasarım tamamen özel yazılmış CSS ile sıfırdan oluşturulmuş; herhangi bir UI kütüphanesi veya bileşen çerçevesi kullanılmamıştır.

---

## 2. Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Stil | Saf CSS (inline `<style>`, CSS değişkenleri) |
| Fontlar | Space Grotesk, IBM Plex Mono (Google Fonts) |
| Deploy | GitHub Pages / Vercel |
| Dil | JavaScript (JSX) |

**Harici bağımlılık sayısı:** 2 (`react`, `react-dom`) — kasıtlı olarak minimal tutulmuştur.

---

## 3. Dosya Yapısı

```
portfolio-website/
├── Portfolio.jsx      # Tüm bileşenler ve veriler (~1930 satır)
├── main.jsx           # React uygulama giriş noktası
├── index.html         # HTML şablonu
├── vite.config.js     # Vite yapılandırması
├── package.json       # Bağımlılıklar
└── public/
    └── cv.docx        # İndirilebilir özgeçmiş
```

Tüm uygulama mantığı `Portfolio.jsx` içinde toplanmıştır. Veri sabitleri, stiller ve bileşenler tek dosyada bölümler halinde organize edilmiştir.

---

## 4. Sayfa Yapısı ve Bölümler

Sayfa aşağıdaki bölümlerden oluşmaktadır (render sırasıyla):

### 4.1 Build Loader
Sayfa açılışında terminale benzeyen bir yükleme animasyonu gösterilir. Simüle edilmiş derleme adımları tamamlandıktan sonra sayfa içeriği fade-in ile görünür hale gelir.

### 4.2 Hero
Ad ve unvan ("Flutter & iOS Developer") büyük tipografik bir tasarımla merkezde yer alır. Fare konumunu takip eden bir spotlight efekti ve arka planda animasyonlu bir blob bulunur.

### 4.3 About
Kısa bir tanıtım metni ve kullanılan teknolojilerin sonsuz döngüde kayan bir şerit (marquee) halinde gösterildiği bölüm. Marquee'de 23 teknoloji etiketi yer almaktadır.

### 4.4 Showcase
Scroll'a bağlı yapışkan (sticky) bir bölümde iPhone mockup'ı üzerinde 4 iOS/mobil uygulama tanıtılır. Mockup gerçek zamanlı gyroscope benzeri eğim efektiyle yönlendirme (tilt) animasyonu gösterir. Her proje için özel ekran bileşeni yazılmıştır:

| Ekran Bileşeni | Proje |
|----------------|-------|
| `DreamOracleScreen` | Dream Oracle: Rüya Kahini |
| `PomoQuestScreen` | PomoQuest |
| `NetSayacimScreen` | Net Sayacım |
| `SpendWiseScreen` | SpendWise |

### 4.5 Experience (Deneyim)
4 iş deneyimi IntersectionObserver ile scroll animasyonuyla listelenir:

- IF22 Software — Co-founder · Flutter & iOS Developer (Ocak 2026 – Devam)
- Virtus R&D Software Inc. — Mobile Application Developer Intern (Temmuz–Ağustos 2025)
- Softwer Malta — Mobile Application Developer (Aralık 2024–Nisan 2025)
- Mersin International Port (MIP) — Software Developer Intern (Temmuz–Ağustos 2024)

### 4.6 Bitirme Projesi (SeniorProject)
SafetyWatch AI için ayrılmış özel bölüm. Kart tasarımı kırmızı vurgu rengiyle diğer bölümlerden ayrışır. İçerik:
- İstatistik kutuları: 93 birim testi, 3 platform, multi-tenant mimari, YOLOv11
- 4 madde öne çıkan teknik başarım
- 10 teknoloji etiketi
- Proje sitesi bağlantısı (https://ibrahimbinbuga.github.io/SafetyWatchWebsite/)

### 4.7 Other Projects (Diğer Projeler)
6 proje görsel kartlarla ve alternatif sağ-sol yerleşimle listelenir:

| # | Proje | Stack |
|---|-------|-------|
| 01 | IF22 Software | iOS, Flutter, Go, Docker, Swift |
| 02 | IFlow | Vercel, React, Go, Docker |
| 03 | Meeting Analyzer | FastAPI, React, SQLite, ML |
| 04 | Spam Shield | Flask, Python, ML |
| 05 | Drugger Detection | Flutter, Python, Deep Learning |
| 06 | Emotions of Drawings | React, Flask, Deep Learning |

### 4.8 Education & Languages (Eğitim ve Diller)
- Muğla Sıtkı Koçman Üniversitesi — Yazılım Mühendisliği — GPA: 3.48/4.00 (2021–2026)
- Dil yetkinlikleri: Türkçe (Anadil), İngilizce (Upper Intermediate), İspanyolca (Başlangıç)

### 4.9 Contact
E-posta bağlantısı, CV indirme butonu ve sosyal medya linkleri (GitHub, LinkedIn).

### 4.10 Easter Egg
Konami kodu (↑↑↓↓←→←→BA) girildiğinde Swift kodu temalı gizli bir panel açılır.

---

## 5. Teknik Özellikler

### 5.1 Animasyon Sistemi
- **IntersectionObserver** tabanlı `useReveal` hook'u ile bölüm geçiş animasyonları
- **CSS `@keyframes`** ile yükleme, solma (fade-up) ve nabız animasyonları
- **Scroll progress** hesabıyla showcase bölümünde aktif proje güncelleme
- **`prefers-reduced-motion`** medya sorgusuyla erişilebilirlik desteği

### 5.2 Renk Sistemi
CSS değişkenleriyle merkezi bir renk paleti kullanılmıştır:

```css
--bg-deep:       #060609   /* Ana arka plan */
--bg-elevated:   #0d0d14   /* Yükseltilmiş yüzeyler */
--bg-card:       #111119   /* Kart arka planı */
--text-primary:  #f0f0f3   /* Birincil metin */
--text-muted:    #5a5a6e   /* İkincil metin */
--accent:        #00ffaa   /* Vurgu rengi (yeşil) */
--accent-alt:    #7c5cfc   /* Alternatif vurgu (mor) */
```

Her showcase projesi kendi `accent` ve `glow` rengine sahiptir.

### 5.3 Duyarlı Tasarım (Responsive)
Üç kırılma noktasında optimize edilmiştir:
- `> 900px`: Tam masaüstü düzeni
- `≤ 768px`: Mobil düzeni — showcase tek sütun, showcase bilgi üstte, telefon altta
- `≤ 480px`: Küçük ekranlar — büyük başlıklar sözcük kırılır, iPhone ölçeği küçülür

### 5.4 Performans
- Sıfır CSS çerçevesi, sıfır ikon kütüphanesi — SVG ikonlar inline yazılmıştır
- Gzip sıkıştırılmış bundle boyutu: ~62 KB (tüm uygulama)
- Google Fonts dışında harici kaynak yok

---

## 6. Özgeçmiş ile Senkronizasyon

Bu rapor dönemi kapsamında özgeçmiş (`ibrahim_binbuga_resume.docx`) ile site karşılaştırılmış, aşağıdaki güncellemeler yapılmıştır:

| Güncelleme | Detay |
|------------|-------|
| Hero rolü | "iOS Developer" → "Flutter & iOS Developer" |
| Yeni bölüm | SafetyWatch AI için ayrı "Bitirme Projesi" başlığı |
| Yeni bölüm | Eğitim ve Yabancı Diller |
| Yeni projeler | Drugger Detection, Emotions of Drawings |
| Marquee | Supabase, PostgreSQL, FastAPI, Python, Riverpod eklendi |
| SafetyWatch linki | https://ibrahimbinbuga.github.io/SafetyWatchWebsite/ |

---

## 7. Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusu (http://localhost:5173)
npm run dev

# Üretim build'i
npm run build
```

---

## 8. Canlı Bağlantılar

| Kaynak | URL |
|--------|-----|
| GitHub Repository | https://github.com/ibrahimbinbuga/portfolio-website |
| SafetyWatch AI Sitesi | https://ibrahimbinbuga.github.io/SafetyWatchWebsite/ |
| IF22 Software | https://if22software.github.io/ |
| LinkedIn | https://www.linkedin.com/in/ibrahim-binbuğa/ |
