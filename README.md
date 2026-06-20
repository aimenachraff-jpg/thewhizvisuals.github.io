# thewhizvisuals — Portfolio Site

A dark, editorial, cinematic portfolio for Chekalil Aimene (thewhizvisuals) — visual creator working across photography, photo editing, posters, and logo design.

## File structure

```
thewhizvisuals/
├── index.html        ← all page content & structure
├── css/
│   └── styles.css    ← all design (tokens at the top of the file)
├── js/
│   └── main.js        ← grid data, filters, scroll reveals, before/after slider
└── assets/
    └── images/        ← put your real photos/posters/logos here
```

No build step, no dependencies, no frameworks. Open `index.html` directly or deploy as-is.

## Adding your real work

Open `js/main.js` and find the `WORKS` array near the top. Each entry is one piece in the grid:

```js
{ title:"Backstreet, Sidi El Houari", cat:"photography", tag:"Street", h:1.3, img:"" }
```

- **title** — shown on hover (and in the featured grid)
- **cat** — must be exactly one of: `photography`, `posters`, `logos`, `editing` (controls the filter buttons)
- **tag** — the small pill label shown on hover (e.g. "Street", "Poster", "Logo")
- **h** — relative height factor for the masonry layout (1.0 = square-ish, 1.4+ = tall portrait, 0.8 = short/wide). Adjust freely to vary rhythm.
- **img** — leave `""` to use a generated placeholder plate, or set a path like `"assets/images/street-01.jpg"` once you drop a real file into `assets/images/`

Drop your image files into `assets/images/` first, then point `img` at them. Recommended: export web-sized JPGs (long edge ~1600–2000px, quality ~80) to keep the site fast.

The `FEATURED_IDX` array (just below `WORKS`) controls which 9 pieces appear in the "Featured Work" section — it's a list of index positions into `WORKS` (0 = first item).

## Editing the before/after section

The before/after slider currently uses generated gradient plates as a stand-in. To use a real edit:

1. Open `index.html`, find `id="baSlider"`.
2. Add a background image to `.ba-after` in `css/styles.css` (your *edited* photo).
3. Add a background image to `.ba-before` (your *raw/unedited* photo, same crop).

```css
.ba-after{ background-image:url('../assets/images/retouch-after.jpg'); background-size:cover; background-position:center; }
.ba-before{ background-image:url('../assets/images/retouch-before.jpg'); background-size:cover; background-position:center; filter:none; }
```
(Remove the `filter:grayscale(...)` line on `.ba-before` once you supply a real raw photo — that filter is only there to visually differentiate the placeholder plates.)

## Editing text content

All copy lives directly in `index.html` — name, tagline, about bio, contact line. Search for the section comments (`<!-- ============ HERO ============ -->` etc.) to jump to each part.

The Instagram link is set in the contact section:
```html
<a href="https://instagram.com/thewhizvisuals" ...>
```
Update the URL if the handle changes.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `thewhizvisuals`).
2. Push these files to the repository root (or to a `docs/` folder — your choice).
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, select the branch (usually `main`) and folder (`/` root or `/docs`).
5. Save. GitHub will publish at `https://<your-username>.github.io/thewhizvisuals/` within a minute or two.

No build process is required since this is plain HTML/CSS/JS.

## Design notes

- **Fonts**: Fraunces (editorial display serif) + Archivo (body) + Space Mono (utility/metadata labels), loaded from Google Fonts.
- **Palette**: warm near-black base, bone-white text, umber/brass accents — avoids the generic "pure black + neon" AI-portfolio look in favor of something closer to a film contact sheet.
- **Masonry grid**: pure CSS columns, no JS layout library — fast and resilient.
- **Motion**: respects `prefers-reduced-motion`; all animation is subtle (fades, slow zooms, a soft auto-sweep on the before/after slider).
- **Viewfinder cursor**: a small camera-corner accent that follows the cursor on desktop, reinforcing the "photographer's eye" identity. Automatically disabled on touch devices.

## Performance

- No external JS frameworks or build tooling — minimal payload.
- Images are the only thing to budget carefully: keep real photo exports under ~300KB each (JPG, ~1600–2000px long edge) for fast mobile loading.
- Consider adding `loading="lazy"` to any `<img>` tags if you switch from CSS background-plates to `<img>` elements for your real work.
