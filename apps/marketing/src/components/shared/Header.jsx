import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Leaf } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useTheme } from "@/hooks/useTheme";
import { useScrollPosition } from "@/hooks/useScroll";
import { Button } from "@/components/ui";
import { NAVIGATION, BRAND } from "@/utils/constants";
import Icon from "@/assets/icon.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, themeToggleRef } = useTheme();
  const { isAtTop } = useScrollPosition();
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "backdrop-blur-md bg-dimare-green/95 dark:bg-dimare-green-dark/95 shadow-sm"
        )}
      >
        <nav className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label={BRAND.name}
            >
              <motion.img
                src={Icon}
                alt={BRAND.name}
                className="h-10 md:h-12 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-[10px] md:text-xs font-medium text-white/70 tracking-wider">
                  Casa
                </span>
                <span className="font-display text-lg md:text-xl font-bold text-white tracking-wide">
                  DI' MARE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAVIGATION.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.href}
                  active={location.pathname === item.href}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Theme Toggle */}
              <motion.button
                ref={themeToggleRef}
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  "hover:bg-white/10 text-white"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={
                  theme === "dark"
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
                }
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Button
                  as="a"
                  href={`${
                    import.meta.env.VITE_APP_URL || "https://app.dimare.mx"
                  }/login`}
                  size="sm"
                  variant="primary"
                  icon={<Leaf className="w-4 h-4" />}
                >
                  Iniciar sesión
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={cn(
        "relative px-4 py-2 font-display text-sm font-medium transition-colors rounded-lg",
        active
          ? "text-white dark:text-white font-semibold"
          : "text-white/80 hover:text-white dark:text-white/80 dark:hover:text-white"
      )}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-white/10 dark:bg-white/10 rounded-lg -z-10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-gradient-to-b from-dimare-green-dark/95 to-dimare-green/95 dark:from-black/95 dark:to-dimare-green-dark/95 backdrop-blur-xl z-50 lg:hidden shadow-2xl border-r border-white/10"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="flex flex-col h-full p-6 pt-8">
              {/* Brand Header */}
              <motion.div
                className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Leaf className="w-8 h-8 text-dimare-green-light" />
                <div>
                  <span className="block text-xs text-dimare-green-light/80 font-display tracking-wider">
                    Casa
                  </span>
                  <span className="block text-xl font-bold text-white font-display tracking-wide">
                    DI' MARE
                  </span>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-1">
                {NAVIGATION.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl font-display text-base transition-all",
                        location.pathname === item.href
                          ? "bg-white/20 text-white backdrop-blur-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-white/10"
              >
                <Button
                  as="a"
                  href={`${
                    import.meta.env.VITE_APP_URL || "https://app.dimare.mx"
                  }/login`}
                  size="lg"
                  variant="primary"
                  className="w-full !bg-white/20 hover:!bg-white/30 backdrop-blur-sm"
                  icon={<Leaf className="w-5 h-5" />}
                >
                  Iniciar sesión
                </Button>
              </motion.div>

              {/* Brand Slogan */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 text-center"
              >
                <span className="font-script text-lg text-dimare-green-light/80">
                  {BRAND.slogan}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
