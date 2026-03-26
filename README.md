# 11ty .ts/.tsx Template 🚜

## To run
1. Clone repository
2. `npm install`
3. Start the development server with `npm start`
4. Build the static site with `npm run build`

## Page-owned authoring
Page content now lives directly in route-local TSX files so layouts can include inline links,
underlined phrases, custom structure, and interactive modules without forcing everything through
a JSON schema.

Shared site values still live in [`src/_data/site.json`](./src/_data/site.json).

## Interactive modules
Client-side widgets can be rendered directly from TSX pages. A reusable example lives in
[`src/components/LambdaContent.tsx`](./src/components/LambdaContent.tsx), and the client fetch
logic lives in [`src/js/main.ts`](./src/js/main.ts).

## Current file structure
```text
src
├── _data
│   └── site.json
├── components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LambdaContent.tsx
│   ├── SiteLayout.tsx
├── index.11ty.tsx
├── js
│   └── main.ts
├── projects
│   └── portfolio-engine
│       └── index.11ty.tsx
├── some-page
│   └── index.11ty.tsx
├── style
│   ├── main.scss
│   └── variables.scss
└── types
    └── site.ts
```
