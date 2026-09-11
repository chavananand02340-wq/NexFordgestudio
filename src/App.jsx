import { useState, useEffect } from "react";
import "./index.css";
import HeroBoundary from "./HeroBoundary";
import HeroScene from "./HeroScene";

const WHATSAPP_NUMBER = "919405370657";
const EMAIL = "nexforgestudio22@gmail.com";
const INSTAGRAM = "nexforge_studio_";

const services = [
  {
    num: "01",
    title: "Website Development",
    desc: "Premium websites built to look sharp, load fast and turn attention into action.",
  },
  {
    num: "02",
    title: "Social Media Management",
    desc: "Consistent, on-brand content and growth tracking designed to scale.",
    checklist: [
      "Content calendar & strategy",
      "Consistent, on-brand execution",
      "Growth tracking & analytics",
      "Built to scale with your business",
    ],
  },
  {
    num: "03",
    title: "Custom Software",
    desc: "Tools and platforms built around how your business actually works.",
  },
  {
    num: "04",
    title: "Branding & Creative",
    desc: "Identity, visuals and messaging that make your business memorable.",
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
        <div className="container">
          <div className="section-eyebrow">01 / What We Do</div>
          <h2>
            Built For
            <br />
            <span className="accent">Forward.</span>
          </h2>
          <p className="lead">
            From the first idea to the final pixel, we create digital
            experiences that make businesses look and work better.
          </p>
        </div>
        <div className="scroll-row">
          {services.map((s) => (
            <div className="service-card" key={s.num}>
              <div>
                <div className="num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <div className="section-eyebrow">02 / Selected Work</div>
          <h2>
            Work That
            <br />
            <span className="accent">Moves.</span>
          </h2>
          <p className="lead">
            A selection of digital experiences we've designed and built for
            ambitious ideas and growing businesses.
          </p>
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
              <img src={w.img} alt={w.title} />
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
        <div className="container">
          <div className="section-eyebrow">03 / About NexForge</div>
          <h2>
            Not Just
            <br />
            <span className="accent">A Website.</span>
          </h2>
          <p className="lead">
            NexForge Studio is a digital studio focused on building brands,
            websites and software that feel as good as they perform.
            <br />
            <br />
            We combine strategy, design and technology to turn ideas into
            digital experiences people remember — without unnecessary
            complexity.
          </p>
          <a
            href="/start-project"
            className="pill-btn outline"
            onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
          >
            Start something with us →
          </a>
        </div>
      </section>

      <section className="section" id="why">
        <div className="container">
          <div className="section-eyebrow">04 / Why NexForge</div>
          <h2>
            Why We
            <br />
            <span className="accent">Build.</span>
          </h2>
          <p className="lead">
            Good digital work isn't about adding more. It's about making the
            right things better.
          </p>
          {whyPoints.map((w) => (
            <div className="why-item" key={w.num}>
              <div className="num">{w.num}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="contact-cta">
        <h2>
          Have An Idea?
          <br />
          <span className="accent">Let's Build It.</span>
        </h2>
        <a
          href="/start-project"
          className="pill-btn primary"
          onClick={(e) => { e.preventDefault(); onNavigate("/start-project"); }}
        >
          Start a Project ↗
        </a>
      </div>

      <section className="section" id="contact">
        <div className="container">
          <div className="section-eyebrow">05 / Contact</div>
          <h2>
            Let's Make
            <br />
            <span className="accent">Something Good.</span>
          </h2>
          <p className="lead">
            Have a project, idea or business that needs a stronger digital
            presence? Tell us what you're building.
          </p>
          <div className="contact-links">
            <a
              className="contact-link whatsapp"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              💬 WhatsApp
            </a>
            <a className="contact-link email" href={`mailto:${EMAIL}`}>
              ✉️ Email
            </a>
            <a
              className="contact-link instagram"
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noreferrer"
            >
              📷 Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function StartProject() {
  const [openIndex, setOpenIndex] = useState(1);
  const [form, setForm] = useState({ name: "", contact: "", project: "" });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const sendWhatsApp = (serviceTitle) => {
    const message = `Hi NexForge! I'm interested in ${serviceTitle}.%0A%0AName: ${form.name}%0AContact: ${form.contact}%0AProject: ${form.project}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="start-hero">
      <div className="eyebrow">Start A Project</div>
      <h1>
        Let's Build
        <br />
        <span className="accent">What's Next.</span>
      </h1>
      <p className="lead">
        Pick what you need — we'll show you exactly how we can help.
      </p>

      <div className="option-list">
        {services.map((s, i) => {
          const isOpen = openIndex === i;
          return (
            <div className="option-card" key={s.num}>
              <button
                className="option-header"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
              >
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <span className="chev">{isOpen ? "↓" : "↗"}</span>
              </button>
              {isOpen && (
                <div className="option-body">
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
            </div>
          );
        })}
      </div>
    </section>
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

  return (
    <>
      <Header onNavigate={navigate} />
      {path === "/start-project" ? (
        <StartProject />
      ) : (
        <Home onNavigate={navigate} />
      )}
      <Footer onNavigate={navigate} />
    </>
  );
}
