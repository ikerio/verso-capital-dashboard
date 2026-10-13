// App.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import Auth from "./components/Auth";
import Header, { VIEWS } from "./components/Header";
import Overview from "./views/Overview";
import Market from "./views/Market";
import Valuation from "./views/Valuation";
import { AS_OF, TIERS } from "./data/portfolio";
import { fullDate } from "./lib/format";
import { EASE } from "./lib/motion";

const SESSION_KEY = "verso-invested";
const THEME_KEY = "verso-theme";
const DARK_QUERY = window.matchMedia("(prefers-color-scheme: dark)");

// Storage can be unavailable (private windows); the app works without it.
function read(store, key) {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
}
function write(store, key, value) {
  try {
    if (value == null) store.removeItem(key);
    else store.setItem(key, value);
  } catch {
    /* ignore */
  }
}

const viewFromHash = () => {
  const id = window.location.hash.slice(1);
  return VIEWS.some((v) => v.id === id) ? id : "overview";
};

export default function App() {
  const [invested, setInvested] = useState(() => {
    const saved = Number(read(sessionStorage, SESSION_KEY));
    return Object.values(TIERS).includes(saved) ? saved : null;
  });
  const [view, setView] = useState(viewFromHash);

  // The theme follows the system until the investor picks one.
  const [themeChoice, setThemeChoice] = useState(() => read(localStorage, THEME_KEY));
  const [systemTheme, setSystemTheme] = useState(() => (DARK_QUERY.matches ? "dark" : "light"));
  const theme = themeChoice ?? systemTheme;

  useEffect(() => {
    const onChange = (e) => setSystemTheme(e.matches ? "dark" : "light");
    DARK_QUERY.addEventListener("change", onChange);
    return () => DARK_QUERY.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (themeChoice) document.documentElement.dataset.theme = themeChoice;
    else delete document.documentElement.dataset.theme;
  }, [themeChoice]);

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goTo = (id) => {
    window.location.hash = id;
    window.scrollTo(0, 0);
  };

  const signIn = (amount) => {
    write(sessionStorage, SESSION_KEY, String(amount));
    setInvested(amount);
  };

  const signOut = () => {
    write(sessionStorage, SESSION_KEY, null);
    setInvested(null);
    window.history.replaceState(null, "", window.location.pathname);
    setView("overview");
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    write(localStorage, THEME_KEY, next);
    // Colours cross-fade only while the theme is switching.
    const root = document.documentElement;
    root.classList.add("theme-switching");
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);
    setThemeChoice(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {!invested ? (
          <Auth key="auth" onSignIn={signIn} />
        ) : (
          <motion.div
            key="report"
            className="shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Header
              view={view}
              onView={goTo}
              invested={invested}
              theme={theme}
              onToggleTheme={toggleTheme}
              onSignOut={signOut}
            />
            <AnimatePresence mode="wait">
              <motion.main
                key={view}
                className="container page"
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16, ease: "easeIn" }}
              >
                {view === "overview" && <Overview invested={invested} onView={goTo} />}
                {view === "market" && <Market />}
                {view === "valuation" && <Valuation invested={invested} />}
              </motion.main>
            </AnimatePresence>
            <footer className="container foot">
              <p>
                Values from June 2025 onward are model estimates, not prices at which the position can be sold. Market
                data as of {fullDate(AS_OF)}. This report is for Verso Capital investors and is not investment advice.
              </p>
              <p>© 2026 Verso Capital</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
