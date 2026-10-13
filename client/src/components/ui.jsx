// ui.jsx — the small shared pieces every view is built from.
import { useId, useLayoutEffect, useRef } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { EASE, SPRING, rise } from "../lib/motion";

export function Card({ title, subtitle, actions, children, className = "", delay = 0 }) {
  return (
    <motion.section className={`card ${className}`} {...rise(delay)}>
      {(title || actions) && (
        <header className="card-head">
          <div>
            {title && <h2 className="card-title">{title}</h2>}
            {subtitle && <p className="card-sub">{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </header>
      )}
      {children}
    </motion.section>
  );
}

export function Segmented({ label, options, value, onChange }) {
  const id = useId();
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className="segmented-btn"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.value === value && <motion.span layoutId={`seg-${id}`} className="segmented-thumb" transition={SPRING} />}
          <span className="segmented-label">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

// Direction is carried by the arrow and the sign as well as the colour.
export function Delta({ value, children, pill = false }) {
  const dir = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const Icon = dir === "up" ? ArrowUp : dir === "down" ? ArrowDown : Minus;
  return (
    <span className={`delta delta--${dir}${pill ? " delta--pill" : ""}`}>
      <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
      {children}
    </span>
  );
}

export function Stat({ label, value, sub }) {
  return (
    <div className="stat">
      <dt className="stat-label">{label}</dt>
      <dd className="stat-value">{value}</dd>
      {sub && <dd className="stat-sub">{sub}</dd>}
    </div>
  );
}

export function LineKey({ dashed = false, children }) {
  return (
    <span className="key">
      <svg width="22" height="8" aria-hidden="true">
        <line className={dashed ? "chart-line chart-line--est" : "chart-line"} x1="1" x2="21" y1="4" y2="4" />
      </svg>
      {children}
    </span>
  );
}

// Counts up to `value` once. Screen readers get the final figure only.
export function CountUp({ value, format, duration = 1.2 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Held in a ref so a new formatter identity does not restart the count.
  const formatRef = useRef(format);
  formatRef.current = format;

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduce) return undefined;
    node.textContent = formatRef.current(0);
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = formatRef.current(v);
      },
    });
    return () => controls.stop();
  }, [value, duration, reduce]);

  return (
    <>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
    </>
  );
}
