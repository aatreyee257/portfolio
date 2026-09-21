# aatreyee-portfolio

Personal engineering site for Aatreyee Mukherjee. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — passes clean
npm run typecheck
```

Node 18.18+ required (built and verified on Node 22).

## Two things only you can fill in

1. **LinkedIn URL** — `data/site.ts` → `linkedin: ""`. It is empty because the résumé
   did not reach the build. While empty, the footer and contact page hide the link
   rather than shipping a dead one. Paste the URL and it appears in both places.
2. **InfraAlign drift labels** — `data/projects.ts` uses `Matched / Drifted / Unmanaged`.
   Check that against the classifications the CLI actually emits and rename if they differ.

Everything else on the site comes from the brief. Nothing was invented: no GitHub stats,
no testimonials, no availability badge, no project links that do not exist.

## The ASCII hero

The hero field is rendered by `components/ascii/plasma.ts` — a local canvas renderer, no
third-party script. It exposes the same `mount(el, opts) => { update, destroy }` contract
the AIDesigner runtime expects, and binds to the same `data-aifx="ascii"` element, so the
hosted runtime can be swapped in:

```bash
NEXT_PUBLIC_ASCII_RUNTIME=hosted npm run dev
```

With that set, `app/layout.tsx` loads `https://cdn.aidesigner.ai/effects/runtime/v1.js`
once via `next/script` (`strategy="afterInteractive"`) and `ASCIIBackground` steps aside.

Why local is the default — read the hosted runtime before you switch:

- It calls `api.aidesigner.ai/.../license` on every page view and, if the response says so,
  injects a fixed "Made in AIDesigner" badge into a **closed** shadow root at
  `z-index: 2147483647`. You cannot style or remove that from your own CSS. The check is
  skipped only on `localhost` and on `aidesigner.ai` itself, so it would appear on your
  deployed site and not in local dev.
- Your hero — the visual identity of the whole site — would depend on a third-party CDN
  staying up, and every visitor would make an outbound request to it.
- It mutates your DOM on mount (`position`, `overflow`, `isolation` on the host's parent).

The local renderer has none of that, plus: `prefers-reduced-motion` renders one static
frame and never starts the loop; the loop pauses off-screen (IntersectionObserver) and on
hidden tabs; 30 fps cap; DPR capped at 2; coarser cells under 640px; three brightness
tiers drawn as three `fillText` calls per row instead of one per cell.

## Structure

```
app/            routes (/, /about, /experience, /projects, /skills, /achievements, /contact)
  layout.tsx    shell, fonts, nav, footer, optional hosted runtime
  template.tsx  per-route entrance transition
components/     Navbar, Hero, ASCIIBackground, ExperienceTimeline, SkillExplorer,
                DriftArchitecture, Pipeline, ContactPanel, AchievementTimeline, …
  ascii/        framework-free plasma renderer
data/           site, experience, projects, skills, achievements, education, disciplines
```

Content lives in `data/`. Components never hard-code résumé facts, so editing a role or a
project is a one-file change.

## Design

- **Palette** — terminal green on black by default, with a light theme. Tokens live in
  `app/globals.css`: the `@theme` block is dark, `:root[data-theme="light"]` overrides it.
  The plasma reads its colours from `--plasma-*` variables, so it follows the theme too.
- **Theme** — toggle in the nav. Saved in `localStorage`; first visit follows the OS setting.
  An inline script in `<head>` sets it before first paint, so there is no flash.
- **Sound** — hero buttons play a ~120 ms synthesised chirp (`lib/sound.ts`, Web Audio,
  no audio file). Change or remove `playEnter()` in `components/CommandLink.tsx`.
- **Type** — IBM Plex Sans (200–500) and IBM Plex Mono. One family, two voices: the sans
  for reading, the mono for metadata, state and anything the machine would print.
- **Structure** — a left mono rail carries route metadata; body copy stays under ~68ch.
- **Motion** — one orchestrated hero sequence, one quiet in-view reveal, and interaction
  feedback. Everything else is still.

## Accessibility and behaviour

Semantic landmarks, skip link, visible focus ring, `aria-current` on the active route,
`aria-pressed` on toggles, Escape closes the mobile menu and returns focus to the trigger,
body scroll locked while it is open, reduced motion honoured throughout, canvas marked
`aria-hidden` and `pointer-events-none`.

The contact composer builds a `mailto:` link and opens your mail client. There is no
backend and the page says so — no fake "message sent".

## Deploy

Fully static: `next build` prerenders all seven routes. Any Node or static host works;
Vercel needs no configuration.
