import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import Hero3D from "./Hero3D";

const WHATSAPP_NUMBER = "919405370657";
const EMAIL = "nexforgestudio22@gmail.com";
const INSTAGRAM = "https://instagram.com/nexforge_studio_";

const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Premium websites built to look sharp, load fast and turn attention into action.",
  },
  {
    number: "02",
    title: "Social Media Management",
    description:
      "Consistent content and social strategy designed to build attention, trust and growth.",
  },
  {
    number: "03",
    title: "Custom Software",
    description:
      "Practical digital tools and custom software built around how your business actually works.",
  },
  {
    number: "04",
    title: "Branding & Creative",
    description:
      "Distinct visual identities, creative systems and brand assets that make businesses memorable.",
  },
];

const projects = [
  {
    number: "01",
    title: "Beast Algo",
    category: "Trading / Technology",
    image: "/images/beast-algo.jpg",
  },
  {
    number: "02",
    title: "Nashik Tours",
    category: "Travel / Hospitality",
    image: "/images/nashik-tours.jpg",
  },
  {
    number: "03",
    title: "SCC Portal",
    category: "Education / Platform",
    image: "/images/scc-portal.jpg",
  },
  {
    number: "04",
    title: "Memories Kraft",
    category: "Brand / E-commerce",
    image: "/images/memories-kraft.jpg",
  },
];

const whyNexForge = [
  {
    number: "01",
    title: "Built around the business",
    description:
      "We don't start with a template. We understand the goal first, then build around it.",
  },
  {
    number: "02",
    title: "Design that means something",
    description:
      "Every visual decision has a purpose — clarity, credibility, attention or conversion.",
  },
  {
    number: "03",
    title: "Made to move forward",
    description:
      "From first idea to launch, we focus on digital work that actually helps the business grow.",
  },
];

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id) => {
    setMenuOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="navbar">
      <button
        className="brand"
        onClick={() => {
          setMenuOpen(false);
          navigate("/");
        }}
        aria-label="NexForge Studio home"
      >
        NEXFORGE<span>.</span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button onClick={() => goToSection("services")}>Services</button>
        <button onClick={() => goToSection("work")}>Work</button>
        <button onClick={() => goToSection("about")}>About</button>
        <button onClick={() => goToSection("contact")}>Contact</button>
      </nav>

      <button className="nav-cta" onClick={() => navigate("/start-project")}>
        Start a Project
        <ArrowUpRight size={15} />
      </button>

      <button
        className="menu-button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <main>
        <section id="home" className="hero">
          <div className="hero-glow" />

          <div className="hero-layout">
            <div className="hero-content">
              <Reveal>
                <p className="eyebrow">Digital Studio · India</p>
              </Reveal>

              <Reveal>
                <h1>
                  DIGITAL
                  <br />
                  EXPERIENCES,
                  <br />
                  <span>FORGED.</span>
                </h1>
              </Reveal>

              <Reveal>
                <p className="hero-description">
                  We build premium websites, custom software, brands and
                  digital experiences for businesses ready to move forward.
                </p>
              </Reveal>

              <Reveal>
                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => navigate("/start-project")}
                  >
                    Start a Project
                    <ArrowUpRight size={17} />
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => {
                      document.getElementById("work")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    Explore Our Work
                  </button>
                </div>
              </Reveal>

              <Reveal>
                <div className="hero-trust">
                  <span>WEBSITE</span>
                  <i />
                  <span>SOFTWARE</span>
                  <i />
                  <span>BRANDING</span>
                  <i />
                  <span>GROWTH</span>
                </div>
              </Reveal>
            </div>

            <Hero3D />
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section id="services" className="section services-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">01 / What We Do</p>
                <h2>
                  BUILT FOR
                  <br />
                  <span>FORWARD.</span>
                </h2>
              </div>

              <p className="section-intro">
                From the first idea to the final pixel, we create digital
                experiences that make businesses look and work better.
              </p>
            </div>
          </Reveal>

          <div className="services-grid">
            {services.map((service) => (
              <Reveal key={service.number}>
                <article className="service-card">
                  <div>
                    <span className="service-number">{service.number}</span>
                  </div>

                  <div className="service-card-bottom">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <span className="service-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= WORK ================= */}
        <section id="work" className="section work-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">02 / Selected Work</p>
                <h2>
                  WORK THAT
                  <br />
                  <span>MOVES.</span>
                </h2>
              </div>

              <p className="section-intro">
                A selection of digital experiences we've designed and built
                for ambitious ideas and growing businesses.
              </p>
            </div>
          </Reveal>

          <div className="projects-grid">
            {projects.map((project) => (
              <Reveal key={project.number}>
                <article className="project-card">
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={`${project.title} project`}
                      loading="lazy"
                    />

                    <div className="project-overlay">
                      <span>
                        View Project
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="project-info">
                    <div>
                      <span className="project-number">
                        {project.number}
                      </span>
                      <h3>{project.title}</h3>
                    </div>

                    <p>{project.category}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="section about-section">
          <Reveal>
            <div className="about-grid">
              <div>
                <p className="section-label">03 / About NexForge</p>

                <h2>
                  NOT JUST
                  <br />
                  <span>A WEBSITE.</span>
                </h2>
              </div>

              <div className="about-copy">
                <p>
                  NexForge Studio is a digital studio focused on building
                  brands, websites and software that feel as good as they
                  perform.
                </p>

                <p>
                  We combine strategy, design and technology to turn ideas
                  into digital experiences people remember — without
                  unnecessary complexity.
                </p>

                <button
                  className="text-link"
                  onClick={() => navigate("/start-project")}
                >
                  Start something with us
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ================= WHY ================= */}
        <section className="section why-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">04 / Why NexForge</p>
                <h2>
                  WHY WE
                  <br />
                  <span>BUILD.</span>
                </h2>
              </div>

              <p className="section-intro">
                Good digital work isn't about adding more. It's about making
                the right things better.
              </p>
            </div>
          </Reveal>

          <div className="why-grid">
            {whyNexForge.map((item) => (
              <Reveal key={item.number}>
                <article className="why-item">
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="teaser-section">
          <Reveal>
            <p className="section-label">Ready when you are</p>

            <h2>
              HAVE AN IDEA?
              <br />
              <span>LET'S BUILD IT.</span>
            </h2>

            <button
              className="primary-button"
              onClick={() => navigate("/start-project")}
            >
              Start a Project
              <ArrowUpRight size={17} />
            </button>
          </Reveal>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="section contact-section">
          <div className="contact-glow" />

          <Reveal>
            <div className="contact-heading">
              <p className="section-label">05 / Contact</p>

              <h2>
                LET'S MAKE
                <br />
                <span>SOMETHING GOOD.</span>
              </h2>

              <p>
                Have a project, idea or business that needs a stronger digital
                presence? Tell us what you're building.
              </p>
            </div>

            <div className="contact-actions">
              <a
                className="contact-button whatsapp"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} />
                WhatsApp
              </a>

              <a
                className="contact-button email"
                href={`mailto:${EMAIL}`}
              >
                <Mail size={19} />
                Email
              </a>

              <a
                className="contact-button instagram"
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={19} />
                Instagram
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <button className="footer-brand" onClick={scrollTop}>
            NEXFORGE<span>.</span>
          </button>

          <p>Digital Experiences, Forged.</p>
        </div>

        <button className="back-top" onClick={scrollTop}>
          BACK TO TOP
          <ArrowUpRight size={13} />
        </button>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NexForge Studio</span>

        <div className="footer-socials">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a href={`mailto:${EMAIL}`}>Email</a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

function StartProjectPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const name = form.get("name") || "";
    const contact = form.get("contact") || "";
    const project = form.get("project") || "";

    const message = `Hi NexForge Studio,

My name is ${name}.
Contact: ${contact}

Project:
${project}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="start-project-page">
        <section className="start-project-hero">
          <div>
            <p className="section-label">Start a Project</p>

            <h1>
              LET'S BUILD
              <br />
              <span>WHAT'S NEXT.</span>
            </h1>

            <p>
              Tell us a little about your idea. We'll take it from there.
            </p>
          </div>
        </section>

        <section className="project-form-section">
          {!submitted ? (
            <form className="project-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  <span>YOUR NAME</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label>
                  <span>PHONE / EMAIL</span>
                  <input
                    type="text"
                    name="contact"
                    placeholder="Phone or email"
                    required
                  />
                </label>
              </div>

              <label>
                <span>YOUR PROJECT</span>
                <textarea
                  name="project"
                  rows="7"
                  placeholder="Tell us briefly about your project"
                  required
                />
              </label>

              <button type="submit" className="primary-button">
                Send on WhatsApp
                <ArrowUpRight size={17} />
              </button>
            </form>
          ) : (
            <div className="form-success">
              <p className="section-label">Message Ready</p>

              <h2>
                LET'S GET
                <br />
                <span>BUILDING.</span>
              </h2>

              <p>
                Your WhatsApp message has been prepared. Send it to start the
                conversation with NexForge Studio.
              </p>

              <a
                className="primary-button"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp
                <ArrowUpRight size={17} />
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
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  if (path === "/start-project") {
    return <StartProjectPage />;
  }

  return <HomePage />;
}

export default App;
