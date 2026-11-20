# NexForge Studio website

Static site, no framework. All content is in `data.mjs`.

- **Add a project:** put a new line at the top of `work` in `data.mjs` (name, category, url, desc, tags). Add `featured: true` to show it large (max 3), and `shots: { mobile: "shot-name-mobile.jpg" }` with a 540x929 phone screenshot in the repo root.
- **Add an Instagram account:** add a line to `social` in `data.mjs` and put its 3-post image (`social-name.jpg`, 1096x480) in the repo root.
- **Edit services, FAQ, process:** same file.
- **Styles / scripts:** `static/styles.css`, `static/site.js`.

`npm run build` renders everything into `dist/` (Vercel does this on every push).
