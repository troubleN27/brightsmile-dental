# BrightSmile Dental — project rules

Landing site for a dental clinic. Requirements: [docs/PRD.md](docs/PRD.md). Technical spec: [docs/SPEC.md](docs/SPEC.md).

@AGENTS.md

## Workflow

- **Work strictly stage by stage, per section 10 of `docs/SPEC.md`.** Plan only the current stage; never start the next stage without the owner's go-ahead.
- After each stage: `npm run lint` + `npm run build` pass, check against "Готово, когда", browser check, git commit (`stage N: ...`), short report, then ask «Этап N завершён. Перейти к Этапу N+1?».
- No features beyond the SPEC, nothing from PRD §7 (out of scope). No new dependencies without approval.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint (`next lint` no longer exists in Next 16)

## Stack (agreed deviations from SPEC §1)

- Next.js 16 App Router, TypeScript, `cacheComponents: true`. Locale proxy lives in `src/proxy.ts` (Next 16 renamed `middleware.ts`).
- Tailwind CSS 4 + **shadcn/ui** (Radix) for UI primitives — chosen by the owner instead of hand-written primitives.
- **GSAP** + ScrollTrigger for animations instead of Framer Motion (owner's decision). Section reveal lives in `src/components/ui/Reveal.tsx`; GSAP is imported dynamically after first paint and skipped for `prefers-reduced-motion: reduce`.
- Performance: heavy below-the-fold client code is lazy-loaded (`LazyBookingForm`, dynamic GSAP). Keep Lighthouse mobile Performance ≥ 90 — check with a production build (`npm run build && npm start`), not `next dev`.
- SEO: `siteUrl()` in `src/config/site.ts`, hreflang helpers in `src/lib/seo.ts`, JSON-LD in `src/components/seo/JsonLd.tsx`.
- Embla Carousel v8 for the reviews carousel. Prices are in Russian rubles: `formatPrice` → "3 500 ₽" / "₽3,500" (Intl, locale rules).
- The clinic is in Moscow, Russia (owner's decision, replaces the original US setup): phone default country RU, Yandex Maps widget, Telegram + VK links, privacy policy written for Federal Law 152-FZ. Legal details live in `site.legal` (empty fields are hidden).
- next-intl 4: locale is read via `next/root-params` in `src/i18n/request.ts`; no `setRequestLocale`. `[locale]/layout.tsx` is the root layout.

## Conventions

- All UI text lives in `messages/ru.json` and `messages/en.json`; English is written for native readers, not translated literally. No "demo/example/test" wording anywhere.
- Clinic contacts and stats: only in `src/config/site.ts`.
- Colors: brand tokens in `src/app/globals.css` — `primary` (teal), `primary-dark`, `navy`, `surface`, `warning`; SPEC "muted" text color = `text-muted-foreground`. Text on `primary` is navy (white fails contrast).
- Radii: `rounded-card` (16px), `rounded-button` (12px). Headings: `text-h1`, `text-h2` utilities.
- Section anchors: `sectionHref(id)` from `src/components/layout/nav-items.ts`.
- Code, comments, commits in English; secrets only in `.env.local`.
