import { useState } from "react";
import { SERVICES_DATA } from "../data/servicesData";

const BUDGETS = ["Under ৳50,000","৳50,000 – ৳1,00,000","৳1,00,000 – ৳2,50,000","৳2,50,000 – ৳5,00,000","৳5,00,000+"];
const TIMELINES = ["As soon as possible","Within 1 month","1 – 3 months","3 – 6 months","Flexible / Not sure"];
const HEAR_FROM = ["Google Search","Social Media","Referral / Friend","Word of mouth","Other"];

const INITIAL_FORM = {
  name: "", email: "", phone: "", company: "", position: "",
  services: [], budget: "", timeline: "", message: "", hearFrom: "", website: "",
};

function CheckOption({ label, checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        cursor: "pointer", fontSize: 13.5, color: checked ? "#1B2B6B" : "#3a4265",
        padding: "9px 12px", borderRadius: 8,
        border: `1.5px solid ${checked ? "#1B2B6B" : "#dde2ef"}`,
        background: checked ? "rgba(27,43,107,0.06)" : "#fff",
        transition: "all 0.22s", userSelect: "none",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: 4, flexShrink: 0,
        border: `2px solid ${checked ? "#1B2B6B" : "#c0c8e0"}`,
        background: checked ? "#1B2B6B" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}>
        {checked && <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>✓</span>}
      </div>
      <span>{label}</span>
    </div>
  );
}

function StepDots({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < total - 1 ? 1 : "none" }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
            background: i < current ? "#1B2B6B" : i === current - 1 ? "#1B2B6B" : "#e8eaf5",
            color: i <= current - 1 ? "#fff" : "#a0a8c0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, transition: "all 0.3s",
            boxShadow: i === current - 1 ? "0 0 0 4px rgba(27,43,107,0.15)" : "none",
          }}>
            {i < current - 1 ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current - 1 ? "#1B2B6B" : "#e8eaf5", transition: "background 0.4s", margin: "0 4px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function GetStarted({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  if (!isOpen) return null;

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));
  const toggleService = (title) => setForm(p => ({
    ...p,
    services: p.services.includes(title) ? p.services.filter(s => s !== title) : [...p.services, title],
  }));

  const canNext = () => {
    if (step === 1) return form.name && form.email && form.phone;
    if (step === 2) return form.services.length > 0 && form.budget && form.message;
    return true;
  };

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/getstarted", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setStep(1); setForm(INITIAL_FORM); setStatus("idle"); }, 400);
  };

  const chipStyle = (active) => ({
    padding: "8px 16px", borderRadius: 30, fontSize: 12.5,
    cursor: "pointer", fontFamily: "'DM Sans',sans-serif",
    background: active ? "#1B2B6B" : "#fff",
    color: active ? "#fff" : "#4a5270",
    border: `1.5px solid ${active ? "#1B2B6B" : "#dde2ef"}`,
    transition: "all 0.2s",
  });

  const chipStyleRed = (active) => ({
    ...chipStyle(active),
    background: active ? "#C0392B" : "#fff",
    color: active ? "#fff" : "#4a5270",
    border: `1.5px solid ${active ? "#C0392B" : "#dde2ef"}`,
  });

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(6,14,42,0.88)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "0", animation: "overlayIn 0.3s ease", overflowY: "auto",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", width: "100%", maxWidth: 740,
          borderRadius: "24px 24px 0 0",
          maxHeight: "94vh", overflowY: "auto",
          animation: "modalIn 0.4s cubic-bezier(0.25,0.8,0.25,1)",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "22px 28px 0", borderBottom: "1px solid #eef0f8",
          paddingBottom: 16, position: "sticky", top: 0, background: "#fff",
          zIndex: 10, borderRadius: "24px 24px 0 0",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #C0392B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 10, color: "#1B2B6B" }}>MH</span>
                </div>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 18, color: "#1B2B6B" }}>360 — Get Started</span>
              </div>
              <p style={{ color: "#7b88b8", fontSize: 12.5, marginTop: 3 }}>
                {status === "success" ? "We've received your enquiry!" :
                  `Step ${step} of 3 — ${step === 1 ? "Contact details" : step === 2 ? "Project details" : "Final details"}`}
              </p>
            </div>
            <button onClick={handleClose} style={{ width: 34, height: 34, borderRadius: "50%", background: "#F4F6FB", border: "1px solid #dde2ef", cursor: "pointer", fontSize: 15, color: "#4a5270", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          {status !== "success" && <StepDots current={step} total={3} />}
        </div>

        {/* Body */}
        <div style={{ padding: "22px 28px 28px" }}>

          {status === "success" && (
            <div style={{ textAlign: "center", padding: "36px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: "#1B2B6B", marginBottom: 10 }}>We're On It!</h3>
              <p style={{ color: "#4a5270", lineHeight: 1.8, maxWidth: 380, margin: "0 auto 24px" }}>
                Thank you, <strong>{form.name}</strong>! We'll reach out to <em>{form.email}</em> within one business day.
              </p>
              <button onClick={handleClose} style={{ background: "#1B2B6B", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 6, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Done ✓</button>
            </div>
          )}

          {status !== "success" && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="gs-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="form-label">Full Name *</label><input className="form-input" placeholder="John Doe" value={form.name} onChange={set("name")} /></div>
                <div><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="john@company.com" value={form.email} onChange={set("email")} /></div>
              </div>
              <div className="gs-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div><label className="form-label">Phone *</label><input className="form-input" placeholder="01711000000" value={form.phone} onChange={set("phone")} /></div>
                <div><label className="form-label">Company Name</label><input className="form-input" placeholder="Acme Ltd." value={form.company} onChange={set("company")} /></div>
              </div>
              <div><label className="form-label">Your Position / Role</label><input className="form-input" placeholder="CEO, Marketing Manager…" value={form.position} onChange={set("position")} /></div>
            </div>
          )}

          {status !== "success" && step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label className="form-label" style={{ marginBottom: 10 }}>Services Interested In * (select all)</label>
                <div className="gs-services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {SERVICES_DATA.map(s => <CheckOption key={s.title} label={`${s.icon} ${s.title}`} checked={form.services.includes(s.title)} onChange={() => toggleService(s.title)} />)}
                </div>
              </div>
              <div>
                <label className="form-label">Estimated Budget *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {BUDGETS.map(b => <button key={b} type="button" onClick={() => setForm(p => ({ ...p, budget: b }))} style={chipStyle(form.budget === b)}>{b}</button>)}
                </div>
              </div>
              <div>
                <label className="form-label">Preferred Timeline</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {TIMELINES.map(t => <button key={t} type="button" onClick={() => setForm(p => ({ ...p, timeline: t }))} style={chipStyleRed(form.timeline === t)}>{t}</button>)}
                </div>
              </div>
              <div>
                <label className="form-label">Tell Us About Your Project *</label>
                <textarea className="form-input" placeholder="Describe your goals, challenges…" rows={4} value={form.message} onChange={set("message")} style={{ resize: "none" }} />
              </div>
            </div>
          )}

          {status !== "success" && step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label className="form-label">How Did You Hear About Us?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {HEAR_FROM.map(h => <button key={h} type="button" onClick={() => setForm(p => ({ ...p, hearFrom: h }))} style={chipStyle(form.hearFrom === h)}>{h}</button>)}
                </div>
              </div>
              <div><label className="form-label">Your Website (if any)</label><input className="form-input" placeholder="https://yourwebsite.com" value={form.website} onChange={set("website")} /></div>
              <div style={{ background: "#F4F6FB", borderRadius: 12, padding: "18px 20px", border: "1px solid rgba(27,43,107,.07)" }}>
                <div style={{ fontWeight: 600, color: "#1B2B6B", marginBottom: 10, fontSize: 13.5 }}>📋 Enquiry Summary</div>
                {[["Name", form.name], ["Email", form.email], ["Phone", form.phone], ["Company", form.company || "—"], ["Services", form.services.join(", ") || "—"], ["Budget", form.budget || "—"], ["Timeline", form.timeline || "—"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 5 }}>
                    <span style={{ color: "#7b88b8", minWidth: 72, flexShrink: 0 }}>{k}:</span>
                    <span style={{ color: "#3a4265", fontWeight: 500, wordBreak: "break-word" }}>{v}</span>
                  </div>
                ))}
              </div>
              {status === "error" && <p style={{ color: "#C0392B", fontSize: 13 }}>⚠️ Submission failed. Please email us at mh360syl@gmail.com</p>}
            </div>
          )}

          {status !== "success" && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, gap: 10 }}>
              <button onClick={() => step > 1 ? setStep(s => s - 1) : handleClose()} style={{ background: "none", border: "1.5px solid #dde2ef", padding: "10px 22px", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#4a5270", fontFamily: "'DM Sans',sans-serif" }}>
                {step === 1 ? "← Cancel" : "← Back"}
              </button>
              {step < 3 ? (
                <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} style={{ background: canNext() ? "linear-gradient(135deg,#1B2B6B,#2c3e7a)" : "#e8eaf5", color: canNext() ? "#fff" : "#a0a8c0", border: "none", padding: "10px 28px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "'DM Sans',sans-serif" }}>
                  Continue →
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={status === "sending"} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", opacity: status === "sending" ? 0.7 : 1 }}>
                  {status === "sending" ? "Sending…" : "Submit Enquiry ✓"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .gs-row-2 { grid-template-columns: 1fr !important; }
          .gs-services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}