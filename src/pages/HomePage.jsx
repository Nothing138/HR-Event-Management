import { Link } from "react-router-dom";
import { useScrollAnimation, useCounter } from "../hooks/useAnimations";
import { SERVICES_DATA } from "../data/servicesData";

const STATS = [
  { count: 200, suffix: "+", label: "Happy Clients", icon: "👥" },
  { count: 50,  suffix: "+", label: "Projects Done",  icon: "🏆" },
  { count: 7,   suffix: "",  label: "Core Services",  icon: "⚡" },
  { count: 98,  suffix: "%", label: "Satisfaction",   icon: "❤️" },
];

function StatItem({ count: target, suffix, label, icon, triggered }) {
  const count = useCounter(target, triggered);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "2.4rem", color: "#fff", lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, marginTop: 4, letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

export default function HomePage({ onGetStarted }) {
  const visible = useScrollAnimation();

  return (
    <div>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section id="home" style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #080f2e 0%, #0f1a45 55%, #1a0838 100%)",
        display: "flex", alignItems: "center", padding: "0 6%",
      }}>
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        {/* Blobs */}
        <div style={{ position: "absolute", width: 520, height: 520, top: -100, right: -80, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,57,43,0.18), transparent 70%)", animation: "pulseGlow 5s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 380, height: 380, bottom: "5%", left: "-5%", borderRadius: "50%", background: "radial-gradient(circle, rgba(27,43,107,0.25), transparent 70%)", animation: "pulseGlow 4s ease-in-out infinite 1.5s" }} />
        {/* Orbit rings */}
        <div className="hero-orbit" style={{ width: 420, height: 420, top: "6%", right: "4%", animationDuration: "28s" }} />
        <div className="hero-orbit" style={{ width: 260, height: 260, top: "18%", right: "14%", animationDuration: "20s", animationDirection: "reverse" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: 60, alignItems: "center", paddingTop: 80 }}>

            {/* LEFT */}
            <div>
              <div className="anim-fadeLeft" style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                background: "rgba(192,57,43,.14)", border: "1px solid rgba(192,57,43,.4)",
                borderRadius: 30, padding: "7px 18px", marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block", animation: "pulseGlow 2s infinite" }} />
                <span style={{ color: "#dde2f5", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em" }}>360° BUSINESS GROWTH PARTNER</span>
              </div>

              <h1 className="anim-fadeLeft" style={{
                animationDelay: "0.1s",
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: 24,
              }}>
                Marketing &amp;<br />
                <span style={{ color: "#C0392B" }}>Human Resources</span><br />
                Solutions
              </h1>

              <p className="anim-fadeLeft" style={{ animationDelay: "0.22s", color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.82, maxWidth: 440, marginBottom: 38 }}>
                MH360 is Sylhet's premier partner for digital growth and people management — combining bold marketing with expert HR to scale your business from every angle.
              </p>

              <div className="anim-fadeLeft hero-cta-row" style={{ animationDelay: "0.34s", display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link to="/services" style={{
                  background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff",
                  textDecoration: "none", padding: "13px 30px", borderRadius: 6,
                  fontSize: 13.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                  boxShadow: "0 6px 22px rgba(192,57,43,0.4)", transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(192,57,43,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(192,57,43,0.4)"; }}
                >
                  Explore Services
                </Link>
                <button onClick={onGetStarted} style={{
                  background: "transparent", color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  padding: "12px 28px", borderRadius: 6, fontSize: 13.5,
                  fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans',sans-serif",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                >
                  Get Started
                </button>
              </div>

              {/* Mini stats */}
              <div className="anim-fadeLeft hero-mini-stats" style={{ animationDelay: "0.46s", display: "flex", gap: 36, marginTop: 52, flexWrap: "wrap" }}>
                {[["200+", "Clients"], ["7", "Services"], ["5+", "Years"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "2.2rem", color: "#fff", lineHeight: 1 }}>{n}</div>
                    <div style={{ color: "#556080", fontSize: 12, marginTop: 4, letterSpacing: "0.06em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — orb */}
            <div className="anim-scaleIn hero-orb-wrap" style={{ animationDelay: "0.18s", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              <div style={{
                width: 320, height: 320, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(192,57,43,.25) 0%, rgba(27,43,107,.45) 100%)",
                border: "1.5px solid rgba(255,255,255,.1)",
                display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
                boxShadow: "0 0 80px rgba(27,43,107,0.4)",
              }}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "5rem", color: "#fff", lineHeight: 1 }}>MH</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "5rem", color: "#C0392B", lineHeight: 1 }}>360</div>
                  <div style={{ color: "#a8b4d8", fontSize: 10, letterSpacing: "0.14em", marginTop: 8 }}>ONE AGENCY · ONE SOLUTION</div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="float-card" style={{ top: 10, right: -10, background: "#fff", boxShadow: "0 12px 32px rgba(0,0,0,.22)", animationDuration: "3.5s", animationDelay: "0s" }}>
                <div style={{ fontSize: 9, color: "#7b88b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Digital Marketing</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1B2B6B", marginTop: 2 }}>Strategy & Growth</div>
              </div>
              <div className="float-card" style={{ bottom: 20, left: -10, background: "#C0392B", boxShadow: "0 12px 32px rgba(192,57,43,.45)", animationDuration: "3.5s", animationDelay: "1.4s" }}>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>HR Consultancy</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", marginTop: 2 }}>People & Culture</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div onClick={() => document.getElementById("home-stats")?.scrollIntoView({ behavior: "smooth" })} style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", zIndex: 2 }}>
          <span style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: "0.12em" }}>SCROLL</span>
          <div style={{ width: 22, height: 36, border: "1.5px solid rgba(255,255,255,.2)", borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 6 }}>
            <div style={{ width: 3, height: 7, borderRadius: 2, background: "rgba(255,255,255,.55)", animation: "scrollDot 1.5s ease-in-out infinite" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, transparent, #F4F6FB)" }} />
      </section>

      {/* ══ STATS BAND ════════════════════════════════════ */}
      <section id="home-stats" style={{ background: "linear-gradient(135deg,#1B2B6B,#0f1a45)", padding: "60px 6%" }}>
        <div data-animid="home-stats" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="stats-band-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {STATS.map((s, i) => (
              <div key={s.label} className={visible.has("home-stats") ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.1}s` }}>
                <StatItem {...s} triggered={visible.has("home-stats")} />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-band-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          }
        `}</style>
      </section>

      {/* ══ ABOUT TEASER ══════════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "#F4F6FB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="home-about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div data-animid="h-about-head">
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>Who We Are</p>
                <h2 className={`section-title ${visible.has("h-about-head") ? "anim-fadeLeft" : "anim-hidden"}`}>
                  Your Complete<br />Business Growth Partner
                </h2>
                <div className={`section-divider ${visible.has("h-about-head") ? "grow" : ""}`} />
              </div>
              <p data-animid="h-about-p" className={visible.has("h-about-p") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.1s", color: "#4a5270", lineHeight: 1.88, fontSize: 15, marginBottom: 28 }}>
                MH360 — Marketing &amp; Human Resources Solutions — is a Sylhet-based agency dedicated to helping businesses grow smarter, faster, and stronger. We offer a rare blend of marketing expertise and HR mastery under a single roof.
              </p>
              <p data-animid="h-about-p2" className={visible.has("h-about-p2") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.18s", color: "#4a5270", lineHeight: 1.88, fontSize: 15, marginBottom: 34 }}>
                From crafting compelling brand stories to building high-performing teams, we bring a 360° perspective to every challenge your business faces.
              </p>
              <div data-animid="h-about-cta" className={visible.has("h-about-cta") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.26s", display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link to="/about" style={{
                  background: "#1B2B6B", color: "#fff", textDecoration: "none",
                  padding: "13px 28px", borderRadius: 6, fontSize: 13.5,
                  fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
                  transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(27,43,107,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  Learn More →
                </Link>
              </div>
            </div>

            <div data-animid="h-about-right" className={visible.has("h-about-right") ? "anim-fadeRight" : "anim-hidden"}>
              {/* Values */}
              {[
                { icon: "🎯", title: "Results-Driven", desc: "Data-backed strategies that deliver measurable ROI for your business." },
                { icon: "🤝", title: "Partnership Approach", desc: "We work as an extension of your team, not just an external vendor." },
                { icon: "🔄", title: "360° Solutions", desc: "Marketing + HR under one roof means perfect alignment across departments." },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 18, marginBottom: 26, padding: "20px 22px",
                  background: "#fff", borderRadius: 14,
                  border: "1px solid rgba(27,43,107,0.07)",
                  boxShadow: "0 4px 18px rgba(27,43,107,0.06)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(27,43,107,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,43,107,0.06)"; }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(27,43,107,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#1B2B6B", fontSize: 14.5, marginBottom: 5 }}>{item.title}</div>
                    <div style={{ color: "#6070a0", fontSize: 13.5, lineHeight: 1.65 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .home-about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>

      {/* ══ SERVICES TEASER ═══════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-animid="h-srv-head" style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>What We Offer</p>
            <h2 className={`section-title ${visible.has("h-srv-head") ? "anim-fadeUp" : "anim-hidden"}`}>Our Core Services</h2>
            <div className={`section-divider center ${visible.has("h-srv-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
            {SERVICES_DATA.slice(0, 6).map((svc, i) => (
              <div
                key={svc.title}
                data-animid={`h-srv-${i}`}
                className={`srv-card ${visible.has(`h-srv-${i}`) ? "anim-scaleIn" : "anim-hidden"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="srv-icon-wrap">{svc.icon}</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B6B", background: "rgba(27,43,107,0.08)", padding: "3px 10px", borderRadius: 20, marginBottom: 10, display: "inline-block" }}>{svc.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.18rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 8, lineHeight: 1.3, marginTop: 6 }}>{svc.title}</h3>
                <p style={{ color: "#6070a0", fontSize: 13.5, lineHeight: 1.77 }}>{svc.desc}</p>
              </div>
            ))}
          </div>

          <div data-animid="h-srv-cta" className={visible.has("h-srv-cta") ? "anim-fadeUp" : "anim-hidden"} style={{ textAlign: "center", marginTop: 52 }}>
            <Link to="/services" style={{
              background: "linear-gradient(135deg,#1B2B6B,#2c3e7a)", color: "#fff",
              textDecoration: "none", padding: "14px 36px", borderRadius: 6,
              fontSize: 13.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
              display: "inline-block", transition: "all 0.25s",
              boxShadow: "0 6px 22px rgba(27,43,107,0.3)",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(27,43,107,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(27,43,107,0.3)"; }}
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ═════════════════════════════════════ */}
      <section data-animid="h-cta" style={{ padding: "80px 6%", background: "linear-gradient(135deg,#1B2B6B,#0f1a45)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className={`h-cta-inner ${visible.has("h-cta") ? "anim-scaleIn" : "anim-hidden"}`} style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 14 }}>Ready to Grow?</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", marginBottom: 18, lineHeight: 1.2 }}>
            Let's Build Something Extraordinary Together
          </h2>
          <p style={{ color: "#a8b4d8", fontSize: 15, lineHeight: 1.78, marginBottom: 36 }}>
            Join 200+ businesses that trust MH360 for their growth journey. One consultation, unlimited possibilities.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGetStarted} style={{
              background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none",
              padding: "14px 36px", borderRadius: 6, fontSize: 14, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.45)",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
            >
              Get Started Now →
            </button>
            <Link to="/contact" style={{
              color: "#fff", background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              padding: "13px 32px", borderRadius: 6, fontSize: 14,
              fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", transition: "all 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 96px !important; gap: 40px !important; }
          .hero-orb-wrap { display: none !important; }
          .hero-mini-stats { gap: 24px !important; margin-top: 36px !important; }
        }
        @media (max-width: 480px) {
          .hero-cta-row { flex-direction: column !important; }
          .hero-cta-row > * { width: 100% !important; text-align: center !important; }
          .hero-mini-stats { gap: 18px !important; }
        }
      `}</style>
    </div>
  );
}