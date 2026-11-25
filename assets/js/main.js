/**
 * ============================================================
 * ENGAGEMENT INVITATION — MAIN JAVASCRIPT
 * Anat Tom & Britto Thomas
 * Rouge & Ivory | English only | Auto-music | No gallery/story
 * ============================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const C = window.CONFIG;
  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ════════════════════════════════════════
     POPULATE CONTENT FROM CONFIG
     ════════════════════════════════════════ */
  function populateContent() {
    /* Event details */
    const dateEl  = document.getElementById('event-date');
    const timeEl  = document.getElementById('event-time');
    if (dateEl) dateEl.textContent = C.event.dateDisplay;
    if (timeEl) timeEl.textContent = C.event.time;

    /* Maps buttons */
    document.querySelectorAll('.maps-btn').forEach(btn => {
      btn.href = C.event.venue.mapsUrl;
    });

    /* RSVP WhatsApp button */
    const rsvpBtn = document.getElementById('rsvp-wa-btn');
    if (rsvpBtn) {
      rsvpBtn.href = `https://wa.me/${C.whatsapp.number}?text=${encodeURIComponent(C.whatsapp.rsvpMessage)}`;
    }

    /* Couple names */
    const brideEl = document.getElementById('hero-bride-name');
    const groomEl = document.getElementById('hero-groom-name');
    if (brideEl) brideEl.textContent = C.bride.fullName;
    if (groomEl) groomEl.textContent = C.groom.fullName;

    /* Couple portraits — show placeholder on error */
    const brideImg = document.getElementById('bride-portrait');
    const groomImg = document.getElementById('groom-portrait');
    if (brideImg) {
      brideImg.src = C.bride.photo;
      brideImg.alt = C.bride.photoAlt;
      brideImg.onerror = function () {
        this.style.display = 'none';
        const ph = document.getElementById('bride-placeholder');
        if (ph) ph.style.display = 'flex';
      };
    }
    if (groomImg) {
      groomImg.src = C.groom.photo;
      groomImg.alt = C.groom.photoAlt;
      groomImg.onerror = function () {
        this.style.display = 'none';
        const ph = document.getElementById('groom-placeholder');
        if (ph) ph.style.display = 'flex';
      };
    }

    /* Family */
    const brideFam = document.getElementById('bride-family-names');
    const groomFam = document.getElementById('groom-family-names');
    if (brideFam) {
      brideFam.innerHTML = C.parents.bride.map((p, i) =>
        `<div class="family-name">${p.prefix} ${p.name}</div>` +
        (i < C.parents.bride.length - 1 ? '<div class="family-name-sep"></div>' : '')
      ).join('');
    }
    if (groomFam) {
      groomFam.innerHTML = C.parents.groom.map((p, i) =>
        `<div class="family-name">${p.prefix} ${p.name}</div>` +
        (i < C.parents.groom.length - 1 ? '<div class="family-name-sep"></div>' : '')
      ).join('');
    }

    /* Complimentary */
    const compEl = document.getElementById('complimentary-names');
    if (compEl) compEl.textContent = C.complimentary.display;

    /* Wax seal initials */
    const sealEl = document.getElementById('wax-seal-text');
    if (sealEl) sealEl.textContent = `${C.bride.initial} & ${C.groom.initial}`;

    /* OG meta */
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc  = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = `${C.bride.fullName} & ${C.groom.fullName} — Engagement Invitation`;
    if (ogDesc)  ogDesc.content  = `Join us to celebrate the engagement of ${C.bride.fullName} & ${C.groom.fullName} on ${C.event.dateShort} at ${C.event.venue.full}.`;
  }

  /* ════════════════════════════════════════
     ENVELOPE
     ════════════════════════════════════════ */
  function initEnvelope() {
    const envelope      = document.getElementById('envelope');
    const mainSection   = document.getElementById('main-invitation');
    const tapHint       = document.getElementById('envelope-tap-hint');
    const envSection    = document.getElementById('envelope-section');
    if (!envelope || !mainSection) return;

    let opened = false;

    function openEnvelope() {
      if (opened) return;
      opened = true;

      envelope.classList.add('open');
      envelope.setAttribute('aria-expanded', 'true');
      envelope.setAttribute('aria-label', 'Invitation opened');
      if (tapHint) tapHint.style.opacity = '0';

      /* Auto-play music — works because envelope click is a user gesture */
      playMusic();

      const delay = prefersReducedMotion() ? 150 : 1200;
      setTimeout(() => {
        mainSection.classList.remove('hidden');
        mainSection.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        setTimeout(() => {
          if (envSection) envSection.style.display = 'none';
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
    document.querySelectorAll('.particles-host').forEach(container => {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 60 + 15;
        p.style.cssText =
          `width:${size}px;height:${size}px;` +
          `left:${Math.random() * 100}%;` +
          `animation-duration:${Math.random() * 14 + 10}s;` +
          `animation-delay:${Math.random() * 14}s;`;
        container.appendChild(p);
      }
    });
  }

  /* ════════════════════════════════════════
     COUNTDOWN
     ════════════════════════════════════════ */
  function initCountdown() {
    const daysEl     = document.getElementById('cd-days');
    const hoursEl    = document.getElementById('cd-hours');
    const minsEl     = document.getElementById('cd-mins');
    const secsEl     = document.getElementById('cd-secs');
    const completeEl = document.getElementById('countdown-complete');
    const gridEl     = document.getElementById('countdown-grid');
    const liveEl     = document.getElementById('countdown-live');
    if (!daysEl) return;

    const target = new Date(C.event.dateISO);

    function update() {
      const diff = target - new Date();
      if (diff <= 0) {
        if (gridEl) gridEl.style.display = 'none';
        if (completeEl) {
          completeEl.style.display = 'block';
          completeEl.textContent = '🎉 Today is the Day! Congratulations Anat & Britto!';
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
      if (liveEl) liveEl.textContent = `${d} Days, ${h} Hours, ${m} Minutes, ${s} Seconds`;
    }

    update();
    setInterval(update, 1000);
  }

  /* ════════════════════════════════════════
     MUSIC — auto-play, mute only
     ════════════════════════════════════════ */
  let audioEl   = null;
  let isMuted   = false;
  let isPlaying = false;

  function initMusic() {
    audioEl = document.getElementById('bg-audio');
    if (!audioEl) return;
    audioEl.src    = C.music.file;
    audioEl.loop   = true;
    audioEl.volume = 0.5;

    const muteBtn = document.getElementById('music-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }
  }

  function playMusic() {
    if (!audioEl) return;
    audioEl.play().then(() => {
      isPlaying = true;
      updateMusicUI();
    }).catch(() => {
      /* Autoplay still blocked in some edge cases — silent fail */
      isPlaying = false;
      updateMusicUI();
    });
  }

  function toggleMute() {
    if (!audioEl) return;
    isMuted = !isMuted;
    audioEl.muted = isMuted;
    updateMusicUI();
  }

  function updateMusicUI() {
    const muteBtn     = document.getElementById('music-mute-btn');
    const nowPlayEl   = document.getElementById('now-playing-text');

    if (muteBtn) {
      muteBtn.textContent = isMuted ? '🔇' : '🔊';
      muteBtn.setAttribute('aria-label', isMuted ? 'Unmute music' : 'Mute music');
      muteBtn.setAttribute('title',      isMuted ? 'Unmute music' : 'Mute music');
    }
    if (nowPlayEl) {
      nowPlayEl.classList.toggle('visible', isPlaying && !isMuted);
    }
  }

  /* ════════════════════════════════════════
     CALENDAR
     ════════════════════════════════════════ */
  function initCalendar() {
    const gcalBtn = document.getElementById('gcal-btn');
    if (gcalBtn) {
      gcalBtn.addEventListener('click', () => {
        /* 12:15 IST = 06:45 UTC; end estimate +3h */
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
          `&text=${encodeURIComponent(C.event.title)}` +
          `&dates=20270103T061500Z/20270103T091500Z` +
          `&details=${encodeURIComponent('You are cordially invited to the engagement ceremony of Anat Tom & Britto Thomas.\n\nVenue: ' + C.event.venue.full)}` +
          `&location=${encodeURIComponent(C.event.venue.full)}` +
          `&sf=true&output=xml`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    const icsBtn = document.getElementById('ics-btn');
    if (icsBtn) {
      icsBtn.addEventListener('click', () => {
        const ics = [
          'BEGIN:VCALENDAR', 'VERSION:2.0',
          'PRODID:-//Anat & Britto Engagement//EN',
          'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
          'BEGIN:VEVENT',
          'DTSTART;TZID=Asia/Kolkata:20270103T121500',
          'DTEND;TZID=Asia/Kolkata:20270103T151500',
          `SUMMARY:${C.event.title}`,
          `DESCRIPTION:You are cordially invited to the engagement ceremony of Anat Tom & Britto Thomas.\\n\\nVenue: St Thomas Church\\, Melukavumattom`,
          `LOCATION:St Thomas Church\\, Melukavumattom`,
          'STATUS:CONFIRMED', 'SEQUENCE:0',
          'UID:anat-britto-engagement-20270103@invitation',
          'END:VEVENT', 'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = Object.assign(document.createElement('a'), { href: url, download: 'Anat-Britto-Engagement.ics' });
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }

  /* ════════════════════════════════════════
     SHARE
     ════════════════════════════════════════ */
  function initShare() {
    const pageUrl = window.location.href;
    const msg = `💍 You're invited! Join us for the engagement of ${C.bride.fullName} & ${C.groom.fullName}` +
                ` on ${C.event.dateShort} at ${C.event.venue.full}.\n\nView the invitation: ${pageUrl}`;

    const waShareBtn = document.getElementById('wa-share-btn');
    if (waShareBtn) waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;

    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const original = copyBtn.innerHTML;
        navigator.clipboard.writeText(pageUrl).then(() => {
          copyBtn.textContent = '✅ Copied!';
          setTimeout(() => { copyBtn.innerHTML = original; }, 2500);
        }).catch(() => {
          /* Fallback */
          const ta = Object.assign(document.createElement('textarea'), {
            value: pageUrl,
            style: 'position:fixed;opacity:0;'
          });
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = '✅ Copied!';
          setTimeout(() => { copyBtn.innerHTML = original; }, 2500);
        });
      });
    }
  }

  /* ════════════════════════════════════════
     SCROLL REVEAL
     ════════════════════════════════════════ */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (prefersReducedMotion()) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════
     INIT
     ════════════════════════════════════════ */
  populateContent();
  initMusic();
  initEnvelope();
  initParticles();
  initCountdown();
  initCalendar();
  initShare();
  initReveal();
});
