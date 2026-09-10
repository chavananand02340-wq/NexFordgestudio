import { useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import Hero3D from "./Hero3D";

const WHATSAPP = "919405370657";
const EMAIL = "nexforgestudio22@gmail.com";
const INSTAGRAM = "nexforge_studio_";

const services = [
  {
    number: "01",
    title: "Website Development",
    text: "Premium websites built to look sharp, load fast and turn attention into action.",
  },
  {
    number: "02",
    title: "Social Media Management",
    text: "Consistent content, creative direction and strategy that makes your brand easier to notice.",
  },
  {
    number: "03",
    title: "Custom Software",
    text: "Tailored digital tools and systems designed around the way your business actually works.",
  },
  {
    number: "04",
    title: "Branding & Creative",
    text: "Visual identities and creative systems that give your business a stronger presence.",
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
    category: "Travel / Tourism",
    image: "/images/nashik-tours.jpg",
  },
  {
    number: "03",
    title: "SCC Portal",
    category: "Digital Platform",
    image: "/images/scc-portal.jpg",
  },
  {
    number: "04",
    title: "Memories Kraft",
    category: "Creative / E-commerce",
    image: "/images/memories-kraft.jpg",
  },
];

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const goTo = (id) => {
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
    <header className="navbar">
      <button className="brand" onClick={() => goTo("home")}>
        NEXFORGE<span>.</span>
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        <button onClick={() => goTo("services")}>Services</button>
        <button onClick={() => goTo("work")}>Work</button>
        <button onClick={() => goTo("about")}>About</button>
        <button onClick={() => goTo("contact")}>Contact</button>
      </nav>

      <button
        className="nav-cta"
        onClick={() => navigate("/start-project")}
      >
        Start a Project
        <ArrowUpRight size={16} />
      </button>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-glow" />

          <div className="hero-layout">
            <div className="hero-content">
              <Reveal>
                <p className="eyebrow">DIGITAL STUDIO · INDIA</p>
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
                    <ArrowUpRight size={18} />
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => {
                      document
                        .getElementById("work")
                        ?.scrollIntoView({ behavior: "smooth" });
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

        {/* SERVICES */}
        <section id="services" className="section services-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">01 / WHAT WE DO</p>
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
                  <span className="service-number">{service.number}</span>

                  <div className="service-card-bottom">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <span className="service-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="section work-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">02 / SELECTED WORK</p>
                <h2>
                  WORK THAT
                  <br />
                  <span>SPEAKS.</span>
                </h2>
              </div>

              <p className="section-intro">
                A selection of digital work built with strategy, design and
                attention to detail.
              </p>
            </div>
          </Reveal>

          <div className="projects-grid">
            {projects.map((project) => (
              <Reveal key={project.number}>
                <article className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <span>
                        VIEW PROJECT <ArrowUpRight size={18} />
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

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <Reveal>
            <p className="section-label">03 / ABOUT NEXFORGE</p>
          </Reveal>

          <div className="about-grid">
            <Reveal>
              <h2>
                WE DON'T JUST
                <br />
                <span>MAKE WEBSITES.</span>
              </h2>
            </Reveal>

            <Reveal>
              <div className="about-copy">
                <p>
                  NexForge Studio is a digital agency focused on building
                  brands and digital products that feel as good as they
                  perform.
                </p>

                <p>
                  We combine design, development and creative thinking to
                  create digital experiences that are clear, modern and built
                  to grow with your business.
                </p>

                <button
                  className="text-link"
                  onClick={() => navigate("/start-project")}
                >
                  Let's build something
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* WHY NEXFORGE */}
        <section className="section why-section">
          <Reveal>
            <div className="section-heading">
              <div>
                <p className="section-label">04 / WHY NEXFORGE</p>
                <h2>
                  SMALL TEAM.
                  <br />
                  <span>BIG OUTPUT.</span>
                </h2>
              </div>

              <p className="section-intro">
                No unnecessary layers. No cookie-cutter templates. Just
                thoughtful digital work made around your goals.
              </p>
            </div>
          </Reveal>

          <div className="why-grid">
            <Reveal>
              <div className="why-item">
                <span>01</span>
                <h3>STRATEGY FIRST</h3>
                <p>
                  Every project starts with understanding what you need,
                  who you're trying to reach and where you want to go.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="why-item">
                <span>02</span>
                <h3>BUILT WITH INTENT</h3>
                <p>
                  Every section, interaction and visual decision has a
                  purpose — nothing is there just to fill space.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="why-item">
                <span>03</span>
                <h3>MADE TO MOVE</h3>
                <p>
                  We build systems that can evolve with your business instead
                  of becoming outdated after launch.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="teaser-section">
          <Reveal>
            <p className="section-label">READY WHEN YOU ARE</p>

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
              <ArrowUpRight size={18} />
            </button>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <Reveal>
            <div className="contact-heading">
              <p className="section-label">05 / GET IN TOUCH</p>

              <h2>
                LET'S TALK
                <br />
                <span>BUSINESS.</span>
              </h2>

              <p>
                Got a project, idea or business that needs a better digital
                presence? Tell us what you're building.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="contact-actions">
              <a
                className="contact-button whatsapp"
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={20} />
                WhatsApp
                <ArrowUpRight size={18} />
              </a>

              <a
                className="contact-button email"
                href={`mailto:${EMAIL}`}
              >
                <Mail size={20} />
                Email
                <ArrowUpRight size={18} />
              </a>

              <a
                className="contact-button instagram"
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={20} />
                Instagram
                <ArrowUpRight size={18} />
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <button className="footer-brand" onClick={scrollTop}>
          NEXFORGE<span>.</span>
        </button>

        <p>Digital Experiences, Forged.</p>

        <button className="back-top" onClick={scrollTop}>
          BACK TO TOP
          <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NexForge Studio</span>

        <div className="footer-socials">
          <a
            href={`https://instagram.com/${INSTAGRAM}`}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a href={`mailto:${EMAIL}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}

function StartProjectPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="start-project-page">
        <section className="start-project-hero">
          <Reveal>
            <p className="section-label">START A PROJECT</p>

            <h1>
              LET'S BUILD
              <br />
              <span>SOMETHING GREAT.</span>
            </h1>

            <p>
              Tell us a little about what you're working on. We'll take it
              from there.
            </p>
          </Reveal>
        </section>

        <section className="project-form-section">
          <Reveal>
            {submitted ? (
              <div className="form-success">
                <p className="section-label">MESSAGE RECEIVED</p>
                <h2>
                  THANKS FOR
                  <br />
                  <span>REACHING OUT.</span>
                </h2>
                <p>
                  We'll get back to you as soon as possible.
                </p>

                <button
                  className="primary-button"
                  onClick={() => navigate("/")}
                >
                  Back Home
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ) : (
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
                    <span>EMAIL</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>

                <label>
                  <span>COMPANY / BRAND</span>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company or brand"
                  />
                </label>

                <label>
                  <span>WHAT DO YOU NEED?</span>
                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Tell us about your project..."
                    required
                  />
                </label>

                <button className="primary-button" type="submit">
                  Send Enquiry
                  <ArrowUpRight size={18} />
                </button>
              </form>
            )}
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useState(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  });

  return path === "/start-project" ? (
    <StartProjectPage />
  ) : (
    <HomePage />
  );
}

export default App;
