import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useAnimations";
import { SERVICES_DATA } from "../data/servicesData";

const PROCESS = [
  { step: "01", icon: "🔍", title: "Discovery", desc: "Deep-dive consultation to understand your business, goals, challenges, and competitive landscape." },
  { step: "02", icon: "📋", title: "Strategy", desc: "We craft a bespoke roadmap tailored to your exact context, budget, and growth timeline." },
  { step: "03", icon: "🚀", title: "Execution", desc: "Our expert teams spring into action — delivering measurable results with precision and speed." },
  { step: "04", icon: "📈", title: "Growth", desc: "We measure, optimise, and scale what works — ensuring your growth is sustainable and compounding." },
];

const TAGS = ["All", "Marketing", "Creative", "Events", "HR"];

export default function ServicesPage({ onGetStarted }) {
  const visible = useScrollAnimation();
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? SERVICES_DATA : SERVICES_DATA.filter(s => s.tag === activeTag);

  return (
    <div style={{ paddingTop: 68 }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section style={{
        padding: "80px 6% 100px",
        background: "linear-gradient(135deg,#080f2e 0%,#0f1a45 55%,#1a0838 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div style={{ position: "absolute", width: 500, height: 500, top: -100, right: -80, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,57,43,0.15),transparent 70%)", animation: "pulseGlow 5s infinite" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="anim-fadeUp" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(192,57,43,.14)", border: "1px solid rgba(192,57,43,.4)", borderRadius: 30, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
            <span style={{ color: "#dde2f5", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em" }}>WHAT WE OFFER</span>
          </div>
          <h1 className="anim-fadeUp" style={{ animationDelay: "0.1s", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Our Core <span style={{ color: "#C0392B" }}>Services</span>
          </h1>
          <p className="anim-fadeUp" style={{ animationDelay: "0.2s", color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.82, maxWidth: 520, margin: "0 auto 36px" }}>
            A full suite of marketing and human resources solutions designed to accelerate every dimension of your business.
          </p>
          <div className="anim-fadeUp" style={{ animationDelay: "0.3s", display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGetStarted} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "13px 30px", borderRadius: 6, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.4)", transition: "all 0.25s", letterSpacing: "0.05em", textTransform: "uppercase" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              Get Started →
            </button>
            <Link to="/contact" style={{ color: "#fff", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "12px 24px", borderRadius: 6, fontSize: 13.5, fontWeight: 500, textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)" }} />
      </section>

      {/* ══ SERVICES GRID ════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Filter tabs */}
          <div data-animid="srv-filters" className={visible.has("srv-filters") ? "anim-fadeUp" : "anim-hidden"} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} style={{
                padding: "9px 22px", borderRadius: 30, fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans',sans-serif",
                background: activeTag === tag ? "#1B2B6B" : "#F4F6FB",
                color: activeTag === tag ? "#fff" : "#4a5270",
                border: `1.5px solid ${activeTag === tag ? "#1B2B6B" : "#dde2ef"}`,
                boxShadow: activeTag === tag ? "0 4px 16px rgba(27,43,107,0.25)" : "none",
              }}>
                {tag}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((svc, i) => (
              <div key={svc.title} data-animid={`svc-${i}`} className={`srv-card ${visible.has(`svc-${i}`) ? "anim-scaleIn" : "anim-hidden"}`} style={{ animationDelay: `${i * 0.07}s` }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 14, fontSize: 22,
                  background: "rgba(27,43,107,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18, transition: "background 0.3s, transform 0.3s",
                }} className="srv-icon-wrap">{svc.icon}</div>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B2B6B", background: "rgba(27,43,107,0.08)", padding: "3px 10px", borderRadius: 20, marginBottom: 10, display: "inline-block" }}>{svc.tag}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.22rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 9, lineHeight: 1.3, marginTop: 6 }}>{svc.title}</h3>
                <p style={{ color: "#6070a0", fontSize: 14, lineHeight: 1.78, marginBottom: 20 }}>{svc.desc}</p>
                <button onClick={onGetStarted} style={{
                  background: "none", border: "none", color: "#C0392B", fontSize: 13,
                  fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "'DM Sans',sans-serif",
                  display: "flex", alignItems: "center", gap: 5, transition: "gap 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                  onMouseLeave={e => e.currentTarget.style.gap = "5px"}
                >
                  Get This Service <span style={{ fontSize: 16 }}>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══════════════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "#F4F6FB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-animid="process-head" style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>How We Work</p>
            <h2 className={`section-title ${visible.has("process-head") ? "anim-fadeUp" : "anim-hidden"}`}>Our Proven Process</h2>
            <div className={`section-divider center ${visible.has("process-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
          </div>
          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {PROCESS.map((p, i) => (
              <div key={p.step} data-animid={`proc-${i}`} className={visible.has(`proc-${i}`) ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.12}s` }}>
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "28px 22px",
                  border: "1px solid rgba(27,43,107,0.07)",
                  boxShadow: "0 4px 18px rgba(27,43,107,0.06)",
                  position: "relative", overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(27,43,107,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,43,107,0.06)"; }}
                >
                  <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Cormorant Garamond',serif", fontSize: "4rem", fontWeight: 700, color: "rgba(27,43,107,0.05)", lineHeight: 1 }}>{p.step}</div>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 9 }}>{p.title}</h3>
                  <p style={{ color: "#6070a0", fontSize: 13.5, lineHeight: 1.72 }}>{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <div className="process-arrow" style={{ position: "absolute", top: "50%", right: -20, fontSize: 20, color: "#C0392B", transform: "translateY(-50%)", zIndex: 2 }}>→</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .process-grid { grid-template-columns: 1fr 1fr !important; } .process-arrow { display: none !important; } }
          @media (max-width: 480px) { .process-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "linear-gradient(135deg,#1B2B6B,#0f1a45)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div data-animid="srv-cta" className={visible.has("srv-cta") ? "anim-scaleIn" : "anim-hidden"} style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            Ready to Get <span style={{ color: "#C0392B" }}>Started?</span>
          </h2>
          <p style={{ color: "#a8b4d8", fontSize: 15, lineHeight: 1.78, marginBottom: 34 }}>
            Choose the services you need and let MH360 build a customized growth plan for your business.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGetStarted} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.45)", transition: "all 0.25s", letterSpacing: "0.05em", textTransform: "uppercase" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              Start Now →
            </button>
            <Link to="/contact" style={{ color: "#fff", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "13px 30px", borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}