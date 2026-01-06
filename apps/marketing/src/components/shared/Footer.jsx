import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Heart,
  Leaf,
} from "lucide-react";
import { Container, WaveDecoration, FruitDecoration } from "@/components/ui";
import { BRAND, NAVIGATION, SOCIAL_LINKS } from "@/utils/constants";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { useTheme } from "@/hooks/useTheme";
import Logo from "@/assets/logo.png";

export default function Footer() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = NAVIGATION.slice(0, 4);
  const legalLinks = [
    { label: "Aviso de Privacidad", href: "/privacidad" },
    { label: "Términos y Condiciones", href: "/terminos" },
    { label: "Contacto", href: "/contacto" },
  ];

  return (
    <footer className="relative bg-dimare-green dark:bg-dimare-green-dark text-white overflow-hidden">
      {/* Wave Top - green subtle flowing down from CTA section */}
      <WaveDecoration color="wave" position="top" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 opacity-10"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <FruitDecoration type="orange" size="xl" animated={false} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 opacity-10"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <FruitDecoration type="leaf" size="xl" animated={false} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-1/4 opacity-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <FruitDecoration type="lemon" size="lg" animated={false} />
        </motion.div>
      </div>

      <Container className="relative pt-24 pb-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={Logo}
                alt={BRAND.name}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="font-script text-xl text-dimare-green-light mb-4">
              {BRAND.slogan}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {BRAND.phrase}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-dimare-green-light" />
              Explora
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dimare-green-light group-hover:scale-150 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-dimare-green-light" />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hola@dimare.mx"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Mail className="w-4 h-4 text-dimare-green-light" />
                  hola@dimare.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+521234567890"
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-3"
                >
                  <Phone className="w-4 h-4 text-dimare-green-light" />
                  +52 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-dimare-green-light mt-1 flex-shrink-0" />
                <span>
                  Ciudad de México,
                  <br />
                  México
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={staggerItem}>
            <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-dimare-green-light" />
              Síguenos
            </h4>
            <div className="flex gap-3 mb-8">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-dimare-green-light hover:text-dimare-green transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon === "Instagram" && (
                    <Instagram className="w-5 h-5" />
                  )}
                  {social.icon === "Facebook" && (
                    <Facebook className="w-5 h-5" />
                  )}
                  {social.icon === "MessageCircle" && (
                    <MessageCircle className="w-5 h-5" />
                  )}
                </motion.a>
              ))}
            </div>

            {/* App CTA */}
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-sm mb-3">
                ¿Listo para crear tu bebida perfecta?
              </p>
              <motion.a
                href="https://app.dimare.mx"
                className="inline-flex items-center gap-2 text-dimare-green-light hover:text-white transition-colors font-display font-semibold"
                whileHover={{ x: 5 }}
              >
                Ir a la app →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Casa DI'MARE. Todos los derechos reservados.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-4">
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-white/30">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <p className="text-center text-white/40 text-xs mt-6 flex items-center justify-center gap-1">
            Hecho con <Heart className="w-3 h-3 text-dimare-red fill-current" />{" "}
            en México
          </p>
        </div>
      </Container>
    </footer>
  );
}
