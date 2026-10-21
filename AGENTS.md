# Architecture rules

- Home-screen installation uses a static web app manifest and public icons only; do not add app-shell service workers unless offline support is explicitly requested, to keep previews and updates free of stale caches.
- Keep manifest theme and background colors aligned with the global background token so installed launches match the portfolio.
- The 3D hero scene is lazy-loaded behind Suspense with pointer-events none; only a small DOM grab handle (blobStore shared state, positioned by the scene each frame) is interactive, so cards stay clickable while the blob can be dragged.
- Mobile gallery presentation uses scoped styles on the shared filters and project cards; the shared lazy-loaded hero scene uses its lighter phone graphics budget to retain mobile animation without duplicating project data.
- ProjectSignature supplies stable card anchors; projectIcons maps project titles to locally referenced asset pointers for downloaded app icons, keeping project records shared between views.
- Emoji decorations use system color fonts with a bundled color-emoji fallback so platforms without emoji fonts still render the references.
- Grid opens the shared ProjectCard in an accessible Radix dialog; the timeline opens the same dialog from its inline cards, preventing descriptions from diverging between views.
- Timeline uses a horizontally scrollable alternating axis on desktop and the vertical gallery below desktop; shared frame-batched window/container scroll updates compute artwork emphasis along the active axis without affecting dialog cards or reduced motion.
- TiltLight projects one smoothed screen-space light source onto visible gallery and dialog cards using shared CSS reflection tokens; this keeps highlights aligned with the overhead beam across views.
- Short landscape viewports count as phones through one shared media query (hero behaviour and icon tiles alike), so the pinned title never overlaps the translucent tiles and the icon size stays constant as columns grow.
