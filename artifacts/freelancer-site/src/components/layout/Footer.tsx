import { Github, Linkedin, Mail, Send } from "lucide-react";
import { FaTelegram, FaFacebook } from "react-icons/fa";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col group w-fit">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                A.Chernousov
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {t("footer.specialty")}
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              {t("about.content").substring(0, 120)}...
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("nav.home")}
              </a>
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("nav.services")}
              </a>
              <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("nav.portfolio")}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("nav.aboutMeLink")}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                {t("nav.blogLink")}
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
              {t("footer.connect")}
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-[#0088cc] transition-colors p-2 bg-secondary rounded-full">
                <FaTelegram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#1877F2] transition-colors p-2 bg-secondary rounded-full">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-[#0a66c2] transition-colors p-2 bg-secondary rounded-full">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors p-2 bg-secondary rounded-full">
                <Github size={20} />
              </a>
            </div>
            <a
              href="mailto:anton@chernousov.dev"
              className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 mt-2"
            >
              <Mail size={16} /> anton@chernousov.dev
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
