import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const faqs = [
    {
      question: "Quels documents sont nécessaires ?",
      answer: "Un permis de conduire valide ainsi qu'une pièce d'identité (carte d'identité ou passeport) sont requis pour louer un véhicule."
    },
    {
      question: "La caution est-elle toujours remboursée ?",
      answer: "Oui, la caution est intégralement remboursée sous 5 à 10 jours ouvrés après restitution du véhicule, sauf en cas de frais justifiés (dommages constatés, carburant manquant, amendes ou infractions)."
    },
    {
      question: "Où se fait la remise du véhicule ?",
      answer: "La remise du véhicule peut se faire à l'aéroport Nelson Mandela de Praia ou dans la ville de Praia, selon l'accord établi lors de la réservation."
    },
    {
      question: "Puis-je modifier ma réservation ?",
      answer: "Oui, vous pouvez modifier votre réservation selon les conditions de votre tarif. Contactez-nous par WhatsApp ou email pour toute demande de modification."
    },
    {
      question: "Comment fonctionne le paiement ?",
      answer: "Un acompte de 50 % est demandé lors de la réservation pour bloquer le véhicule. Le solde de 50 % est à régler au moment de la remise du véhicule, en espèces ou via le moyen de paiement convenu."
    },
    {
      question: "Quel est le montant de la caution ?",
      answer: "La caution s'élève à 350 €. Elle peut être réglée en espèces (euros ou escudos CVE) ou via un lien de paiement sécurisé en ligne."
    },
    {
      question: "Que se passe-t-il en cas de retard de restitution ?",
      answer: "Tout dépassement non autorisé de la durée de location entraîne des frais supplémentaires de 70 € par jour. Nous vous recommandons de nous contacter en cas d'imprévu."
    },
    {
      question: "Le véhicule est-il assuré ?",
      answer: "Tous nos véhicules sont assurés. Des options de protection supplémentaires sont disponibles lors de la réservation pour une couverture étendue."
    },
    {
      question: "Comment annuler ma réservation ?",
      answer: "Pour annuler, contactez-nous par WhatsApp ou email. Le remboursement dépend du délai d'annulation : 100 % si plus de 7 jours avant, 20 % entre 3 et 7 jours, et aucun remboursement à moins de 3 jours."
    },
    {
      question: "Proposez-vous des accessoires supplémentaires ?",
      answer: "Oui, nous proposons des options telles que le GPS, les sièges enfants et le WiFi portable. Ces accessoires peuvent être ajoutés lors de la réservation."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </Link>

            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Questions fréquentes</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Foire aux <span className="text-gradient">questions</span>
              </h1>
              <p className="text-muted-foreground">
                Retrouvez les réponses aux questions les plus fréquentes sur nos services de location.
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 bg-secondary/20 data-[state=open]:bg-secondary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Contact CTA */}
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Vous avez d'autres questions ?
              </h3>
              <p className="text-muted-foreground mb-4">
                Notre équipe est disponible pour vous aider.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Nous contacter
                </Link>
                <a
                  href="https://wa.me/238XXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#25D366]/90 transition-colors"
                >
                  WhatsApp
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

export default FAQ;
