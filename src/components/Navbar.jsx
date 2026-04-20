import { useState } from "react";
import { useNavScroll } from "../hooks/useAnimations";

const NAV_ITEMS = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Services", id: "services" },
  { label: "Gallery",  id: "gallery"  },
  { label: "Contact",  id: "contact"  },
];

export default function Navbar({ onGetStarted }) {
  const { scrolled, active } = useNavScroll();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
        {/* Logo */}
        <div
          onClick={() => scrollTo("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "2.5px solid #C0392B",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span className="display-font" style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>MH</span>
          </div>
          <span className="display-font" style={{ fontWeight: 700, fontSize: 23, color: "#fff", letterSpacing: "0.02em" }}>
            360
          </span>
        </div>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{ display: "flex", gap: 34, alignItems: "center" }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              className={`nav-link ${active === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
          <button
            onClick={onGetStarted}
            style={{
              background: "#C0392B", color: "#fff", border: "none",
              padding: "9px 22px", borderRadius: 4, fontSize: 13,
              fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => { e.target.style.background = "#a5301f"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = "#C0392B"; e.target.style.transform = "none"; }}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="nav-hamburger"
          style={{
            background: "none", border: "none", color: "#fff",
            fontSize: 26, cursor: "pointer", lineHeight: 1,
            display: "none",
          }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0,
          background: "rgba(27,43,107,0.98)", backdropFilter: "blur(12px)",
          padding: "1.5rem 2rem", zIndex: 999,
          display: "flex", flexDirection: "column", gap: "1rem",
          animation: "fadeUp 0.28s ease",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none", color: active === id ? "#C0392B" : "#fff",
                fontSize: 16, fontWeight: 500, cursor: "pointer",
                textAlign: "left", fontFamily: "'DM Sans', sans-serif",
                padding: "4px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                paddingBottom: "12px",
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => { onGetStarted(); setMobileOpen(false); }}
            className="btn-primary"
            style={{ marginTop: 8, width: "fit-content" }}
          >
            Get Started →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}