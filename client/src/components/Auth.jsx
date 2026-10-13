// Auth.jsx — sign-in. A passcode maps to the amount the investor put in.
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight, Check, Eye, EyeOff, Globe, LayoutDashboard, LoaderCircle, Lock, Scale } from "lucide-react";
import { AS_OF, REPORT, TIERS } from "../data/portfolio";
import { fullDate } from "../lib/format";
import { EASE } from "../lib/motion";

const INSIDE = [
  { icon: LayoutDashboard, title: "Where your position stands", text: "Current value, month by month" },
  { icon: Globe, title: "The market behind it", text: "ADA, Bitcoin and Cardano NFTs" },
  { icon: Scale, title: "How the figure is built", text: "The valuation model, in plain terms" },
];

// Nested inverted triangles, echoing the mark. Each is scaled about the centroid.
const TRIANGLES = [1, 0.82, 0.64, 0.46, 0.28, 0.12].map((s) => {
  const cx = 300;
  const cy = 173.3;
  const pt = (x, y) => `${(cx + s * (x - cx)).toFixed(1)},${(cy + s * (y - cy)).toFixed(1)}`;
  return `M${pt(0, 0)}L${pt(600, 0)}L${pt(300, 520)}Z`;
});

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = (delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren } },
});

export default function Auth({ onSignIn }) {
  const [passcode, setPasscode] = useState("");
  const [reveal, setReveal] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | checking | ok
  const [error, setError] = useState("");
  const shake = useAnimationControls();
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(window.setTimeout(fn, ms));

  const fail = (message) => {
    setStatus("idle");
    setError(message);
    shake.start({ x: [0, -9, 8, -6, 5, -2, 0], transition: { duration: 0.42, ease: "easeOut" } });
  };

  const submit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    const code = passcode.trim().toUpperCase();
    if (!code) {
      fail("Enter your passcode.");
      return;
    }
    setStatus("checking");
    later(() => {
      const invested = TIERS[code];
      if (!invested) {
        fail("That passcode isn't recognised. Check it and try again.");
        return;
      }
      setStatus("ok");
      later(() => onSignIn(invested), 420);
    }, 480);
  };

  return (
    <motion.main
      className="auth"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <section className="auth-brand" aria-label="About this report">
        <div className="auth-glow" aria-hidden="true" />
        <svg className="auth-motif" viewBox="-4 -4 608 528" aria-hidden="true">
          {TRIANGLES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 - i * 0.1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.25 + i * 0.14 }}
            />
          ))}
        </svg>

        <motion.div className="auth-brand-top" variants={stagger(0.1)} initial="hidden" animate="show">
          <motion.div className="auth-mark" variants={item}>
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="44" height="44" />
            <span>Verso Capital</span>
          </motion.div>
        </motion.div>

        <motion.div className="auth-brand-body" variants={stagger(0.25)} initial="hidden" animate="show">
          <motion.p className="auth-kicker" variants={item}>
            Investor report
          </motion.p>
          <motion.h2 className="auth-headline" variants={item}>
            {REPORT.title}
          </motion.h2>
          <motion.p className="auth-lede" variants={item}>
            A clear account of what your position is worth today and why. Data as of {fullDate(AS_OF)}.
          </motion.p>
          <ul className="auth-inside">
            {INSIDE.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={item}>
                <span className="auth-inside-icon">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          className="auth-brand-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Confidential. For Verso Capital investors only.
        </motion.p>
      </section>

      <section className="auth-panel">
        <motion.form
          className="auth-form"
          onSubmit={submit}
          noValidate
          variants={stagger(0.2)}
          initial="hidden"
          animate="show"
        >
          <motion.span className="auth-lock" variants={item} aria-hidden="true">
            <Lock size={18} />
          </motion.span>
          <motion.h1 className="auth-title" variants={item}>
            Sign in
          </motion.h1>
          <motion.p className="auth-sub" variants={item}>
            Enter your investor passcode to open your report.
          </motion.p>

          <motion.div variants={item}>
            <label className="field-label" htmlFor="passcode">
              Investor passcode
            </label>
            <motion.div className="field-wrap" animate={shake}>
              <input
                id="passcode"
                className="field"
                type={reveal ? "text" : "password"}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck="false"
                autoFocus
                value={passcode}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "passcode-error" : undefined}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
              />
              <button
                type="button"
                className="field-toggle"
                onClick={() => setReveal((r) => !r)}
                aria-label={reveal ? "Hide passcode" : "Show passcode"}
              >
                {reveal ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
              </button>
            </motion.div>
            <p id="passcode-error" className="field-error" role="alert">
              {error}
            </p>
          </motion.div>

          <motion.button
            type="submit"
            className={`btn btn--primary auth-submit${status === "ok" ? " is-ok" : ""}`}
            variants={item}
            whileTap={{ scale: 0.985 }}
            disabled={status !== "idle"}
          >
            {status === "idle" && (
              <>
                View report
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
            {status === "checking" && (
              <>
                <LoaderCircle size={16} className="spin" aria-hidden="true" />
                Verifying
              </>
            )}
            {status === "ok" && (
              <>
                <Check size={16} aria-hidden="true" />
                Opening your report
              </>
            )}
          </motion.button>

          <motion.p className="auth-help" variants={item}>
            Trouble signing in? <a href="mailto:support@versocapital.com">Contact support</a>
          </motion.p>
        </motion.form>
        <p className="auth-foot">© 2026 Verso Capital</p>
      </section>
    </motion.main>
  );
}
