import { useState } from "react";
import { SERVICES_DATA } from "./Services";

/**
 * GetStarted – full-screen modal with a 3-step enquiry form.
 * On submission it POSTs to /api/getstarted which sends an email
 * via Nodemailer (see server/index.js).
 *
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 */

const BUDGETS = [
  "Under ৳50,000",
  "৳50,000 – ৳1,00,000",
  "৳1,00,000 – ৳2,50,000",
  "৳2,50,000 – ৳5,00,000",
  "৳5,00,000+",
];

const TIMELINES = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible / Not sure",
];

const HEAR_FROM = [
  "Google Search",
  "Social Media",
  "Referral / Friend",
  "Word of mouth",
  "Other",
];

const INITIAL_FORM = {
  // Step 1 – Contact info
  name:     "",
  email:    "",
  phone:    "",
  company:  "",
  position: "",
  // Step 2 – Project details
  services:  [],   // multi-select
  budget:    "",
  timeline:  "",
  message:   "",
  // Step 3 – Final info
  hearFrom:  "",
  website:   "",
};

// ── Small checkbox component ──────────────────────────────────
function CheckOption({ label, checked, onChange }) {
  return (
    <div
      className={`custom-check ${checked ? "checked" : ""}`}
      onClick={onChange}
    >
      <div className="check-box">
        {checked && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13.5 }}>{label}</span>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <>
          <div
            key={`dot-${i}`}
            className="step-dot"
            style={{
              background: i <= current - 1 ? "#1B2B6B" : "#e8eaf5",
              color: i <= current - 1 ? "#fff" : "#a0a8c0",
            }}
          >
            {i < current - 1 ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              key={`line-${i}`}
              className={`step-line ${i < current - 1 ? "done" : ""}`}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default function GetStarted({ isOpen, onClose }) {
  const [step, setStep]     = useState(1);
  const [form, setForm]     = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  if (!isOpen) return null;

  // ── Field helpers
  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const toggleService = (title) => {
    setForm(p => ({
      ...p,
      services: p.services.includes(title)
        ? p.services.filter(s => s !== title)
        : [...p.services, title],
    }));
  };

  // ── Step validation
  const canNext = () => {
    if (step === 1) return form.name && form.email && form.phone;
    if (step === 2) return form.services.length > 0 && form.budget && form.message;
    return true;
  };

  // ── Submit
  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/getstarted", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => { setStep(1); setForm(INITIAL_FORM); setStatus("idle"); }, 400);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* ── Modal Header ── */}
        <div style={{
          padding: "28px 36px 0",
          borderBottom: "1px solid #eef0f8",
          paddingBottom: 20,
          position: "sticky", top: 0, background: "#fff", zIndex: 10,
          borderRadius: "20px 20px 0 0",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "2px solid #C0392B",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span className="display-font" style={{ fontWeight: 700, fontSize: 11, color: "#1B2B6B" }}>MH</span>
                </div>
                <span className="display-font" style={{ fontWeight: 700, fontSize: 18, color: "#1B2B6B" }}>
                  360 — Get Started
                </span>
              </div>
              <p style={{ color: "#7b88b8", fontSize: 13, marginTop: 4 }}>
                {step === 1 && "Step 1 of 3 — Your contact details"}
                {step === 2 && "Step 2 of 3 — Tell us about your project"}
                {step === 3 && "Step 3 of 3 — Final details"}
                {status === "success" && "We've received your enquiry!"}
              </p>
            </div>
            <button
              onClick={handleClose}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "#F4F6FB", border: "1px solid #dde2ef",
                cursor: "pointer", fontSize: 16, color: "#4a5270",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>
          </div>

          {status !== "success" && <StepIndicator current={step} total={3} />}
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "28px 36px 36px" }}>

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 60, marginBottom: 20 }}>🎉</div>
              <h3 className="display-font" style={{ fontSize: "2rem", color: "#1B2B6B", marginBottom: 12 }}>
                We're On It!
              </h3>
              <p style={{ color: "#4a5270", lineHeight: 1.8, maxWidth: 380, margin: "0 auto 28px" }}>
                Thank you, <strong>{form.name}</strong>! Your enquiry has been sent to the MH360 team.
                We'll reach out to <em>{form.email}</em> within one business day.
              </p>
              <div style={{
                background: "#F4F6FB", borderRadius: 12, padding: "18px 24px",
                borderLeft: "4px solid #C0392B", textAlign: "left",
                marginBottom: 28,
              }}>
                <p className="display-font" style={{ fontStyle: "italic", color: "#1B2B6B", fontSize: "1.05rem" }}>
                  "Contact us today to grow smarter, faster &amp; stronger."
                </p>
                <p style={{ color: "#7b88b8", fontSize: 12.5, marginTop: 6 }}>— MH360 Team, Sylhet</p>
              </div>
              <button className="btn-primary" onClick={handleClose}>
                Close
              </button>
            </div>
          )}

          {/* STEP 1 – Contact info */}
          {status !== "success" && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="John Doe" value={form.name} onChange={set("name")} />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="01711000000" value={form.phone} onChange={set("phone")} />
                </div>
                <div>
                  <label className="form-label">Company / Business Name</label>
                  <input className="form-input" placeholder="Acme Ltd." value={form.company} onChange={set("company")} />
                </div>
              </div>
              <div>
                <label className="form-label">Your Position / Role</label>
                <input className="form-input" placeholder="CEO, Marketing Manager…" value={form.position} onChange={set("position")} />
              </div>
            </div>
          )}

          {/* STEP 2 – Project details */}
          {status !== "success" && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {/* Services multi-select */}
              <div>
                <label className="form-label" style={{ marginBottom: 10 }}>Services You're Interested In * (select all that apply)</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {SERVICES_DATA.map(s => (
                    <CheckOption
                      key={s.title}
                      label={`${s.icon} ${s.title}`}
                      checked={form.services.includes(s.title)}
                      onChange={() => toggleService(s.title)}
                    />
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="form-label">Estimated Budget *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BUDGETS.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, budget: b }))}
                      style={{
                        padding: "8px 16px", borderRadius: 30, fontSize: 13,
                        cursor: "pointer", transition: "all 0.22s", fontFamily: "'DM Sans',sans-serif",
                        background: form.budget === b ? "#1B2B6B" : "#fff",
                        color: form.budget === b ? "#fff" : "#4a5270",
                        border: `1.5px solid ${form.budget === b ? "#1B2B6B" : "#dde2ef"}`,
                      }}
                    >{b}</button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="form-label">Preferred Timeline</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMELINES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, timeline: t }))}
                      style={{
                        padding: "8px 16px", borderRadius: 30, fontSize: 13,
                        cursor: "pointer", transition: "all 0.22s", fontFamily: "'DM Sans',sans-serif",
                        background: form.timeline === t ? "#C0392B" : "#fff",
                        color: form.timeline === t ? "#fff" : "#4a5270",
                        border: `1.5px solid ${form.timeline === t ? "#C0392B" : "#dde2ef"}`,
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Project message */}
              <div>
                <label className="form-label">Tell Us About Your Project *</label>
                <textarea
                  className="form-input"
                  placeholder="Describe your goals, current challenges, and what success looks like for you…"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  style={{ resize: "none" }}
                />
              </div>
            </div>
          )}

          {/* STEP 3 – Final details */}
          {status !== "success" && step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <label className="form-label">How Did You Hear About Us?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {HEAR_FROM.map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, hearFrom: h }))}
                      style={{
                        padding: "8px 16px", borderRadius: 30, fontSize: 13,
                        cursor: "pointer", transition: "all 0.22s", fontFamily: "'DM Sans',sans-serif",
                        background: form.hearFrom === h ? "#1B2B6B" : "#fff",
                        color: form.hearFrom === h ? "#fff" : "#4a5270",
                        border: `1.5px solid ${form.hearFrom === h ? "#1B2B6B" : "#dde2ef"}`,
                      }}
                    >{h}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Your Website (if any)</label>
                <input className="form-input" placeholder="https://yourwebsite.com" value={form.website} onChange={set("website")} />
              </div>

              {/* Summary preview */}
              <div style={{
                background: "#F4F6FB", borderRadius: 12, padding: "20px 22px",
                border: "1px solid rgba(27,43,107,.07)",
              }}>
                <div style={{ fontWeight: 500, color: "#1B2B6B", marginBottom: 12, fontSize: 14 }}>📋 Your Enquiry Summary</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {[
                    ["Name",     form.name],
                    ["Email",    form.email],
                    ["Phone",    form.phone],
                    ["Company",  form.company || "—"],
                    ["Services", form.services.join(", ") || "—"],
                    ["Budget",   form.budget || "—"],
                    ["Timeline", form.timeline || "—"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", gap: 8, fontSize: 13.5 }}>
                      <span style={{ color: "#7b88b8", minWidth: 72 }}>{k}:</span>
                      <span style={{ color: "#3a4265", fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {status === "error" && (
                <p style={{ color: "#C0392B", fontSize: 13 }}>
                  ⚠️ Submission failed. Please try again or email us at mh360syl@gmail.com
                </p>
              )}
            </div>
          )}

          {/* ── Navigation buttons ── */}
          {status !== "success" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
              <button
                onClick={() => step > 1 ? setStep(s => s - 1) : handleClose()}
                style={{
                  background: "none", border: "1.5px solid #dde2ef", padding: "11px 26px",
                  borderRadius: 4, fontSize: 13.5, fontWeight: 500, cursor: "pointer",
                  color: "#4a5270", fontFamily: "'DM Sans',sans-serif",
                  transition: "all 0.22s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#1B2B6B"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#dde2ef"}
              >
                {step === 1 ? "← Cancel" : "← Back"}
              </button>

              {step < 3 ? (
                <button
                  onClick={() => canNext() && setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="btn-primary"
                  style={{ opacity: canNext() ? 1 : 0.5, cursor: canNext() ? "pointer" : "not-allowed" }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="btn-primary"
                  style={{ opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Sending…" : "Submit Enquiry ✓"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}