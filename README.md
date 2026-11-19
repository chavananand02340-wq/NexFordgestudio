# NexForge Studio website

Static site, no framework. All content is in `data.mjs`.

- **Add a project:** put a new line at the top of `work` in `data.mjs` (name, category, url).
- **Add an Instagram account:** add a line to `social` in `data.mjs` and put its 3-post image (`social-name.jpg`, 1096x480) in the repo root.
- **Edit services, FAQ, process:** same file.
- **Styles / scripts:** `static/styles.css`, `static/site.js`.

`npm run build` renders everything into `dist/` (Vercel does this on every push).
