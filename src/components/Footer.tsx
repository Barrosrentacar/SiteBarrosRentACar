import { Link } from "react-router-dom";
import { Mail, MessageCircle, Instagram, Facebook, ExternalLink } from "lucide-react";
import logoBarros from "@/assets/logo-barros.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { href: "/qui-sommes-nous", label: "À propos" },
    { href: "/conditions-generales", label: "Conditions générales" },
    { href: "/politique-confidentialite", label: "Politique de confidentialité" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = [
    { href: "/vehicules", label: "Nos véhicules" },
    { href: "/reserver", label: "Réserver" },
    { href: "/gerer-reservation", label: "Gérer ma réservation" },
  ];

  return (
    <footer className="bg-[#FAFAFA] border-t border-border/30 font-helvetica">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logoBarros} 
                alt="Barros Rent A Car" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Votre partenaire de confiance pour la location de voitures au Cap-Vert.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-[#0066CC] transition-colors duration-200 text-sm group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-[#0066CC] transition-colors duration-200 text-sm group"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5">
              Assistance
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/238XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-[#0066CC] transition-colors duration-200 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@barrosrentacar.cv"
                  className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-[#0066CC] transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  contact@barrosrentacar.cv
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-8">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                Suivez-nous
              </h4>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-foreground/50 hover:text-[#0066CC] transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-foreground/50 hover:text-[#0066CC] transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs">
              © {currentYear} Barros Rent A Car. Tous droits réservés.
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Praia, Cap-Vert
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
