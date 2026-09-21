"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export const THEME_KEY = "theme";

export default function ThemeToggle() {
  // null until mounted: the real value is set by the inline script in <head>,
  // so the server render never guesses (and never mismatches).
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode: the switch still works for this visit.
    }
    setTheme(next);
  }

  const label =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-rule text-dim transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "light" ? (
        <Moon size={17} aria-hidden />
      ) : (
        <Sun size={17} aria-hidden />
      )}
    </button>
  );
}
