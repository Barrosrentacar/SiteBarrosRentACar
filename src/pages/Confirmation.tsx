import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Confirmation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-slide-up">
              Réservation confirmée !
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
              Merci pour votre confiance. Votre véhicule vous attend.
            </p>

            {/* Confirmation Card */}
            <Card className="mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-8">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Numéro de réservation</span>
                    <span className="font-mono font-semibold text-foreground">BRC-2024-001</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Véhicule</span>
                    <span className="text-foreground">Dacia Duster 2021</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Statut</span>
                    <span className="inline-flex items-center gap-2 text-primary font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Confirmée
                    </span>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground">
                    <strong>Prochaine étape :</strong> Nous vous contacterons sur WhatsApp pour confirmer les détails de votre prise en charge.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/">
                <Button variant="default" size="lg">
                  Retour à l'accueil
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="https://wa.me/238XXXXXXXX" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <Phone className="w-4 h-4" />
                  Nous contacter
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-12 p-6 rounded-2xl bg-card border border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <h3 className="font-display font-semibold text-foreground mb-4">Besoin d'aide ?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <a href="https://wa.me/238XXXXXXXX" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +238 XXX XXXX
                </a>
                <a href="mailto:contact@barrosrentacar.cv" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  contact@barrosrentacar.cv
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
