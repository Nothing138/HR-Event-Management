import { Link } from "react-router-dom";
import { useScrollAnimation, useCounter } from "../hooks/useAnimations";

const STATS = [
  { id: "s1", count: 200, suffix: "+", label: "Happy Clients",      icon: "👥" },
  { id: "s2", count:  50, suffix: "+", label: "Projects Delivered", icon: "🏆" },
  { id: "s3", count:   7, suffix: "",  label: "Expert Services",    icon: "⚡" },
  { id: "s4", count:  98, suffix: "%", label: "Client Satisfaction",icon: "❤️" },
];

const VALUES = [
  { icon: "🎯", title: "Results-Driven Strategy", desc: "Every decision is backed by data. We measure, optimize, and deliver outcomes that matter to your bottom line." },
  { icon: "🤝", title: "Integrity in Every Partnership", desc: "Transparency and honesty are the foundation of all our client relationships. No hidden agendas, ever." },
  { icon: "🔄", title: "Tailored, Never Cookie-Cutter", desc: "Your business is unique. We build customized solutions that fit your specific context, goals, and team." },
  { icon: "💡", title: "Continuous Innovation", desc: "We stay ahead of industry trends so our strategies remain fresh, relevant, and ahead of the competition." },
];

const TEAM_HIGHLIGHTS = [
  { role: "Marketing Team", count: "15+", icon: "📊", desc: "Certified digital marketing specialists across SEO, PPC, social, and brand." },
  { role: "HR Experts", count: "10+", icon: "🤝", desc: "CHRP-certified HR consultants with experience across industries." },
  { role: "Creative Pros", count: "8+", icon: "🎨", desc: "Designers and copywriters who make your brand unforgettable." },
];

const MILESTONES = [
  { year: "2019", title: "Founded in Sylhet", desc: "MH360 was established with a vision to be Bangladesh's most holistic business growth agency." },
  { year: "2020", title: "First 50 Clients", desc: "Grew rapidly through referrals, serving businesses across retail, finance, and healthcare." },
  { year: "2021", title: "HR Division Launch", desc: "Expanded from pure marketing into Human Resources, creating Bangladesh's first combined agency model." },
  { year: "2022", title: "100+ Projects", desc: "Crossed 100 successfully delivered projects and 150+ happy client relationships." },
  { year: "2023", title: "Regional Recognition", desc: "Named one of Sylhet's top business consultancies with 98% client satisfaction rate." },
  { year: "2024", title: "200+ Clients", desc: "Celebrating 200+ clients and launching new training & payroll compliance divisions." },
];

function StatCard({ stat, triggered }) {
  const count = useCounter(stat.count, triggered);
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "28px 20px",
      boxShadow: "0 6px 30px rgba(27,43,107,.08)",
      border: "1px solid rgba(27,43,107,.06)", textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 44px rgba(27,43,107,.14)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 30px rgba(27,43,107,.08)"; }}
    >
      <div style={{ fontSize: 30, marginBottom: 10 }}>{stat.icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "3.2rem", color: "#1B2B6B", lineHeight: 1 }}>
        {count}{stat.suffix}
      </div>
      <div style={{ color: "#7b88b8", fontSize: 12.5, marginTop: 7, fontWeight: 500 }}>{stat.label}</div>
    </div>
  );
}

export default function AboutPage({ onGetStarted }) {
  const visible = useScrollAnimation();

  return (
    <div style={{ paddingTop: 68 }}>

      {/* ══ PAGE HERO ══════════════════════════════════════ */}
      <section style={{
        padding: "80px 6% 90px",
        background: "linear-gradient(135deg, #080f2e 0%, #0f1a45 55%, #1a0838 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div style={{ position: "absolute", width: 400, height: 400, top: -100, right: -60, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,57,43,0.15),transparent 70%)", animation: "pulseGlow 5s infinite" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <div className="anim-fadeLeft" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(192,57,43,.14)", border: "1px solid rgba(192,57,43,.4)", borderRadius: 30, padding: "7px 18px", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
                <span style={{ color: "#dde2f5", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em" }}>WHO WE ARE</span>
              </div>
              <h1 className="anim-fadeLeft" style={{ animationDelay: "0.1s", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 22 }}>
                Your Complete<br /><span style={{ color: "#C0392B" }}>360° Growth</span><br />Partner
              </h1>
              <p className="anim-fadeLeft" style={{ animationDelay: "0.2s", color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.82, maxWidth: 420, marginBottom: 34 }}>
                MH360 is Sylhet's premier agency combining bold marketing with expert HR to help businesses scale from every angle.
              </p>
              <div className="anim-fadeLeft" style={{ animationDelay: "0.3s", display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button onClick={onGetStarted} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 6, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.4)", transition: "all 0.25s", letterSpacing: "0.05em", textTransform: "uppercase" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "none"}
                >
                  Work With Us →
                </button>
                <Link to="/contact" style={{ color: "#fff", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.3)", padding: "12px 24px", borderRadius: 6, fontSize: 13.5, fontWeight: 500, textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right — quote block */}
            <div className="anim-fadeRight about-hero-right" style={{ animationDelay: "0.15s" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 32px", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#fff", fontSize: "1.5rem", lineHeight: 1.58, marginBottom: 24 }}>
                  "One Agency. 360° Solution. We grow with you."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#C0392B,#e74c3c)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: 15 }}>M</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>MH360 Team</div>
                    <div style={{ color: "#7b88b8", fontSize: 12.5 }}>Sylhet, Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #F4F6FB)" }} />
        <style>{`
          @media (max-width: 900px) { .about-hero-grid { grid-template-columns: 1fr !important; gap: 44px !important; } .about-hero-right { display: none !important; } }
        `}</style>
      </section>

      {/* ══ STATS ════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F4F6FB" }}>
        <div data-animid="about-stats" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="about-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
            {STATS.map((stat, i) => (
              <div key={stat.id} className={visible.has("about-stats") ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.11}s` }}>
                <StatCard stat={stat} triggered={visible.has("about-stats")} />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .about-stats-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 360px) { .about-stats-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ STORY ════════════════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-animid="about-story-head" style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>Our Story</p>
            <h2 className={`section-title ${visible.has("about-story-head") ? "anim-fadeUp" : "anim-hidden"}`}>From Vision to 360° Reality</h2>
            <div className={`section-divider center ${visible.has("about-story-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
            <p className={visible.has("about-story-head") ? "anim-fadeUp" : "anim-hidden"} style={{ animationDelay: "0.15s", color: "#4a5270", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              A timeline of growth, milestones, and the relentless pursuit of excellence.
            </p>
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #C0392B, #1B2B6B)", transform: "translateX(-50%)" }} className="timeline-line" />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                data-animid={`milestone-${i}`}
                className={`timeline-item ${visible.has(`milestone-${i}`) ? (i % 2 === 0 ? "anim-fadeLeft" : "anim-fadeRight") : "anim-hidden"}`}
                style={{
                  display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                  marginBottom: 40, position: "relative", animationDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  width: "44%", padding: "24px 26px",
                  background: "#F4F6FB", borderRadius: 14,
                  border: "1px solid rgba(27,43,107,0.08)",
                  boxShadow: "0 4px 18px rgba(27,43,107,0.06)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(27,43,107,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,43,107,0.06)"; }}
                >
                  <div style={{ display: "inline-block", background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{m.year}</div>
                  <div style={{ fontWeight: 600, color: "#1B2B6B", fontSize: 15.5, marginBottom: 7 }}>{m.title}</div>
                  <div style={{ color: "#6070a0", fontSize: 13.5, lineHeight: 1.68 }}>{m.desc}</div>
                </div>
                {/* Center dot */}
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 14, height: 14, borderRadius: "50%", background: "#C0392B", border: "3px solid #fff", boxShadow: "0 0 0 3px rgba(192,57,43,0.3)", zIndex: 1 }} className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .timeline-line { left: 20px !important; }
            .timeline-item { justify-content: flex-end !important; }
            .timeline-item > div:first-child { width: calc(100% - 48px) !important; }
            .timeline-dot { left: 20px !important; }
          }
        `}</style>
      </section>

      {/* ══ VALUES ═══════════════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "#F4F6FB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div data-animid="about-vals-head" style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>What Drives Us</p>
            <h2 className={`section-title ${visible.has("about-vals-head") ? "anim-fadeUp" : "anim-hidden"}`}>Our Core Values</h2>
            <div className={`section-divider center ${visible.has("about-vals-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={v.title} data-animid={`val-${i}`} className={visible.has(`val-${i}`) ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  background: "#fff", borderRadius: 16, padding: "30px 26px",
                  border: "1px solid rgba(27,43,107,0.07)",
                  boxShadow: "0 4px 18px rgba(27,43,107,0.06)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  height: "100%",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(27,43,107,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,43,107,0.06)"; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: "#6070a0", fontSize: 14, lineHeight: 1.76 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TEAM HIGHLIGHTS ════════════════════════════ */}
      <section style={{ padding: "96px 6%", background: "linear-gradient(135deg,#1B2B6B,#0f1a45)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div data-animid="about-team-head" style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>Our People</p>
            <h2 className={`section-title ${visible.has("about-team-head") ? "anim-fadeUp" : "anim-hidden"}`} style={{ color: "#fff !important" }}>
              <span style={{ color: "#fff" }}>Expert Teams Behind Every</span><br /><span style={{ color: "#C0392B" }}>360° Solution</span>
            </h2>
            <div className={`section-divider center ${visible.has("about-team-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {TEAM_HIGHLIGHTS.map((t, i) => (
              <div key={t.role} data-animid={`team-${i}`} className={visible.has(`team-${i}`) ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.12}s` }}>
                <div style={{
                  background: "rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px",
                  border: "1px solid rgba(255,255,255,0.1)", textAlign: "center",
                  backdropFilter: "blur(8px)",
                  transition: "transform 0.3s, background 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{t.icon}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: "3.5rem", color: "#C0392B", lineHeight: 1, marginBottom: 4 }}>{t.count}</div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{t.role}</div>
                  <p style={{ color: "#a8b4d8", fontSize: 13.5, lineHeight: 1.68 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F4F6FB" }}>
        <div data-animid="about-final-cta" className={visible.has("about-final-cta") ? "anim-scaleIn" : "anim-hidden"} style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.8vw,2.8rem)", fontWeight: 700, color: "#1B2B6B", marginBottom: 16 }}>
            Ready to Partner With Us?
          </h2>
          <p style={{ color: "#4a5270", fontSize: 15, lineHeight: 1.8, marginBottom: 34 }}>
            Whether you need marketing firepower, HR expertise, or both — MH360 is your single partner for complete business growth.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={onGetStarted} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "14px 34px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.35)", transition: "all 0.25s", letterSpacing: "0.05em", textTransform: "uppercase" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              Get Started →
            </button>
            <Link to="/services" style={{ background: "#1B2B6B", color: "#fff", textDecoration: "none", padding: "13px 30px", borderRadius: 6, fontSize: 14, fontWeight: 500, transition: "all 0.25s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}