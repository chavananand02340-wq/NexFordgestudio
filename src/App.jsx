import { useEffect, useState } from "react";
import { Instagram, Mail, MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import HeroVisual from "./HeroVisual";

const WHATSAPP_NUMBER = "919405370657";
const EMAIL = "nexforgestudio22@gmail.com";
const INSTAGRAM = "https://instagram.com/nexforge_studio_";

const services = [
  {
    number: "01",
    title: "Websites",
    description:
      "Premium, high-performance websites engineered to load fast and convert.",
    points: [
      "Free initial consultation",
      "Custom design, no templates",
      "Mobile-first build",
      "Support after launch",
    ],
  },
  {
    number: "02",
    title: "Social Media",
    description:
      "Consistent content systems and strategy that build trust over time.",
    points: [
      "Content calendar & strategy",
      "Consistent, on-brand execution",
      "Growth tracking",
      "Built to scale",
    ],
  },
  {
    number: "03",
    title: "Software",
    description:
      "Custom digital tools built around how your business actually works.",
    points: [
      "Requirement analysis",
      "Scalable architecture",
      "Regular progress updates",
      "Post-launch maintenance",
    ],
  },
  {
    number: "04",
    title: "Branding & Creative",
    description:
      "Distinct visual identities that make businesses memorable.",
    points: [
      "Logo & identity design",
      "Complete brand guidelines",
      "Print & social assets",
      "Revisions included",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Beast Algo",
    category: "Trading / Technology",
    image: "/images/beast-algo.jpg",
    link: "https://beast-algo.vercel.app/",
  },
  {
    number: "02",
    title: "Nashik Tours",
    category: "Travel / Hospitality",
    image: "/images/nashik-tours.jpg",
    link: "https://tours-and-travels-clean.vercel.app/",
  },
  {
    number: "03",
    title: "SCC Portal",
    category: "Education / Platform",
    image: "/images/scc-portal.jpg",
    link: "https://edusync.me/login",
  },
  {
    number: "04",
    title: "Memories Kraft",
    category: "Brand / E-commerce",
    image: "/images/memories-kraft.jpg",
    link: "https://memories-kraft.vercel.app/",
  },
];

const whyPoints = [
  { number: "01", title: "Custom work", description: "No templates, no shortcuts — every project is built from the ground up." },
  { number: "02", title: "Strategy + design + development", description: "One team handling the full picture, not fragments handed off in pieces." },
  { number: "03", title: "Modern technology", description: "Built on current, well-supported tools — fast, secure, maintainable." },
  { number: "04", title: "Brand-focused", description: "Every decision serves the brand first, not just the pixel." },
  { number: "05", title: "Attention to detail", description: "The small things — spacing, timing, wording — are never an afterthought." },
];

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function BrandMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="#ffffff" strokeWidth="1" />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="nav">
        <button className="brand-lockup" onClick={() => { setOpen(false); navigate("/"); }}>
          <BrandMark />
          <span>NexForge Studio</span>
        </button>

        <button className="menu-trigger" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div className="nav-overlay">
          <button className="menu-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={24} />
          </button>

          <nav className="overlay-links">
            <button onClick={() => go("services")}>Services</button>
            <button onClick={() => go("work")}>Work</button>
            <button onClick={() => go("why")}>Why</button>
            <button onClick={() => go("contact")}>Contact</button>
          </nav>

          <button
            className="btn-ghost"
            onClick={() => { setOpen(false); navigate("/start-project"); }}
          >
            Start a Project
          </button>
        </div>
      )}
    </>
  );
}

function HomePage() {
  return (
    <>
      <Nav />

      <main>
        <section id="home" className="hero">
          <div className="hero-3d-wrap">
            <HeroVisual />
          </div>

          <div className="hero-content">
            <h1>Nexforge Studio</h1>
            <p className="hero-subtext">
              Premium digital experiences, engineered with intent.
            </p>
            <div className="hero-actions">
              <button className="btn-ghost" onClick={() => navigate("/start-project")}>
                Start a Project
              </button>
              <button
                className="btn-ghost"
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Work
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <p className="caption">What We Do</p>
          <div className="services-grid">
            {services.map((s) => (
              <article className="ghost-card" key={s.number}>
                <span className="caption">{s.number}</span>
                <h3>{s.title}</h3>
                <p className="body-sm">{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section work-section">
          <p className="caption">Selected Work</p>
          <div className="work-list">
            {projects.map((p) => (
              <article className="work-item" key={p.number}>
                <div className="work-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="work-meta">
                  <span className="caption">{p.number} / {p.category}</span>
                  <h3>{p.title}</h3>
                  <a
                    className="btn-ghost btn-ghost-sm"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Project <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="section">
          <p className="caption">Why NexForge</p>
          <div className="why-list">
            {whyPoints.map((w) => (
              <div className="why-row" key={w.number}>
                <span className="caption">{w.number}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p className="body-sm">{w.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section cta-section">
          <h2>Have an idea? Let's build it.</h2>
          <div className="contact-actions">
            <a
              className="btn-ghost"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} /> WhatsApp
            </a>
            <a className="btn-ghost" href={`mailto:${EMAIL}`}>
              <Mail size={17} /> Email
            </a>
            <a
              className="btn-ghost"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} /> Instagram
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="caption">NexForge Studio</span>
      <div className="footer-links">
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
        <a href={`mailto:${EMAIL}`}>Email</a>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}

function StartProjectPage() {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (index) => {
    setSelected(index === selected ? null : index);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name") || "";
    const contact = form.get("contact") || "";
    const project = form.get("project") || "";
    const serviceTitle = services[selected]?.title || "a project";

    const message = `Hi NexForge Studio,\n\nMy name is ${name}.\nContact: ${contact}\nInterested in: ${serviceTitle}\n\nProject:\n${project}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main className="start-page">
        <section className="section">
          <p className="caption">Start a Project</p>
          <h1>Let's build what's next.</h1>
          <p className="body-sm start-intro">Pick what you need — we'll show you how we can help.</p>

          {!submitted ? (
            <div className="start-options">
              {services.map((service, index) => {
                const isActive = selected === index;
                return (
                  <div key={service.number} className="start-option-wrap">
                    <button
                      type="button"
                      className={`start-option ${isActive ? "active" : ""}`}
                      onClick={() => handleSelect(index)}
                    >
                      <span className="caption">{service.number}</span>
                      <span>{service.title}</span>
                      <ArrowUpRight size={16} className={isActive ? "rotated" : ""} />
                    </button>

                    {isActive && (
                      <div className="start-detail">
                        <ul className="start-points">
                          {service.points.map((point) => (
                            <li key={point}>— {point}</li>
                          ))}
                        </ul>

                        {!showForm && (
                          <button type="button" className="btn-ghost" onClick={() => setShowForm(true)}>
                            Continue
                          </button>
                        )}

                        {showForm && (
                          <form className="project-form" onSubmit={handleSubmit}>
                            <label>
                              <span className="caption">Your Name</span>
                              <input type="text" name="name" required />
                            </label>
                            <label>
                              <span className="caption">Phone / Email</span>
                              <input type="text" name="contact" required />
                            </label>
                            <label>
                              <span className="caption">Your Project</span>
                              <textarea name="project" rows="4" required />
                            </label>
                            <button type="submit" className="btn-ghost">
                              Send on WhatsApp
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="form-success">
              <h2>Message ready.</h2>
              <p className="body-sm">
                Your WhatsApp message has been prepared. Send it to start the conversation.
              </p>
              <a className="btn-ghost" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                Open WhatsApp
              </a>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [path]);

  return path === "/start-project" ? <StartProjectPage /> : <HomePage />;
}

export default App;
