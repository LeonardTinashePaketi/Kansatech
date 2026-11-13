# Kansatech Zimbabwe

One-page marketing site for **Kansatech (Pvt) Ltd** — electrical, mechanical, HVAC and civil
engineering in Harare, Zimbabwe. Built as a single static page with vanilla HTML, Tailwind (compiled),
and GSAP for motion. No build step, no framework, no server.

**Live site:** https://aspiredconnet.github.io/Kansatech/

## What's inside

| Path | Purpose |
| --- | --- |
| `index.html` | The whole page: hero, services, about, work gallery, contact |
| `404.html` | On-brand not-found page |
| `assets/css/tailwind.css` | Compiled Tailwind 3.4 (17 KB) — not the Play CDN |
| `assets/css/styles.css` | Hero slider, dots, reduced-motion rules |
| `assets/js/main.js` | GSAP intro timeline, hero crossfade, gallery build + lightbox |
| `assets/vendor/` | Local copies of `gsap.min.js` and `ScrollTrigger.min.js` |
| `assets/images/hero/` | The four hero slides (desktop + `-mobile` variants) |
| `assets/images/services/` | Background photos for the service cards |
| `assets/images/Solar/`, `assets/images/Aircon/` | Real project photos used by the Work gallery |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

Everything except Google Fonts is served from this repo, so the page works offline and on any static host.

## Editing

- **Copy and structure** — edit `index.html` directly. Sections are marked with `<!-- ... -->` comments.
- **Work gallery** — the tiles are built in `assets/js/main.js` from the `GALLERY` array; add an entry
  with `{ src, title, desc }` and it appears automatically.
- **Colours** — brand red `#D63031` (hover `#E84545`), near-black `#0A0D12`, accent blue `#1F5FA8`,
  WhatsApp green `#25D366`.

### Rebuilding the CSS

`assets/css/tailwind.css` is generated, and Tailwind only ships the classes it finds in the source at
build time. If you add new utility or arbitrary-value classes (`md:top-[28%]`, `bg-[#0A0D12]`, …), rebuild:

```sh
npx tailwindcss@3.4.17 \
  -i input.css \
  -o assets/css/tailwind.css \
  --content "index.html,404.html,assets/js/main.js" \
  --minify
```

where `input.css` contains:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Preview locally

```sh
python -m http.server 8099
```

Then open <http://localhost:8099/>. Opening `index.html` straight from disk also works, but the
Google Map embed and some browsers' font loading behave better over `http://`.

## Deploying

The site is static, so deployment is just "put these files on a server". On GitHub Pages:

1. Repository **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` · folder `/ (root)` → **Save**

First deploy takes a minute or two. Every push to `main` republishes automatically.

> GitHub Pages on a **private** repository needs a paid plan. For a free site, set the repo to public
> under **Settings → General → Danger Zone → Change visibility**.

## Contact details used on the site

- WhatsApp / phone: `+263 715 407 825`
- Email: `sirkansalu@yahoo.co.uk`
- Address: 1432 7th Close, Crowborough North, Harare, Zimbabwe
