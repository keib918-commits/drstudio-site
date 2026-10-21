# Dr.Studio website

Single-page static site for Dr.Studio — Creative AI Production (a brand of Dr.Seoul). No build server is needed to host it.

- Design: Google Stitch (layout, colours and type tokens from the exported code), content replaced with real copy and work.
- Languages: Korean by default, English toggle. All copy lives in the I18N table in `assets/js/site.js`.
- Work: public videos from the Dr.Studio YouTube channel. Age-restricted videos open on YouTube instead of the embedded player.

## Layout

| Path | What |
|---|---|
| `index.html` | Page markup (Tailwind classes) |
| `assets/css/site.css` | Built CSS (do not edit by hand) |
| `src/input.css`, `tailwind.config.js` | CSS source and design tokens |
| `assets/js/site.js` | Language switch, work grid and filters, video dialog, email links, mobile menu |
| `assets/js/work-data.js` | Generated work list |
| `assets/work/` | Vertical thumbnails (webp) and `work.json` |
| `assets/img/` | Favicons and the share image (`og.jpg`, 1200x630) |
| `tools/build_work.py` | Regenerates thumbnails and the work list from the upload package |

## Updating

- Work: publish on YouTube, add the video to the upload package, then run `python tools/build_work.py`.
- Contact address: `EMAIL_USER` / `EMAIL_DOMAIN` at the top of `assets/js/site.js`, plus the mailto defaults in `index.html`.
- CSS (only when new Tailwind classes are used): `npx tailwindcss@3 -c tailwind.config.js -i src/input.css -o assets/css/site.css --minify`
- Local preview: `python -m http.server 8791 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8791/ (the YouTube player does not work from file://).
