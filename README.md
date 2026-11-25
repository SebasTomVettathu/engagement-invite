# Anat Tom & Britto Thomas — Engagement Invitation

**Luxury Digital Engagement Invitation Website**  
Rouge & Ivory Theme · 6 Colour Themes · English + Malayalam

---

## 🗂️ Project Structure

```
engagement-invite/
├── index.html                     ← Main website (single-page)
├── README.md                      ← This file
├── assets/
│   ├── css/
│   │   └── style.css              ← All styling + 6 theme variables
│   ├── js/
│   │   ├── config.js              ← ⚙️  EDIT THIS to update everything
│   │   └── main.js                ← All interactive features
│   ├── images/
│   │   ├── bride.jpg              ← Add bride photo here
│   │   ├── groom.jpg              ← Add groom photo here
│   │   ├── og-image.jpg           ← Add social share preview image
│   │   ├── README.md              ← Photo instructions
│   │   └── gallery/               ← Add gallery photos here (up to 10)
│   │       └── (01.jpg, 02.jpg…)
│   └── music/
│       ├── romantic-piano.mp3     ← Add music file here
│       └── README.md              ← Music instructions
```

---

## 🚀 GitHub Deployment

```bash
# Navigate to your project folder
cd path/to/engagement-invite

# Stage all changes
git add -A

# Commit
git commit -m "Luxury redesign: Rouge & Ivory, all 19 features"

# Push to GitHub
git push origin main

# Your site will be live at:
# https://sebastomvettathu.github.io/engagement-invite/
```

**GitHub Pages Settings** (if not already configured):
1. Go to your repo → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main` / `(root)`
4. Click Save

---

## ✏️ How to Edit Event Information

All content lives in **`assets/js/config.js`**. Open that file and edit:

### Couple Names
```js
bride: { firstName: 'Anat', lastName: 'Tom', fullName: 'Anat Tom', ... }
groom: { firstName: 'Britto', lastName: 'Thomas', fullName: 'Britto Thomas', ... }
```

### Event Date & Time
```js
event: {
  dateISO: '2027-01-03T12:15:00+05:30',  // ISO format in IST
  dateDisplay: 'Sunday, 3rd January 2027',
  time: '12:15 PM',
  ...
}
```

### Venue
```js
venue: {
  name: 'St Thomas Church',
  locality: 'Melukavumattom',
  full: 'St Thomas Church, Melukavumattom',
  mapsUrl: 'https://maps.google.com/?q=St+Thomas+Church+Melukavumattom',
}
```

### Parents
```js
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
```

### WhatsApp RSVP Number
```js
whatsapp: {
  number: '919496907996',  // Country code + number, no + or spaces
  rsvpMessage: "Hi, I would love to attend...",
}
```

---

## 📸 How to Add Photos

### Bride & Groom Portraits
1. Place your photos in `assets/images/`:
   - `assets/images/bride.jpg` — Portrait of Anat Tom
   - `assets/images/groom.jpg` — Portrait of Britto Thomas
2. Recommended size: **600 × 800 px** (3:4 portrait)
3. Keep under 500 KB each

### Gallery Photos (up to 10)
1. Place photos in `assets/images/gallery/`:
   - `assets/images/gallery/01.jpg`, `02.jpg`, etc.
2. Register them in `config.js`:
```js
gallery: {
  folder: 'assets/images/gallery/',
  images: [
    { src: '01.jpg', alt: 'Anat and Britto at the park' },
    { src: '02.jpg', alt: 'Family photo' },
    // Add up to 10
  ],
},
```

---

## 🎵 How to Add Background Music

1. Place your MP3 file at: `assets/music/romantic-piano.mp3`
2. If using a different filename, update `config.js`:
```js
music: {
  file: 'assets/music/your-file.mp3',
  title: 'Your Music Title',
},
```
3. **Note**: Music is never forced — the guest is offered it after opening the envelope

**Free royalty-free music sources:**
- [Pixabay](https://pixabay.com/music/)
- [Bensound](https://www.bensound.com/)
- [Free Music Archive](https://freemusicarchive.org/)

---

## 🌐 How to Edit English & Malayalam Text

All translations are in `config.js` under the `i18n` section:

```js
i18n: {
  en: {
    countdownTitle: 'The Celebration Begins In',
    rsvpTitle: 'RSVP',
    // ... all English strings
  },
  ml: {
    countdownTitle: 'ആഘോഷം ആരംഭിക്കുന്നു',
    rsvpTitle: 'RSVP',
    // ... all Malayalam strings
    brideName: 'അനാറ്റ് ടോം',      // Malayalam rendering of bride's name
    groomName: 'ബ്രിട്ടോ തോമസ്',   // Malayalam rendering of groom's name
  },
},
```

**Switch language**: The language switcher at the top of the page shows `English | മലയാളം`. Preference is saved automatically.

---

## 🎨 How to Change Colour Themes

**6 built-in themes** — switch by clicking the coloured dots in the top bar:

| Dot Colour | Theme Name |
|-----------|------------|
| 🔴 Burgundy | Rouge & Ivory (default) |
| 🟡 Gold | Classic Black & Gold |
| 🟢 Green | Sage & Champagne |
| 🟣 Deep Red | Royal Burgundy |
| 🩷 Pink | Dusty Rose |
| 🔵 Blue | Midnight Blue |

**To customise a theme**, edit `config.js` under `themes`:
```js
{
  id: 'rouge-ivory',
  name: 'Rouge & Ivory',
  vars: {
    '--bg-primary': '#1a0a0d',
    '--gold': '#C9A84C',
    // ... CSS variable overrides
  },
},
```

**To change the default theme**, update `localStorage.getItem('invite_theme')` default in `main.js`, or change the initial `:root` values in `style.css`.

---

## 📅 Our Story — Adding Milestones

In `config.js`, add milestones under `story`:

```js
story: {
  en: [
    { year: '2020', title: 'First Meeting', body: 'Our paths crossed for the first time…' },
    { year: '2024', title: 'The Proposal', body: 'He asked the question she had always hoped for…' },
  ],
  ml: [
    { year: '2020', title: 'ആദ്യ കൂടിക്കാഴ്ച', body: 'ആദ്യമായി ഞങ്ങളുടെ പാതകൾ ഒന്നിച്ചു…' },
    { year: '2024', title: 'നിർദ്ദേശം', body: 'അദ്ദേഹം ആ ചോദ്യം ചോദിച്ചു…' },
  ],
},
```

Add or remove as many milestones as you like. They display on an alternating timeline.

---

## ✅ Feature Checklist

| Feature | Status |
|---------|--------|
| Animated Envelope | ✅ |
| 6 Colour Themes | ✅ |
| Main Invitation | ✅ |
| Couple Photo Section | ✅ |
| Photo Gallery + Lightbox | ✅ |
| Our Story Timeline | ✅ |
| Family Section | ✅ |
| Live Countdown (IST) | ✅ |
| English + Malayalam | ✅ |
| Event Schedule | ✅ |
| Add to Calendar (Google + ICS) | ✅ |
| Background Music Player | ✅ |
| Complimentary Section | ✅ |
| Responsive Design | ✅ |
| Accessibility (ARIA, keyboard, reduced-motion) | ✅ |
| WhatsApp RSVP | ✅ |
| WhatsApp Share | ✅ |
| Copy Link | ✅ |
| Google Maps | ✅ |
| Centralized Config File | ✅ |
| GitHub Pages Compatible | ✅ |

---

## 📞 Contact Details Preserved from Original Site

| Item | Value |
|------|-------|
| WhatsApp RSVP | +91 9496907996 |
| Google Maps | St Thomas Church, Melukavumattom |
| Event Time | 12:15 PM IST |
| Event Date | 3 January 2027 (Sunday) |
