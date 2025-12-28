import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import LanguageSelector from "@/components/LanguageSelector";
import logoBarros from "@/assets/logo-barros.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinks = [
    { href: "/vehicules", label: t("vehicles") },
    { href: "/gerer-reservation", label: "Mes réservations" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success(t("logout"));
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5F0] border-b border-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={logoBarros} 
                alt="Barros Rent A Car" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-foreground">Barros</span>
              <span className="font-display font-light text-lg text-muted-foreground ml-1">Rent A Car</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 font-medium transition-all duration-200 group ${
                  isActive(link.href)
                    ? "text-[#0066CC]"
                    : "text-foreground/70 hover:text-[#0066CC]"
                }`}
              >
                {link.label}
                {/* Underline indicator */}
                <span 
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#0066CC] transform origin-left transition-transform duration-300 ease-out ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language selector */}
            <LanguageSelector />

            {/* Auth section */}
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{user.email?.split("@")[0]}</span>
                  <button 
                    onClick={handleSignOut} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="flex items-center gap-1 text-sm">
                  <span className="font-medium text-foreground hover:text-primary transition-colors">{t("login")}</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="font-medium text-foreground hover:text-primary transition-colors">{t("signup")}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {/* Language selector mobile */}
              <div className="flex items-center px-4 py-2">
                <LanguageSelector />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#0066CC] bg-[#0066CC]/5"
                      : "text-foreground/70 hover:text-[#0066CC] hover:bg-[#0066CC]/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center justify-between px-4 py-3 mt-2 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{user.email?.split("@")[0]}</span>
                  </div>
                  <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="default" className="w-full mt-2">
                    {t("login")}
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
