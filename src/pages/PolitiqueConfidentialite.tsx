import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
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
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Protection des données</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Politique de <span className="text-gradient">confidentialité</span>
              </h1>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Barros Rent A Car s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité 
                  explique comment nous collectons, utilisons, stockons et protégeons vos informations personnelles lorsque 
                  vous utilisez notre site web et nos services de location de véhicules.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Données collectées</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nous collectons les informations suivantes dans le cadre de nos services :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations relatives à votre réservation (dates, véhicules, lieu)</li>
                  <li>Préférences de langue et de devise</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Utilisation des données</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Traiter et gérer vos réservations de véhicules</li>
                  <li>Vous contacter concernant votre réservation</li>
                  <li>Améliorer nos services et votre expérience utilisateur</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Protection des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
                  vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. 
                  Vos données sont stockées sur des serveurs sécurisés et l'accès est strictement limité au personnel autorisé.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Conservation des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour 
                  lesquelles elles ont été collectées, conformément aux exigences légales applicables. Les données de 
                  réservation sont conservées pendant une durée de 3 ans après la fin de la location.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Vos droits</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Ces cookies nous permettent 
                  de mémoriser vos préférences (langue, devise) et d'analyser l'utilisation du site. Vous pouvez configurer 
                  votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne pas 
                  fonctionner correctement.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">8. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, 
                  vous pouvez nous contacter à :
                </p>
                <div className="mt-4 p-4 rounded-xl bg-secondary/30">
                  <p className="text-foreground font-medium">Barros Rent A Car</p>
                  <p className="text-muted-foreground">Email : contact@barrosrentacar.cv</p>
                  <p className="text-muted-foreground">Téléphone : +238 XXX XXXX</p>
                  <p className="text-muted-foreground">Adresse : Praia, Cap-Vert</p>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">9. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                  Les modifications seront publiées sur cette page avec une date de mise à jour. Nous vous encourageons 
                  à consulter régulièrement cette page pour rester informé de nos pratiques en matière de protection des données.
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

export default PolitiqueConfidentialite;
