# Architecture rules

- Home-screen installation uses a static web app manifest and public icons only; do not add app-shell service workers unless offline support is explicitly requested, to keep previews and updates free of stale caches.
- Keep manifest theme and background colors aligned with the global background token so installed launches match the portfolio.
- The 3D hero scene is lazy-loaded behind Suspense and non-interactive (pointer-events none), so the page text and cards render instantly and stay clickable.
- Mobile editorial presentation uses scoped styles on the shared hero, filters, and project cards; do not mount the decorative 3D scene on phones, to prioritize artwork and touch performance without duplicating project data.
