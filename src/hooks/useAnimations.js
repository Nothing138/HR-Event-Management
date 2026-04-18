import { useState, useEffect } from "react";

/**
 * useScrollAnimation
 * Watches elements with data-animid="<unique-id>" attributes.
 * Returns a Set of IDs that have entered the viewport.
 *
 * Usage:
 *   const visible = useScrollAnimation();
 *   <div data-animid="my-block" className={visible.has("my-block") ? "anim-fadeUp" : "anim-hidden"} />
 */
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

    // Observe all elements with data-animid
    const els = document.querySelectorAll("[data-animid]");
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return visible;
}

/**
 * useCounter
 * Animates a number from 0 → target when `trigger` becomes true.
 */
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

/**
 * useNavScroll
 * Returns scrolled state (bool) and the current active section id.
 */
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