# Architecture rules

- Home-screen installation uses a static web app manifest and public icons only; do not add app-shell service workers unless offline support is explicitly requested, to keep previews and updates free of stale caches.
- Keep manifest theme and background colors aligned with the global background token so installed launches match the portfolio.