import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-6">
            {t("about.title")}
          </h2>
          <p className="text-2xl md:text-4xl font-medium leading-relaxed text-foreground/90">
            {t("about.content")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
