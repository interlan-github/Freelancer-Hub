import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#portfolio", label: t("nav.portfolio") },
    { href: "#contact", label: t("nav.contacts") },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex flex-col group"
          >
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              A.Chernousov
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              SysAdmin & DevOps
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hidden lg:block"
              >
                {t("nav.aboutMeLink")}
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors hidden lg:block"
              >
                {t("nav.blogLink")}
              </a>

              <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    language === "ru"
                      ? "bg-background shadow-sm text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    language === "en"
                      ? "bg-background shadow-sm text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  EN
                </button>
              </div>

              <Button
                size="sm"
                onClick={(e) => handleNavClick(e as any, "#contact")}
              >
                {t("nav.submitRequest")}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <div className="flex items-center gap-1 bg-secondary rounded-full p-1">
              <button
                onClick={() => setLanguage("ru")}
                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  language === "ru"
                    ? "bg-background shadow-sm text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  language === "en"
                    ? "bg-background shadow-sm text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg py-4 px-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-border w-full my-2"></div>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-foreground hover:text-primary"
            >
              {t("nav.aboutMeLink")}
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-foreground hover:text-primary"
            >
              {t("nav.blogLink")}
            </a>
            <Button
              className="w-full mt-4"
              onClick={(e) => handleNavClick(e as any, "#contact")}
            >
              {t("nav.submitRequest")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
