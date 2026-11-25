/**
 * ============================================================
 * ENGAGEMENT INVITATION — MAIN JAVASCRIPT
 * Anat Tom & Britto Thomas
 * ============================================================
 */

'use strict';

/* ── Wait for DOM + CONFIG ── */
document.addEventListener('DOMContentLoaded', () => {
  const C = window.CONFIG;

  /* ── Helpers ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const t = (key) => C.i18n[App.lang][key] || C.i18n.en[key] || key;
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════
     APP STATE
     ════════════════════════════════════════ */
  const App = {
    lang:          localStorage.getItem('invite_lang')    || 'en',
    theme:         localStorage.getItem('invite_theme')   || 'rouge-ivory',
    musicPref:     localStorage.getItem('invite_music'),  // 'yes' | 'no' | null
    musicPlaying:  false,
    musicMuted:    false,
    galleryIndex:  0,
    envelopeOpened: false,
  };

  /* ════════════════════════════════════════
     THEME SYSTEM
     ════════════════════════════════════════ */
  function applyTheme(themeId) {
    const theme = C.themes.find(th => th.id === themeId) || C.themes[0];
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([prop, val]) => root.style.setProperty(prop, val));
    App.theme = themeId;
    localStorage.setItem('invite_theme', themeId);

    /* Update active dot */
    $$('.theme-dot').forEach(dot => {
      dot.classList.toggle('active', dot.dataset.theme === themeId);
      dot.setAttribute('aria-pressed', dot.dataset.theme === themeId ? 'true' : 'false');
    });
  }

  function initTheme() {
    const container = $('#theme-switcher');
    if (!container) return;

    const label = document.createElement('span');
    label.className = 'theme-label';
    label.setAttribute('aria-hidden', 'true');
    label.id = 'theme-switcher-label';
    container.appendChild(label);

    const dots = document.createElement('div');
    dots.className = 'theme-dots';
    dots.setAttribute('role', 'group');
    dots.setAttribute('aria-labelledby', 'theme-switcher-label');

    C.themes.forEach(theme => {
      const dot = document.createElement('button');
      dot.className = 'theme-dot';
      dot.dataset.theme = theme.id;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-pressed', theme.id === App.theme ? 'true' : 'false');
      dot.setAttribute('title', theme.name);
      dot.addEventListener('click', () => applyTheme(theme.id));
      dot.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applyTheme(theme.id); }
      });
      dots.appendChild(dot);
    });

    container.appendChild(dots);
    applyTheme(App.theme);
  }

  /* ════════════════════════════════════════
     LANGUAGE / i18n
     ════════════════════════════════════════ */
  function applyLanguage(lang) {
    App.lang = lang;
    localStorage.setItem('invite_lang', lang);

    document.documentElement.setAttribute('lang', lang);
    document.body.classList.toggle('lang-ml', lang === 'ml');

    /* Update all [data-i18n] elements */
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = C.i18n[lang][key] || C.i18n.en[key];
      if (val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });

    /* Update [data-i18n-aria] ARIA labels */
    $$('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const val = C.i18n[lang][key] || C.i18n.en[key];
      if (val) el.setAttribute('aria-label', val);
    });

    /* Update [data-i18n-title] title attributes */
    $$('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const val = C.i18n[lang][key] || C.i18n.en[key];
      if (val) el.setAttribute('title', val);
    });

    /* Update theme switcher label */
    const themeLabel = $('#theme-switcher-label');
    if (themeLabel) themeLabel.textContent = t('themesLabel');

    /* Update theme dot titles */
    $$('.theme-dot').forEach(dot => {
      const theme = C.themes.find(th => th.id === dot.dataset.theme);
      if (theme) dot.setAttribute('title', lang === 'ml' ? theme.nameML : theme.name);
    });

    /* Update story and gallery (re-render if needed) */
    renderStory();
    renderGallery();

    /* Update lang buttons */
    $$('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    /* Update music prompt */
    updateMusicPromptText();

    /* Update couple names for Malayalam */
    if (lang === 'ml') {
      const brideNameEl = document.getElementById('hero-bride-name');
      const groomNameEl = document.getElementById('hero-groom-name');
      if (brideNameEl) brideNameEl.textContent = C.i18n.ml.brideName || C.bride.fullName;
      if (groomNameEl) groomNameEl.textContent = C.i18n.ml.groomName || C.groom.fullName;
    } else {
      const brideNameEl = document.getElementById('hero-bride-name');
      const groomNameEl = document.getElementById('hero-groom-name');
      if (brideNameEl) brideNameEl.textContent = C.bride.fullName;
      if (groomNameEl) groomNameEl.textContent = C.groom.fullName;
    }

    /* Update page title */
    document.title = lang === 'ml'
      ? `${C.i18n.ml.brideName || C.bride.fullName} & ${C.i18n.ml.groomName || C.groom.fullName} — വിവാഹനിശ്ചയ ക്ഷണം`
      : `${C.bride.fullName} & ${C.groom.fullName} — Engagement Invitation`;
  }

  function initLanguage() {
    const switcher = $('#lang-switcher');
    if (!switcher) return;

    ['en', 'ml'].forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.dataset.lang = lang;
      btn.setAttribute('role', 'button');
      btn.setAttribute('aria-pressed', lang === App.lang ? 'true' : 'false');
      btn.textContent = lang === 'en' ? 'English' : 'മലയാളം';
      btn.addEventListener('click', () => applyLanguage(lang));
      switcher.appendChild(btn);
    });

    applyLanguage(App.lang);
  }

  /* ════════════════════════════════════════
     ENVELOPE
     ════════════════════════════════════════ */
  function initEnvelope() {
    const envelope     = document.getElementById('envelope');
    const mainSection  = document.getElementById('main-invitation');
    const tapHint      = document.getElementById('envelope-tap-hint');
    const envelopeSection = document.getElementById('envelope-section');
    if (!envelope || !mainSection) return;

    function openEnvelope() {
      if (App.envelopeOpened) return;
      App.envelopeOpened = true;

      envelope.classList.add('open');
      envelope.setAttribute('aria-label', 'Invitation opened');
      if (tapHint) tapHint.style.opacity = '0';

      /* Offer music after interaction */
      if (App.musicPref === null) {
        setTimeout(showMusicPrompt, 800);
      }

      /* After animation, scroll to main invitation */
      const delay = prefersReducedMotion() ? 200 : 1200;
      setTimeout(() => {
        mainSection.classList.remove('hidden');
        mainSection.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

        /* Hide envelope section after full reveal */
        setTimeout(() => {
          if (envelopeSection) envelopeSection.style.display = 'none';
        }, 600);
      }, delay);
    }

    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
    });
  }

  /* ════════════════════════════════════════
     PARTICLES
     ════════════════════════════════════════ */
  function initParticles() {
    if (prefersReducedMotion()) return;
    $$('.particles-host').forEach(container => {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 60 + 15;
        p.style.cssText = `
          width:${size}px; height:${size}px;
          left:${Math.random() * 100}%;
          animation-duration:${Math.random() * 14 + 10}s;
          animation-delay:${Math.random() * 14}s;
        `;
        container.appendChild(p);
      }
    });
  }

  /* ════════════════════════════════════════
     COUNTDOWN
     ════════════════════════════════════════ */
  function initCountdown() {
    const daysEl  = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl  = document.getElementById('cd-mins');
    const secsEl  = document.getElementById('cd-secs');
    const completeEl = document.getElementById('countdown-complete');
    const gridEl = document.getElementById('countdown-grid');

    if (!daysEl) return;

    const target = new Date(C.event.dateISO); // 2027-01-03T12:15:00+05:30

    function update() {
      const now  = new Date();
      const diff = target - now;

      if (diff <= 0) {
        if (gridEl) gridEl.style.display = 'none';
        if (completeEl) {
          completeEl.style.display = 'block';
          completeEl.textContent = t('countdownComplete');
        }
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      daysEl.textContent  = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent  = String(m).padStart(2, '0');
      secsEl.textContent  = String(s).padStart(2, '0');

      /* Update ARIA live region */
      const liveEl = document.getElementById('countdown-live');
      if (liveEl) {
        liveEl.textContent = `${d} ${t('days')}, ${h} ${t('hours')}, ${m} ${t('minutes')}, ${s} ${t('seconds')}`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  /* ════════════════════════════════════════
     GALLERY
     ════════════════════════════════════════ */
  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    const emptyEl = document.getElementById('gallery-empty');
    if (!grid) return;

    const images = C.gallery.images;
    grid.innerHTML = '';

    if (!images || images.length === 0) {
      if (emptyEl) {
        emptyEl.style.display = 'block';
        emptyEl.textContent = t('galleryEmpty');
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    images.forEach((img, idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-item reveal';
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', img.alt || `Photo ${idx + 1}`);

      const imgEl = document.createElement('img');
      imgEl.src = C.gallery.folder + img.src;
      imgEl.alt = img.alt || `Gallery photo ${idx + 1}`;
      imgEl.loading = 'lazy';
      imgEl.decoding = 'async';

      const overlay = document.createElement('div');
      overlay.className = 'gallery-item-overlay';
      overlay.innerHTML = '<span class="gallery-zoom-icon" aria-hidden="true">🔍</span>';

      item.appendChild(imgEl);
      item.appendChild(overlay);

      const openLightbox = () => openLightboxAt(idx);
      item.addEventListener('click', openLightbox);
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); }
      });

      grid.appendChild(item);
    });

    /* Observe new reveal elements */
    observeReveal();
  }

  /* ── Lightbox ── */
  function openLightboxAt(idx) {
    const images = C.gallery.images;
    if (!images || images.length === 0) return;

    App.galleryIndex = idx;
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const lbCounter = document.getElementById('lightbox-counter');
    if (!lb || !lbImg) return;

    const img = images[idx];
    lbImg.src = C.gallery.folder + img.src;
    lbImg.alt = img.alt || `Photo ${idx + 1}`;
    if (lbCap) lbCap.textContent = img.alt || '';
    if (lbCounter) lbCounter.textContent = `${idx + 1} / ${images.length}`;

    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    /* Focus close button */
    setTimeout(() => {
      const closeBtn = document.getElementById('lightbox-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function lightboxNav(dir) {
    const images = C.gallery.images;
    if (!images || images.length === 0) return;
    App.galleryIndex = (App.galleryIndex + dir + images.length) % images.length;

    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const lbCounter = document.getElementById('lightbox-counter');

    if (lbImg) {
      lbImg.style.opacity = '0';
      setTimeout(() => {
        const img = images[App.galleryIndex];
        lbImg.src = C.gallery.folder + img.src;
        lbImg.alt = img.alt || `Photo ${App.galleryIndex + 1}`;
        if (lbCap) lbCap.textContent = img.alt || '';
        if (lbCounter) lbCounter.textContent = `${App.galleryIndex + 1} / ${images.length}`;
        lbImg.style.opacity = '1';
      }, 200);
    }
  }

  function initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', () => lightboxNav(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => lightboxNav(1));

    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });

    /* Keyboard */
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft')  lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    });

    /* Touch/swipe */
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lb.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) lightboxNav(dx < 0 ? 1 : -1);
    });
  }

  /* ════════════════════════════════════════
     OUR STORY
     ════════════════════════════════════════ */
  function renderStory() {
    const timeline = document.getElementById('story-timeline');
    const emptyEl  = document.getElementById('story-empty');
    if (!timeline) return;

    const milestones = C.story[App.lang] || C.story.en || [];
    timeline.innerHTML = '';

    if (milestones.length === 0) {
      if (emptyEl) {
        emptyEl.style.display = 'block';
        emptyEl.textContent = t('storyEmpty');
      }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    milestones.forEach((ms, idx) => {
      const item = document.createElement('div');
      item.className = 'story-item reveal';

      const isOdd = idx % 2 === 0; // 0-based: even idx = "odd" visual position (left-side text)

      item.innerHTML = `
        <div class="story-content-left ${isOdd ? 'hidden-mobile' : ''}" ${isOdd ? '' : 'aria-hidden="true"'}>
          ${!isOdd ? `<div class="story-content"><h3>${ms.title}</h3><p>${ms.body}</p></div>` : ''}
        </div>
        <div class="story-year-bubble">
          <div class="story-dot" aria-hidden="true"></div>
          <div class="story-year">${ms.year}</div>
        </div>
        <div class="story-content-right ${!isOdd ? 'hidden-mobile' : ''}">
          ${isOdd ? `<div class="story-content"><h3>${ms.title}</h3><p>${ms.body}</p></div>` : ''}
        </div>
      `;

      timeline.appendChild(item);
    });

    observeReveal();
  }

  /* ════════════════════════════════════════
     MUSIC PLAYER
     ════════════════════════════════════════ */
  let audioEl = null;

  function initMusic() {
    audioEl = document.getElementById('bg-audio');
    if (!audioEl) return;

    audioEl.src = C.music.file;
    audioEl.loop = true;
    audioEl.volume = 0.5;

    const playBtn  = document.getElementById('music-play-btn');
    const muteBtn  = document.getElementById('music-mute-btn');
    const nowPlay  = document.getElementById('now-playing-text');

    if (playBtn) {
      playBtn.addEventListener('click', toggleMusic);
    }
    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }

    /* Restore if was playing before */
    if (App.musicPref === 'yes') {
      playMusic();
    }
  }

  function playMusic() {
    if (!audioEl) return;
    audioEl.play().then(() => {
      App.musicPlaying = true;
      updateMusicUI();
    }).catch(() => {
      /* Autoplay blocked — UI shows paused state */
      App.musicPlaying = false;
      updateMusicUI();
    });
  }

  function pauseMusic() {
    if (!audioEl) return;
    audioEl.pause();
    App.musicPlaying = false;
    updateMusicUI();
  }

  function toggleMusic() {
    if (App.musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function toggleMute() {
    if (!audioEl) return;
    App.musicMuted = !App.musicMuted;
    audioEl.muted = App.musicMuted;
    updateMusicUI();
  }

  function updateMusicUI() {
    const playBtn = document.getElementById('music-play-btn');
    const muteBtn = document.getElementById('music-mute-btn');
    const nowPlay = document.getElementById('now-playing-text');

    if (playBtn) {
      playBtn.textContent = App.musicPlaying ? '⏸' : '▶';
      playBtn.setAttribute('aria-label', t(App.musicPlaying ? 'musicPause' : 'musicPlay'));
      playBtn.setAttribute('title', t(App.musicPlaying ? 'musicPause' : 'musicPlay'));
    }
    if (muteBtn) {
      muteBtn.textContent = App.musicMuted ? '🔇' : '🔊';
      muteBtn.setAttribute('aria-label', t(App.musicMuted ? 'musicUnmute' : 'musicMute'));
    }
    if (nowPlay) {
      nowPlay.classList.toggle('visible', App.musicPlaying);
    }
  }

  /* Music Prompt */
  function showMusicPrompt() {
    const prompt = document.getElementById('music-prompt');
    if (!prompt || App.musicPref !== null) return;
    prompt.classList.add('visible');
    prompt.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      const yesBtn = document.getElementById('music-yes-btn');
      if (yesBtn) yesBtn.focus();
    }, 100);
  }

  function hideMusicPrompt() {
    const prompt = document.getElementById('music-prompt');
    if (!prompt) return;
    prompt.classList.remove('visible');
    prompt.setAttribute('aria-hidden', 'true');
  }

  function updateMusicPromptText() {
    const titleEl = document.getElementById('music-prompt-title');
    const bodyEl  = document.getElementById('music-prompt-body');
    const yesEl   = document.getElementById('music-yes-btn');
    const noEl    = document.getElementById('music-no-btn');
    if (titleEl) titleEl.textContent = t('musicPromptTitle');
    if (bodyEl)  bodyEl.textContent  = t('musicPromptBody');
    if (yesEl)   yesEl.textContent   = t('musicPromptYes');
    if (noEl)    noEl.textContent    = t('musicPromptNo');
  }

  function initMusicPrompt() {
    const yesBtn = document.getElementById('music-yes-btn');
    const noBtn  = document.getElementById('music-no-btn');
    const prompt = document.getElementById('music-prompt');

    if (yesBtn) {
      yesBtn.addEventListener('click', () => {
        App.musicPref = 'yes';
        localStorage.setItem('invite_music', 'yes');
        hideMusicPrompt();
        playMusic();
      });
    }
    if (noBtn) {
      noBtn.addEventListener('click', () => {
        App.musicPref = 'no';
        localStorage.setItem('invite_music', 'no');
        hideMusicPrompt();
      });
    }
    if (prompt) {
      prompt.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          App.musicPref = 'no';
          localStorage.setItem('invite_music', 'no');
          hideMusicPrompt();
        }
      });
    }

    updateMusicPromptText();
  }

  /* ════════════════════════════════════════
     CALENDAR
     ════════════════════════════════════════ */
  function initCalendar() {
    /* Google Calendar */
    const gcalBtn = document.getElementById('gcal-btn');
    if (gcalBtn) {
      gcalBtn.addEventListener('click', () => {
        // 2027-01-03T12:15:00 IST = 2027-01-03T06:45:00Z
        const start = '20270103T061500Z'; // 12:15 IST = 06:45 UTC
        const end   = '20270103T091500Z'; // +3 hours end estimate
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(C.event.title)}&dates=${start}/${end}&details=${encodeURIComponent('You are cordially invited to the engagement ceremony of Anat Tom & Britto Thomas.\n\nVenue: ' + C.event.venue.full)}&location=${encodeURIComponent(C.event.venue.full)}&sf=true&output=xml`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    /* ICS Download */
    const icsBtn = document.getElementById('ics-btn');
    if (icsBtn) {
      icsBtn.addEventListener('click', downloadICS);
    }
  }

  function downloadICS() {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Anat & Britto Engagement//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Asia/Kolkata:20270103T121500`,
      `DTEND;TZID=Asia/Kolkata:20270103T151500`,
      `SUMMARY:${C.event.title}`,
      `DESCRIPTION:You are cordially invited to the engagement ceremony of Anat Tom & Britto Thomas.\\n\\nVenue: St Thomas Church\\, Melukavumattom`,
      `LOCATION:St Thomas Church\\, Melukavumattom`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      `UID:anat-britto-engagement-20270103@invitation`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'Anat-Britto-Engagement.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ════════════════════════════════════════
     WHATSAPP SHARE
     ════════════════════════════════════════ */
  function initShare() {
    const waShareBtn = document.getElementById('wa-share-btn');
    const copyBtn    = document.getElementById('copy-btn');

    const pageUrl = window.location.href;
    const msg = `💍 You're invited! Join us for the engagement of ${C.bride.fullName} & ${C.groom.fullName} on ${C.event.dateShort} at ${C.event.venue.full}.\n\nView the invitation: ${pageUrl}`;

    if (waShareBtn) {
      waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.textContent = t('shareCopied');
          setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2500);
        }).catch(() => {
          /* Fallback for older browsers */
          const ta = document.createElement('textarea');
          ta.value = pageUrl;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = t('shareCopied');
          setTimeout(() => { copyBtn.textContent = t('shareCopy'); }, 2500);
        });
      });
    }
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL
     ════════════════════════════════════════ */
  let revealObserver = null;

  function observeReveal() {
    const els = $$('.reveal, .reveal-left, .reveal-right');

    if (prefersReducedMotion()) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }

    els.forEach(el => {
      if (!el.classList.contains('visible')) {
        revealObserver.observe(el);
      }
    });
  }

  /* ════════════════════════════════════════
     POPULATE DYNAMIC CONTENT
     ════════════════════════════════════════ */
  function populateContent() {
    /* Event details from config */
    const dateEl = document.getElementById('event-date');
    const timeEl = document.getElementById('event-time');
    const venueEl = document.getElementById('event-venue');
    if (dateEl) dateEl.textContent = C.event.dateDisplay;
    if (timeEl) timeEl.textContent = C.event.time;
    if (venueEl) venueEl.textContent = C.event.venue.full;

    /* Maps button */
    $$('.maps-btn').forEach(btn => {
      btn.href = C.event.venue.mapsUrl;
    });

    /* RSVP button */
    const rsvpBtn = document.getElementById('rsvp-wa-btn');
    if (rsvpBtn) {
      rsvpBtn.href = `https://wa.me/${C.whatsapp.number}?text=${encodeURIComponent(C.whatsapp.rsvpMessage)}`;
    }

    /* Couple names in hero */
    const brideNameEl = document.getElementById('hero-bride-name');
    const groomNameEl = document.getElementById('hero-groom-name');
    if (brideNameEl) brideNameEl.textContent = C.bride.fullName;
    if (groomNameEl) groomNameEl.textContent = C.groom.fullName;

    /* Couple portraits */
    const brideImg = document.getElementById('bride-portrait');
    const groomImg = document.getElementById('groom-portrait');
    if (brideImg) {
      brideImg.src = C.bride.photo;
      brideImg.alt = C.bride.photoAlt;
      brideImg.onerror = function() {
        this.style.display = 'none';
        const ph = document.getElementById('bride-placeholder');
        if (ph) ph.style.display = 'flex';
      };
    }
    if (groomImg) {
      groomImg.src = C.groom.photo;
      groomImg.alt = C.groom.photoAlt;
      groomImg.onerror = function() {
        this.style.display = 'none';
        const ph = document.getElementById('groom-placeholder');
        if (ph) ph.style.display = 'flex';
      };
    }

    /* Complimentary */
    const compNamesEl = document.getElementById('complimentary-names');
    if (compNamesEl) compNamesEl.textContent = C.complimentary.display;

    /* Bride/groom portrait names */
    const bridePortraitName = document.querySelector('.portrait-frame:first-child .portrait-name');
    const groomPortraitName = document.querySelector('.portrait-frame:last-child .portrait-name');
    if (bridePortraitName) bridePortraitName.textContent = C.bride.fullName;
    if (groomPortraitName) groomPortraitName.textContent = C.groom.fullName;

    /* Family section */
    populateFamily();

    /* Wax seal initials */
    const sealEl = document.getElementById('wax-seal-text');
    if (sealEl) sealEl.textContent = `${C.bride.initial} & ${C.groom.initial}`;

    /* OG/meta */
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc  = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = `${C.bride.fullName} & ${C.groom.fullName} — Engagement Invitation`;
    if (ogDesc)  ogDesc.content  = `Join us to celebrate the engagement of ${C.bride.fullName} & ${C.groom.fullName} on ${C.event.dateShort} at ${C.event.venue.full}.`;
  }

  function populateFamily() {
    const brideFamilyEl = document.getElementById('bride-family-names');
    const groomFamilyEl = document.getElementById('groom-family-names');

    if (brideFamilyEl) {
      brideFamilyEl.innerHTML = C.parents.bride.map((p, i) => `
        <div class="family-name">${p.prefix} ${p.name}</div>
        ${i < C.parents.bride.length - 1 ? '<div class="family-name-sep"></div>' : ''}
      `).join('');
    }

    if (groomFamilyEl) {
      groomFamilyEl.innerHTML = C.parents.groom.map((p, i) => `
        <div class="family-name">${p.prefix} ${p.name}</div>
        ${i < C.parents.groom.length - 1 ? '<div class="family-name-sep"></div>' : ''}
      `).join('');
    }
  }

  /* ════════════════════════════════════════
     INIT ALL
     ════════════════════════════════════════ */
  function init() {
    populateContent();
    initTheme();
    initLanguage();
    initEnvelope();
    initParticles();
    initCountdown();
    renderGallery();
    renderStory();
    initLightbox();
    initMusic();
    initMusicPrompt();
    initCalendar();
    initShare();
    observeReveal();
  }

  init();
});
