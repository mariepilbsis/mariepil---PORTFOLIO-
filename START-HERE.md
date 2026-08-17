# Getting this built in VS Code and onto GitHub

Three stages: get the files onto your machine, have Claude Code build the real site, then publish.

---

## 1. Get the files on your machine

1. Download the handoff zip from the chat and unzip it somewhere sensible, e.g.
   `Documents/portfolio/`.
2. Open that folder in VS Code (`File → Open Folder`).

You should see `README.md`, `assets/`, `prototype/` and this file.

---

## 2. Let Claude Code build it

Open the terminal in VS Code (`` Ctrl+` ``), run `claude`, and give it this prompt:

> Read `README.md` in this folder. It is a complete design handoff for a personal portfolio site.
> Build it as a Vite + React + TypeScript site in this repository, following the README exactly —
> colors, typography, spacing, motion timings and copy are final, so do not redesign or rewrite any
> text. Use CSS custom properties for the two themes the way the README describes. Give each page a
> real route with `react-router-dom`. Keep the content in typed data files so it is easy to edit
> later. Move the images from `prototype/uploads/` and `assets/` into the app's asset folder. The
> files in `prototype/` are reference only — read them, do not ship them.

Then work through it with Claude Code page by page. Useful follow-ups:

- "Show me the Home page first, then wait for my feedback before continuing."
- "The hero H1 should not wrap on desktop but must wrap below 700px."
- "Make the work reel a vertical stack on mobile instead of a horizontal scroll."
- "Add visible keyboard focus rings using the crimson accent."

Run it locally with `npm run dev` and check both themes and a narrow window before moving on.

---

## 3. Put it on GitHub

Create an empty repository on github.com first (no README, no .gitignore — you already have files).
Then, in the VS Code terminal at your project folder:

```bash
git init
git add .
git commit -m "Portfolio site from design handoff"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If Git asks who you are, set it once:

```bash
git config --global user.name "Gay Marie R. Pil"
git config --global user.email "pil.gaymarie.bsis@gmail.com"
```

After that, VS Code's Source Control panel (left sidebar) handles day-to-day commits — stage, write
a message, commit, sync. Or just ask Claude Code to commit and push for you.

---

## 4. Publish it (optional, both free)

**Vercel** — the simplest. Sign in at vercel.com with GitHub, "Add New Project", pick the repo, keep
the detected Vite settings, deploy. Every push to `main` redeploys automatically.

**GitHub Pages** — free on your `github.io` domain. Ask Claude Code:
"Set up GitHub Pages deployment for this Vite app with a GitHub Actions workflow, and set the
correct `base` in `vite.config.ts`." Then in the repo, `Settings → Pages → Source: GitHub Actions`.

---

## Notes

- Don't commit anything private. If you add a resume PDF with your address on it, decide
  deliberately — a public repo means a public file.
- Keep `README.md` in the repo. It is the spec, and Claude Code can re-read it any time you want to
  add a section or fix a detail.
- The four outstanding items (case-study screenshots, 9 pubmat images, resume PDF, Dean's Lister
  semester) are listed at the end of `README.md`. The site should build fine without them.
