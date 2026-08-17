# Handoff: Gay Marie R. Pil — Personal Portfolio Site

## Overview
A four-page personal portfolio for Gay Marie R. Pil, a BS Information Systems student at Bulacan
State University working as a design lead, UI/UX designer and layout artist. The site presents her
positioning, her publication-material (pubmat) body of work, her product/case work, her experience
timeline and credentials, and a contact page. It ships with a dark and a light theme, switched by a
toggle in the nav and remembered across visits.

Pages: **Home · About & Experience · Work & Pubmats · Contact** (client-side switching, no routing
library required — but real URL routes are recommended in the rebuild, see *Interactions*).

## About the Design Files
The files in `prototype/` are **design references created in HTML** — a working prototype that shows
the intended look, motion and behaviour. They are **not production code to copy directly**. The
prototype is a single-file component format that only runs inside the tool that produced it
(`support.js` is its runtime), so the task is to **recreate the design in a real codebase** using
that project's established patterns.

There is no existing codebase for this site yet, so the implementer should choose an appropriate
stack. Recommended: **Vite + React + TypeScript**, plain CSS Modules or Tailwind, deployed to GitHub
Pages or Vercel. Astro or Next.js are equally reasonable. Avoid heavy UI kits — the design is
custom and has no component-library dependencies.

To view the prototype: it is easiest to look at the live design in the tool it was built in. Opening
`prototype/Portfolio.dc.html` directly from disk will not render (it needs its host runtime); treat
it as **readable source**, not a runnable page. Every value below is also written out in this
document so the design can be rebuilt from the README alone.

## Fidelity
**High fidelity.** Colors, typography, spacing, radii, motion timings and copy are final. Rebuild
pixel-accurately. All copy in the prototype is the client's own and must not be rewritten.

---

## Design Tokens

Both themes are driven from one set of CSS custom properties on `<html>`; the light theme overrides
them under `html[data-theme="light"]`. Channel-triplet variables (`--txc`, `--linec`, …) exist so
translucent values can be written as `rgba(var(--txc), .6)`.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--bg` | `#0C0908` | `#F4EFEC` | page background |
| `--bgc` | `12,9,8` | `244,239,236` | bg with alpha (fade-out gradients) |
| `--surf` | `#12090A` | `#FFFFFF` | nav pill, footer, modals |
| `--surfc` | `18,9,10` | `255,255,255` | translucent nav (`.82` alpha) |
| `--tx` | `#F7F3F1` | `#1C1416` | body text |
| `--txc` | `247,243,241` | `28,20,22` | muted text (`.86 / .66 / .6 / .45 / .35`) |
| `--linec` | `255,255,255` | `20,12,14` | borders + surface fills (`.03 – .18`) |
| `--hd` | `#FFFFFF` | `#140C0E` | headings, key numerals |
| `--onacc` | `#12090A` | `#FFFFFF` | text on crimson fills |
| `--acc2` | `#FF5C72` | `#B81230` | eyebrows, mono labels, links |
| `--acc3` | `#FFD8DE` | `#7E0A1D` | link hover, italic "Pil" accent |
| `--slice` | `#241618` | `#E6DDD9` | pie chart "coder" slice |
| `--slice2` | `#33201F` | `#D9CCC7` | pie slice hover |
| `--slot` | `#3A2E30` | `#B4A8A3` | empty image placeholder |
| `--photo` | `#EFE9E7` | `#E8E0DC` | portrait backing |
| `--gridA` | `.055` | `.05` | background grid line alpha |
| `--glowA` | `.2` | `.11` | large radial glow alpha |
| `--glowB` | `.15` | `.08` | constellation glow alpha |

**Fixed accent (identical in both themes):** `#E23048` crimson — buttons, avatar, timeline dot,
active chips, diagram strokes, `::selection`. Glows are `rgba(226,48,72, …)`.

### Typography
Google Fonts: `Instrument Serif` (ital 0;1), `Instrument Sans` (400;500;600;700),
`JetBrains Mono` (400;500;700), `Archivo Black`, `Archivo` (400;500;600;700).

| Role | Family | Details |
|---|---|---|
| Display / page headings | Instrument Serif 400 | `clamp(40px,5.6vw,82px)` hero; `clamp(36px,4.8vw,56px)` section; `line-height:1`; `letter-spacing:-.02em`; accent words italic |
| Body | Instrument Sans | 21px lead / 15px body / 13–13.5px small; `line-height:1.5–1.72` |
| UI labels, buttons | Instrument Sans 600–700 | 13–14.5px |
| Data, eyebrows, chips, meta | JetBrains Mono | 10–11.5px, `letter-spacing:.14–.2em`, uppercase for eyebrows |
| Index numerals (work reel only) | Archivo Black | 44px, `letter-spacing:-.03em` |

Body sets `-webkit-font-smoothing:antialiased`. Long-form paragraphs use `text-wrap:pretty`;
headings use `text-wrap:balance`.

### Spacing, radii, motion
- Content max width `1240px`, gutter `24px`. Section vertical rhythm `64–100px`.
- Radii: `999px` pills/buttons/chips · `26px` identity card · `18px` home cards ·
  `16px` reel/modal cards · `0 16px 16px 0` timeline rows (square left edge, sits against the rail).
- Buttons: `min-height:44px`, padding `12px 20px` (nav) / `16px 26–28px` (page CTAs).
- Transitions: `.2s` opacity, `.22–.28s` color/border/background, `.35s` node fades,
  `.45s cubic-bezier(.2,.8,.3,1)` parallax, `.5s cubic-bezier(.2,.8,.3,1)` page enter (`fadeUp`).
- Keyframes: `blink` (1.1s step-end infinite, hero caret), `twinkle`, `fadeUp`
  (opacity 0→1, `translateY(14px)`→0), `marquee` (34s linear, `translateX(0)`→`-50%`).

### Global surfaces
- Fixed background grid, `z-index:0`, non-interactive: two `linear-gradient` 1px lines at
  `rgba(226,48,72,var(--gridA))`, `background-size:78px 78px`.
- Page content sits at `z-index:1`; nav at `z-index:60`.

---

## Screens / Views

### 1. Global nav (all pages)
Fixed to viewport top (`position:fixed; top:0; padding:18px 24px 0`), centered pill, max width 1240px.
Pill: `background:rgba(var(--surfc),.82)`, `backdrop-filter:blur(14px)`,
`border:1px solid rgba(var(--linec),.11)`, `border-radius:999px`, padding `8px 10px 8px 8px`,
`display:flex; gap:18px; flex-wrap:wrap`.
- **Brand button** — 38px crimson circle, JetBrains Mono 700 13px `GP` in `--onacc`, then
  "Gay Marie R. Pil" 14.5px/600. Navigates home.
- **Nav links** — Home · About & Experience · Work & Pubmats · Contact. 13.5px/500,
  `opacity:.62`, active `1`, hover `1`. Active link carries a crimson underline.
- **Theme toggle** — 44px circle, `1px solid rgba(var(--linec),.16)`, transparent fill; sun icon in
  dark mode, moon icon in light mode (crossfade via opacity, both icons stacked). Hover: crimson
  border, crimson icon, `rgba(226,48,72,.08)` fill.
- **"Let's talk"** — crimson pill, `--onacc` label, 13px/700, goes to Contact.

### 2. Home
- **Hero** (2-col auto-fit grid, `minmax(420px,1fr)`, gap 48px, padding `76px 0 40px`):
  - Eyebrow: 34×2px crimson rule + `Design · Development · Creative leadership` +
    `· Bulacan State University` at `rgba(var(--txc),.35)`. Mono 10.5px uppercase, `.16em`.
  - H1 `Hi, I'm Marie ` + italic crimson `Pil` + blinking 0.12em×0.66em crimson caret
    (`box-shadow:0 0 18px rgba(226,48,72,.55)`), `white-space:nowrap`.
  - Lead 21px: "I design interfaces and **lead the teams that ship them**".
  - Sub 15px at `.6`: "From pixel-perfect pubmats to full product prototypes — Information Systems
    student at Bulacan State University".
  - Buttons: crimson "View my work →" and ghost "Get in touch"
    (`rgba(var(--linec),.06)` fill, `.15` border).
  - **Stat ledger** — 3-col grid, `border-top:1px solid rgba(var(--linec),.09)`, mono 11.5px,
    vertical dividers between columns: `Currently` / `Focus` / `Based`.
  - Radial glow behind the hero: 700×600px ellipse `rgba(226,48,72,var(--glowA))`, top -120 left -140.
- **Process diagram** (right column, min-height 470px, mono 11.5px): a vertical 1px rule at 38% plus
  an SVG S-curve (`stroke:#E23048`, 2px, non-scaling) with five absolutely-positioned nodes —
  planning · gathering data · design & prototyping · execution · feedback. Each node is a 13px
  circle, `2px solid #E23048`; the active node is filled crimson with a `0 0 14px` glow, and
  alternating nodes flip label side via `flex-direction:row-reverse`.
- **Ticker** — full-bleed marquee strip, mono 11.5px at `.6`, 5px crimson dots between items,
  duplicated list translating `-50%` over 34s.
- **Three entry cards** — grid, `rgba(var(--linec),.03)` fill, `.11` border, radius 18px,
  padding `26px 24px`; mono crimson index, 20px/700 title, 13.5px body at `.58`. Hover lifts the
  border to crimson. Each navigates to its page.

### 3. About & Experience
- **Eyebrow** `01 — About`, then a two-column auto-fit grid (`minmax(340px,1fr)`, gap 56px).
- **Identity card** (max 400px, radius 26px, `.14` border, `rgba(var(--linec),.03)` fill,
  `box-shadow:0 30px 70px rgba(226,48,72,.18)`):
  - Header bar: mono 10px uppercase `identity.card` / crimson `● verified`.
  - Portrait area 352px tall on `--photo` — see *Assets*.
  - Data rows, mono 11.5px, `1px solid rgba(var(--linec),.07)` separators, row hover tints the
    background and indents the key by a few px:
    `uid gaymariepil` · `role design lead · ui/ux designer · layout artist` ·
    `school bulacan state university` · `program bs information systems` ·
    `base bulacan, ph · gmt+8` · `exp design lead · since 2023` ·
    `status ● open to opportunities` (crimson).
- **Bio column** — H2 "Good layout is a system, not a lucky draft."; 22px/500 pull quote
  ("Two years running an org's publications desk taught me the thing school didn't: *a design only
  counts once it ships, on time, with the team intact.*" — second clause at `.5`); 15px paragraph.
- **Three principles** — auto-fit grid over a `.14` top rule, each cell `padding:26px 16px 22px 0`
  with a transparent 1px top border. **Hover:** crimson top border, `rgba(var(--linec),.035)` fill,
  `padding-left:14px`, all `.25s`. Mono crimson index, 15px/600 title, 13px body at `.55`.
- **Split pie** — 3-col grid (`1fr auto 1fr`, gap 64px). Left column right-aligned "Part designer"
  + list; right column "Part coder" + list; center a 264px SVG donut split 60/40 with the two
  slices offset by ±6/3px. Slice labels are Instrument Sans 700 18px, set via `style` (not the
  `fill` attribute) so they inherit theme variables. **Hover:** designer slice → `--acc2` with
  `drop-shadow(0 0 22px rgba(226,48,72,.65))`; coder slice → `--slice2` fill, crimson stroke.
- **Constellation** — full-width band, `border-top:1px solid rgba(var(--linec),.09)`, radial glow at
  50%/62%, and a bottom fade `linear-gradient(180deg, rgba(var(--bgc),0), var(--bg) 82%)` that
  blends into the experience section. Eyebrow `02 — Constellation` + active category + a live
  `● ` status. Category chips (mono 10.5px, square, `.18` border) filter the field; the active chip
  fills crimson via an absolutely-positioned overlay whose opacity animates `.25s`. Skill nodes are
  absolutely positioned by percentage, each a 9px crimson dot + mono 11px label; non-matching nodes
  fade to low opacity. An SVG polyline (`stroke:#E23048`, 1px, `opacity:.85`,
  `drop-shadow(0 0 6px)`) links the active set. The whole layer parallaxes with the pointer
  (`onMouseMove` → `translate3d(-dx*26px, -dy*18px, 0)`, `.45s` ease).
- **Experience timeline** — eyebrow `03 — Experience`, H2 "Where I've **shipped**" (italic crimson).
  Rail container `padding-left:26px` with three absolutely-positioned pieces: a 1px track at
  `rgba(var(--linec),.14)`, a crimson fill that grows with scroll, and a 13px crimson dot with
  `0 0 18px` glow that travels the rail. Progress `p = clamp((innerHeight*0.45 - railTop) /
  railHeight)`; dot uses `translate3d(0, p*travel, 0)`, fill uses `height: p*travel`.
  Each row: auto-fit grid (`minmax(260px,1fr)`, gap 28px), `padding:16px 18px 46px`,
  `margin-left:-18px`, `border-radius:0 16px 16px 0`, and an 11px border-box marker dot at
  `left:-9px; top:22px` sitting exactly on the rail (`background:var(--bg)`, 2px border — crimson
  for the current role, `rgba(var(--linec),.3)` otherwise). Rows are **not** hover-interactive.
  Left column: date pill (mono 10.5px, `.18` border, radius 999px), org 20px/700, and a date line
  in mono 11px at `.45` **rendered only when it differs from the pill**. Right column (spans 2):
  role 19px/600, body copy, and chips (mono, `.14` border, 999px, crimson dot).
  Entries: IS³ Synergy Society — Multimedia and Publications Head (2026 → 2027 · current,
  Jul 2026 → 2027) · Ever Rising Electrical Supplies — Inventory & Sales Support Staff (2026,
  May → Jun 2026) · IS³ Synergy Society — Head Layout Artist (2024 → 2026) ·
  Freelance — Graphic Designer, part-time (2023 → present).
- **Credentials / recognition cards** follow the timeline (issuer, name, kind: Certification /
  Internship / Award, incl. Dean's Lister — semester details still to be supplied by the client).

### 4. Work & Pubmats
- **Horizontal reel** — a tall scroll container whose inner `position:sticky` stage is
  `calc(100vh - 76px)` (min 620px). Vertical scroll progress `p` inside the container drives
  `translate3d(-p * (trackScrollWidth - stageWidth), 0, 0)` on the track, so the case cards slide
  left as the user scrolls down. A 3px bottom rail shows progress (`width: p*100%`, crimson,
  `0 0 12px` glow) with a mono counter bottom-right.
  Card: Archivo Black 44px index, right-aligned 17px/600 name + mono 11px meta, "Tools and features"
  block, and a screenshot slot (currently an empty drop target — see *Assets*). Clicking a card
  opens the case modal. The final track panel (380px) reads "The pubmats live in the gallery next
  door." with a crimson pill to the gallery.
- **Case modal** — `--surf` sheet, sticky header (mono crimson meta + 36px round close button),
  body with description, screenshot slot and tool chips.
- **Pubmat gallery** — eyebrow `04 — …`, H2 "Layout work, *shipped*", intro paragraph, a year filter
  (All / 2024 / 2025 / 2026) and a card grid. 18 entries; 9 have final artwork, 9 are placeholders
  awaiting files. Clicking an entry opens a lightbox (image + `title · year`).

### 5. Contact
Centered column, max 900px, `padding:100px 24px 90px`, radial glow behind.
Eyebrow, H2 "Ready to build **something**" (`clamp(42px,6.4vw,78px)`), 17px paragraph:
"Open to paid roles, freelance projects and internships in UI/UX, front-end, data analytics, or
digital marketing. One message and I'll send the full deck of work."
Buttons: crimson `mailto:`, LinkedIn (ghost), Resume (dashed border — **link still to be supplied**).
Below: a "copy email" button that writes to the clipboard and swaps its label to
"copied to clipboard ✓" for 1.8s. Meta row (mono 11.5px at `.45`):
`phone: (+63) 928 741 7364` · `base: Bulacan, PH` · `status: open to paid work` (crimson).

### 6. Footer (all pages)
`--surf` band, `1px solid rgba(var(--linec),.09)` top border, 30px crimson `GP` avatar,
`© 2026 · Gay Marie R. Pil · designed and built in Bulacan`, and three 44px round icon buttons
(email, LinkedIn, back-to-top) with crimson hover.

---

## Interactions & Behavior
- **Page switching** is component state in the prototype; every page change also does
  `window.scrollTo(0,0)` and resets open modal/lightbox. **In the rebuild, give each page a real
  route** (`/`, `/about`, `/work`, `/contact`) so links are shareable and SEO works.
- **Page enter animation:** `.pg { animation: fadeUp .5s cubic-bezier(.2,.8,.3,1) both }`.
- **Theme toggle:** flips `data-theme` on `<html>`, persists to `localStorage['gm-theme']`, restores
  on mount, defaults to dark. Read the OS preference (`prefers-color-scheme`) as the initial default
  in the rebuild if no stored value exists. Each theme also sets `color-scheme`.
- **Scroll-driven:** timeline rail progress (window scroll) and the work reel (container scroll).
  Both listeners are passive and re-run on resize; the reel writes transforms directly to refs
  rather than through state.
- **Pointer-driven:** constellation parallax on `mousemove`.
- **Hover states** are documented per component above. Notable: nav opacity, entry-card crimson
  border, principle cards, pie slices, identity rows, icon buttons.
- **Clipboard:** `navigator.clipboard.writeText` with a 1.8s confirmation, wrapped in try/catch.
- **Responsive:** every multi-column area is `repeat(auto-fit, minmax(<n>px, 1fr))` and collapses on
  its own. The nav pill wraps. Two things need explicit mobile attention in the rebuild: the sticky
  horizontal reel (fall back to a vertical stack or a swipeable carousel under ~900px) and the
  hero's `white-space:nowrap` H1 (allow wrapping on small screens).
- **Accessibility to preserve:** 44px minimum hit targets, `aria-label`/`title` on all icon buttons,
  `role="img"` + `aria-label` on the pie, `aria-hidden` on decorative SVG, visible focus styles
  (add these — the prototype only styles hover).

## State Management
No server, no data fetching — all content is static and can live in typed constants or MDX/JSON.

| State | Type | Trigger |
|---|---|---|
| `page` | `'home' \| 'about' \| 'work' \| 'contact'` | nav / CTA clicks (→ router) |
| `theme` | `'dark' \| 'light'` | toggle button; persisted in `localStorage` |
| `cat` | skill category, default `All` | constellation chips |
| `year` | `'All' \| '2024' \| '2025' \| '2026'` | pubmat filter |
| `open` | case index, `-1` closed | reel card click |
| `lightbox` | pubmat index, `-1` closed | gallery card click |
| `copied` | boolean, auto-clears at 1.8s | copy-email button |

Refs (not state): rail, rail fill, rail dot, reel track, progress bar, constellation layer.

Content collections to model: `PAGES`, `PUBMATS` (title, event, year, img), `TIMELINE` (tag, org,
role, dates, now, body, chips), credentials, skill nodes (label, x%, y%, category), process-flow
nodes, ticker items.

## Assets
All in `prototype/uploads/` (referenced by these exact paths in the prototype) plus `assets/`:

| File | Content |
|---|---|
| `assets/portrait.webp` | Her photograph, for the identity card. Displayed inside a 352px-tall frame, `object-fit:cover`, scaled ≈1.35× and nudged ≈`+0.4% / +11.9%` from center to frame the face — reproduce that crop or re-crop to taste. |
| `uploads/assets-1786633969971-hk1v.png` | Merch Pubmat 01 — official merch launch (2024) |
| `uploads/assets-1786633975085-cpp9.png` | Merch Pubmat 02 — merch collection (2024) |
| `uploads/assets-1786633971661-8spq.png` | Merch Pubmat 03 — merch collection (2024) |
| `uploads/assets-1786633970410-637b.png` | Merch Pubmat 04 — officers edition (2024) |
| `uploads/assets-1786633969324-96wh.png` | Membership Drive (2025) |
| `uploads/assets-1786633969014-zt6l.png` | BSIS Brochure (2025) |
| `uploads/assets-1786633972566-m9fu.png` | Freshies Salubong (2026) |
| `uploads/assets-1786633972117-461l.png` | Salubong Booth (2026) |
| `uploads/assets-1786633973607-c359.png` | Birthday Greeting (2026) |

Icons are hand-written inline SVG (email, LinkedIn, arrow-up, sun, moon) — 24-unit viewBox,
`stroke="currentColor"`, `stroke-width:1.7`, round caps/joins. No icon library.

**Still outstanding from the client** (build these as graceful empty states, not blockers):
- Case-study screenshots for the work reel cards and the case modal.
- Artwork for 9 pubmat entries currently marked `img: null`
  (Captivate Booth, Valentine's Campaign, ISystems Convergence, ExeCom Turnover, ISnergy,
  Open for Applications, Gold Gear Awards, and two others).
- Resume PDF for the Contact page's dashed "Resume" button (`href="#"` today).
- Dean's Lister semester details on the recognition card.

## Files
```
design_handoff_portfolio/
├── README.md                      ← this document
├── assets/portrait.webp           ← extracted portrait
└── prototype/
    ├── Portfolio.dc.html          ← the design source (template + logic + data)
    ├── support.js                 ← prototype runtime (do not port)
    ├── image-slot.js              ← prototype drag-drop placeholder (do not port)
    └── uploads/*.png              ← pubmat artwork
```
Read `Portfolio.dc.html` top-to-bottom: theme variables and keyframes live in the `<helmet><style>`
block, markup follows, and the data arrays (`PAGES`, `PUBMATS`, `TIMELINE`, skills, credentials) sit
at the top of the `class Component` block near the end of the file. `sc-for` is a repeat loop,
`sc-if` a conditional, and `{{ x }}` a value from `renderVals()` — translate them to `.map()`,
conditional rendering, and props.
