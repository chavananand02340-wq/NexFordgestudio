# NexForge Studio website

Static site, no framework. All content is in `data.mjs`.

- **Add a project:** put a new line at the top of `work` in `data.mjs` (name, category, url).
- **Edit services, FAQ, process:** same file.
- **Styles / scripts:** `static/styles.css`, `static/site.js`.

`npm run build` renders everything into `dist/` (Vercel does this on every push).
