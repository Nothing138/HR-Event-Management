import { SERVICES_DATA } from "./Services";

const NAV_LINKS = ["Home", "About", "Services", "Gallery", "Contact"];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Footer({ onGetStarted }) {
  return (
    <footer style={{ background: "#0d1535", color: "#a8b4d8" }}>
      {/* ── Main footer grid ── */}
      <div style={{ padding: "60px 6% 0", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1.3fr 1.6fr",
          gap: 44,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(255,255,255,.07)",
        }}>

          {/* Col 1 – Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%",
                border: "2.5px solid #C0392B",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span className="display-font" style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>MH</span>
              </div>
              <span className="display-font" style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>360</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.82, maxWidth: 270, marginBottom: 22 }}>
              Marketing &amp; Human Resources Solutions — Sylhet's premier 360° Business Growth Partner.
            </p>
            <div style={{ fontSize: 13.5, marginBottom: 8 }}>📍 Sylhet, Bangladesh</div>
            <div style={{ fontSize: 13.5, marginBottom: 8 }}>📞 01711086055</div>
            <div style={{ fontSize: 13.5, wordBreak: "break-all" }}>✉️ mh360syl@gmail.com</div>

            {/* Get Started CTA */}
            <button
              onClick={onGetStarted}
              className="btn-primary"
              style={{ marginTop: 22, fontSize: 12.5, padding: "10px 24px" }}
            >
              Get Started →
            </button>
          </div>

          {/* Col 2 – Navigation */}
          <div>
            <div style={{
              color: "#fff", fontWeight: 600, fontSize: 13,
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: 20,
            }}>
              Navigation
            </div>
            {NAV_LINKS.map(n => (
              <div
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                style={{
                  marginBottom: 11, fontSize: 13.5, cursor: "pointer",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "#a8b4d8"}
              >
                {n}
              </div>
            ))}
          </div>

          {/* Col 3 – Services */}
          <div>
            <div style={{
              color: "#fff", fontWeight: 600, fontSize: 13,
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: 20,
            }}>
              Our Services
            </div>
            {SERVICES_DATA.map(s => (
              <div
                key={s.title}
                style={{ marginBottom: 10, fontSize: 13, lineHeight: 1.5, color: "#a8b4d8" }}
              >
                {s.title}
              </div>
            ))}
          </div>

          {/* Col 4 – Office hours + Social placeholder */}
          <div>
            <div style={{
              color: "#fff", fontWeight: 600, fontSize: 13,
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: 20,
            }}>
              Business Hours
            </div>
            {[
              ["Sunday – Thursday", "9:00 AM – 6:00 PM"],
              ["Friday",            "10:00 AM – 1:00 PM"],
              ["Saturday",          "10:00 AM – 4:00 PM"],
            ].map(([day, hrs]) => (
              <div key={day} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{day}</div>
                <div style={{ fontSize: 12.5, color: "#7b88b8" }}>{hrs}</div>
              </div>
            ))}

            {/* Tagline */}
            <div style={{
              marginTop: 22, padding: "14px 16px",
              background: "rgba(192,57,43,0.12)", borderRadius: 8,
              borderLeft: "3px solid #C0392B",
            }}>
              <p className="display-font" style={{ fontStyle: "italic", color: "#fff", fontSize: "0.95rem", lineHeight: 1.5 }}>
                "360° Business Growth Partner"
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer bottom bar ── */}
        <div style={{
          padding: "20px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10, fontSize: 13,
        }}>
          <span>© {new Date().getFullYear()} MH360. All rights reserved.</span>
          <span style={{ color: "#556080" }}>
            One Agency &nbsp;·&nbsp; 360° Solution &nbsp;·&nbsp; Designed in Sylhet ❤️
          </span>
        </div>
      </div>
    </footer>
  );
}
