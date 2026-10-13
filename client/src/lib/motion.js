// motion.js — the shared motion vocabulary: one easing curve, one entrance.
// Everything is short and decelerating; nothing bounces.

export const EASE = [0.22, 1, 0.36, 1];

// Rise-and-fade entrance, played once when the element scrolls into view.
export function rise(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -48px 0px" },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

// A bar that wipes in from the left.
export function wipe(delay = 0) {
  return {
    initial: { clipPath: "inset(0 100% 0 0)" },
    whileInView: { clipPath: "inset(0 0% 0 0)" },
    viewport: { once: true },
    transition: { duration: 0.9, ease: EASE, delay },
  };
}

export const SPRING = { type: "spring", stiffness: 520, damping: 42 };
