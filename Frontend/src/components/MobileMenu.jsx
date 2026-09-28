import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={closeMenu}
        >
          <div
            className="mobile-menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <Link to="/" onClick={closeMenu}>
                <span className="mobile-menu-brand">
                  IP-SAKTI-Sahayak
                </span>
              </Link>

              <button
                type="button"
                className="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <nav className="mobile-menu-links">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/chat"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                AI Assistant
              </NavLink>

              <NavLink
                to="/ip-analyzer"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                IP Analyzer
              </NavLink>

              <NavLink
                to="/regulatory-checklist"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                Regulatory Checklist
              </NavLink>

              <NavLink
                to="/compare-jurisdictions"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                Compare Jurisdictions
              </NavLink>

              <NavLink
                to="/sources"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                Sources
              </NavLink>

              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "mobile-active-link" : ""
                }
              >
                Login
              </NavLink>
            </nav>

            <div className="mobile-menu-theme">
              <span>Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;