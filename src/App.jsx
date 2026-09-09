import { useState } from "react";
import {
  ArrowUpRight,
  Check,
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
    description: "Strategic content and social systems built around your brand.",
    points: [
      "Content calendar & strategy",
      "Regular posting & engagement",
      "Growth tracking & analytics",
      "Consistent brand voice",
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
    description:
      "A fully automated trading system built for consistency and long-term growth.",
    image: "/images/beast-algo.jpg",
    link: "https://beast-algo.vercel.app/",
  },
  {
    title: "Nashik Tours Cloud",
    category: "Travel Booking SaaS",
    description:
      "Premium travel planning and booking platform for tours and travels businesses.",
    image: "/images/nashik-tours.jpg",
    link: "https://tours-and-travels-clean.vercel.app/",
  },
  {
    title: "SCC Coaching Portal",
    category: "Student Management Software",
    description:
      "Manage students, fees, attendance and parent communication in one place.",
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

const WHATSAPP_NUMBER = "919405370657";

function App() {
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
        <a href="#home" className="logo">
          <img src="/logo.png" alt="NexForge Studio" className="logo-img" />
        </a>
        <a href="#start" className="nav-cta">
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
            <a href="#start" className="button button-primary">
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

        <div className="services-scroll">
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
          <p>Swipe through the kind of projects we love building.</p>
        </div>

        <div className="projects-scroll">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img
                src={project.image}
                alt={project.title}
                className="project-thumb"
                loading="lazy"
              />
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
                  View live <ArrowUpRight size={15} />
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

      <section className="section start-section" id="start">
        <h2>Start a project</h2>
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
        <img src="/logo.png" alt="NexForge Studio" className="logo-img" />
        <span>© 2026 NexForge Studio</span>
      </footer>
    </main>
  );
}

export default App;
