import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button, Section } from "@/components/ui";
import { BRAND } from "@/utils/constants";

export default function AboutPage() {
  useEffect(() => {
    document.title = "Nosotros | Casa DI' MARE";
  }, []);

  return (
    <Section className="pt-32 pb-20 min-h-screen bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-dimare-green font-display text-sm uppercase tracking-wider mb-4">
            <Users className="w-4 h-4" />
            Nuestra Historia
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Conoce la historia detrás de Casa DI' MARE y nuestra pasión por las
            bebidas naturales.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl font-bold text-[var(--text-heading)] mb-6">
              Una historia de pasión por lo natural
            </h2>
            <div className="space-y-4 text-[var(--text-secondary)]">
              <p>
                Casa DI' MARE nació de un sueño simple pero poderoso: ofrecer
                bebidas que nutran el cuerpo y el alma, preparadas con el mismo
                amor y cuidado que pondríamos en nuestra propia cocina.
              </p>
              <p>
                Creemos que lo natural es lo mejor. Por eso, cada una de
                nuestras bebidas está hecha con ingredientes frescos, sin
                conservadores artificiales ni azúcares añadidos.
              </p>
              <p>
                Nuestro nombre representa la frescura del mar y la calidez del
                hogar, valores que guían cada decisión que tomamos.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="aspect-square bg-gradient-to-br from-dimare-green-light/30 to-dimare-green/30 rounded-3xl flex items-center justify-center">
              <div className="text-center p-8">
                <Leaf className="w-24 h-24 text-dimare-green mx-auto mb-4" />
                <p className="font-script text-3xl text-dimare-green">
                  {BRAND.slogan}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-[var(--text-heading)] text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Naturalidad",
                description:
                  "Nos comprometemos a usar solo ingredientes 100% naturales, respetando la pureza de cada producto.",
              },
              {
                icon: Heart,
                title: "Pasión",
                description:
                  "Cada bebida es preparada con amor y dedicación, como si fuera para nuestra propia familia.",
              },
              {
                icon: Users,
                title: "Comunidad",
                description:
                  "Creemos en construir relaciones duraderas con nuestros clientes y proveedores locales.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-[var(--bg-card)] rounded-3xl p-8 text-center shadow-lg border border-[var(--border-color)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-dimare-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-dimare-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-[var(--text-heading)] mb-3">
                  {value.title}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="bg-[var(--bg-card)] rounded-3xl p-8 md:p-12 shadow-lg border border-[var(--border-color)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="font-display text-3xl font-bold text-[var(--text-heading)] text-center mb-8">
            Contáctanos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: "Ubicación",
                info: "Ciudad de México, México",
              },
              {
                icon: Phone,
                title: "Teléfono",
                info: "+52 55 1234 5678",
              },
              {
                icon: Mail,
                title: "Email",
                info: "hola@casadimare.mx",
              },
              {
                icon: Clock,
                title: "Horario",
                info: "Lun - Vie: 8am - 6pm",
              },
            ].map((contact) => (
              <div key={contact.title} className="text-center">
                <div className="w-12 h-12 bg-dimare-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <contact.icon className="w-6 h-6 text-dimare-green" />
                </div>
                <h3 className="font-display font-semibold text-[var(--text-heading)] mb-1">
                  {contact.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {contact.info}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
