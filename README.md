# Neighbourhood Views (Svelte)

Svelte 5 and Vite version of the React neighbourhood views example. Includes the original organic compound dataset, formula rendering, styling, and four linked panels: successors, immediate predecessors, immediate neighbours, and siblings.

Click a node in any view to centre and select it in the main graph and update the panels. Collapse panels individually or use Show All / Hide All.

## Getting started

Use Node.js 22.12+ (tested with 22.13.1 and npm 10.9.2).

```sh
npm ci
npm run dev
```

Keep `package-lock.json` checked in to preserve the verified dependency versions.

```sh
npm run build
npm run preview
npm test
```

Production output is written to `dist/`. The dataset is in `src/assets/dataset.js`, neighbourhood selection is in `src/neighbourhood.js`, and node components are in `src/components/`.
