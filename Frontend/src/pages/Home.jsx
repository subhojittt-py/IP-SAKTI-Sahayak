import React from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import MobileMenu from "../components/MobileMenu";

function Home() {
  const features = [
    {
      title: "AI Legal Assistant",
      description:
        "Ask questions about intellectual property, patents, trademarks, traditional knowledge, and related regulations.",
      icon: "AI",
      link: "/chat",
    },
    {
      title: "IP Analyzer",
      description:
        "Analyze your intellectual property idea and identify possible protection strategies.",
      icon: "IP",
      link: "/ip-analyzer",
    },
    {
      title: "Regulatory Checklist",
      description:
        "Get a structured checklist of important regulatory and compliance requirements.",
      icon: "RC",
      link: "/regulatory-checklist",
    },
    {
      title: "Compare Jurisdictions",
      description:
        "Compare intellectual property requirements and regulations across different jurisdictions.",
      icon: "CJ",
      link: "/compare-jurisdictions",
    },
  ];

  const quickTopics = [
    "Patents",
    "Trademarks",
    "Copyright",
    "Traditional Knowledge",
    "Ayurveda",
    "Regulatory Compliance",
  ];

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-name">IP-SAKTI-Sahayak</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            AI Assistant
          </NavLink>

          <NavLink
            to="/ip-analyzer"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            IP Analyzer
          </NavLink>

          <NavLink
            to="/document-analyzer"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            Document Analyzer
          </NavLink>

          <NavLink
            to="/regulatory-checklist"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            Regulatory Checklist
          </NavLink>

          <NavLink
            to="/compare-jurisdictions"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            Compare Jurisdictions
          </NavLink>

          <NavLink
            to="/sources"
            className={({ isActive }) =>
              isActive ? "active-nav-link" : ""
            }
          >
            Sources
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "login-nav-button active-nav-link"
                : "login-nav-button"
            }
          >
            Login
          </NavLink>

          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <MobileMenu />
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            AI-Powered Intellectual Property Assistant
          </span>

          <h1>
            Navigate Intellectual Property
            <span> with Confidence.</span>
          </h1>

          <p>
            IP-SAKTI-Sahayak helps you understand intellectual property,
            regulatory requirements, traditional knowledge protection, and
            jurisdiction-specific information through an AI-powered
            knowledge assistant.
          </p>

          <div className="hero-actions">
            <Link to="/chat" className="primary-button">
              Start Conversation
            </Link>

            <Link to="/ip-analyzer" className="secondary-button">
              Analyze IP
            </Link>
          </div>
        </div>

        {/* Hero Information Card */}
        <div className="hero-card">
          <div className="hero-card-header">
            <span className="status-indicator"></span>
            <span>IP-SAKTI-Sahayak AI</span>
          </div>

          <div className="hero-card-body">
            <div className="example-question">
              <span>You</span>
              <p>
                How can I protect an Ayurvedic formulation?
              </p>
            </div>

            <div className="example-answer">
              <span>AI Assistant</span>
              <p>
                I can help you explore possible intellectual property
                protection options, relevant Indian regulations, and
                traditional knowledge considerations.
              </p>
            </div>

            <div className="source-preview">
              <strong>Sources available</strong>
              <span>
                WIPO • Indian IP resources • Regulatory documents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Everything you need in one place</h2>
          <p>
            Use specialized tools to research, analyze, and understand
            intellectual property information.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <Link
              to={feature.link}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

              <span className="feature-link">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section">
        <div className="section-heading">
          <span>KNOWLEDGE AREAS</span>
          <h2>What can you explore?</h2>
        </div>

        <div className="topics-container">
          {quickTopics.map((topic) => (
            <Link
              to="/chat"
              className="topic-pill"
              key={topic}
            >
              {topic}
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From question to informed answer</h2>
        </div>

        <div className="steps-grid">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Ask</h3>
            <p>
              Enter your intellectual property or regulatory question.
            </p>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <h3>Retrieve</h3>
            <p>
              The system searches relevant and trusted knowledge sources.
            </p>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <h3>Analyze</h3>
            <p>
              Relevant information is processed and organized for your
              question.
            </p>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <h3>Understand</h3>
            <p>
              Receive a clear answer with supporting sources and citations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div>
          <span>READY TO EXPLORE?</span>

          <h2>
            Start your IP research with
            <br />
            IP-SAKTI-Sahayak.
          </h2>

          <p>
            Get AI-assisted answers backed by relevant sources.
          </p>

          <Link to="/chat" className="primary-button">
            Start Chatting
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <strong>IP-SAKTI-Sahayak</strong>
          <p>
            AI-powered assistance for intellectual property and
            regulatory research.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/chat">AI Assistant</Link>
          <Link to="/ip-analyzer">IP Analyzer</Link>
          <Link to="/document-analyzer">Document Analyzer</Link>
          <Link to="/regulatory-checklist">
            Regulatory Checklist
          </Link>
          <Link to="/compare-jurisdictions">
            Compare Jurisdictions
          </Link>
          <Link to="/sources">Sources</Link>
        </div>

        <div className="footer-disclaimer">
          <p>
            This platform provides informational assistance and does not
            constitute professional legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;