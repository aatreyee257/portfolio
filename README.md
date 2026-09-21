# Portfolio


Personal engineering site for a software developer working across cloud infrastructure, Terraform and applied AI.

---

## Overview

A multi-page Next.js site built around a single idea: an engineer who works in terminals and infrastructure should have a site that feels like one. The homepage hero is a live ASCII plasma field rendered on a canvas, the layout sits on a monospace metadata rail, and the calls to action behave like shell commands.

All content lives in typed data files, separate from the components that present it.

## Highlights

- **Custom ASCII plasma renderer.** Framework-free canvas engine written from scratch. No effects library, no third-party runtime.
- **Light and dark themes.** Saved per visitor, falls back to the OS setting, applied before first paint so there is no flash.
- **Terminal-style calls to action.** Hover lights the command and shows a blinking caret; clicking plays a short synthesised chirp built with the Web Audio API, with no audio files.
- **Interactive project architecture.** InfraAlign's drift-detection pipeline is drawn as a system diagram with selectable classification states.
- **Evidence-linked skills.** Selecting a technology shows which roles and projects on the site actually used it. Nothing is self-rated.
- **Fully static.** All seven routes are prerendered at build time.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, CSS custom-property design tokens |
| Motion | Framer Motion |
| Icons | Lucide |
| Type | IBM Plex Sans, IBM Plex Mono |
| Hosting | Vercel |

## Pages

| Route | Contents |
| --- | --- |
| `/` | ASCII plasma hero, areas of work, recent experience, selected projects |
| `/about` | Background, career arc, education |
| `/experience` | Full timeline of roles and responsibilities |
| `/projects` | InfraAlign and counterfeit packaging detection, with system diagrams |
| `/skills` | Interactive technology explorer linked to real work |
| `/achievements` | Awards, seminars and technical presentations |
| `/contact` | Email, LinkedIn, and a message composer that opens Gmail pre-filled |

## Getting started

Requires Node.js 18.18 or later.

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check without emitting |

## Project structure

```text
app/
  layout.tsx          Root layout: fonts, theme script, navigation, footer
  template.tsx        Per-route entrance transition
  globals.css         Design tokens for both themes, base styles
  page.tsx            Homepage
  about/ experience/ projects/ skills/ achievements/ contact/
components/
  ascii/plasma.ts     Canvas ASCII plasma engine (framework-free)
  ASCIIBackground.tsx React wrapper: mounting, presets, theme observer
  Hero.tsx            Homepage hero
  CommandLink.tsx     Terminal-style call to action with sound
  Navbar.tsx          Scroll-aware navigation, mobile menu, theme toggle
  ThemeToggle.tsx     Light / dark switch
  DriftArchitecture.tsx, Pipeline.tsx, SkillExplorer.tsx, ...
data/
  site.ts             Name, contact details, navigation
  experience.ts       Roles
  projects.ts         Projects and diagram stages
  skills.ts           Technologies and the work that references them
  achievements.ts     Awards and talks
  education.ts        Degrees
lib/
  sound.ts            Web Audio click synthesis
  config.ts           Runtime flags
```

## How the ASCII hero works

`components/ascii/plasma.ts` exposes one function:

```ts
const instance = mountAsciiPlasma(element, { cell: 14, speed: 0.55 });
instance.update({ speed: 1 });
instance.destroy();
```

Each frame samples four overlapping sine fields across a character grid and maps the result onto a density ramp (` .:-=+*#%@`). The field thins toward the edges so it blends into the page rather than ending at a hard rectangle.

It is built to stay cheap:

- Cells are grouped into three brightness tiers and drawn as **one string per tier per row**, about three `fillText` calls per row instead of one per character.
- Capped at 30 fps and at a device pixel ratio of 2.
- Pauses when scrolled off-screen (`IntersectionObserver`) or when the tab is hidden.
- Uses coarser cells below 640px wide.
- Re-measures once the web font loads, so the grid matches the real glyph width.
- Renders a single static frame under `prefers-reduced-motion`.

Colours are read from CSS custom properties (`--plasma-rgb`, `--plasma-a0` to `--plasma-a2`), so the field follows the active theme without any React re-render.

## Theming

Both themes are defined as CSS custom properties in `app/globals.css`. The `@theme` block holds the dark defaults, and `:root[data-theme="light"]` overrides them. Tailwind utilities reference these variables, so a single attribute change on `<html>` switches the whole site.

A small inline script in `<head>` reads the saved choice, or the OS preference, and sets the attribute before the first paint.

## Accessibility and performance

- Semantic landmarks, a skip link, and a visible focus ring on every interactive element
- `aria-current` on the active route and `aria-pressed` on toggles
- Mobile menu closes on Escape, returns focus to its trigger, and locks background scroll
- Body text contrast of at least 7.9:1 in dark mode and 6.2:1 in light mode
- Reduced-motion preferences respected across transitions, reveals and the canvas
- The decorative canvas is `aria-hidden` and never intercepts pointer events

## Editing content

Every fact on the site comes from `data/`. To add a role, a project or a technology, edit the matching file. No component changes are needed.

Skills are linked to evidence in `data/skills.ts`:

```ts
{
  id: "terraform",
  name: "Terraform",
  evidence: [
    { href: "/experience#ibm", where: "IBM — Software Developer", detail: "..." },
  ],
}
```

## Deployment

Deployed on Vercel with no configuration. Every push to `main` redeploys automatically.

For any other host, run `npm run build` followed by `npm run start` on Node.js 18.18 or later.

## Contact

- Email: [aatreyee257@gmail.com](mailto:aatreyee257@gmail.com)
- LinkedIn: [Aatreyee Mukherjee](https://www.linkedin.com/in/aatreyee-mukherjee-8253ab216/)

---

© Aatreyee Mukherjee. All rights reserved.
