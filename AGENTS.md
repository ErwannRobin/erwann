# Architecture rules

- Home-screen installation uses a static web app manifest and public icons only; do not add app-shell service workers unless offline support is explicitly requested, to keep previews and updates free of stale caches.
- Keep manifest theme and background colors aligned with the global background token so installed launches match the portfolio.
- The 3D hero scene is lazy-loaded behind Suspense and non-interactive (pointer-events none), so the page text and cards render instantly and stay clickable.
- Mobile gallery presentation uses scoped styles on the shared filters and project cards; the shared lazy-loaded hero scene uses its lighter phone graphics budget to retain mobile animation without duplicating project data.
