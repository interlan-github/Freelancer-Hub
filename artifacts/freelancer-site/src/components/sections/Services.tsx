import { motion } from "framer-motion";
import { 
  Server, 
  Database, 
  Activity, 
  HardDrive, 
  Cloud 
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const { t } = useTranslation();

  const services = [
    {
      id: "osAdmin",
      icon: Server,
    },
    {
      id: "appAdmin",
      icon: Database,
    },
    {
      id: "monitoring",
      icon: Activity,
    },
    {
      id: "backup",
      icon: HardDrive,
    },
    {
      id: "devops",
      icon: Cloud,
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-xl mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-4">
            {t("services.title")}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            Infrastructure engineered for scale and stability.
          </h3>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={item}>
                <Card className="h-full bg-card hover:bg-secondary/50 transition-colors border-border/50 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <CardTitle className="text-xl">
                      {t(`services.${service.id}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`services.${service.id}.desc`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
