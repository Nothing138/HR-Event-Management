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
        {/* ── Logo ── */}
        <div
          onClick={() => scrollTo("home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            border: "2.5px solid #C0392B",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className="display-font" style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>MH</span>
          </div>
          <span className="display-font" style={{ fontWeight: 700, fontSize: 23, color: "#fff", letterSpacing: "0.02em" }}>
            360
          </span>
        </div>

        {/* ── Desktop Links ── */}
        <div style={{ display: "flex", gap: 34, alignItems: "center" }} className="hidden md:flex">
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

        {/* ── Hamburger ── */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            background: "none", border: "none", color: "#fff",
            fontSize: 26, cursor: "pointer", lineHeight: 1,
          }}
          className="block md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0,
          background: "rgba(27,43,107,0.97)", backdropFilter: "blur(12px)",
          padding: "1.5rem 2rem", zIndex: 999,
          display: "flex", flexDirection: "column", gap: "1rem",
          animation: "fadeUp 0.28s ease",
        }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none", color: "#fff",
                fontSize: 16, fontWeight: 500, cursor: "pointer",
                textAlign: "left", fontFamily: "'DM Sans', sans-serif",
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
            Get Started
          </button>
        </div>
      )}
    </>
  );
}