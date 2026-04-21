import { Link } from "react-router-dom";
import { SERVICES_DATA } from "../data/servicesData";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Footer({ onGetStarted }) {
  return (
    <footer style={{ background: "#060e2a", color: "#a8b4d8", position: "relative", overflow: "hidden" }}>
      {/* Decorative top border */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #C0392B, #1B2B6B, #C0392B)" }} />

      {/* Background pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ padding: "64px 6% 0", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr 1.4fr 1.6fr",
          gap: 48,
          paddingBottom: 52,
          borderBottom: "1px solid rgba(255,255,255,.06)",
        }}>

          {/* Col 1 – Brand */}
          <div>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, textDecoration: "none" }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                border: "2.5px solid #C0392B",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(192,57,43,0.12)",
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 14, color: "#fff" }}>MH</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 24, color: "#fff" }}>360</span>
            </Link>
            <p style={{ fontSize: 13.5, lineHeight: 1.88, maxWidth: 280, marginBottom: 24, color: "#8898c8" }}>
              Marketing &amp; Human Resources Solutions — Sylhet's premier 360° Business Growth Partner helping companies scale smarter.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📍", text: "Sylhet, Bangladesh" },
                { icon: "📞", text: "01711086055" },
                { icon: "✉️", text: "mh360syl@gmail.com" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ color: "#a8b4d8" }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onGetStarted}
              style={{
                marginTop: 24, background: "linear-gradient(135deg,#C0392B,#e74c3c)",
                color: "#fff", border: "none", padding: "11px 26px",
                borderRadius: 6, fontSize: 12.5, fontWeight: 600,
                cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
                letterSpacing: "0.07em", textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(192,57,43,0.3)",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(192,57,43,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,57,43,0.3)"; }}
            >
              Get Started →
            </button>
          </div>

          {/* Col 2 – Navigation */}
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 2, background: "#C0392B", display: "inline-block" }} />
              Navigation
            </div>
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                style={{
                  display: "block", marginBottom: 12, fontSize: 13.5,
                  color: "#8898c8", textDecoration: "none",
                  transition: "color 0.2s, padding-left 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.paddingLeft = "6px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "#8898c8"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                → {label}
              </Link>
            ))}
          </div>

          {/* Col 3 – Services */}
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 2, background: "#C0392B", display: "inline-block" }} />
              Our Services
            </div>
            {SERVICES_DATA.map(s => (
              <div key={s.title} style={{ marginBottom: 11, fontSize: 12.5, lineHeight: 1.5, color: "#8898c8", display: "flex", alignItems: "flex-start", gap: 6 }}>
                <span style={{ fontSize: 12, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
                <span>{s.title}</span>
              </div>
            ))}
          </div>

          {/* Col 4 – Hours + tagline */}
          <div>
            <div style={{ color: "#fff", fontWeight: 600, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 22, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 2, background: "#C0392B", display: "inline-block" }} />
              Business Hours
            </div>
            {[
              ["Sunday – Thursday", "9:00 AM – 6:00 PM"],
              ["Friday",            "10:00 AM – 1:00 PM"],
              ["Saturday",          "10:00 AM – 4:00 PM"],
            ].map(([day, hrs]) => (
              <div key={day} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{day}</div>
                <div style={{ fontSize: 12.5, color: "#556080", marginTop: 3 }}>{hrs}</div>
              </div>
            ))}
            <div style={{
              marginTop: 8, padding: "16px 18px",
              background: "rgba(192,57,43,0.1)", borderRadius: 10,
              borderLeft: "3px solid #C0392B",
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#fff", fontSize: "1rem", lineHeight: 1.6 }}>
                "360° Business Growth Partner"
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "22px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10, fontSize: 13,
        }}>
          <span style={{ color: "#556080" }}>© {new Date().getFullYear()} MH360. All rights reserved.</span>
          <span style={{ color: "#3a4870" }}>
            One Agency &nbsp;·&nbsp; 360° Solution &nbsp;·&nbsp; Designed by{" "}
            <a href="https://smithitbd.com/" style={{ color: "#8898c8", textDecoration: "none" }}>Smith IT</a>
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  );
}