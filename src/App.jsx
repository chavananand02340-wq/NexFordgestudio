import {
  ArrowUpRight,
  Instagram,
  Mail,
  MessageCircle,
  Code2,
  Megaphone,
  Cpu,
  PenTool,
  Sparkles,
  Globe2,
  Layers3,
} from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Project One",
    category: "Web Development",
    description:
      "A high-converting digital experience built around clarity, speed and strong visual identity.",
    tags: ["Strategy", "Design", "Development"],
  },
  {
    number: "02",
    title: "Project Two",
    category: "Brand & Creative",
    description:
      "A bold visual system designed to give a growing brand a distinctive digital presence.",
    tags: ["Branding", "Creative", "Social"],
  },
  {
    number: "03",
    title: "Project Three",
    category: "Custom Software",
    description:
      "A tailored digital product designed to simplify workflows and turn complex ideas into usable software.",
    tags: ["Product", "UI/UX", "Software"],
  },
];

const services = [
  {
    icon: Globe2,
    number: "01",
    title: "Websites",
    text: "Premium websites engineered to look sharp, load fast and turn attention into action.",
  },
  {
    icon: Megaphone,
    number: "02",
    title: "Social Media",
    text: "Strategic content and social systems that make brands feel consistent, relevant and memorable.",
  },
  {
    icon: Cpu,
    number: "03",
    title: "Software",
    text: "Custom digital products built around your exact workflow, idea and business requirements.",
  },
  {
    icon: PenTool,
    number: "04",
    title: "Branding & Creative",
    text: "Distinctive identities, visuals and creative direction built to make your brand impossible to ignore.",
  },
];

function App() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav">
        <a href="#top" className="logo">
          <span className="logo-mark">N</span>
          <span>NEXFORGE</span>
        </a>

        <a href="#contact" className="nav-cta">
          Start a Project <ArrowUpRight size={15} />
        </a>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero section">
          <div className="eyebrow">
            <span className="status-dot" />
            DIGITAL STUDIO · INDIA
          </div>

          <h1>
            We forge
            <span> digital experiences.</span>
          </h1>

          <p className="hero-copy">
            NexForge Studio builds premium websites, software, brands and
            digital systems for businesses ready to move forward.
          </p>

          <div className="hero-actions">
            <a href="#work" className="button button-primary">
              Explore Our Work <ArrowUpRight size={18} />
            </a>

            <a href="#contact" className="button button-secondary">
              Start a Project
            </a>
          </div>

          <div className="hero-meta">
            <span>WEBSITE</span>
            <span>SOFTWARE</span>
            <span>BRANDING</span>
            <span>SOCIAL</span>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="section-heading">
            <div>
              <span className="section-label">01 / WHAT WE DO</span>
              <h2>Built for the<br />next move.</h2>
            </div>

            <p>
              From the first idea to the final pixel, we create digital
              experiences that combine strategy, technology and aesthetics.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article className="service-card" key={service.number}>
                  <div className="card-top">
                    <span>{service.number}</span>
                    <Icon size={21} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>

                  <ArrowUpRight className="card-arrow" size={19} />
                </article>
              );
            })}
          </div>
        </section>

        {/* WORK */}
        <section className="section work-section" id="work">
          <div className="section-heading">
            <div>
              <span className="section-label">02 / SELECTED WORK</span>
              <h2>Ideas, forged<br />into reality.</h2>
            </div>

            <p>
              A selection of digital work. Replace these placeholders with
              your real projects as NexForge grows.
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-visual">
                  <div className="project-glow" />
                  <span className="project-number">{project.number}</span>

                  <div className="project-symbol">
                    <Layers3 size={42} strokeWidth={1} />
                  </div>

                  <span className="project-category">
                    {project.category}
                  </span>
                </div>

                <div className="project-info">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <button className="project-link">
                    View Project <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* WHY NEXFORGE */}
        <section className="section philosophy">
          <div className="philosophy-box">
            <Sparkles size={22} strokeWidth={1.4} />

            <span className="section-label">03 / WHY NEXFORGE</span>

            <h2>
              Not just another
              <br />
              <span>digital agency.</span>
            </h2>

            <p>
              We keep things focused: fewer layers, better ideas and work
              that actually moves the needle. Every project gets the same
              attention to detail — from the strategy behind it to the final
              interaction.
            </p>

            <div className="principles">
              <div>
                <strong>01</strong>
                <span>Think different</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Build better</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Stay relentless</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section contact-section" id="contact">
          <div className="contact-content">
            <span className="section-label">04 / LET'S BUILD</span>

            <h2>
              Have an idea?
              <br />
              <span>Let's build it.</span>
            </h2>

            <p>
              Tell us what you're thinking. We'll turn the rough idea into
              something real.
            </p>

            <div className="contact-actions">
              <a
                href="https://wa.me/919999999999"
                className="contact-button"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} />
                WhatsApp
                <ArrowUpRight size={17} />
              </a>

              <a
                href="mailto:hello@nexforge.studio"
                className="contact-button"
              >
                <Mail size={19} />
                Email Us
                <ArrowUpRight size={17} />
              </a>

              <a
                href="https://instagram.com/"
                className="contact-button"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={19} />
                Instagram
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="logo-mark">N</span>
          <div>
            <strong>NEXFORGE STUDIO</strong>
            <span>Digital experiences, forged.</span>
          </div>
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-bottom">
          <span>© 2026 NexForge Studio</span>
          <span>Built with intention.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
