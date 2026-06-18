# Context Notes

- 2026-06-18: `C:\project\smartM2M` was empty and not a Git repository, so this is implemented as a minimal standalone Next.js sample.
- 2026-06-18: Figma node `1441:5486` was too large for full code extraction; `technical_bg` showed a light dotted technical background. The sample mirrors that with a subtle dotted grid over `#F7F7F7`.
- 2026-06-18: Chose CSS Modules and Framer Motion because the request allowed either CSS Modules/Tailwind and Framer Motion/GSAP.
- 2026-06-18: Desktop uses one sticky viewport with crossfading video/text steps. Mobile switches to stacked content cards so the left/right layout does not compress awkwardly.
- 2026-06-18: `npm install` was blocked by PowerShell execution policy through `npm.ps1`, so verification used `npm.cmd install` and `npm.cmd run build`.
- 2026-06-18: Production page rendered, but public video files returned 404 and the target section was behind an extra intro. Removed the intro and added a visible fallback visual for missing videos.
