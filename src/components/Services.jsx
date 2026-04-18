import { useScrollAnimation } from "../hooks/useAnimations";

export const SERVICES_DATA = [
  {
    icon: "📊",
    title: "Digital Marketing Consultancy",
    desc: "Data-driven strategies that amplify your brand across every digital channel — SEO, social media, PPC and beyond.",
    tag: "Marketing",
  },
  {
    icon: "🎨",
    title: "Branding & Design",
    desc: "Distinctive identities and cohesive visual systems that make your brand impossible to forget.",
    tag: "Creative",
  },
  {
    icon: "🎯",
    title: "Event Management",
    desc: "Seamlessly executed corporate and promotional events — from concept and logistics to flawless on-day delivery.",
    tag: "Events",
  },
  {
    icon: "🤝",
    title: "HR Consultancy",
    desc: "Expert guidance on human resource policies, org structures, culture, and compliance frameworks.",
    tag: "HR",
  },
  {
    icon: "🔍",
    title: "Recruitment & Talent Acquisition",
    desc: "We source, screen, and connect you with the right people to drive your business forward.",
    tag: "HR",
  },
  {
    icon: "📚",
    title: "Training & Development",
    desc: "Customised learning programmes — workshops, coaching, and e-learning — that unlock your team's full potential.",
    tag: "HR",
  },
  {
    icon: "📋",
    title: "Payroll & HR Compliance",
    desc: "Accurate, timely payroll processing and full regulatory compliance so you never miss a beat.",
    tag: "HR",
  },
];

export default function Services() {
  const visible = useScrollAnimation();

  return (
    <section id="services" style={{ padding: "90px 6%", background: "#fff" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* ── Section header ── */}
        <div
          data-animid="srv-head"
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-label">What We Offer</p>
          <h2 className={`section-title ${visible.has("srv-head") ? "anim-fadeUp" : "anim-hidden"}`}>
            Our Core Services
          </h2>
          <div
            className={`section-divider center ${visible.has("srv-head") ? "grow" : ""}`}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
          <p
            className={visible.has("srv-head") ? "anim-fadeUp" : "anim-hidden"}
            style={{
              animationDelay: "0.18s", color: "#4a5270",
              maxWidth: 500, margin: "0 auto", lineHeight: 1.78, fontSize: 14.5,
            }}
          >
            A full suite of marketing and human resources solutions designed to
            accelerate every dimension of your business.
          </p>
        </div>

        {/* ── Cards grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 22,
        }}>
          {SERVICES_DATA.map((svc, i) => (
            <div
              key={svc.title}
              data-animid={`srv-${i}`}
              className={`srv-card ${visible.has(`srv-${i}`) ? "anim-scaleIn" : "anim-hidden"}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Icon */}
              <div className="srv-icon-wrap">{svc.icon}</div>

              {/* Tag badge */}
              <span style={{
                fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#1B2B6B",
                background: "rgba(27,43,107,0.08)",
                padding: "3px 10px", borderRadius: 20,
                marginBottom: 10, display: "inline-block",
              }}>{svc.tag}</span>

              {/* Title */}
              <h3
                className="display-font"
                style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 9, lineHeight: 1.3, marginTop: 6 }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p style={{ color: "#6070a0", fontSize: 14, lineHeight: 1.77 }}>{svc.desc}</p>

              {/* Learn more link */}
              <div
                style={{
                  marginTop: 20, display: "flex", alignItems: "center", gap: 5,
                  color: "#C0392B", fontSize: 13, fontWeight: 500, cursor: "pointer",
                  transition: "gap 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.gap = "10px"}
                onMouseLeave={e => e.currentTarget.style.gap = "5px"}
              >
                Learn more <span style={{ fontSize: 16 }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}