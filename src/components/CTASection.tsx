import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppleEmoji } from "./AppleEmoji";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative emojis */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <AppleEmoji name="sun" size="xl" animated />
            <AppleEmoji name="palm" size="2xl" animated />
            <AppleEmoji name="car" size="xl" animated />
          </div>

          <h2 className="font-display text-display md:text-display-lg font-bold text-foreground mb-6">
            Prêt à explorer le{" "}
            <span className="text-gradient">Cap-Vert</span> ?
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Réservez votre véhicule en quelques clics et profitez de votre séjour en toute liberté.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/reserver">
              <Button variant="hero" size="xl" className="shadow-glow">
                Réserver maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/238XXXXXXXX" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="xl">
                <Phone className="w-5 h-5" />
                Nous contacter
              </Button>
            </a>
          </div>

          {/* Stats with emojis - Apple clean style */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Clients satisfaits", emoji: "heart" as const },
              { value: "24/7", label: "Support disponible", emoji: "headphones" as const },
              { value: "100%", label: "Sécurisé", emoji: "shield" as const },
              { value: "4.9★", label: "Note moyenne", emoji: "star" as const },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-display font-bold text-gradient">{stat.value}</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <AppleEmoji name={stat.emoji} size="sm" className="opacity-70 group-hover:opacity-100 transition-opacity" />
                  <p className="text-body-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;