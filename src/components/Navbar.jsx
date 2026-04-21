import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home",     path: "/"         },
  { label: "About",    path: "/about"    },
  { label: "Services", path: "/services" },
  { label: "Gallery",  path: "/gallery"  },
  { label: "Contact",  path: "/contact"  },
];

export default function Navbar({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); window.scrollTo(0,0); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 6%",
        transition: "background 0.38s, box-shadow 0.38s, backdrop-filter 0.38s",
        background: scrolled || !isHome
          ? "rgba(11,20,60,0.96)"
          : "transparent",
        backdropFilter: scrolled || !isHome ? "blur(16px)" : "none",
        boxShadow: scrolled || !isHome ? "0 2px 30px rgba(11,20,60,0.3)" : "none",
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "2.5px solid #C0392B",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(192,57,43,0.1)",
            transition: "transform 0.3s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(10deg) scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 13, color: "#fff" }}>MH</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 24, color: "#fff", letterSpacing: "0.02em" }}>
            360
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-desktop" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: isActive(path) ? "#fff" : "rgba(255,255,255,0.78)",
                fontSize: 13.5, fontWeight: 500, letterSpacing: "0.04em",
                textDecoration: "none", position: "relative", padding: "4px 0",
                transition: "color 0.22s", fontFamily: "'DM Sans',sans-serif",
              }}
            >
              {label}
              <span style={{
                position: "absolute", bottom: 0, left: 0,
                height: 2, width: isActive(path) ? "100%" : "0",
                background: "#C0392B", borderRadius: 2,
                transition: "width 0.3s ease",
              }} />
            </Link>
          ))}
          <button
            onClick={onGetStarted}
            style={{
              background: "linear-gradient(135deg,#C0392B,#e74c3c)",
              color: "#fff", border: "none",
              padding: "10px 24px", borderRadius: 6, fontSize: 13,
              fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.25s",
              fontFamily: "'DM Sans',sans-serif",
              boxShadow: "0 4px 16px rgba(192,57,43,0.35)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(192,57,43,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(192,57,43,0.35)"; }}
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
            cursor: "pointer", lineHeight: 1, padding: 4,
            display: "none",
          }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 24, display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{
              display: "block", height: 2, background: "#fff", borderRadius: 2,
              transition: "all 0.3s",
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}/>
            <span style={{
              display: "block", height: 2, background: "#fff", borderRadius: 2,
              transition: "all 0.3s",
              opacity: mobileOpen ? 0 : 1,
            }}/>
            <span style={{
              display: "block", height: 2, background: "#fff", borderRadius: 2,
              transition: "all 0.3s",
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}/>
          </div>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
        background: "rgba(11,20,60,0.98)", backdropFilter: "blur(20px)",
        padding: mobileOpen ? "1.5rem 2rem 2rem" : "0 2rem",
        maxHeight: mobileOpen ? "400px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.25,0.8,0.25,1), padding 0.3s",
        borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {NAV_ITEMS.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              style={{
                color: isActive(path) ? "#C0392B" : "#fff",
                fontSize: 16, fontWeight: 500, textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif",
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              {label}
              {isActive(path) && <span style={{ color: "#C0392B", fontSize: 18 }}>●</span>}
            </Link>
          ))}
          <button
            onClick={() => { onGetStarted(); setMobileOpen(false); }}
            style={{
              marginTop: 12, background: "linear-gradient(135deg,#C0392B,#e74c3c)",
              color: "#fff", border: "none",
              padding: "13px 28px", borderRadius: 6, fontSize: 13,
              fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.06em", textTransform: "uppercase", alignSelf: "flex-start",
            }}
          >
            Get Started →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}