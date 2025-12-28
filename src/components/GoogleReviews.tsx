import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    id: 1,
    name: "Sophie Martin",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "Service impeccable ! Voiture propre et bien entretenue. L'équipe est très professionnelle et réactive sur WhatsApp. Je recommande vivement !",
    avatar: "SM",
  },
  {
    id: 2,
    name: "Jean-Pierre Dupont",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Excellente expérience de location. Prix transparents, pas de mauvaises surprises. La livraison à l'aéroport était parfaite.",
    avatar: "JD",
  },
  {
    id: 3,
    name: "Maria Santos",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Muito bom serviço! A equipa é muito simpática e o carro estava em perfeitas condições. Recomendo!",
    avatar: "MS",
  },
  {
    id: 4,
    name: "Thomas Bernard",
    rating: 4,
    date: "Il y a 2 mois",
    text: "Très satisfait de mon expérience. Le Dacia Duster était parfait pour explorer l'île. Communication fluide et professionnelle.",
    avatar: "TB",
  },
];

const GoogleReviews = () => {
  const averageRating = 4.9;
  const totalReviews = 47;

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Google">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-muted-foreground text-lg">Avis Google</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos <span className="text-gradient">clients</span>
          </h2>
          
          {/* Rating summary */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="text-4xl font-bold text-foreground">{averageRating}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${star <= Math.round(averageRating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">{totalReviews} avis</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3">
                    {review.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://g.page/r/barrosrentacar/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Voir tous les avis sur Google
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
