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
    featured: true,
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic content and social systems built around your brand.",
  },
  {
    icon: Rocket,
    title: "Custom Software",
    description: "Purpose-built digital products for ambitious businesses.",
  },
  {
    icon: Palette,
    title: "Branding & Creative",
    description: "Distinct visual identities that make your brand memorable.",
  },
];

const projects = [
  {
    title: "Beast Algo",
    category: "Automated Trading Platform",
    description:
      "A fully automated trading system built for consistency, risk control, and long-term growth.",
    image: "/images/project-alpha.jpg",
    link: "https://beast-algo.vercel.app/",
  },
  {
    title: "Nashik Tours Cloud",
    category: "Travel Booking SaaS",
    description:
      "Premium travel planning and booking platform for Nashik-based tours and travels businesses.",
    image: "/images/project-flux.jpg",
    link: "https://tours-and-travels-clean.vercel.app/",
  },
  {
    title: "SCC Coaching Portal",
    category: "Student Management Software",
    description:
      "Manage students, fees, attendance, results and parent communication from one platform.",
    image: "/images/project-nova.jpg",
    link: "https://edusync.me/login",
  },
  {
    title: "Memories Kraft",
    category: "Custom Web Platform",
    description:
      "A custom digital platform built to bring memories and moments to life online.",
    image: "/images/project-alpha.jpg",
    link: "https://memories-kraft.vercel.app/",
  },
];

function App() {
  return (
    <main>
      <nav className="navbar">
        <a href="#home" className="logo">
          NexForge
        </a>
        <a href="#contact" className="nav-cta">
          Start a project
        </a>
      </nav>

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
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">
              Start a project <ArrowUpRight size={18} />
            </a>
            <a href="#work" className="button button-secondary">
              See our work
            </a>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <h2>What we do</h2>

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                className={`service-card ${service.featured ? "featured" : ""}`}
                key={service.title}
              >
                <div className="service-icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="work-heading">
          <h2>Selected work</h2>
          <p>
            A look at the kind of projects we love building. More case
            studies coming soon.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
              <div className="project-overlay">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  View live project <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="why-grid">
          <h2>
            Less noise.
            <br />
            <span className="accent">More impact.</span>
          </h2>

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

            <ul className="principles">
              <li>Strategy first</li>
              <li>Design with purpose</li>
              <li>Built for growth</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-content">
          <h2>
            Have an idea?
            <br />
            <span className="accent">Let's build it.</span>
          </h2>
          <p>
            Tell us what you're working on. Let's turn the idea into
            something people remember.
          </p>

          <div className="contact-actions">
            <a href="https://wa.me/919405370657" className="contact-button">
              <MessageCircle size={19} /> WhatsApp
            </a>
            <a href="mailto:hello@nexforge.studio" className="contact-button">
              <Mail size={19} /> Email
            </a>
            <a
              href="https://instagram.com/nexforge_studio_"
              target="_blank"
              rel="noreferrer"
              className="contact-button"
            >
              <Instagram size={19} /> Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="logo">NexForge</span>
        <span>© 2026 NexForge Studio</span>
      </footer>
    </main>
  );
}

export default App;
