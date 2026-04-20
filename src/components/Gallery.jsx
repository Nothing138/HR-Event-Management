import { useState } from "react";
import { useScrollAnimation } from "../hooks/useAnimations";

const GALLERY_ITEMS = [
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80", label: "Strategic Planning Sessions", cat: "Marketing", span: 2 },
  { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80", label: "Corporate Events", cat: "Events", span: 1 },
  { url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80", label: "Team Training", cat: "Training", span: 1 },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80", label: "Recruitment & Talent Drive", cat: "HR", span: 2 },
  { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80", label: "Brand Workshops", cat: "Marketing", span: 1 },
  { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80", label: "Client Partnerships", cat: "Events", span: 1 },
];

const FILTERS = ["All", "Marketing", "Events", "HR", "Training"];

function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 3000,
        background: "rgba(10,16,46,.92)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, animation: "overlayIn 0.28s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative", maxWidth: 880, width: "100%",
          borderRadius: 16, overflow: "hidden",
          animation: "modalIn 0.32s cubic-bezier(0.25,0.8,0.25,1)",
        }}
      >
        <img
          src={item.url}
          alt={item.label}
          style={{ width: "100%", display: "block", maxHeight: "80vh", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(27,43,107,.9) 0%, transparent 100%)",
          padding: "40px 28px 24px",
        }}>
          <div style={{ color: "#fff", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 600 }}>{item.label}</div>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 13, marginTop: 4 }}>MH360 Portfolio · {item.cat}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,.15)", border: "none", color: "#fff",
            fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(6px)",
          }}
        >✕</button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const visible = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 480);

  const filtered = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.cat === activeFilter);

  return (
    <section id="gallery" style={{ padding: "90px 6%", background: "#F4F6FB" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        <div data-animid="gal-head" style={{ textAlign: "center", marginBottom: 10 }}>
          <p className="section-label">Our Work</p>
          <h2 className={`section-title ${visible.has("gal-head") ? "anim-fadeUp" : "anim-hidden"}`}>
            Gallery
          </h2>
          <div
            className={`section-divider center ${visible.has("gal-head") ? "grow" : ""}`}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </div>

        {/* Filters */}
        <div
          data-animid="gal-filters"
          className={visible.has("gal-filters") ? "anim-fadeUp" : "anim-hidden"}
          style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", margin: "28px 0 36px" }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 18px", borderRadius: 30, fontSize: 13, fontWeight: 500,
                cursor: "pointer", transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                background: activeFilter === f ? "#1B2B6B" : "#fff",
                color: activeFilter === f ? "#fff" : "#4a5270",
                border: `1.5px solid ${activeFilter === f ? "#1B2B6B" : "#dde2ef"}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gal-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "220px",
          gap: 14,
        }}>
          {filtered.map((item, i) => (
            <div
              key={item.label}
              data-animid={`gal-${i}`}
              className={`gal-card ${visible.has(`gal-${i}`) ? "anim-scaleIn" : "anim-hidden"}`}
              style={{
                animationDelay: `${i * 0.09}s`,
                gridColumn: `span ${item.span}`,
              }}
              onClick={() => setLightboxItem(item)}
            >
              <img src={item.url} alt={item.label} loading="lazy" />
              <div className="gal-overlay">
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14.5, fontFamily: "'Cormorant Garamond',serif" }}>{item.label}</div>
                  <div style={{ color: "rgba(255,255,255,.65)", fontSize: 12, marginTop: 3 }}>MH360 · {item.cat}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#7b88b8" }}>
            No items in this category yet.
          </div>
        )}
      </div>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />

      <style>{`
        @media (max-width: 768px) {
          #gallery { padding: 60px 4% !important; }
          .gal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 180px !important;
            gap: 10px !important;
          }
          .gal-card { grid-column: span 1 !important; }
        }
        @media (max-width: 480px) {
          #gallery { padding: 60px 5% !important; }
          .gal-grid {
            grid-template-columns: 1fr !important;
            grid-auto-rows: 200px !important;
            gap: 10px !important;
          }
          .gal-card { grid-column: span 1 !important; }
          .gal-overlay { opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
}