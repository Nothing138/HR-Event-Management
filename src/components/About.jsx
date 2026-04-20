import { useScrollAnimation, useCounter } from "../hooks/useAnimations";

const STATS = [
  { id: "s1", count: 200, suffix: "+", label: "Happy Clients",      icon: "👥" },
  { id: "s2", count:  50, suffix: "+", label: "Projects Delivered", icon: "🏆" },
  { id: "s3", count:   7, suffix: "",  label: "Expert Services",    icon: "⚡" },
  { id: "s4", count:  98, suffix: "%", label: "Client Satisfaction",icon: "❤️" },
];

const VALUES = [
  "Integrity in every partnership",
  "Results-driven, data-backed strategies",
  "Tailored solutions — never one-size-fits-all",
];

function StatCard({ stat, triggered }) {
  const count = useCounter(stat.count, triggered);
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "24px 20px",
      boxShadow: "0 4px 22px rgba(27,43,107,.07)",
      border: "1px solid rgba(27,43,107,.06)", textAlign: "center",
    }}>
      <div style={{ fontSize: 27, marginBottom: 9 }}>{stat.icon}</div>
      <div className="display-font" style={{ fontWeight: 700, fontSize: "3rem", color: "#1B2B6B", lineHeight: 1 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ color: "#7b88b8", fontSize: 12.5, marginTop: 6, fontWeight: 500 }}>{stat.label}</div>
    </div>
  );
}

export default function About() {
  const visible = useScrollAnimation();

  return (
    <section id="about" style={{ padding: "90px 6%", background: "#F4F6FB" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div className="about-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 76,
          alignItems: "center",
        }}>

          {/* LEFT */}
          <div>
            <div data-animid="about-head">
              <p className="section-label">Who We Are</p>
              <h2 className={`section-title ${visible.has("about-head") ? "anim-fadeLeft" : "anim-hidden"}`}>
                Your Complete<br />Business Growth Partner
              </h2>
              <div className={`section-divider ${visible.has("about-head") ? "grow" : ""}`} />
            </div>

            <p
              data-animid="about-p1"
              className={visible.has("about-p1") ? "anim-fadeLeft" : "anim-hidden"}
              style={{ animationDelay: "0.1s", color: "#4a5270", lineHeight: 1.85, marginBottom: 18, fontSize: 15 }}
            >
              MH360 — Marketing &amp; Human Resources Solutions — is a Sylhet-based agency
              dedicated to helping businesses grow smarter, faster, and stronger. We offer a rare
              blend of marketing expertise and HR mastery under a single roof.
            </p>
            <p
              data-animid="about-p2"
              className={visible.has("about-p2") ? "anim-fadeLeft" : "anim-hidden"}
              style={{ animationDelay: "0.18s", color: "#4a5270", lineHeight: 1.85, marginBottom: 30, fontSize: 15 }}
            >
              From crafting compelling brand stories to building high-performing teams, we bring a
              360° perspective to every challenge your business faces.
            </p>

            <div
              data-animid="about-vals"
              className={visible.has("about-vals") ? "anim-fadeLeft" : "anim-hidden"}
              style={{ animationDelay: "0.26s", display: "flex", flexDirection: "column", gap: 13 }}
            >
              {VALUES.map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: "#C0392B",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ color: "#3a4265", fontSize: 14.5 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div
              data-animid="about-stats"
              className="about-stats-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.id}
                  className={visible.has("about-stats") ? "anim-scaleIn" : "anim-hidden"}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  <StatCard stat={stat} triggered={visible.has("about-stats")} />
                </div>
              ))}
            </div>

            <div
              data-animid="about-quote"
              className={visible.has("about-quote") ? "anim-fadeRight" : "anim-hidden"}
              style={{
                animationDelay: "0.35s",
                marginTop: 20,
                background: "#1B2B6B",
                borderRadius: 14,
                padding: "22px 26px",
              }}
            >
              <p className="display-font" style={{ fontStyle: "italic", color: "#fff", fontSize: "1.3rem", lineHeight: 1.6, marginBottom: 16 }}>
                "One Agency. 360° Solution. We grow with you."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "#C0392B",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, color: "#fff", fontSize: 14,
                }}>M</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>MH360 Team</div>
                  <div style={{ color: "#7b88b8", fontSize: 12.5 }}>Sylhet, Bangladesh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
          }
          #about { padding: 60px 5% !important; }
        }
      `}</style>
    </section>
  );
}