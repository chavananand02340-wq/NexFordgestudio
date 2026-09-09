import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Rocket,
  Share2,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "919405370657";
const WHATSAPP_DEFAULT_MSG =
  "Hi NexForge Studio! I'd like to know more about your services.";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "High-performance websites designed to turn attention into action.",
    points: [
      "Free initial consultation call",
      "Custom design tailored to your brand",
      "Mobile-first, fast-loading site",
      "Support after launch",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Content systems and posting infrastructure that keep your brand consistent — built to compound, not just fill a calendar.",
    points: [
      "Content calendar & strategy",
      "Consistent, on-brand execution",
      "Growth tracking & analytics",
      "Built to scale with your business",
    ],
  },
  {
    icon: Rocket,
    title: "Custom Software",
    description: "Purpose-built digital products for ambitious businesses.",
    points: [
      "Requirement analysis & planning",
      "Scalable, secure architecture",
      "Regular progress updates",
      "Post-launch maintenance",
    ],
  },
  {
    icon: Palette,
    title: "Branding & Creative",
    description: "Distinct visual identities that make your brand memorable.",
    points: [
      "Logo & visual identity design",
      "Complete brand guidelines",
      "Social & print-ready assets",
      "Revisions until you're happy",
    ],
  },
];

const projects = [
  {
    title: "Beast Algo",
    category: "Automated Trading Platform",
    description: "A fully automated trading system built for consistency and long-term growth.",
    image: "/images/beast-algo.jpg",
    link: "https://beast-algo.vercel.app/",
  },
  {
    title: "Nashik Tours Cloud",
    category: "Travel Booking SaaS",
    description: "Premium travel planning and booking platform for tours and travels businesses.",
    image: "/images/nashik-tours.jpg",
    link: "https://tours-and-travels-clean.vercel.app/",
  },
  {
    title: "SCC Coaching Portal",
    category: "Student Management Software",
    description: "Manage students, fees, attendance and parent communication in one place.",
    image: "/images/scc-portal.jpg",
    link: "https://edusync.me/login",
  },
  {
    title: "Memories Kraft",
    category: "Custom Web Platform",
    description: "A custom digital platform built to bring memories to life online.",
    image: "/images/memories-kraft.jpg",
    link: "https://memories-kraft.vercel.app/",
  },
];

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealed" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (path) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (path.startsWith("/")) {
      navigate(path);
    } else {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <a href="/" className="logo" onClick={go("/")}>
        <img src="/logo.png" alt="NexForge Studio" className="logo-img" />
      </a>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#work" onClick={go("#work")}>Work</a>
        <a href="#services" onClick={go("#services")}>Services</a>
        <a href="#about" onClick={go("#about")}>About</a>
        <a
          href="/start-project"
          className="nav-cta"
          onClick={go("/start-project")}
        >
          Start a project <ArrowUpRight size={14} />
        </a>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
}

function HomePage() {
  return (
    <main>
      <Navbar />

      <section id="home" className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <h1>
            <span className="line">Digital experiences,</span>
            <span className="line accent">forged to stand out.</span>
          </h1>
          <p className="hero-description">
            NexForge Studio builds premium websites, software, brands and
            digital experiences for businesses ready to move forward.
          </p>
          <p className="hero-trustline">
            Websites · Software · Branding · Digital Experiences
          </p>
          <div className="hero-actions">
            <a
              href="/start-project"
              className="button button-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/start-project");
              }}
            >
              Let's build something <ArrowUpRight size={18} />
            </a>
            <a href="#work" className="button button-secondary">
              View our work <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <Reveal>
          <h2>What we do</h2>
        </Reveal>

        <div className="services-scroll">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a
                href="/start-project"
                className="service-card"
                key={service.title}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/start-project");
                }}
              >
                <div className="card-top">
                  <div className="service-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="card-number">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="explore-link">
                  Explore service <ArrowUpRight size={15} />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="section work-section" id="work">
        <Reveal>
          <div className="work-heading">
            <h2>Selected work</h2>
            <p>Swipe through the kind of projects we love building.</p>
          </div>
        </Reveal>

        <div className="projects-scroll">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-thumb"
                  loading="lazy"
                />
              </div>
              <div className="project-info">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View case study <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <Reveal>
          <h2>About NexForge</h2>
          <p className="about-text">
            NexForge Studio is a small, focused digital studio building
            websites, software and brand experiences for founders who want
            to move fast without cutting corners. No bloated teams, no
            generic templates — just thoughtful design and solid engineering,
            built around what your business actually needs.
          </p>
        </Reveal>
      </section>

      <section className="section why-section">
        <div className="why-grid">
          <Reveal>
            <h2>
              Less noise.
              <br />
              <span className="accent">More impact.</span>
            </h2>
          </Reveal>

          <div className="why-content">
            <Reveal delay={80}>
              <p className="large-text">
                We don't believe in building digital products just to fill
                screens.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p>
                Every project starts with understanding the idea, the
                audience and the goal. Then we turn that thinking into a
                focused digital experience that looks sharp and works even
                harder.
              </p>
            </Reveal>

            <ul className="principles">
              {["Strategy first", "Design with purpose", "Built for growth"].map(
                (item, i) => (
                  <Reveal delay={200 + i * 80} key={item}>
                    <li>
                      <span className="principle-number">0{i + 1}</span>
                      {item}
                    </li>
                  </Reveal>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="section teaser-section">
        <Reveal>
          <div className="teaser-box">
            <h2>Have a project in mind?</h2>
            <p>Let's build it.</p>
            <a
              href="/start-project"
              className="button button-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/start-project");
              }}
            >
              Start your project <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="NexForge Studio" className="logo-img" />
          <p>Digital experiences, forged.</p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <a href="#services">Website Development</a>
          <a href="#services">Social Media Management</a>
          <a href="#services">Custom Software</a>
          <a href="#services">Branding & Creative</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              WHATSAPP_DEFAULT_MSG
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a href="mailto:hello@nexforge.studio">Email</a>
          <a
            href="https://instagram.com/nexforge_studio_"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NexForge Studio</span>
      </div>
    </footer>
  );
}

function StartProjectPage() {
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", details: "" });

  const handleSelect = (index) => {
    setSelected(index === selected ? null : index);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const service = services[selected]?.title || "a project";
    const message = `Hi NexForge Studio! I'm interested in *${service}*.%0A%0AName: ${form.name}%0AContact: ${form.contact}%0ADetails: ${form.details}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <main>
      <nav className="navbar">
        <a
          href="/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src="/logo.png" alt="NexForge Studio" className="logo-img" />
        </a>
      </nav>

      <section className="section start-page">
        <a
          href="/"
          className="back-link"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          ← Back home
        </a>

        <h1 className="start-title">Start your project</h1>
        <p className="start-intro">
          Pick what you need — we'll show you exactly how we can help.
        </p>

        <div className="start-options">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = selected === index;
            return (
              <div key={service.title} className="start-option-wrap">
                <button
                  type="button"
                  className={`start-option ${isActive ? "active" : ""}`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="service-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <span>{service.title}</span>
                </button>

                {isActive && (
                  <div className="start-detail">
                    <ul className="start-points">
                      {service.points.map((point) => (
                        <li key={point}>
                          <Check size={16} className="check-icon" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {!showForm && (
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setShowForm(true)}
                      >
                        Continue <ArrowUpRight size={16} />
                      </button>
                    )}

                    {showForm && (
                      <form className="start-form" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Phone or email"
                          required
                          value={form.contact}
                          onChange={(e) =>
                            setForm({ ...form, contact: e.target.value })
                          }
                        />
                        <textarea
                          placeholder="Tell us briefly about your project"
                          rows={3}
                          required
                          value={form.details}
                          onChange={(e) =>
                            setForm({ ...form, details: e.target.value })
                          }
                        />
                        <button type="submit" className="button button-primary">
                          <MessageCircle size={17} /> Send on WhatsApp
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return route === "/start-project" ? <StartProjectPage /> : <HomePage />;
}

export default App;
