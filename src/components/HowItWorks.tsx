import { AppleEmoji, EmojiCard, EmojiName } from "./AppleEmoji";

const steps = [
  {
    step: 1,
    emoji: "car" as EmojiName,
    title: "Choisissez votre voiture",
    description: "Sélectionnez le véhicule qui correspond à votre séjour et à votre budget.",
  },
  {
    step: 2,
    emoji: "credit-card" as EmojiName,
    title: "Paiement sécurisé",
    description: "Validez votre réservation et réglez en ligne en toute sécurité.",
  },
  {
    step: 3,
    emoji: "key" as EmojiName,
    title: "Retrait au Cap-Vert",
    description: "Récupérez votre voiture à l'aéroport ou à un lieu défini avec notre équipe.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - Apple style */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium mb-6 border border-border">
            <AppleEmoji name="sparkles" size="sm" />
            Comment ça marche
          </span>
          <h2 className="font-display text-display md:text-display-lg font-bold text-foreground mb-6">
            Louez en{" "}
            <span className="text-gradient">3 étapes</span>
          </h2>
          <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto leading-relaxed">
            Un processus simple et rapide pour profiter de votre séjour au Cap-Vert en toute liberté.
          </p>
        </div>

        {/* Steps Grid - Apple card style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="group relative"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-border via-border/50 to-transparent" />
              )}

              {/* Card - Apple clean style */}
              <div className="relative bg-card rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-500 border border-border hover:border-primary/20 hover:-translate-y-2">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-bold shadow-glow">
                  {item.step}
                </div>

                {/* Emoji Container */}
                <EmojiCard emoji={item.emoji} variant="gradient" className="mb-6" />

                {/* Content */}
                <h3 className="font-display text-heading font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-body leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Prêt à explorer le Cap-Vert ?{" "}
            <AppleEmoji name="palm" size="sm" className="mx-1" />
            <a href="/vehicules" className="text-primary font-semibold hover:underline transition-colors duration-300">
              Découvrez nos véhicules →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;