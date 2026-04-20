export default function Home({ onGetStarted }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1B2B6B 0%, #0f1a45 58%, #1a0838 100%)",
        display: "flex",
        alignItems: "center",
        padding: "0 6%",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
      <div className="hero-bg-blob" style={{ width: 480, height: 480, top: -90, right: -90, animationDelay: "0s" }} />
      <div className="hero-bg-blob" style={{ width: 300, height: 300, bottom: "8%", left: "3%", animationDelay: "1.6s" }} />
      <div className="hero-orbit" style={{ width: 400, height: 400, top: "7%", right: "5%", animationDuration: "26s" }} />
      <div className="hero-orbit" style={{ width: 250, height: 250, top: "17%", right: "13%", animationDuration: "18s", animationDirection: "reverse" }} />

      {/* Content */}
      <div style={{ maxWidth: 1140, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div className="home-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr",
          gap: 56,
          alignItems: "center",
          paddingTop: 68,
        }}>

          {/* LEFT */}
          <div>
            <div
              className="anim-fadeLeft"
              style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                background: "rgba(192,57,43,.16)", border: "1px solid rgba(192,57,43,.45)",
                borderRadius: 30, padding: "7px 18px", marginBottom: 26,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
              <span style={{ color: "#dde2f5", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.1em" }}>
                360° BUSINESS GROWTH PARTNER
              </span>
            </div>

            <h1
              className="display-font anim-fadeLeft"
              style={{
                animationDelay: "0.13s",
                fontSize: "clamp(2.2rem, 5.2vw, 3.9rem)",
                fontWeight: 700, color: "#fff",
                lineHeight: 1.11, marginBottom: 22,
              }}
            >
              Marketing &amp;<br />
              <span style={{ color: "#C0392B" }}>Human Resources</span><br />
              Solutions
            </h1>

            <p
              className="anim-fadeLeft"
              style={{
                animationDelay: "0.26s",
                color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.8,
                maxWidth: 430, marginBottom: 36,
              }}
            >
              MH360 is Sylhet's premier partner for digital growth and people management —
              combining bold marketing with expert HR to scale your business from every angle.
            </p>

            <div className="anim-fadeLeft home-cta-row" style={{ animationDelay: "0.38s", display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("services")}>Explore Services</button>
              <button className="btn-outline" onClick={onGetStarted}>Get Started</button>
            </div>

            <div
              className="anim-fadeLeft home-stats-row"
              style={{
                animationDelay: "0.5s",
                display: "flex", gap: 38, marginTop: 48, flexWrap: "wrap",
              }}
            >
              {[["200+", "Happy Clients"], ["7", "Core Services"], ["5+", "Years Active"]].map(([n, l]) => (
                <div key={l}>
                  <div className="display-font" style={{ fontWeight: 700, fontSize: "2.1rem", color: "#fff", lineHeight: 1 }}>{n}</div>
                  <div style={{ color: "#7b88b8", fontSize: 12.5, marginTop: 4, letterSpacing: "0.06em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – orb (hidden on mobile via CSS) */}
          <div
            className="anim-scaleIn home-orb-wrap"
            style={{ animationDelay: "0.2s", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
          >
            <div style={{
              width: 310, height: 310, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(192,57,43,.28) 0%, rgba(27,43,107,.5) 100%)",
              border: "1.5px solid rgba(255,255,255,.1)",
              display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
            }}>
              <div>
                <div className="display-font" style={{ fontWeight: 700, fontSize: "4.5rem", color: "#fff", lineHeight: 1 }}>MH</div>
                <div className="display-font" style={{ fontWeight: 700, fontSize: "4.5rem", color: "#C0392B", lineHeight: 1 }}>360</div>
                <div style={{ color: "#a8b4d8", fontSize: 10.5, letterSpacing: "0.12em", marginTop: 7 }}>ONE AGENCY · ONE SOLUTION</div>
              </div>
            </div>

            <div className="float-card" style={{
              top: 14, right: -6, background: "#fff",
              boxShadow: "0 12px 28px rgba(0,0,0,.22)",
              animationDuration: "3.5s", animationDelay: "0s",
            }}>
              <div style={{ fontSize: 10, color: "#7b88b8", letterSpacing: "0.08em" }}>DIGITAL MARKETING</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1B2B6B", marginTop: 2 }}>Strategy & Growth</div>
            </div>

            <div className="float-card" style={{
              bottom: 26, left: -6, background: "#C0392B",
              boxShadow: "0 12px 28px rgba(192,57,43,.42)",
              animationDuration: "3.5s", animationDelay: "1.3s",
            }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", letterSpacing: "0.08em" }}>HR CONSULTANCY</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", marginTop: 2 }}>People & Culture</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        onClick={() => scrollTo("about")}
        style={{
          position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
          cursor: "pointer", zIndex: 2,
        }}
      >
        <span style={{ color: "rgba(255,255,255,.45)", fontSize: 11, letterSpacing: "0.1em" }}>SCROLL</span>
        <div style={{
          width: 23, height: 37, border: "1.5px solid rgba(255,255,255,.2)",
          borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6,
        }}>
          <div style={{
            width: 3, height: 7, borderRadius: 2, background: "rgba(255,255,255,.55)",
            animation: "scrollDot 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
        background: "linear-gradient(to bottom, transparent, #F4F6FB)",
      }} />

      <style>{`
        @media (max-width: 768px) {
          .home-grid {
            grid-template-columns: 1fr !important;
            padding-top: 90px !important;
            gap: 32px !important;
          }
          .home-orb-wrap {
            display: none !important;
          }
          .home-stats-row {
            gap: 24px !important;
            margin-top: 32px !important;
          }
        }
        @media (max-width: 480px) {
          .home-grid {
            padding-top: 80px !important;
          }
          .home-cta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .home-cta-row button {
            width: 100% !important;
            text-align: center !important;
          }
          .home-stats-row {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}