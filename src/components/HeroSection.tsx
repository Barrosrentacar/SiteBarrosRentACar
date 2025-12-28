import BookingWidget from "./BookingWidget";
import { AppleEmoji } from "./AppleEmoji";
import heroImage from "@/assets/hero-car.jpg";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center pt-20 bg-background overflow-hidden">
      {/* Background Image with Apple-style light overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Dacia Duster sur une route côtière au Cap-Vert" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        
        {/* Subtle decorative glow effects - Apple style */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Apple style minimal */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <AppleEmoji name="palm" size="sm" />
            <span className="text-sm font-medium text-foreground">Cap-Vert • Praia</span>
          </div>

          {/* Headline - Apple typography style */}
          <h1 className="font-display text-display-lg md:text-display-xl font-bold text-foreground mb-8 animate-slide-up">
            Louez votre voiture au{" "}
            <span className="text-gradient">
Cap-Vert</span>
          </h1>

          {/* Subheadline - lighter weight */}
          <p className="text-heading-lg md:text-heading-xl text-muted-foreground mb-6 animate-slide-up font-light" style={{
          animationDelay: "100ms"
        }}>
            Simple. Rapide. Fiable.
          </p>

          {/* Description */}
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mb-12 animate-slide-up leading-relaxed" style={{
          animationDelay: "200ms"
        }}>
            Réservez en quelques minutes, avec disponibilité en temps réel et paiement sécurisé. 
            Récupérez votre véhicule à l'aéroport ou en ville.
          </p>

          {/* Booking Widget */}
          <div className="animate-scale-in max-w-4xl mx-auto" style={{
          animationDelay: "300ms"
        }}>
            <BookingWidget variant="hero" />
          </div>

          {/* Trust indicators - Apple clean style */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm animate-fade-in" style={{
          animationDelay: "500ms"
        }}>
            {[{
            emoji: "check" as const,
            text: "Confirmation instantanée"
          }, {
            emoji: "shield" as const,
            text: "Annulation gratuite"
          }, {
            emoji: "headphones" as const,
            text: "Support WhatsApp"
          }].map(item => <div key={item.text} className="flex items-center gap-2.5 text-muted-foreground">
                <AppleEmoji name={item.emoji} size="sm" />
                <span className="font-medium">{item.text}</span>
              </div>)}
          </div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 rounded-full bg-primary" />
        </div>
      </div>
    </section>;
};
export default HeroSection;