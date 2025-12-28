import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, AlertTriangle, CreditCard, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ConditionsGenerales = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Conditions de location</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Conditions <span className="text-gradient">générales</span>
              </h1>
              <p className="text-muted-foreground">
                Barros Rent A Car — Cap-Vert
              </p>
            </div>

            {/* Content */}
            <div className="space-y-10">
              
              {/* Section 1 */}
              <section className="p-6 rounded-2xl bg-secondary/30">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                  Informations légales
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong className="text-foreground">Nom commercial :</strong> Barros Rent A Car</p>
                  <p><strong className="text-foreground">Responsable du site :</strong> À définir</p>
                  <p><strong className="text-foreground">Adresse :</strong> Praia, Cap-Vert</p>
                  <p><strong className="text-foreground">Email :</strong> contact@barrosrentacar.cv</p>
                  <p><strong className="text-foreground">Téléphone / WhatsApp :</strong> +238 XXX XXXX</p>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="font-medium text-foreground mb-2">Contacts opérationnels :</p>
                    <p>France : Contact à définir</p>
                    <p>Cap-Vert : Contact à définir</p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                  Réservation et paiement
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Toute réservation nécessite le versement d'un <strong className="text-foreground">acompte de 50 %</strong> du montant total afin de bloquer le véhicule.
                  </p>
                  <div className="p-4 rounded-xl bg-secondary/30">
                    <p className="font-medium text-foreground mb-2">Paiement de l'acompte :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Virement bancaire</li>
                      <li>Paiement en ligne sécurisé (selon option disponible)</li>
                    </ul>
                  </div>
                  <p>
                    Le solde de 50 % est à régler au moment de la remise du véhicule, en espèces ou via le moyen de paiement convenu.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                  Durée de location et dépassement
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>La durée de location est définie lors de la réservation.</p>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 dark:text-amber-200">
                      Tout dépassement non autorisé entraîne des frais supplémentaires de <strong>70 € par jour</strong>.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                  Annulation et remboursement
                </h2>
                <div className="space-y-3">
                  <div className="grid gap-3">
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <p className="text-green-800 dark:text-green-200">
                        <strong>Plus de 7 jours avant le départ :</strong> remboursement 100 % de l'acompte
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <p className="text-amber-800 dark:text-amber-200">
                        <strong>Entre 3 et 7 jours :</strong> 80 % de l'acompte conservé
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-red-800 dark:text-red-200">
                        <strong>Moins de 3 jours ou non-présentation :</strong> acompte non remboursable
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                      <p className="text-primary">
                        <strong>Annulation du fait de Barros Rent A Car :</strong> remboursement intégral
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="p-6 rounded-2xl bg-secondary/30">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">5</span>
                  Caution
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Une caution de <strong className="text-foreground text-lg">350 €</strong> est demandée.
                  </p>
                  <div>
                    <p className="font-medium text-foreground mb-2">La caution peut être utilisée pour couvrir :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Carburant manquant</li>
                      <li>Dommages constatés</li>
                      <li>Amendes ou infractions</li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="font-medium text-foreground mb-2">Modalités :</p>
                    <ul className="space-y-2">
                      <li>• La caution est encaissée lors du paiement</li>
                      <li>• Elle est remboursée sous <strong className="text-foreground">5 à 10 jours ouvrés</strong> après restitution du véhicule</li>
                      <li>• Aucun montant n'est retenu sans justification</li>
                      <li>• Seule la somme nécessaire est prélevée si besoin</li>
                    </ul>
                  </div>
                  <p className="text-sm italic">
                    Le délai d'apparition sur le compte dépend de la banque (généralement 5 à 7 jours).
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">6</span>
                  Moyens de paiement de la caution
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/30 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Espèces (euros € ou escudos CVE) au Cap-Vert</span>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Lien de paiement sécurisé en ligne</span>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">7</span>
                  Carburant
                </h2>
                <p className="text-muted-foreground">
                  Le véhicule doit être restitué avec le même niveau de carburant qu'à la remise. À défaut, les frais seront déduits de la caution.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">8</span>
                  Responsabilité et accident
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>En cas d'accident, le locataire doit :</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Informer immédiatement le loueur</li>
                    <li>Fournir un rapport d'accident</li>
                    <li>Contacter les services d'urgence si nécessaire</li>
                  </ul>
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-amber-800 dark:text-amber-200">
                      Toute réparation non autorisée est à la charge du locataire.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">9</span>
                  Perte de clés ou accessoires
                </h2>
                <p className="text-muted-foreground">
                  La perte des clés ou de tout accessoire (GPS, siège enfant, etc.) entraîne des frais déduits de la caution.
                </p>
              </section>

              {/* Section 10 */}
              <section className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  Contacts d'urgence
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Loueur sur place :</strong> À définir
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground"><strong className="text-foreground">Police :</strong> 132</p>
                    <p className="text-muted-foreground"><strong className="text-foreground">Ambulance :</strong> 130</p>
                    <p className="text-muted-foreground"><strong className="text-foreground">Pompiers :</strong> 131</p>
                  </div>
                </div>
              </section>

              {/* Section 11 */}
              <section className="p-6 rounded-2xl bg-secondary/30">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">11</span>
                  Acceptation des conditions
                </h2>
                <p className="text-muted-foreground">
                  La validation de la réservation implique l'acceptation pleine et entière des présentes conditions.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConditionsGenerales;
