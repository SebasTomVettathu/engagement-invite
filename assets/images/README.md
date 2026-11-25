# Bride & Groom Photos

## How to add photos

Place the following files in this directory (`assets/images/`):

| File | Description |
|------|-------------|
| `bride.jpg` | Portrait photo of Anat Tom (Bride) |
| `groom.jpg` | Portrait photo of Britto Thomas (Groom) |

## Tips
- Recommended size: **600 × 800 px** (3:4 portrait ratio)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Keep file size under **500 KB** for fast loading
- If using `.png` or `.webp`, update `assets/js/config.js`:
  - Change `photo: 'assets/images/bride.jpg'` to `photo: 'assets/images/bride.webp'`

## Gallery Photos

Place gallery photos in the `gallery/` subfolder:

```
assets/images/gallery/01.jpg
assets/images/gallery/02.jpg
...up to 10 photos
```

Then register each in `assets/js/config.js`:

```js
gallery: {
  folder: 'assets/images/gallery/',
  images: [
    { src: '01.jpg', alt: 'Anat and Britto at the park' },
    { src: '02.jpg', alt: 'Family portrait' },
    // ...
  ],
},
```
