# Portfolio Upgrade — Claude Code Implementation Guide

## What Was Built

A complete visual and UX elevation of the existing Lovable/shadcn portfolio.
All components are drop-in replacements. No new dependencies needed.

---

## Files to Replace (copy from this output)

| File | Action |
|------|--------|
| `src/components/Navbar.tsx` | Replace — adds monogram brand, active section indicator, purple CTA |
| `src/components/HeroSection.tsx` | Replace — animated grid canvas, signal pulses, cinematic headline |
| `src/components/ProjectsSection.tsx` | Replace — domain-colored cards, glow hover, filter tabs |
| `src/components/DomainSection.tsx` | Replace — domain color accents, better tab UX |
| `src/components/CapabilitiesSection.tsx` | Replace — terminal-style accordion cards |
| `src/components/AboutSection.tsx` | Replace — two-column with stats + quote |
| `src/components/ContactSection.tsx` | Replace — social icon links, glow CTAs |
| `src/components/StorySection.tsx` | **NEW** — scroll-triggered journey timeline |
| `src/components/StartupsSection.tsx` | **NEW** — premium RacquetHub + AthletIQX section |
| `src/pages/Index.tsx` | Replace — wires all sections in correct order |
| `src/styles/additions.css` | **NEW** — add import to main index.css |

---

## Step-by-Step in Claude Code

### 1. Add CSS additions
In `src/index.css`, add at the bottom:
```css
@import './styles/additions.css';
```
Or paste the contents of `additions.css` directly into `index.css`.

### 2. Update `src/pages/Index.tsx`
Replace the existing page with the new one that wires all sections.

### 3. Replace all component files
Drop each component file into place. All imports are self-contained.

### 4. Update project data (optional but recommended)
In `src/config/projects.ts`, ensure the `domains` export exists:
```ts
export const domains = [
  "Sports Analytics",
  "Biological AI Innovation",
  "Business Solutions",
  "Startups",
];
```

### 5. Personalize
- In `Navbar.tsx`: update `"Akhi"` monogram and name if needed
- In `ContactSection.tsx`: update email href and GitHub link
- In `AboutSection.tsx`: update the about text to your voice
- In `StartupsSection.tsx`: update RacquetHub/AthletIQX links when live

---

## Design System Used

| Token | Value |
|-------|-------|
| Primary accent | `#7c3aed` → `#6366f1` (violet-indigo gradient) |
| Sports domain | `#10b981` emerald |
| Biological AI Innovation domain | `#06b6d4` cyan |
| Business domain | `#f59e0b` amber |
| Startups domain | `#a78bfa` violet |
| Font | System default (Inter via shadcn) |
| Base bg | Dark (shadcn default) |

---

## What Makes This Different from the Original

| Before | After |
|--------|-------|
| Flat cards, no hover glow | Domain-colored glow on hover |
| Generic "Portfolio" brand | AK monogram with gradient |
| No animated hero bg | Canvas grid + signal pulses |
| No story section | Scroll-triggered journey timeline |
| No startups section | Premium RacquetHub + AthletIQX |
| Static stack badges | Terminal-style expandable cards |
| Single gray tone throughout | 4-domain color system |
| Basic scroll indicator | Subtle ping dot + animated scroll |

---

## Next Steps (Phase 2)

- [ ] Wire GitHub links in project data (`src/config/projects.ts`)
- [ ] Add real project preview images
- [ ] Implement case study pages with `react-router` routes
- [ ] Add `ProjectModal` improvements (architecture diagrams, screenshots)
- [ ] Add OG meta tags and SEO
- [ ] Deploy to Vercel
