import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Portfolio() {
  const { t } = useTranslation();

  const cases = [
    { id: "case1" },
    { id: "case2" },
    { id: "case3" },
    { id: "case4" },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-4">
            {t("portfolio.title")}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            {t("portfolio.subtitle")}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((c, index) => {
            // Need to handle tools array specifically
            const toolsKey = `portfolio.${c.id}.tools`;
            
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card hover:shadow-md transition-all border-border/60 overflow-hidden group">
                  <div className="h-2 bg-gradient-to-r from-primary to-blue-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start gap-4">
                      <Badge variant="secondary" className="font-mono bg-secondary/80">
                        {t(`portfolio.${c.id}.client`)}
                      </Badge>
                      <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold mt-4 leading-tight">
                      {t(`portfolio.${c.id}.title`)}
                    </h4>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider font-semibold">{t("portfolio.keyResult")}</p>
                      <p className="text-lg font-medium text-primary">
                        {t(`portfolio.${c.id}.result`)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                       {/* Hardcoding tool arrays based on translations since dynamic arrays via split might be tricky to type safely in simple i18n */}
                       {(c.id === "case1" ? ["Windows Server 2022", "AD", "Hyper-V"] :
                         c.id === "case2" ? ["GitLab CI", "Docker", "Kubernetes"] :
                         c.id === "case3" ? ["Zabbix", "Grafana", "Prometheus"] :
                         ["Veeam", "Bacula", "AWS"]).map(tool => (
                         <Badge key={tool} variant="outline" className="font-mono text-xs">
                           {tool}
                         </Badge>
                       ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
