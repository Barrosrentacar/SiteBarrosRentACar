import { AppleEmoji, EmojiName } from "./AppleEmoji";

const features = [
  {
    emoji: "lock" as EmojiName,
    title: "Réservation sécurisée",
    description: "Paiement sécurisé et ",
    highlight: "confirmation immédiate",
    highlightColor: "text-emerald-500",
    descriptionEnd: " par email après validation de votre réservation.",
  },
  {
    emoji: "lightning" as EmojiName,
    title: "Rapide et simple",
    description: "Réservez en quelques minutes, à tout moment. Une expérience fluide, disponible ",
    highlight: "24h/24 et 7j/7",
    highlightColor: "text-amber-500",
    descriptionEnd: ", sans démarches compliquées.",
  },
  {
    emoji: "car" as EmojiName,
    title: "Livraison sur mesure",
    description: "Retrait et retour flexibles : à ",
    highlight: "l'aéroport ou à l'adresse de votre choix",
    highlightColor: "text-blue-500",
    descriptionEnd: ". Nous nous adaptons à votre organisation.",
  },
  {
    emoji: "whatsapp" as EmojiName,
    title: "Support humain dédié",
    description: "Une équipe réactive et à l'écoute, joignable directement sur ",
    highlight: "WhatsApp",
    highlightColor: "text-emerald-500",
    descriptionEnd: ", pour vous accompagner avant, pendant et après votre location.",
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F8F6] to-[#F0F0EC]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Pourquoi nous choisir
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-7 border border-border/30 hover:border-transparent hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Emoji icon with circular light background */}
                <div className="mb-6 w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center">
                  <AppleEmoji name={feature.emoji} size="md" />
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-foreground text-base mb-3">
                  {feature.title}
                </h3>
                
                {/* Description with colored highlights */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                  <span className={`${feature.highlightColor} font-medium`}>
                    {feature.highlight}
                  </span>
                  {feature.descriptionEnd}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;