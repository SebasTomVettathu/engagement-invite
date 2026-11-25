/**
 * ============================================================
 * ENGAGEMENT INVITATION — CENTRAL CONFIGURATION FILE
 * ============================================================
 * Edit this file to update all event details, contacts,
 * photos, gallery, music, and all text in English & Malayalam.
 * ============================================================
 */

const CONFIG = {

  /* ── COUPLE ── */
  bride: {
    firstName: 'Anat',
    lastName: 'Tom',
    fullName: 'Anat Tom',
    initial: 'A',
    photo: 'assets/images/bride.jpg?v=2',
    photoAlt: 'Anat Tom — Bride',
  },
  groom: {
    firstName: 'Britto',
    lastName: 'Thomas',
    fullName: 'Britto Thomas',
    initial: 'B',
    photo: 'assets/images/groom.jpg?v=2',
    photoAlt: 'Britto Thomas — Groom',
  },

  /* ── EVENT ── */
  event: {
    title: 'Engagement of Anat Tom & Britto Thomas',
    // ISO date string in IST (UTC+5:30)
    dateISO: '2027-01-03T12:15:00+05:30',
    // Human-readable display values
    dateDisplay: 'Sunday, 3rd January 2027',
    dateShort: '3 January 2027',
    time: '12:15 PM',
    timezone: 'Asia/Kolkata',
    type: 'Engagement Ceremony',
    venue: {
      name: 'St Thomas Church',
      locality: 'Melukavumattom',
      full: 'St Thomas Church, Melukavumattom',
      mapsUrl: 'https://maps.google.com/?q=St+Thomas+Church+Melukavumattom',
    },
  },

  /* ── PARENTS ── */
  parents: {
    bride: [
      { prefix: 'Mr', name: 'Tomy Sebastian' },
      { prefix: 'Mrs', name: 'Bincy Tomy' },
    ],
    groom: [
      { prefix: 'Mr', name: 'Thomas Joseph' },
      { prefix: 'Mrs', name: 'Leela Thomas' },
    ],
  },

  /* ── COMPLIMENTARY ── */
  complimentary: {
    names: ['Benat Tom', 'Sebas Tom'],
    display: 'Benat Tom & Sebas Tom',
  },

  /* ── WHATSAPP RSVP ── */
  whatsapp: {
    number: '919496907996',
    // Message sent when RSVP button is tapped
    rsvpMessage: "Hi, I would love to attend Anat & Britto's engagement on 3rd January 2027. Counting me in 🎉",
  },

  /* ── GALLERY ── */
  gallery: {
    folder: 'assets/images/gallery/',
    // Add filenames here — place files in assets/images/gallery/
    images: [
      // { src: '01.jpg', alt: 'Caption for photo 1' },
      // { src: '02.jpg', alt: 'Caption for photo 2' },
      // Up to 10 images
    ],
  },

  /* ── MUSIC ── */
  music: {
    file: 'assets/music/romantic-piano.mp3',
    title: 'Love at First Sight',
  },

  /* ── OUR STORY — milestones ── */
  story: {
    en: [
      // Add milestones here. Example:
      // { year: '2020', title: 'First Meeting', body: 'Our paths crossed for the first time…' },
      // { year: '2024', title: 'The Proposal', body: 'He asked the question she'd always hoped for…' },
    ],
    ml: [
      // Malayalam milestones (same order)
      // { year: '2020', title: 'ആദ്യ കൂടിക്കാഴ്ച', body: 'ആദ്യമായി ഞങ്ങളുടെ പാതകൾ ഒന്നിച്ചു…' },
    ],
  },

  /* ── TRANSLATIONS ── */
  i18n: {
    en: {
      lang: 'en',
      /* Envelope */
      envelopeLabel: 'You Are Invited',
      envelopeTap: 'Tap to open',
      /* Hero */
      heroSubtitle: 'Together with their families,\nrequest the pleasure of your presence\nat their engagement ceremony.',
      engagementLabel: 'Engagement · 3 January 2027',
      scrollHint: 'Scroll',
      /* Countdown */
      countdownLabel: 'Counting down to the big day',
      countdownTitle: 'The Celebration Begins In',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      countdownComplete: '🎉 Today is the Day! Congratulations Anat & Britto!',
      /* Invitation */
      invitationLabel: "You're Invited",
      invitationTitle: 'Engagement Invitation',
      inviteBody: 'Together with their families,\nrequest the pleasure of your presence\nat their engagement ceremony.',
      /* Schedule */
      scheduleLabel: 'Event Programme',
      scheduleTitle: 'Ceremony Schedule',
      schedule12_15: 'Engagement Ceremony',
      scheduleVenueLabel: 'Venue',
      /* Details */
      detailsLabel: "You're Invited",
      detailsTitle: 'Event Details',
      dateLabel: 'Date',
      timeLabel: 'Time',
      venueLabel: 'Venue',
      mapsBtn: 'Open in Google Maps',
      /* Couple Photos */
      coupleLabel: 'The Happy Couple',
      coupleTitle: 'Bride & Groom',
      brideLabel: 'Bride',
      groomLabel: 'Groom',
      /* Gallery */
      galleryLabel: 'Memories',
      galleryTitle: 'Photo Gallery',
      galleryEmpty: 'Photos coming soon…',
      galleryClose: 'Close',
      galleryPrev: 'Previous photo',
      galleryNext: 'Next photo',
      /* Our Story */
      storyLabel: 'Our Journey',
      storyTitle: 'Our Story',
      storyEmpty: 'Our story will be shared here soon…',
      /* Family */
      familyLabel: 'With the Blessings of Our Parents',
      familyTitle: 'Our Families',
      brideParentsLabel: "Bride's Parents",
      groomParentsLabel: "Groom's Parents",
      /* Calendar */
      calendarLabel: 'Save the Date',
      calendarTitle: 'Add to Calendar',
      googleCalBtn: 'Add to Google Calendar',
      icsBtn: 'Download .ics File',
      /* RSVP */
      rsvpLabel: "We'd love to see you there",
      rsvpTitle: 'RSVP',
      rsvpBody: 'Kindly confirm your attendance by reaching out to us on WhatsApp.',
      rsvpBtn: 'RSVP on WhatsApp',
      /* Share */
      shareLabel: 'Spread the joy',
      shareTitle: 'Share this Invitation',
      shareBody: 'Share this invite with family and friends.',
      shareWa: 'Share on WhatsApp',
      shareCopy: 'Copy Link',
      shareCopied: '✅ Copied!',
      /* Complimentary */
      complimentaryLabel: 'Complimentary From',
      /* Music */
      musicNowPlaying: 'Now Playing',
      musicPlay: 'Play music',
      musicPause: 'Pause music',
      musicMute: 'Mute music',
      musicUnmute: 'Unmute music',
      musicPromptTitle: 'Background Music 🎵',
      musicPromptBody: 'Would you like to play soft romantic music?',
      musicPromptYes: 'Yes, play music',
      musicPromptNo: 'No, thanks',
      /* Themes */
      themesLabel: 'Choose Theme',
      /* Nav */
      navHome: 'Home',
      navCeremony: 'Ceremony',
      navCouple: 'Couple',
      navGallery: 'Gallery',
      navStory: 'Story',
      navFamily: 'Family',
      navRSVP: 'RSVP',
      /* Footer */
      footerLove: 'With love from',
      footerMade: 'Made with ❤️ for Anat & Britto',
      /* Blessing */
      blessing: '"Two souls, one heart,\njoined together in love and grace."',
    },

    ml: {
      lang: 'ml',
      /* Envelope */
      envelopeLabel: 'നിങ്ങളെ ക്ഷണിക്കുന്നു',
      envelopeTap: 'തുറക്കാൻ ടാപ്പ് ചെയ്യൂ',
      /* Hero */
      heroSubtitle: 'ഇരു കുടുംബങ്ങളോടൊപ്പം,\nഅവരുടെ വിവാഹനിശ്ചയ ചടങ്ങിൽ\nനിങ്ങളെ ആദരപൂർവ്വം ക്ഷണിക്കുന്നു.',
      engagementLabel: 'നിശ്ചയതാംബൂലം · 2027 ജനുവരി 3',
      scrollHint: 'സ്ക്രോൾ',
      /* Countdown */
      countdownLabel: 'ആ ദിനം വരെ',
      countdownTitle: 'ആഘോഷം ആരംഭിക്കുന്നു',
      days: 'ദിവസം',
      hours: 'മണിക്കൂർ',
      minutes: 'മിനിറ്റ്',
      seconds: 'സെക്കൻഡ്',
      countdownComplete: '🎉 ഇന്ന് ആ ദിനം! അനാറ്റ് & ബ്രിട്ടോ — ആശംസകൾ!',
      /* Invitation */
      invitationLabel: 'ക്ഷണം',
      invitationTitle: 'വിവാഹനിശ്ചയ ക്ഷണം',
      inviteBody: 'ഇരു കുടുംബങ്ങളോടൊപ്പം,\nഅവരുടെ വിവാഹനിശ്ചയ ചടങ്ങിൽ\nനിങ്ങളെ ആദരപൂർവ്വം ക്ഷണിക്കുന്നു.',
      /* Schedule */
      scheduleLabel: 'പരിപാടി വിവരണം',
      scheduleTitle: 'ചടങ്ങ് ഷെഡ്യൂൾ',
      schedule12_15: 'വിവാഹനിശ്ചയ ചടങ്ങ്',
      scheduleVenueLabel: 'വേദി',
      /* Details */
      detailsLabel: 'ക്ഷണം',
      detailsTitle: 'പരിപാടി വിശദാംശങ്ങൾ',
      dateLabel: 'തീയതി',
      timeLabel: 'സമയം',
      venueLabel: 'വേദി',
      mapsBtn: 'Google Maps-ൽ കാണുക',
      /* Couple Photos */
      coupleLabel: 'സ്നേഹ ദമ്പതികൾ',
      coupleTitle: 'വധൂവരന്മാർ',
      brideLabel: 'വധു',
      groomLabel: 'വരൻ',
      /* Gallery */
      galleryLabel: 'ഓർമ്മകൾ',
      galleryTitle: 'ഫോട്ടോ ഗ്യാലറി',
      galleryEmpty: 'ഫോട്ടോകൾ ഉടൻ ചേർക്കും…',
      galleryClose: 'അടയ്ക്കുക',
      galleryPrev: 'മുൻ ഫോട്ടോ',
      galleryNext: 'അടുത്ത ഫോട്ടോ',
      /* Our Story */
      storyLabel: 'ഞങ്ങളുടെ യാത്ര',
      storyTitle: 'ഞങ്ങളുടെ കഥ',
      storyEmpty: 'ഞങ്ങളുടെ കഥ ഉടൻ ഇവിടെ പങ്കിടും…',
      /* Family */
      familyLabel: 'ഞങ്ങളുടെ മാതാപിതാക്കളുടെ അനുഗ്രഹത്തോടെ',
      familyTitle: 'ഞങ്ങളുടെ കുടുംബങ്ങൾ',
      brideParentsLabel: 'വധുവിന്റെ മാതാപിതാക്കൾ',
      groomParentsLabel: 'വരന്റെ മാതാപിതാക്കൾ',
      /* Calendar */
      calendarLabel: 'തീയതി ഓർക്കുക',
      calendarTitle: 'Calendar-ൽ ചേർക്കുക',
      googleCalBtn: 'Google Calendar-ൽ ചേർക്കുക',
      icsBtn: '.ics ഫയൽ ഡൗൺലോഡ്',
      /* RSVP */
      rsvpLabel: 'നിങ്ങളെ കാണാൻ ആഗ്രഹിക്കുന്നു',
      rsvpTitle: 'RSVP',
      rsvpBody: 'ദയവായി WhatsApp വഴി ഹാജർ സ്ഥിരീകരിക്കുക.',
      rsvpBtn: 'WhatsApp-ൽ RSVP',
      /* Share */
      shareLabel: 'സന്തോഷം പങ്കിടൂ',
      shareTitle: 'ക്ഷണം പങ്കിടുക',
      shareBody: 'ഈ ക്ഷണം കുടുംബത്തിനും സ്നേഹിതർക്കും അയക്കൂ.',
      shareWa: 'WhatsApp-ൽ പങ്കിടുക',
      shareCopy: 'ലിങ്ക് കോപ്പി ചെയ്യുക',
      shareCopied: '✅ കോപ്പി ചെയ്തു!',
      /* Complimentary */
      complimentaryLabel: 'സ്നേഹപൂർവ്വം',
      /* Music */
      musicNowPlaying: 'ഇപ്പോൾ കേൾക്കുന്നത്',
      musicPlay: 'സംഗീതം പ്ലേ ചെയ്യുക',
      musicPause: 'സംഗീതം നിർത്തുക',
      musicMute: 'മ്യൂട്ട്',
      musicUnmute: 'അൺമ്യൂട്ട്',
      musicPromptTitle: 'പശ്ചാത്തല സംഗീതം 🎵',
      musicPromptBody: 'മൃദു റൊമാന്റിക് സംഗീതം കേൾക്കണോ?',
      musicPromptYes: 'ഉവ്വ്, കേൾക്കണം',
      musicPromptNo: 'വേണ്ട, നന്ദി',
      /* Themes */
      themesLabel: 'തീം തിരഞ്ഞെടുക്കുക',
      /* Nav */
      navHome: 'ഹോം',
      navCeremony: 'ചടങ്ങ്',
      navCouple: 'ദമ്പതികൾ',
      navGallery: 'ഗ്യാലറി',
      navStory: 'കഥ',
      navFamily: 'കുടുംബം',
      navRSVP: 'RSVP',
      /* Footer */
      footerLove: 'സ്നേഹത്തോടെ',
      footerMade: 'അനാറ്റ് & ബ്രിട്ടോ — ❤️ കൊണ്ട് നിർമ്മിച്ചത്',
      /* Blessing */
      blessing: '"രണ്ടു ആത്മാക്കൾ, ഒരു ഹൃദയം,\nസ്നേഹത്തിലും കൃപയിലും ഒന്നിച്ചു."',
      /* Couple names (for display in Malayalam context) */
      brideName: 'അനാറ്റ് ടോം',
      groomName: 'ബ്രിട്ടോ തോമസ്',
      coupleAmpersand: '&',
    },
  },

  /* ── THEMES ── */
  themes: [
    {
      id: 'rouge-ivory',
      name: 'Rouge & Ivory',
      nameML: 'റൂഷ് & ഐവറി',
      vars: {
        '--bg-primary': '#1a0a0d',
        '--bg-secondary': '#2d1218',
        '--bg-card': 'rgba(139,27,45,0.08)',
        '--bg-section': '#220e14',
        '--accent-primary': '#8B1B2D',
        '--accent-secondary': '#B22234',
        '--gold': '#C9A84C',
        '--gold-light': '#E8D5A3',
        '--gold-dark': '#9A7A2E',
        '--text-primary': '#FAF6F0',
        '--text-secondary': 'rgba(250,246,240,0.65)',
        '--text-muted': 'rgba(250,246,240,0.35)',
        '--border-color': 'rgba(201,168,76,0.25)',
        '--border-accent': 'rgba(139,27,45,0.5)',
        '--envelope-bg': '#6B1521',
        '--seal-bg': '#C9A84C',
        '--hero-gradient': 'radial-gradient(ellipse at top, #2d1218 0%, #1a0a0d 70%)',
        '--section-gradient': 'linear-gradient(135deg, #220e14, #1a0a0d)',
      },
    },
    {
      id: 'black-gold',
      name: 'Classic Black & Gold',
      nameML: 'ക്ലാസിക് ബ്ലാക്ക് & ഗോൾഡ്',
      vars: {
        '--bg-primary': '#0a0a0a',
        '--bg-secondary': '#141414',
        '--bg-card': 'rgba(201,168,76,0.05)',
        '--bg-section': '#111111',
        '--accent-primary': '#C9A84C',
        '--accent-secondary': '#E8D5A3',
        '--gold': '#C9A84C',
        '--gold-light': '#E8D5A3',
        '--gold-dark': '#9A7A2E',
        '--text-primary': '#FAFAFA',
        '--text-secondary': 'rgba(250,250,250,0.65)',
        '--text-muted': 'rgba(250,250,250,0.35)',
        '--border-color': 'rgba(201,168,76,0.25)',
        '--border-accent': 'rgba(201,168,76,0.4)',
        '--envelope-bg': '#1a1a1a',
        '--seal-bg': '#C9A84C',
        '--hero-gradient': 'radial-gradient(ellipse at top, #1a1409 0%, #0a0a0a 70%)',
        '--section-gradient': 'linear-gradient(135deg, #141414, #0a0a0a)',
      },
    },
    {
      id: 'sage-champagne',
      name: 'Sage & Champagne',
      nameML: 'സേജ് & ഷാംപെയ്ൻ',
      vars: {
        '--bg-primary': '#0d1510',
        '--bg-secondary': '#162019',
        '--bg-card': 'rgba(107,142,90,0.08)',
        '--bg-section': '#111a14',
        '--accent-primary': '#6B8E5A',
        '--accent-secondary': '#8FAF7E',
        '--gold': '#D4B483',
        '--gold-light': '#EDD9B5',
        '--gold-dark': '#A88856',
        '--text-primary': '#F5F0E8',
        '--text-secondary': 'rgba(245,240,232,0.65)',
        '--text-muted': 'rgba(245,240,232,0.35)',
        '--border-color': 'rgba(212,180,131,0.25)',
        '--border-accent': 'rgba(107,142,90,0.4)',
        '--envelope-bg': '#2a3d26',
        '--seal-bg': '#D4B483',
        '--hero-gradient': 'radial-gradient(ellipse at top, #162019 0%, #0d1510 70%)',
        '--section-gradient': 'linear-gradient(135deg, #162019, #0d1510)',
      },
    },
    {
      id: 'royal-burgundy',
      name: 'Royal Burgundy',
      nameML: 'റോയൽ ബർഗൺഡി',
      vars: {
        '--bg-primary': '#0f0509',
        '--bg-secondary': '#1e0a12',
        '--bg-card': 'rgba(100,0,40,0.1)',
        '--bg-section': '#170810',
        '--accent-primary': '#640028',
        '--accent-secondary': '#9B003D',
        '--gold': '#D4AF37',
        '--gold-light': '#F0D080',
        '--gold-dark': '#A07D20',
        '--text-primary': '#FFF8F5',
        '--text-secondary': 'rgba(255,248,245,0.65)',
        '--text-muted': 'rgba(255,248,245,0.35)',
        '--border-color': 'rgba(212,175,55,0.25)',
        '--border-accent': 'rgba(100,0,40,0.5)',
        '--envelope-bg': '#4a001e',
        '--seal-bg': '#D4AF37',
        '--hero-gradient': 'radial-gradient(ellipse at top, #1e0a12 0%, #0f0509 70%)',
        '--section-gradient': 'linear-gradient(135deg, #1e0a12, #0f0509)',
      },
    },
    {
      id: 'dusty-rose',
      name: 'Dusty Rose',
      nameML: 'ഡസ്റ്റി റോസ്',
      vars: {
        '--bg-primary': '#1a1015',
        '--bg-secondary': '#261520',
        '--bg-card': 'rgba(188,101,120,0.08)',
        '--bg-section': '#1f1219',
        '--accent-primary': '#BC6578',
        '--accent-secondary': '#D4879A',
        '--gold': '#C8A97E',
        '--gold-light': '#E5CFA8',
        '--gold-dark': '#9A7A56',
        '--text-primary': '#FDF8FA',
        '--text-secondary': 'rgba(253,248,250,0.65)',
        '--text-muted': 'rgba(253,248,250,0.35)',
        '--border-color': 'rgba(200,169,126,0.25)',
        '--border-accent': 'rgba(188,101,120,0.4)',
        '--envelope-bg': '#5c2535',
        '--seal-bg': '#C8A97E',
        '--hero-gradient': 'radial-gradient(ellipse at top, #261520 0%, #1a1015 70%)',
        '--section-gradient': 'linear-gradient(135deg, #261520, #1a1015)',
      },
    },
    {
      id: 'midnight-blue',
      name: 'Midnight Blue',
      nameML: 'മിഡ്നൈറ്റ് ബ്ലൂ',
      vars: {
        '--bg-primary': '#050d1a',
        '--bg-secondary': '#0a1829',
        '--bg-card': 'rgba(26,78,140,0.08)',
        '--bg-section': '#071325',
        '--accent-primary': '#1A4E8C',
        '--accent-secondary': '#2E6BBF',
        '--gold': '#C9A84C',
        '--gold-light': '#E8D5A3',
        '--gold-dark': '#9A7A2E',
        '--text-primary': '#F0F5FF',
        '--text-secondary': 'rgba(240,245,255,0.65)',
        '--text-muted': 'rgba(240,245,255,0.35)',
        '--border-color': 'rgba(201,168,76,0.25)',
        '--border-accent': 'rgba(26,78,140,0.5)',
        '--envelope-bg': '#0d2545',
        '--seal-bg': '#C9A84C',
        '--hero-gradient': 'radial-gradient(ellipse at top, #0a1829 0%, #050d1a 70%)',
        '--section-gradient': 'linear-gradient(135deg, #0a1829, #050d1a)',
      },
    },
  ],

};

// Make config globally available
window.CONFIG = CONFIG;
