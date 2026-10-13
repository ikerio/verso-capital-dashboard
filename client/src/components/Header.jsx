// Header.jsx — brand, the three views, and session controls.
import { motion } from "framer-motion";
import { Globe, LayoutDashboard, LogOut, Moon, Scale, Sun } from "lucide-react";
import { AS_OF, REPORT } from "../data/portfolio";
import { fullDate, usd } from "../lib/format";
import { EASE, SPRING } from "../lib/motion";

export const VIEWS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "market", label: "Market", icon: Globe },
  { id: "valuation", label: "Valuation", icon: Scale },
];

export default function Header({ view, onView, invested, theme, onToggleTheme, onSignOut }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-row container">
          <div className="brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="32" height="32" />
            <span className="brand-name">Verso Capital</span>
          </div>

          <nav className="tabs" aria-label="Report sections">
            {VIEWS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className="tab"
                aria-current={view === id ? "page" : undefined}
                onClick={() => onView(id)}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
                {view === id && <motion.span layoutId="tab-underline" className="tab-underline" transition={SPRING} />}
              </button>
            ))}
          </nav>

          <div className="topbar-tools">
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              <motion.span
                key={theme}
                className="icon-btn-inner"
                initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
              </motion.span>
            </button>
            <button type="button" className="btn btn--quiet" onClick={onSignOut} aria-label="Sign out">
              <LogOut size={15} aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <motion.div
        className="meta container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="meta-pill">{REPORT.title}</span>
        <span>Data as of {fullDate(AS_OF)}</span>
        <span>{usd(invested)} invested</span>
      </motion.div>
    </>
  );
}
