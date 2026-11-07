# Dr.Studio website

Static site for Dr.Studio — Creative AI Production (a brand of Dr.Seoul), served by GitHub Pages at https://drstudio.site. No build server is needed to host it.

- Design: Google Stitch (layout, colours and type tokens from the exported code), content replaced with real copy and work.
- Languages: Korean by default, English toggle (shared `drstudio.lang` in localStorage). Copy lives in the `I18N` / `T` table at the top of each page script.
- Work: public videos from the Dr.Studio YouTube channel.
- Backend: one Google Apps Script web app (sheet "Dr.Studio 광고 제작 의뢰서 접수"). Its URL is `ENDPOINT` in `assets/js/common.js`.
  All calls are `POST` with `Content-Type: text/plain;charset=utf-8` and a JSON body (Apps Script only allows CORS for simple requests).
  Actions: `submit`, `assist`, `cs_get`, `cs_post`, `cs_quote` — see the API contract kept outside this repo (`files/drstudio_request_backend/API_CONTRACT_2026-11-08.md`).

## Pages

| URL | What |
|---|---|
| `/` (`index.html`) | Home: hero, about, strengths, portfolio, Q&A (links to the request form and pricing) |
| `/pricing/` | Price list (A production · B channel operation · C paid ads), rules, process, payment, CTA |
| `/request/` | Request form: AI helper, service picker (00), form sections 01–05, success card with the status link |
| `/start/?i=<industry>&src=<campaign>` | Short landing for outreach traffic (noindex). `i` = beauty, food, saas, cafe, lodging, delivery (anything else = default copy) |
| `/cs/?id=<request id>&t=<token>` | Customer status page (noindex, no-referrer): stepper, timeline, quote accept/decline, contract, payment, deliverables, messages |

Request form query parameters (used by `/start/` and `/pricing/` links): `p=A-1,C-5` (or repeated `p`) pre-selects services,
`style=illustration|live`, `i=<industry>` sets the hidden `industry` field and pre-selects the category, `src=<campaign>` goes to the hidden `source_ref` field.

## Layout

| Path | What |
|---|---|
| `index.html`, `*/index.html` | Page markup (Tailwind classes) |
| `assets/css/site.css` | Built CSS (do not edit by hand) |
| `src/input.css`, `tailwind.config.js` | CSS source and design tokens |
| `assets/data/pricing.json` | **Price catalog — single source of truth** (codes, ko/en names, illustration/live prices, rules, process, payment). Pricing, request and start pages render from it |
| `assets/data/industries.json` | Landing copy per industry (`/start/?i=`) and the matching request-form category |
| `assets/js/common.js` | Shared helpers for sub pages: `ENDPOINT`, `DRS.api` (POST + 30 s timeout), language switch, menu, formatting |
| `assets/js/site.js` | Home page: language switch, work grid and filters, video dialog, email links, mobile menu |
| `assets/js/request.js` | Request form (schema, service picker, AI helper, submit) |
| `assets/js/pricing.js`, `start.js`, `cs.js` | The pricing, landing and status pages |
| `assets/js/work-data.js` | Generated work list |
| `assets/work/` | Vertical thumbnails (webp) and `work.json` |
| `assets/img/` | Favicons and the share image (`og.jpg`, 1200x630) |
| `tools/build_work.py` | Regenerates thumbnails and the work list from the upload package, then runs `version_assets.py` |
| `tools/version_assets.py` | Stamps `?v=<content hash>` on every CSS / JS / data reference in all pages |

## Updating

- Prices: edit `assets/data/pricing.json` only (keep it in line with the backend's price table), then run `python tools/version_assets.py`.
- Work: publish on YouTube, add the video to the upload package, then run `python tools/build_work.py`.
- Contact address: `EMAIL_USER` / `EMAIL_DOMAIN` in `assets/js/site.js`, `EMAIL` in `assets/js/common.js` and `assets/js/request.js`, plus the mailto defaults in the HTML.
- Backend URL: `ENDPOINT` in `assets/js/common.js`. Redeploy Apps Script as a new *version* of the same deployment so the URL stays the same.
- CSS (whenever new Tailwind classes are used in HTML or JS), from this folder:
  `node "C:\dev\beurs-platform\node_modules\tailwindcss\lib\cli.js" -c tailwind.config.js -i src/input.css -o assets/css/site.css --minify`
  (or `npx tailwindcss@3 ...` with the same arguments), then `python tools/version_assets.py`.
- Cache busting: GitHub Pages lets browsers cache files for 10 minutes. After changing any CSS / JS / JSON file run `python tools/version_assets.py`
  so the pages point at the new `?v=` hash. Classes built in JS strings must be complete literal class names so Tailwind can find them.
- Local preview: `python -m http.server 8791 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8791/ (the YouTube player and the JSON
  fetches do not work from file://). The form, AI helper and status page call the live backend, so test them with care.
