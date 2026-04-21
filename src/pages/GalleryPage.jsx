import { useState } from "react";
import { useScrollAnimation } from "../hooks/useAnimations";

const GALLERY_ITEMS = [
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80", label: "Strategic Planning Sessions", cat: "Marketing", span: 2 },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80", label: "Corporate Events", cat: "Events", span: 1 },
  { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", label: "Team Training", cat: "Training", span: 1 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80", label: "Recruitment & Talent Drive", cat: "HR", span: 2 },
  { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80", label: "Brand Workshops", cat: "Marketing", span: 1 },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80", label: "Client Partnerships", cat: "Events", span: 1 },
  { url: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=900&q=80", label: "Annual Conference 2024", cat: "Events", span: 2 },
  { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80", label: "Leadership Coaching", cat: "Training", span: 1 },
  { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80", label: "HR Strategy Summit", cat: "HR", span: 1 },
];

const FILTERS = ["All", "Marketing", "Events", "HR", "Training"];

function Lightbox({ item, onClose, items, setItem }) {
  if (!item) return null;
  const idx = items.findIndex(i => i.label === item.label);
  const prev = () => setItem(items[(idx - 1 + items.length) % items.length]);
  const next = () => setItem(items[(idx + 1) % items.length]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(6,14,42,.94)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "overlayIn 0.28s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 940, width: "100%", borderRadius: 18, overflow: "hidden", animation: "modalIn 0.32s cubic-bezier(0.25,0.8,0.25,1)" }}>
        <img src={item.url} alt={item.label} style={{ width: "100%", display: "block", maxHeight: "82vh", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(11,20,60,.92) 0%,transparent 100%)", padding: "52px 28px 26px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", color: "#fff", fontSize: "1.6rem", fontWeight: 600 }}>{item.label}</div>
          <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 4 }}>MH360 Portfolio · {item.cat}</div>
        </div>
        {/* Prev / Next */}
        <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>✕</button>
        {/* Counter */}
        <div style={{ position: "absolute", top: 18, left: 18, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, padding: "4px 12px", borderRadius: 20, backdropFilter: "blur(4px)" }}>{idx + 1} / {items.length}</div>
      </div>
    </div>
  );
}

export default function GalleryPage({ onGetStarted }) {
  const visible = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  const filtered = activeFilter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === activeFilter);

  return (
    <div style={{ paddingTop: 68 }}>

      {/* ══ PAGE HERO ═══════════════════════════════════ */}
      <section style={{ padding: "80px 6% 100px", background: "linear-gradient(135deg,#080f2e 0%,#0f1a45 55%,#1a0838 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.03) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
        <div style={{ position: "absolute", width: 450, height: 450, top: -80, right: -60, borderRadius: "50%", background: "radial-gradient(circle,rgba(192,57,43,0.14),transparent 70%)", animation: "pulseGlow 5s infinite" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="anim-fadeUp" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(192,57,43,.14)", border: "1px solid rgba(192,57,43,.4)", borderRadius: 30, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
            <span style={{ color: "#dde2f5", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em" }}>OUR WORK</span>
          </div>
          <h1 className="anim-fadeUp" style={{ animationDelay: "0.1s", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,3.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            <span style={{ color: "#C0392B" }}>Portfolio</span> &amp; Gallery
          </h1>
          <p className="anim-fadeUp" style={{ animationDelay: "0.2s", color: "#a8b4d8", fontSize: 15.5, lineHeight: 1.82, maxWidth: 500, margin: "0 auto" }}>
            A visual journey through our work — from strategic campaigns to impactful HR transformations.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to bottom, transparent, #F4F6FB)" }} />
      </section>

      {/* ══ GALLERY ══════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#F4F6FB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Filters */}
          <div data-animid="gal-filters" className={visible.has("gal-filters") ? "anim-fadeUp" : "anim-hidden"} style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                padding: "9px 22px", borderRadius: 30, fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans',sans-serif",
                background: activeFilter === f ? "#1B2B6B" : "#fff",
                color: activeFilter === f ? "#fff" : "#4a5270",
                border: `1.5px solid ${activeFilter === f ? "#1B2B6B" : "#dde2ef"}`,
                boxShadow: activeFilter === f ? "0 4px 16px rgba(27,43,107,0.25)" : "none",
              }}>
                {f}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "230px", gap: 14 }}>
            {filtered.map((item, i) => (
              <div
                key={item.label}
                data-animid={`gal-${i}`}
                className={`gal-card ${visible.has(`gal-${i}`) ? "anim-scaleIn" : "anim-hidden"}`}
                style={{ animationDelay: `${i * 0.08}s`, gridColumn: `span ${item.span}` }}
                onClick={() => setLightboxItem(item)}
              >
                <img src={item.url} alt={item.label} loading="lazy" />
                <div className="gal-overlay">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14.5, fontFamily: "'Cormorant Garamond',serif" }}>{item.label}</div>
                      <div style={{ color: "rgba(255,255,255,.6)", fontSize: 12, marginTop: 3 }}>MH360 · {item.cat}</div>
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#fff", flexShrink: 0 }}>⤢</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#7b88b8" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🖼️</div>
              <p style={{ fontSize: 16 }}>No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 6%", background: "#fff" }}>
        <div data-animid="gal-cta" className={visible.has("gal-cta") ? "anim-scaleIn" : "anim-hidden"} style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.8vw,2.8rem)", fontWeight: 700, color: "#1B2B6B", marginBottom: 16 }}>
            Let's Create Your Success Story
          </h2>
          <p style={{ color: "#4a5270", fontSize: 15, lineHeight: 1.8, marginBottom: 34 }}>
            Join 200+ businesses featured in our portfolio. Your transformation starts with a single conversation.
          </p>
          <button onClick={onGetStarted} style={{ background: "linear-gradient(135deg,#C0392B,#e74c3c)", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 22px rgba(192,57,43,0.35)", transition: "all 0.25s", letterSpacing: "0.05em", textTransform: "uppercase" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            Start Your Journey →
          </button>
        </div>
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} items={filtered} setItem={setLightboxItem} />

      <style>{`
        @media (max-width: 768px) {
          .gal-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 185px !important; gap: 10px !important; }
          .gal-card { grid-column: span 1 !important; }
        }
        @media (max-width: 480px) {
          .gal-grid { grid-template-columns: 1fr !important; grid-auto-rows: 210px !important; gap: 10px !important; }
          .gal-overlay { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}