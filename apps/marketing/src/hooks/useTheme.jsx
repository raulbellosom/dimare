import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dimare-theme");
      if (stored) return stored;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  // Ref para el botón de toggle del tema
  const themeToggleRef = useRef(null);

  // Hook de animación del tema
  const { ref: animationRef, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 500,
    isDarkMode: theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light");
    },
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("dimare-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    toggleSwitchTheme();
  }, [toggleSwitchTheme]);

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
    themeToggleRef: animationRef,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
