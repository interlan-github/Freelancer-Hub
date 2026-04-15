import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, DollarSign, Laptop } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function Advantages() {
  const { t } = useTranslation();

  const advantages = [
    { id: "exp", icon: CheckCircle2 },
    { id: "rel", icon: Clock },
    { id: "doc", icon: FileText },
    { id: "price", icon: DollarSign },
    { id: "remote", icon: Laptop },
  ];

  return (
    <section id="advantages" className="py-20 md:py-32 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-4">
            {t("advantages.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col gap-3 items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-background shadow-sm border border-border flex items-center justify-center text-primary mb-2">
                  <Icon size={24} />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  {t(`advantages.${adv.id}`)}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t(`advantages.${adv.id}Desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
