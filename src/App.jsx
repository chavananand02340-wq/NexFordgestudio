import { useState, useEffect } from "react";
import "./index.css";
import HeroBoundary from "./HeroBoundary";
import HeroScene from "./HeroScene";
import AmbientField from "./AmbientField";
import WorkVisual from "./WorkVisual";
import SectionVisual from "./SectionVisual";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "919405370657";
const EMAIL = "nexforgestudio22@gmail.com";
const INSTAGRAM = "nexforge_studio_";

const services = [
  {
    num: "01",
    slug: "website-development",
    visualShape: "cone",
    visualColor: "#101014",
    visualRim: "#3b82f6",
    visualRim2: "#ff6a3d",
    title: "Website Development",
    desc: "Premium websites built to look sharp, load fast and turn attention into action.",
    tagline: "A website that actually earns its place in your business — fast, credible, and built to convert.",
    problems: [
      "Visitors leave before the page even loads",
      "The site looks outdated next to newer competitors",
      "There's no clear next step for someone ready to buy or enquire",
      "Updating content means calling a developer every time",
    ],
    capabilities: [
      { title: "Business & agency websites", desc: "Clean, credible sites that make a strong first impression." },
      { title: "Landing pages", desc: "Focused, conversion-first pages for campaigns and launches." },
      { title: "E-commerce", desc: "Product catalogues, checkout flows and storefronts built to sell." },
      { title: "Web applications", desc: "Custom logged-in tools and dashboards, not just static pages." },
      { title: "Performance & responsive design", desc: "Fast load times and a layout that works on every screen size." },
    ],
    process: [
      { title: "Understand the goal", desc: "We start with what the site needs to achieve, not a template." },
      { title: "Design with intent", desc: "Every layout decision serves clarity, credibility or conversion." },
      { title: "Build & optimize", desc: "Clean code, fast performance, mobile-first from day one." },
      { title: "Launch & support", desc: "We stay involved after launch — updates, fixes, improvements." },
    ],
    whyUs: [
      "Built around your business, not a generic template",
      "Fast, modern tech that stays easy to maintain",
      "Direct communication, no agency bureaucracy",
      "Ongoing support after launch",
    ],
    relatedWork: ["beast-algo", "nashik-tours", "scc-portal", "memories-kraft"],
  },
  {
    num: "02",
    slug: "social-media-management",
    visualShape: "torus",
    visualColor: "#14101a",
    visualRim: "#e1306c",
    visualRim2: "#7c3aed",
    title: "Social Media Management",
    desc: "Consistent, on-brand content and growth tracking designed to scale.",
    tagline: "Consistent, on-brand social presence that actually grows — without you having to think about it daily.",
    checklist: [
      "Content calendar & strategy",
      "Consistent, on-brand execution",
      "Growth tracking & analytics",
      "Built to scale with your business",
    ],
    problems: [
      "Posting is inconsistent or stops for weeks at a time",
      "Content doesn't look cohesive with the brand",
      "No clear sense of what's actually driving growth",
      "No time to plan, shoot, edit and post regularly",
    ],
    capabilities: [
      { title: "Content strategy", desc: "A plan tied to real business goals, not just posting for the sake of it." },
      { title: "Reels & posts", desc: "On-brand content built for how each platform actually performs." },
      { title: "Brand consistency", desc: "A visual language that's recognizable across every post." },
      { title: "Audience growth", desc: "Deliberate tactics to grow reach and engagement over time." },
      { title: "Analytics & reporting", desc: "Clear monthly insight into what's working and what to change." },
    ],
    process: [
      { title: "Audit & strategy", desc: "We study your audience, brand and goals before posting anything." },
      { title: "Content calendar", desc: "A planned pipeline of content, not last-minute scrambling." },
      { title: "Create & publish", desc: "Consistent, on-brand execution across your chosen platforms." },
      { title: "Track & refine", desc: "Monthly analytics reviewed and used to sharpen the strategy." },
    ],
    whyUs: [
      "Strategy first, content second — never random posting",
      "On-brand execution every single time",
      "Transparent growth tracking and reporting",
      "Scales with your business as you grow",
    ],
    relatedWork: ["memories-kraft", "nashik-tours"],
  },
  {
    num: "03",
    slug: "custom-software",
    visualShape: "cylinder",
    visualColor: "#0f1016",
    visualRim: "#3b82f6",
    visualRim2: "#7c3aed",
    title: "Custom Software",
    desc: "Tools and platforms built around how your business actually works.",
    tagline: "Software built around how your business actually operates — not the other way around.",
    problems: [
      "Off-the-shelf tools force you to change how you work",
      "Manual processes eat up hours every week",
      "Data lives in scattered spreadsheets, not one system",
      "Existing tools don't talk to each other",
    ],
    capabilities: [
      { title: "Business-specific systems", desc: "Software modeled around your exact workflow." },
      { title: "Automation", desc: "Removing repetitive manual work from your team's day." },
      { title: "Dashboards", desc: "One clear view of the data that matters to you." },
      { title: "Internal tools", desc: "Purpose-built tools for your team, not generic software." },
      { title: "Custom web applications", desc: "Full applications, logins, and user roles built from scratch." },
    ],
    process: [
      { title: "Map the workflow", desc: "We learn exactly how the business runs before writing a line of code." },
      { title: "Design the system", desc: "Architecture and interface planned around real usage." },
      { title: "Build & test", desc: "Iterative development with regular check-ins, not a black box." },
      { title: "Deploy & train", desc: "We launch it and make sure your team is confident using it." },
    ],
    whyUs: [
      "Built around your actual workflow, not a rigid template",
      "Direct access to the people building your system",
      "Scales as your business and data grow",
      "Ongoing support once it's live",
    ],
    relatedWork: ["scc-portal", "beast-algo"],
  },
  {
    num: "04",
    slug: "branding-creative",
    visualShape: "capsule",
    visualColor: "#150f14",
    visualRim: "#ff6a3d",
    visualRim2: "#e1306c",
    title: "Branding & Creative",
    desc: "Identity, visuals and messaging that make your business memorable.",
    tagline: "A visual identity that makes your business instantly recognizable — and worth remembering.",
    problems: [
      "The brand looks different everywhere it appears",
      "There's no real visual identity, just a logo",
      "Marketing materials feel thrown together",
      "Nothing about the brand feels distinct from competitors",
    ],
    capabilities: [
      { title: "Brand identity", desc: "A complete visual system, not just a logo file." },
      { title: "Visual direction", desc: "Color, typography and imagery that feels intentional." },
      { title: "Social creatives", desc: "Templates and assets built to keep every post on-brand." },
      { title: "Logo & branding systems", desc: "A mark and guidelines that scale across every use case." },
      { title: "Campaign creatives", desc: "Visual assets built for specific launches and promotions." },
    ],
    process: [
      { title: "Discover", desc: "Understanding the business, audience and what should feel different." },
      { title: "Direction", desc: "Exploring visual concepts until one truly fits the brand." },
      { title: "Build the system", desc: "Logo, colors, type and guidelines built to scale." },
      { title: "Roll out", desc: "Applying the identity across the real touchpoints your brand needs." },
    ],
    whyUs: [
      "A real visual system, not just a logo",
      "Identity built to stay consistent everywhere it's used",
      "Designed to differentiate, not follow trends blindly",
      "Guidelines that make future design work easy",
    ],
    relatedWork: ["memories-kraft"],
  },
];

const work = [
  {
    num: "01",
    tag: "TRADING / TECHNOLOGY",
    title: "Beast Algo",
    img: "/images/beast-algo.jpg",
    link: "https://beast-algo.vercel.app/",
  },
  {
    num: "02",
    tag: "TRAVEL / BOOKING",
    title: "Nashik Tours Cloud",
    img: "/images/nashik-tours.jpg",
    link: "https://tours-and-travels-clean.vercel.app/",
  },
  {
    num: "03",
    tag: "EDUCATION / SOFTWARE",
    title: "SCC Portal",
    img: "/images/scc-portal.jpg",
    link: "https://edusync.me/login",
  },
  {
    num: "04",
    tag: "E-COMMERCE / GIFTING",
    title: "Memories Kraft",
    img: "/images/memories-kraft.jpg",
    link: "https://memories-kraft.vercel.app/",
  },
];

const whyPoints = [
  {
    num: "01",
    title: "Built around the business",
    desc: "We don't start with a template. We understand the goal first, then build around it.",
  },
  {
    num: "02",
    title: "Design that means something",
    desc: "Every visual decision has a purpose — clarity, credibility, attention or conversion.",
  },
  {
    num: "03",
    title: "Made to move forward",
    desc: "From first idea to launch, we focus on digital work that actually helps the business grow.",
  },
];

function Header({ onNavigate }) {
  return (
    <header className="site-header">
      <a href="/" className="logo" onClick={(e) => { e.preventDefault(); onNavigate("/"); }}>
        NEXFORGE<span className="accent">.</span>
      </a>
      <a
        href="/start-project"
        className="pill-btn light"
        onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
      >
        Start a Project ↗
      </a>
      <button className="menu-btn" aria-label="Menu">☰</button>
    </header>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <span className="logo">NEXFORGE<span className="accent">.</span></span>
      <p>Digital studio building brands, websites and software · India</p>
      <p style={{ marginTop: 8 }}>
        © {new Date().getFullYear()} NexForge Studio. All rights reserved.
      </p>
    </footer>
  );
}

function Home({ onNavigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-canvas-wrap" aria-hidden="true">
          <HeroBoundary>
            <HeroScene />
          </HeroBoundary>
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow">Digital Studio · India</div>
          <h1>
            Digital Experiences,
            <br />
            <span className="accent">Forged.</span>
          </h1>
          <p className="lead">
            We build premium websites, custom software, brands and digital
            experiences for businesses ready to move forward.
          </p>
          <div className="hero-actions">
            <a
              href="/start-project"
              className="pill-btn primary"
              onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
            >
              Start a Project ↗
            </a>
            <a href="#work" className="pill-btn outline">Explore Our Work</a>
          </div>
          <div className="hero-tags">
            WEBSITE <span className="dot">•</span> SOFTWARE{" "}
            <span className="dot">•</span> BRANDING{" "}
            <span className="dot">•</span> GROWTH
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-visual-wrap">
          <SectionVisual shape="octahedron" color="#12121a" rimColor="#7c3aed" rimColor2="#3b82f6" />
        </div>
        <div className="container">
          <Reveal className="section-eyebrow">01 / What We Do</Reveal>
          <Reveal as="h2" delay={60}>
            Built For
            <br />
            <span className="accent">Forward.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            From the first idea to the final pixel, we create digital
            experiences that make businesses look and work better.
          </Reveal>
        </div>
        <div className="scroll-row">
          {services.map((s, i) => (
            <Reveal
              as="button"
              key={s.num}
              className="service-card"
              delay={i * 80}
              onClick={() => onNavigate(`/services/${s.slug}`)}
            >
              <div>
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="arrow">↗</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <div className="work-visual-wrap">
            <WorkVisual />
          </div>
          <Reveal className="section-eyebrow">02 / Selected Work</Reveal>
          <Reveal as="h2" delay={60}>
            Work That
            <br />
            <span className="accent">Moves.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            A selection of digital experiences we've designed and built for
            ambitious ideas and growing businesses.
          </Reveal>
        </div>
        <div className="scroll-row">
          {work.map((w) => (
            <a
              className="work-card"
              key={w.num}
              href={w.link}
              target="_blank"
              rel="noreferrer"
            >
              <div className="work-card-img">
                <img src={w.img} alt={w.title} />
                <span className="work-card-view">View Project ↗</span>
              </div>
              <div className="work-card-body">
                <span className="num">{w.num}</span>
                <div className="tag">{w.tag}</div>
                <h3>{w.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-visual-wrap">
          <SectionVisual shape="dodecahedron" color="#101014" rimColor="#3b82f6" rimColor2="#7c3aed" />
        </div>
        <div className="container">
          <Reveal className="section-eyebrow">03 / About NexForge</Reveal>
          <Reveal as="h2" delay={60}>
            Not Just
            <br />
            <span className="accent">A Website.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={140}>
            NexForge Studio is a digital studio focused on building brands,
            websites and software that feel as good as they perform.
            <br />
            <br />
            We combine strategy, design and technology to turn ideas into
            digital experiences people remember — without unnecessary
            complexity.
          </Reveal>
          <Reveal delay={220}>
            <a
              href="/start-project"
              className="pill-btn outline"
              onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
            >
              Start something with us →
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section" id="why">
        <div className="section-visual-wrap">
          <SectionVisual shape="tetrahedron" color="#14100d" rimColor="#ff6a3d" rimColor2="#3b82f6" />
        </div>
        <div className="container">
          <Reveal className="section-eyebrow">04 / Why NexForge</Reveal>
          <Reveal as="h2" delay={60}>
            Why We
            <br />
            <span className="accent">Build.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            Good digital work isn't about adding more. It's about making the
            right things better.
          </Reveal>
          {whyPoints.map((w, i) => (
            <Reveal as="div" className="why-item" key={w.num} delay={i * 90}>
              <div className="num">{w.num}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="contact-cta">
        <Reveal as="h2" className="contact-cta-heading">
          Have An Idea?
          <br />
          <span className="accent">Let's Build It.</span>
        </Reveal>
        <Reveal delay={100}>
          <a
            href="/start-project"
            className="pill-btn primary"
            onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
          >
            Start a Project ↗
          </a>
        </Reveal>
      </div>

      <section className="section" id="contact">
        <div className="section-visual-wrap">
          <SectionVisual shape="sphere" color="#7c3aed" rimColor="#ff6a3d" rimColor2="#3b82f6" glow />
        </div>
        <div className="container">
          <Reveal className="section-eyebrow">05 / Contact</Reveal>
          <Reveal as="h2" delay={60}>
            Let's Make
            <br />
            <span className="accent">Something Good.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            Have a project, idea or business that needs a stronger digital
            presence? Tell us what you're building.
          </Reveal>
          <div className="contact-links">
            <Reveal
              as="a"
              className="contact-link whatsapp"
              delay={0}
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </Reveal>
            <Reveal as="a" className="contact-link email" delay={70} href={`mailto:${EMAIL}`}>
              ✉️ Email
            </Reveal>
            <Reveal
              as="a"
              className="contact-link instagram"
              delay={140}
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
            >
              📷 Instagram
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function StartProject() {
  const params = new URLSearchParams(window.location.search);
  const preselectSlug = params.get("service");
  const preselectIndex = services.findIndex((s) => s.slug === preselectSlug);
  const [openIndex, setOpenIndex] = useState(preselectIndex >= 0 ? preselectIndex : 0);
  const [form, setForm] = useState({ name: "", contact: "", project: "" });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const sendWhatsApp = (serviceTitle) => {
    const message = `Hi NexForge! I'm interested in ${serviceTitle}.%0A%0AName: ${form.name}%0AContact: ${form.contact}%0AProject: ${form.project}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="start-hero">
      <div className="section-visual-wrap">
        <SectionVisual shape="box" color="#101014" rimColor="#3b82f6" rimColor2="#ff6a3d" />
      </div>
      <Reveal className="eyebrow">Start A Project</Reveal>
      <Reveal as="h1" delay={60}>
        Let's Build
        <br />
        <span className="accent">What's Next.</span>
      </Reveal>
      <Reveal as="p" className="lead" delay={140}>
        Pick what you need — we'll show you exactly how we can help.
      </Reveal>

      <div className="option-list">
        {services.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal as="div" className="option-card" key={s.num} delay={i * 70}>
              <button
                className="option-header"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <span className={`chev ${isOpen ? "chev-open" : ""}`}>↗</span>
              </button>
              {isOpen && (
                <div className="option-body option-body-anim">
                  {s.checklist && (
                    <div className="check-list">
                      {s.checklist.map((c) => (
                        <div className="check-item" key={c}>
                          ✓ {c}
                        </div>
                      ))}
                    </div>
                  )}
                  {!s.checklist && (
                    <p style={{ color: "var(--text-dim)", marginBottom: 20 }}>
                      {s.desc}
                    </p>
                  )}

                  <label className="field-label">Your Name</label>
                  <input
                    className="field"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange("name")}
                  />

                  <label className="field-label">Phone / Email</label>
                  <input
                    className="field"
                    placeholder="Phone or email"
                    value={form.contact}
                    onChange={handleChange("contact")}
                  />

                  <label className="field-label">Your Project</label>
                  <textarea
                    className="field"
                    placeholder="Tell us briefly about your project"
                    value={form.project}
                    onChange={handleChange("project")}
                  />

                  <button
                    className="submit-btn"
                    onClick={() => sendWhatsApp(s.title)}
                  >
                    Send on WhatsApp ↗
                  </button>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ServiceDetail({ slug, onNavigate }) {
  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <section className="service-hero">
        <button className="back-link" onClick={() => onNavigate("/")}>
          ← Back to NexForge
        </button>
        <h1>Service not found.</h1>
        <p className="lead">That service doesn't exist. Head back to explore what we offer.</p>
      </section>
    );
  }

  const relatedWorkItems = work.filter((w) =>
    service.relatedWork?.includes(w.img.split("/").pop().replace(".jpg", ""))
  );

  return (
    <>
      <section className="service-hero">
        <div className="section-visual-wrap">
          <SectionVisual
            shape={service.visualShape}
            color={service.visualColor}
            rimColor={service.visualRim}
            rimColor2={service.visualRim2}
          />
        </div>
        <button
          className="back-link"
          onClick={() => onNavigate("/")}
        >
          ← Back to What We Do
        </button>
        <Reveal className="eyebrow">Service / {service.num}</Reveal>
        <Reveal as="h1" delay={60}>
          {service.title.split(" ").slice(0, -1).join(" ")}
          <br />
          <span className="accent">{service.title.split(" ").slice(-1)}</span>
        </Reveal>
        <Reveal as="p" className="lead" delay={140}>{service.tagline}</Reveal>
        <Reveal delay={220} className="hero-actions" style={{ justifyContent: "flex-start" }}>
          <a
            href={`/start-project?service=${service.slug}`}
            className="pill-btn primary"
            onClick={(e) => { e.preventDefault(); onNavigate(`/start-project?service=${service.slug}`); }}
          >
            Start a Project ↗
          </a>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-eyebrow">The Problem</Reveal>
          <Reveal as="h2" delay={60}>
            What This
            <br />
            <span className="accent">Solves.</span>
          </Reveal>
          <div className="check-list">
            {service.problems.map((p, i) => (
              <Reveal as="div" className="check-item" key={p} delay={i * 60}>
                ✓ {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-eyebrow">What We Build</Reveal>
          <Reveal as="h2" delay={60}>
            Capabilities
            <br />
            <span className="accent">& Features.</span>
          </Reveal>
          <div className="service-grid">
            {service.capabilities.map((c, i) => (
              <Reveal as="div" className="service-tile" key={c.title} delay={i * 70}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-eyebrow">Our Approach</Reveal>
          <Reveal as="h2" delay={60}>
            How We
            <br />
            <span className="accent">Work.</span>
          </Reveal>
          {service.process.map((step, i) => (
            <Reveal as="div" className="why-item" key={step.title} delay={i * 80}>
              <div className="num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {relatedWorkItems.length > 0 && (
        <section className="section" id="work">
          <div className="container">
            <Reveal className="section-eyebrow">Relevant Work</Reveal>
            <Reveal as="h2" delay={60}>
              See It
              <br />
              <span className="accent">In Action.</span>
            </Reveal>
          </div>
          <div className="scroll-row">
            {relatedWorkItems.map((w) => (
              <a
                className="work-card"
                key={w.num}
                href={w.link}
                target="_blank"
                rel="noreferrer"
              >
                <div className="work-card-img">
                  <img src={w.img} alt={w.title} />
                  <span className="work-card-view">View Project ↗</span>
                </div>
                <div className="work-card-body">
                  <span className="num">{w.num}</span>
                  <div className="tag">{w.tag}</div>
                  <h3>{w.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal className="section-eyebrow">Why NexForge</Reveal>
          <Reveal as="h2" delay={60}>
            Why Choose
            <br />
            <span className="accent">Us.</span>
          </Reveal>
          <div className="check-list">
            {service.whyUs.map((w, i) => (
              <Reveal as="div" className="check-item" key={w} delay={i * 60}>
                ✓ {w}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-cta">
        <Reveal as="h2" className="contact-cta-heading">
          Ready To
          <br />
          <span className="accent">Get Started?</span>
        </Reveal>
        <Reveal delay={100}>
          <a
            href={`/start-project?service=${service.slug}`}
            className="pill-btn primary"
            onClick={(e) => { e.preventDefault(); onNavigate(`/start-project?service=${service.slug}`); }}
          >
            Start a Project ↗
          </a>
        </Reveal>
      </div>
    </>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  const serviceSlugMatch = path.match(/^\/services\/([a-z0-9-]+)/);

  return (
    <>
      <AmbientField />
      <Header onNavigate={navigate} />
      {serviceSlugMatch ? (
        <ServiceDetail key={serviceSlugMatch[1]} slug={serviceSlugMatch[1]} onNavigate={navigate} />
      ) : path.startsWith("/start-project") ? (
        <StartProject />
      ) : (
        <Home onNavigate={navigate} />
      )}
      <Footer onNavigate={navigate} />
    </>
  );
        }
