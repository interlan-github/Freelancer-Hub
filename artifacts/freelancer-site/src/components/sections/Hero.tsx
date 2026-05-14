import { motion } from "framer-motion";
import { Server, Terminal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import profilePhoto from "@assets/profile-avatar_1778734316488.png";

export function Hero() {
  const { t } = useTranslation();

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

          {/* Left: text */}
          <div className="flex flex-col items-start gap-8 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border text-sm font-mono font-medium">
                <Server size={14} className="text-primary" />
                <span>{t("hero.badgeSysAdmin")}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border text-sm font-mono font-medium">
                <Terminal size={14} className="text-primary" />
                <span>{t("hero.badgeDevOps")}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {t("hero.name")}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground max-w-xl leading-snug">
                {t("hero.tagline")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button size="lg" className="h-14 px-8 text-base font-semibold group" onClick={scrollToServices}>
                {t("hero.cta")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="shrink-0 flex items-center justify-center"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-blue-400/20 blur-2xl scale-110" />
              <img
                src={profilePhoto}
                alt="Anton Chernousov"
                className="relative w-full h-full rounded-full object-cover object-top border-4 border-primary/20 shadow-xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
