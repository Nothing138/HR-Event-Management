import { useState, useEffect } from "react";

export function useScrollAnimation(threshold = 0.12) {
  const [visible, setVisible] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.animid;
            if (id) {
              setVisible((prev) => new Set([...prev, id]));
              observer.unobserve(entry.target); // fire once
            }
          }
        });
      },
      { threshold }
    );

    const els = document.querySelectorAll("[data-animid]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return visible;
}

export function useCounter(target, trigger) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const step = Math.ceil(target / 55);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return count;
}

export function useNavScroll(sections = ["home","about","services","gallery","contact"]) {
  const [scrolled, setScrolled]   = useState(false);
  const [active,   setActive]     = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 180 && bottom >= 180) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return { scrolled, active };
}
