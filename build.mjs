// Zero-dependency static build: renders pages from data.mjs into dist/.
// Run: npm run build   (Vercel runs this automatically on every push)
import { mkdirSync, rmSync, writeFileSync, cpSync } from "node:fs";
import { site, work, services, reasons, steps, faqs } from "./data.mjs";

const OUT = "dist";
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const domain = (u) => new URL(u).hostname.replace(/^www\./, "");
const wa = (text) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const waIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.83L2 22l5.36-1.41c1.4.76 2.99 1.2 4.68 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2zm5.79 14.09c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.29.29-.12.57.17.28.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.33 1.44.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.54.33.07.12.07.68-.17 1.36z"/></svg>`;
const extIcon = `<svg class="ext" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>`;

function layout({ path, title, description, body, bodyClass = "" }) {
  const url = site.url + (path === "/" ? "/" : path);
  const ld = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    logo: `${site.url}/mark-192.png`,
    image: `${site.url}/og.jpg`,
    email: site.email,
    telephone: "+" + site.whatsapp,
    areaServed: "IN",
    sameAs: [`https://instagram.com/${site.instagram}`],
    description: "Digital studio in India building websites, custom software, social media and brands for growing businesses.",
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#1e2024">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="64x64" href="/mark-64.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script src="/site.js" defer></script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="/" aria-label="NexForge Studio home">
      <img src="/mark-64.png" width="34" height="34" alt="">
      <span>NexForge</span>
    </a>
    <nav class="nav" id="nav" aria-label="Main">
      <a href="/#work">Work</a>
      <a href="/#services">Services</a>
      <a href="/#process">Process</a>
      <a href="/#faq">FAQ</a>
      <a class="btn btn-sm" href="/start-project">Start a project</a>
    </nav>
    <button class="menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu">
      <span></span><span></span>
    </button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="wrap foot-in">
    <div>
      <a class="brand" href="/"><img src="/mark-64.png" width="34" height="34" alt=""><span>NexForge Studio</span></a>
      <p>Websites, software, social media and branding for businesses in India.</p>
    </div>
    <ul class="foot-links">
      <li><a href="${wa()}" rel="noopener" target="_blank">WhatsApp +91 ${site.whatsapp.slice(2, 7)} ${site.whatsapp.slice(7)}</a></li>
      <li><a href="mailto:${site.email}">${site.email}</a></li>
      <li><a href="https://instagram.com/${site.instagram}" rel="noopener" target="_blank">Instagram @${site.instagram}</a></li>
    </ul>
    <p class="copy">© ${new Date().getFullYear()} NexForge Studio</p>
  </div>
</footer>
<a class="wa-float" href="${wa("Hi NexForge, I'd like to talk about a project.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${waIcon}</a>
</body>
</html>
`;
}

function workList(items) {
  return `<ul class="work-list">
${items
  .map(
    (w) => `  <li><a href="${esc(w.url)}" target="_blank" rel="noopener">
    <span class="w-name">${esc(w.name)}</span>
    <span class="w-cat">${esc(w.category)}</span>
    <span class="w-url">${esc(domain(w.url))}${extIcon}</span>
  </a></li>`
  )
  .join("\n")}
</ul>`;
}

function contactForm(selected = "") {
  return `<form class="wa-form" data-wa="${site.whatsapp}" novalidate>
  <label><span>Your name</span>
    <input name="name" autocomplete="name" required placeholder="e.g. Priya Sharma">
  </label>
  <label><span>Business name <span class="opt">(optional)</span></span>
    <input name="business" autocomplete="organization" placeholder="e.g. Sharma Sweets">
  </label>
  <fieldset>
    <legend>What do you need?</legend>
    <div class="chips">
${services
  .map(
    (s) =>
      `      <label class="chip"><input type="checkbox" name="need" value="${esc(s.title)}"${s.slug === selected ? " checked" : ""}><span>${esc(s.short)}</span></label>`
  )
  .join("\n")}
      <label class="chip"><input type="checkbox" name="need" value="Not sure yet"><span>Not sure yet</span></label>
    </div>
  </fieldset>
  <label><span>Tell us a little about it</span>
    <textarea name="message" rows="4" placeholder="What does your business do, and what should the project achieve?"></textarea>
  </label>
  <p class="form-error" role="alert" hidden>Add your name so we know who we're talking to.</p>
  <button class="btn" type="submit">${waIcon} Send on WhatsApp</button>
  <p class="form-note">Opens WhatsApp with your message filled in. Prefer email? <a href="mailto:${site.email}">${site.email}</a></p>
</form>`;
}

// ---------- Home ----------
const home = layout({
  path: "/",
  title: "NexForge Studio | Websites, software and branding in India",
  description:
    "NexForge Studio designs and builds websites, online stores, custom software, social media and brands for growing businesses across India.",
  bodyClass: "is-home",
  body: `
<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <h1>We design and build websites, software and brands for growing businesses.</h1>
      <p class="lead">NexForge is a small digital studio in India. You talk directly to the people building your project, and we stay with you after launch.</p>
      <div class="actions">
        <a class="btn" href="${wa("Hi NexForge, I'd like to talk about a project.")}" target="_blank" rel="noopener">${waIcon} Message us on WhatsApp</a>
        <a class="btn btn-ghost" href="#work">See our work</a>
      </div>
    </div>
    <nav class="board" id="services" aria-label="Services">
      <span class="board-node" aria-hidden="true"><img src="/mark-192.png" width="72" height="72" alt=""></span>
      <ul>
${services
  .map(
    (s) => `        <li><a href="/services/${s.slug}">
          <strong>${esc(s.title)}</strong>
          <span>${esc(s.desc)}</span>
        </a></li>`
  )
  .join("\n")}
      </ul>
    </nav>
  </div>
</section>

<section class="block" id="work" aria-labelledby="work-h">
  <div class="wrap">
    <div class="block-head">
      <h2 id="work-h">Recent work</h2>
      <p>Live projects you can open and try. Newest first.</p>
    </div>
    ${workList(work)}
  </div>
</section>

<section class="block" aria-labelledby="why-h">
  <div class="wrap">
    <div class="block-head">
      <h2 id="why-h">Why businesses work with us</h2>
    </div>
    <div class="reasons">
${reasons.map(([t, d]) => `      <div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("\n")}
    </div>
  </div>
</section>

<section class="block" id="process" aria-labelledby="process-h">
  <div class="wrap">
    <div class="block-head">
      <h2 id="process-h">How a project runs</h2>
      <p>Four steps, from first message to a live project.</p>
    </div>
    <ol class="steps">
${steps.map(([t, d]) => `      <li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("\n")}
    </ol>
  </div>
</section>

<section class="block" id="faq" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <div class="block-head">
      <h2 id="faq-h">Questions people ask</h2>
    </div>
    <div class="faq">
${faqs.map(([q, a]) => `      <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n")}
    </div>
  </div>
</section>

<section class="block contact" id="contact" aria-labelledby="contact-h">
  <div class="wrap contact-in">
    <div class="block-head">
      <h2 id="contact-h">Tell us what you're building</h2>
      <p>Fill this in and it opens WhatsApp with your message ready to send.</p>
    </div>
    ${contactForm()}
  </div>
</section>
`,
});

// ---------- Service pages ----------
function servicePage(s) {
  const rel = work.filter((w) => s.related.includes(w.name));
  return layout({
    path: `/services/${s.slug}`,
    title: `${s.title[0].toUpperCase() + s.title.slice(1)} | NexForge Studio`,
    description: `${s.tagline} ${s.desc}`,
    body: `
<section class="page-hero">
  <div class="wrap">
    <a class="back" href="/#services">All services</a>
    <h1>${esc(s.title[0].toUpperCase() + s.title.slice(1))}</h1>
    <p class="lead">${esc(s.tagline)}</p>
    <div class="actions">
      <a class="btn" href="/start-project?service=${s.slug}">Start a project</a>
    </div>
  </div>
</section>

<section class="block" aria-labelledby="p-h">
  <div class="wrap">
    <div class="block-head"><h2 id="p-h">Sounds familiar?</h2></div>
    <ul class="problems">
${s.problems.map((p) => `      <li>${esc(p)}</li>`).join("\n")}
    </ul>
  </div>
</section>

<section class="block" aria-labelledby="c-h">
  <div class="wrap">
    <div class="block-head"><h2 id="c-h">What we build</h2></div>
    <dl class="caps">
${s.capabilities.map(([t, d]) => `      <div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("\n")}
    </dl>
  </div>
</section>

<section class="block" aria-labelledby="s-h">
  <div class="wrap">
    <div class="block-head"><h2 id="s-h">How we work</h2></div>
    <ol class="steps">
${s.process.map(([t, d]) => `      <li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("\n")}
    </ol>
  </div>
</section>

${
  rel.length
    ? `<section class="block" aria-labelledby="r-h">
  <div class="wrap">
    <div class="block-head"><h2 id="r-h">Related work</h2></div>
    ${workList(rel)}
  </div>
</section>`
    : ""
}

<section class="block" aria-labelledby="y-h">
  <div class="wrap">
    <div class="block-head"><h2 id="y-h">Why NexForge</h2></div>
    <ul class="ticks">
${s.whyUs.map((w) => `      <li>${esc(w)}</li>`).join("\n")}
    </ul>
  </div>
</section>

<section class="block contact" aria-labelledby="contact-h">
  <div class="wrap contact-in">
    <div class="block-head">
      <h2 id="contact-h">Start a project</h2>
      <p>Tell us a little about it. The form opens WhatsApp with your message ready to send.</p>
    </div>
    ${contactForm(s.slug)}
  </div>
</section>
`,
  });
}

// ---------- Start a project ----------
const start = layout({
  path: "/start-project",
  title: "Start a project | NexForge Studio",
  description: "Tell NexForge Studio about your website, software, social media or branding project and get a clear quote on WhatsApp.",
  body: `
<section class="page-hero">
  <div class="wrap contact-in">
    <div class="block-head">
      <h1>Start a project</h1>
      <p class="lead">Tell us what you need. The form opens WhatsApp with your message ready, and we'll reply with next steps and a clear quote.</p>
    </div>
    ${contactForm()}
  </div>
</section>
`,
});

const notFound = layout({
  path: "/404",
  title: "Page not found | NexForge Studio",
  description: "This page doesn't exist.",
  body: `
<section class="page-hero">
  <div class="wrap">
    <h1>This page doesn't exist</h1>
    <p class="lead">The link may be old or mistyped. Head back to the home page, or message us if you were looking for something specific.</p>
    <div class="actions"><a class="btn" href="/">Go to the home page</a></div>
  </div>
</section>
`,
});

// ---------- Write ----------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/services`, { recursive: true });
cpSync("static", OUT, { recursive: true });
writeFileSync(`${OUT}/index.html`, home);
writeFileSync(`${OUT}/start-project.html`, start);
writeFileSync(`${OUT}/404.html`, notFound);
for (const s of services) writeFileSync(`${OUT}/services/${s.slug}.html`, servicePage(s));

const paths = ["/", "/start-project", ...services.map((s) => `/services/${s.slug}`)];
writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((p) => `  <url><loc>${site.url}${p === "/" ? "/" : p}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Built ${paths.length + 1} pages into ${OUT}/`);
