import {
  ArrowUpRight,
  Code2,
  Instagram,
  Mail,
  MessageCircle,
  Palette,
  Rocket,
  Share2,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description:
      "High-performance websites designed to turn attention into action.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Strategic content and social systems built around your brand.",
  },
  {
    icon: Rocket,
    title: "Custom Software",
    description:
      "Purpose-built digital products and software for ambitious businesses.",
  },
  {
    icon: Palette,
    title: "Branding & Creative",
    description:
      "Distinct visual identities that make your brand impossible to ignore.",
  },
];

const projects = [
  {
    number: "01",
    title: "Project Alpha",
    category: "Web Design & Development",
    description:
      "A premium digital experience crafted for a modern growing brand.",
    image: "/images/project-alpha.jpg",
  },
  {
    number: "02",
    title: "Project Nova",
    category: "Branding & Creative",
    description:
      "A bold identity system designed to create a stronger digital presence.",
    image: "/images/project-nova.jpg",
  },
  {
    number: "03",
    title: "Project Flux",
    category: "Custom Software",
    description:
      "A streamlined digital solution designed around a real business workflow.",
    image: "/images/project-flux.jpg",
  },
];

function App() {
  return (
    <main>
      <nav className="navbar">
        <a href="#home" className="logo">
          NEXFORGE<span>®</span>
        </a>

        <a href="#contact" className="nav-cta">
          Start a Project <ArrowUpRight size={16} />
        </a>
      </nav>

      <section id="home" className="hero section">
        <div className="hero-glow" />

        <div className="hero-content">
          <p className="eyebrow">DIGITAL STUDIO · INDIA</p>

          <h1>
            Digital experiences
            <br />
            <span>forged to stand out.</span>
          </h1>

          <p className="hero-description">
            NexForge Studio builds premium websites, software, brands and
            digital experiences for businesses ready to move forward.
          </p>

          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Start a Project
              <ArrowUpRight size={18} />
            </a>

            <a href="#work" className="button button-secondary">
              View Selected Work
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-line" />
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="section-heading">
          <p className="eyebrow">01 · WHAT WE DO</p>
          <h2>
            We build the
            <br />
            <span>digital layer.</span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article className="glass-card service-card" key={service.title}>
                <div className="card-number">0{index + 1}</div>

                <div className="service-icon">
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <ArrowUpRight className="card-arrow" size={20} />
              </article>
            );
          })}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading work-heading">
          <div>
            <p className="eyebrow">02 · SELECTED WORK</p>
            <h2>
              Built with
              <br />
              <span>intention.</span>
            </h2>
          </div>

          <p className="section-intro">
            A selection of digital concepts and projects. More work will be
            added as the NexForge portfolio grows.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-visual">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                ) : (
                  <div className="project-orb" />
                )}
                <span>{project.number}</span>
              </div>

              <div className="project-info">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <a href="#contact" className="project-link">
                  Discuss a similar project
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="why-grid">
          <div className="section-heading">
            <p className="eyebrow">03 · WHY NEXFORGE</p>
            <h2>
              Less noise.
              <br />
              <span>More impact.</span>
            </h2>
          </div>

          <div className="why-content">
            <p className="large-text">
              We don't believe in building digital products just to fill
              screens.
            </p>

            <p>
              Every project starts with understanding the idea, the audience
              and the goal. Then we turn that thinking into a focused digital
              experience that looks sharp and works even harder.
            </p>

            <div className="principles">
              <div>
                <strong>01</strong>
                <span>Strategy first</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Design with purpose</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Built for growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-glow" />

        <div className="contact-content">
          <p className="eyebrow">04 · START SOMETHING</p>

          <h2>
            Have an idea?
            <br />
            <span>Let's build it.</span>
          </h2>

          <p>
            Tell us what you're working on. Let's turn the idea into something
            people remember.
          </p>

          <div className="contact-actions">
            <a href="https://wa.me/919405370657" className="contact-button">
              <MessageCircle size={19} />
              WhatsApp
              <ArrowUpRight size={17} />
            </a>

            <a href="mailto:hello@nexforge.studio" className="contact-button">
              <Mail size={19} />
              Email
              <ArrowUpRight size={17} />
            </a>

            <a
              href="https://instagram.com/nexforge_studio_"
              target="_blank"
              rel="noreferrer"
              className="contact-button"
            >
              <Instagram size={19} />
              Instagram
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a href="#home" className="logo">
            NEXFORGE<span>®</span>
          </a>
          <p>Digital experiences, forged.</p>
        </div>

        <div className="footer-right">
          <span>© 2026 NexForge Studio</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}

export default App;
