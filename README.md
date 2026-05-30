# Static Site Boilerplate

Modern, minimal boilerplate for static HTML/JS sites using **Parcel 2**.

## Features

- Parcel dev server + bundling
- Tailwind CSS v4
- Svelte support
- HTML partials (`<include>`)
- ESLint 9 (flat config) with opinionated style

## Getting Started

```bash
npm install
npm run dev
```

### Build & Deploy

```bash
npm run build
# Deploy the `dist/` folder
```

### Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — check code
- `npm run lint:fix` — auto-fix
- `npm run worker:dev` — start cloudflare worker locally
- `npm run worker:deploy` — deploy cloudflare worker

## VS Code Recommended Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "[html]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "[css]":  { "editor.defaultFormatter": "esbenp.prettier-vscode" },
  "eslint.validate": ["javascript", "typescript", "svelte"]
}
```

Recommended extensions:

- ESLint
- Prettier
- Svelte for VS Code
- Tailwind CSS IntelliSense

## Global Tools

- **wrangler** — Cloudflare Workers (`npm install -g wrangler`)
- (ESLint and Parcel are installed **locally** — no need for global install)

## Project Structure

- `src/` → source files
- `dist/` → build output
- `cfw/` → Cloudflare Worker files
