import { useState } from "react";
import { useScrollAnimation } from "../hooks/useAnimations";
import { SERVICES_DATA } from "../data/servicesData";

const CONTACT_INFO = [
  { icon: "📍", label: "Location", value: "Sylhet, Bangladesh", sub: "Visit us anytime during business hours" },
  { icon: "📞", label: "Phone", value: "01711086055", sub: "Sun–Thu, 9:00 AM – 6:00 PM" },
  { icon: "✉️", label: "Email", value: "mh360syl@gmail.com", sub: "We reply within one business day" },
];

const FAQ = [
  { q: "How quickly can MH360 start on my project?", a: "Typically within 3–5 business days of the initial consultation. For urgent requirements, we can often mobilize within 48 hours." },
  { q: "Do you work with small businesses?", a: "Absolutely! We work with businesses of all sizes — from startups to established enterprises. Our solutions scale to your budget and needs." },
  { q: "Can I get both marketing and HR services together?", a: "Yes, and that's our greatest strength. Our integrated 360° approach means your marketing and HR strategies align perfectly for maximum impact." },
  { q: "What areas do you serve?", a: "We're headquartered in Sylhet, Bangladesh, but serve clients across the country and internationally via remote collaboration." },
];

export default function ContactPage() {
  const visible = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [openFaq, setOpenFaq] = useState(null);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", service: "", message: "" }); setTimeout(() => setStatus("idle"), 6000); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div style={{ paddingTop: 68 }}>

      {/* ══ PAGE HERO ═══════════════════════════════════ */}
      <section style={{ padding: "80px 6% 100px", background: "linear-gradient(135deg,#080f2e 0%,#0f1a45 55%,#1a0838 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div style={{ position: "absolute", width: 450, height: 450, top: -80, right: -60, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,57,43,0.14),transparent 70%)", animation: "pulseGlow 5s infinite" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="anim-fadeUp" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(192,57,43,.14)", border: "1px solid rgba(192,57,43,.4)", borderRadius: 30, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
            <span style={{ color: "#dde2f5", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em" }}>GET IN TOUCH</span>
          </div>
          <h1 className="anim-fadeUp" style={{ animationDelay: "0.1s", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Let's <span style={{ color: "#C0392B" }}>Grow</span> Together
          </h1>
          <p className="anim-fadeUp" style={{ animationDelay: "0.2s", color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.82, maxWidth: 520, margin: "0 auto" }}>
            Ready to take your business to the next level? Reach out — our team responds within one business day.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #fff)" }} />
      </section>

      {/* ══ CONTACT INFO CARDS ════════════════════════ */}
      <section style={{ padding: "72px 6% 0", background: "#fff" }}>
        <div data-animid="ct-cards" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="contact-cards-grid">
            {CONTACT_INFO.map(({ icon, label, value, sub }, i) => (
              <div key={label} className={visible.has("ct-cards") ? "anim-scaleIn" : "anim-hidden"} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{
                  background: "#F4F6FB", borderRadius: 16, padding: "28px 24px",
                  border: "1px solid rgba(27,43,107,0.07)", textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 36px rgba(27,43,107,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
                  <div style={{ color: "#7b88b8", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
                  <div style={{ color: "#1B2B6B", fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{value}</div>
                  <div style={{ color: "#a8b4d8", fontSize: 12.5 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .contact-cards-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ FORM + INFO ══════════════════════════════════ */}
      <section style={{ padding: "64px 6% 96px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="ct-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 72, alignItems: "start" }}>

            {/* LEFT */}
            <div>
              <div data-animid="ct-head">
                <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>Send a Message</p>
                <h2 className={`section-title ${visible.has("ct-head") ? "anim-fadeLeft" : "anim-hidden"}`}>We'd Love to Hear From You</h2>
                <div className={`section-divider ${visible.has("ct-head") ? "grow" : ""}`} />
              </div>
              <p data-animid="ct-desc" className={visible.has("ct-desc") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.1s", color: "#4a5270", lineHeight: 1.88, marginBottom: 36, fontSize: 15 }}>
                Tell us about your goals and challenges. Our team will craft a tailored response and guide you toward the right solution.
              </p>

              {/* Hours */}
              <div data-animid="ct-hours" className={visible.has("ct-hours") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.2s" }}>
                <div style={{ fontWeight: 600, color: "#1B2B6B", fontSize: 13.5, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>🕐</span> Business Hours
                </div>
                {[
                  ["Sun – Thu", "9:00 AM – 6:00 PM"],
                  ["Friday", "10:00 AM – 1:00 PM"],
                  ["Saturday", "10:00 AM – 4:00 PM"],
                ].map(([day, hrs]) => (
                  <div key={day} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f2f8", fontSize: 13.5 }}>
                    <span style={{ color: "#3a4265", fontWeight: 500 }}>{day}</span>
                    <span style={{ color: "#7b88b8" }}>{hrs}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div data-animid="ct-quote" className={visible.has("ct-quote") ? "anim-fadeLeft" : "anim-hidden"} style={{ animationDelay: "0.3s", marginTop: 28, padding: "18px 22px", background: "#F4F6FB", borderRadius: 12, borderLeft: "4px solid #C0392B" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", color: "#1B2B6B", fontSize: "1.08rem", lineHeight: 1.62 }}>
                  "Contact us today to grow smarter, faster &amp; stronger."
                </p>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div data-animid="ct-form" className={visible.has("ct-form") ? "anim-fadeRight" : "anim-hidden"}>
              {status === "success" ? (
                <div style={{ background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)", borderRadius: 20, padding: "60px 36px", textAlign: "center", border: "1px solid #a5d6a7" }}>
                  <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", color: "#2e7d32", marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: "#4caf50", fontSize: 14.5 }}>Thank you! We'll get back to you within one business day.</p>
                </div>
              ) : (
                <div style={{ background: "#F4F6FB", borderRadius: 20, padding: "38px 34px", border: "1px solid rgba(27,43,107,.07)" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.55rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 28 }}>Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="ct-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div><label className="form-label">Full Name *</label><input className="form-input" placeholder="John Doe" value={form.name} onChange={set("name")} required /></div>
                      <div><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} required /></div>
                    </div>
                    <div className="ct-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                      <div><label className="form-label">Phone</label><input className="form-input" placeholder="01711000000" value={form.phone} onChange={set("phone")} /></div>
                      <div>
                        <label className="form-label">Service Needed</label>
                        <select className="form-input" value={form.service} onChange={set("service")}>
                          <option value="">Select a service</option>
                          {SERVICES_DATA.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 22 }}>
                      <label className="form-label">Your Message *</label>
                      <textarea className="form-input" placeholder="Tell us about your project or inquiry..." rows={5} value={form.message} onChange={set("message")} style={{ resize: "none" }} required />
                    </div>
                    {status === "error" && <p style={{ color: "#C0392B", fontSize: 13, marginBottom: 12 }}>⚠️ Something went wrong. Please try again or email us directly.</p>}
                    <button type="submit" disabled={status === "sending"} style={{
                      width: "100%", padding: "14px", background: "linear-gradient(135deg,#C0392B,#e74c3c)",
                      color: "#fff", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600,
                      cursor: "pointer", fontFamily: "'DM Sans',sans-serif", opacity: status === "sending" ? 0.7 : 1,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      boxShadow: "0 6px 22px rgba(192,57,43,0.35)", transition: "all 0.25s",
                    }}
                      onMouseEnter={e => { if (status !== "sending") e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => e.currentTarget.style.transform = "none"}
                    >
                      {status === "sending" ? "Sending..." : "Send Message →"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .ct-main-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
          @media (max-width: 480px) { .ct-form-row { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F4F6FB" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div data-animid="faq-head" style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.18em", color: "#C0392B", textTransform: "uppercase", marginBottom: 10 }}>Quick Answers</p>
            <h2 className={`section-title ${visible.has("faq-head") ? "anim-fadeUp" : "anim-hidden"}`}>Frequently Asked Questions</h2>
            <div className={`section-divider center ${visible.has("faq-head") ? "grow" : ""}`} style={{ marginLeft: "auto", marginRight: "auto" }} />
          </div>
          {FAQ.map((item, i) => (
            <div key={i} data-animid={`faq-${i}`} className={visible.has(`faq-${i}`) ? "anim-fadeUp" : "anim-hidden"} style={{ animationDelay: `${i * 0.08}s`, marginBottom: 14 }}>
              <div
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  background: "#fff", borderRadius: openFaq === i ? "14px 14px 0 0" : 14,
                  padding: "18px 22px", cursor: "pointer",
                  border: "1px solid rgba(27,43,107,0.07)",
                  borderBottom: openFaq === i ? "none" : "1px solid rgba(27,43,107,0.07)",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontWeight: 600, color: "#1B2B6B", fontSize: 14.5 }}>{item.q}</span>
                <span style={{ color: "#C0392B", fontSize: 18, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ background: "#fff", borderRadius: "0 0 14px 14px", padding: "16px 22px 20px", border: "1px solid rgba(27,43,107,0.07)", borderTop: "none" }}>
                  <p style={{ color: "#4a5270", fontSize: 14, lineHeight: 1.78 }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}