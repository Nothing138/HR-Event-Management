import { useState } from "react";
import { useScrollAnimation } from "../hooks/useAnimations";
import { SERVICES_DATA } from "./Services";

const CONTACT_INFO = [
  { icon: "📍", label: "Location", value: "Sylhet, Bangladesh" },
  { icon: "📞", label: "Phone",    value: "01711086055" },
  { icon: "✉️", label: "Email",    value: "mh360syl@gmail.com" },
];

export default function Contact() {
  const visible = useScrollAnimation();
  const [form, setForm]     = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <section id="contact" style={{ padding: "90px 6%", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="contact-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.45fr",
          gap: 68,
          alignItems: "start",
        }}>

          {/* LEFT */}
          <div>
            <div data-animid="ct-head">
              <p className="section-label">Get In Touch</p>
              <h2 className={`section-title ${visible.has("ct-head") ? "anim-fadeLeft" : "anim-hidden"}`}>
                Let's Grow<br />Together
              </h2>
              <div className={`section-divider ${visible.has("ct-head") ? "grow" : ""}`} />
            </div>

            <p
              data-animid="ct-desc"
              className={visible.has("ct-desc") ? "anim-fadeLeft" : "anim-hidden"}
              style={{ animationDelay: "0.1s", color: "#4a5270", lineHeight: 1.85, marginBottom: 36, fontSize: 15 }}
            >
              Ready to take your business to the next level? Reach out to MH360 — our team
              will respond within one business day.
            </p>

            {CONTACT_INFO.map(({ icon, label, value }, i) => (
              <div
                key={label}
                data-animid={`ct-info-${i}`}
                className={visible.has(`ct-info-${i}`) ? "anim-fadeLeft" : "anim-hidden"}
                style={{ animationDelay: `${0.2 + i * 0.12}s`, display: "flex", gap: 15, marginBottom: 22, alignItems: "flex-start" }}
              >
                <div style={{
                  width: 43, height: 43, borderRadius: 11, background: "#F4F6FB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>{icon}</div>
                <div>
                  <div style={{ color: "#7b88b8", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                  <div style={{ color: "#1B2B6B", fontWeight: 500, fontSize: 14.5 }}>{value}</div>
                </div>
              </div>
            ))}

            <div
              data-animid="ct-quote"
              className={visible.has("ct-quote") ? "anim-fadeLeft" : "anim-hidden"}
              style={{
                animationDelay: "0.5s", marginTop: 32,
                padding: "18px 22px", background: "#F4F6FB",
                borderRadius: 10, borderLeft: "4px solid #C0392B",
              }}
            >
              <p className="display-font" style={{ fontStyle: "italic", color: "#1B2B6B", fontSize: "1.07rem", lineHeight: 1.6 }}>
                "Contact us today to grow smarter, faster &amp; stronger."
              </p>
            </div>
          </div>

          {/* RIGHT – Form */}
          <div data-animid="ct-form" className={visible.has("ct-form") ? "anim-fadeRight" : "anim-hidden"}>
            {status === "success" ? (
              <div style={{
                background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)",
                borderRadius: 18, padding: "60px 36px", textAlign: "center",
                border: "1px solid #a5d6a7",
              }}>
                <div style={{ fontSize: 46, marginBottom: 16 }}>✅</div>
                <h3 className="display-font" style={{ fontSize: "1.8rem", color: "#2e7d32", marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "#4caf50", fontSize: 14.5 }}>Thank you! We'll get back to you within one business day.</p>
              </div>
            ) : (
              <div style={{
                background: "#F4F6FB", borderRadius: 18, padding: "36px 32px",
                border: "1px solid rgba(27,43,107,.07)",
              }}>
                <h3 className="display-font" style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1B2B6B", marginBottom: 28 }}>
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="John Doe" value={form.name} onChange={set("name")} required />
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} required />
                    </div>
                  </div>

                  <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <div>
                      <label className="form-label">Phone</label>
                      <input className="form-input" placeholder="01711000000" value={form.phone} onChange={set("phone")} />
                    </div>
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
                    <textarea
                      className="form-input"
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                      value={form.message}
                      onChange={set("message")}
                      style={{ resize: "none" }}
                      required
                    />
                  </div>

                  {status === "error" && (
                    <p style={{ color: "#C0392B", fontSize: 13, marginBottom: 12 }}>
                      ⚠️ Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary"
                    style={{ width: "100%", padding: 15, fontSize: 14, opacity: status === "sending" ? 0.7 : 1 }}
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
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 480px) {
          #contact { padding: 60px 5% !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}