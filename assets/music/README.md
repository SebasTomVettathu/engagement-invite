# Background Music

## How to add music

Place your music file here:

```
assets/music/romantic-piano.mp3
```

## Important
- File name must be exactly: `romantic-piano.mp3`
- Or update `assets/js/config.js`:
  ```js
  music: {
    file: 'assets/music/your-file-name.mp3',
    title: 'Your Music Title',
  },
  ```

## Supported formats
- `.mp3` (recommended — best browser compatibility)
- `.ogg` (good for Firefox)
- `.m4a` (Apple devices)

## Tips
- Keep file under **3 MB** for fast loading
- Choose royalty-free music (e.g., from Pixabay, Free Music Archive, Bensound)
- Soft piano or classical pieces work best for a luxury invitation
- The music will NOT autoplay — it's offered to the guest after they open the envelope
- Music loops continuously while browsing

## Placeholder
If no music file is provided, the music player will show but clicking play
will simply not play anything (no errors). You can add the file at any time.
