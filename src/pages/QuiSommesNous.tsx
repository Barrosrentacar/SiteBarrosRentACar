import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Heart, Shield, Award, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  {
    name: "António Barros",
    role: "Fondateur & Directeur",
    description: "Passionné par le Cap-Vert et le service client depuis plus de 15 ans.",
    image: "AB",
  },
  {
    name: "Maria Barros",
    role: "Responsable Relations Client",
    description: "Dédiée à offrir une expérience exceptionnelle à chaque client.",
    image: "MB",
  },
  {
    name: "João Silva",
    role: "Chef de Flotte",
    description: "Expert en mécanique, il veille à la qualité de nos véhicules.",
    image: "JS",
  },
  {
    name: "Ana Costa",
    role: "Coordinatrice Réservations",
    description: "Toujours disponible pour organiser votre location parfaite.",
    image: "AC",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Nous aimons ce que nous faisons et cela se ressent dans notre service.",
  },
  {
    icon: Shield,
    title: "Fiabilité",
    description: "Des véhicules entretenus et un service sur lequel vous pouvez compter.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Nous visons toujours le meilleur pour dépasser vos attentes.",
  },
];

const QuiSommesNous = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Notre Histoire</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Qui sommes-<span className="text-gradient">nous</span> ?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Barros Rent A Car est une entreprise familiale fondée à Praia, Cap-Vert. 
              Depuis notre création, nous nous engageons à offrir un service de location 
              de voitures simple, fiable et personnalisé.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Notre Histoire
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tout a commencé avec une passion pour le Cap-Vert et le désir de partager 
                    la beauté de ces îles avec les visiteurs du monde entier. António Barros, 
                    notre fondateur, a lancé Barros Rent A Car avec un seul véhicule et une 
                    vision claire : offrir un service de qualité à prix juste.
                  </p>
                  <p>
                    Aujourd'hui, nous sommes fiers d'être devenus une référence de confiance 
                    pour la location de voitures à Praia. Notre flotte s'est agrandie, mais 
                    nos valeurs restent les mêmes : proximité, transparence et excellence du service.
                  </p>
                  <p>
                    Chaque membre de notre équipe partage cette même passion et s'engage 
                    personnellement pour que votre expérience soit mémorable. Que vous soyez 
                    touriste, membre de la diaspora ou résident, vous êtes les bienvenus 
                    dans la famille Barros.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ce qui nous guide au quotidien dans notre mission de vous servir.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Notre <span className="text-gradient">Équipe</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des professionnels passionnés à votre service.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow text-2xl font-bold text-primary-foreground">
                    {member.image}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Une question ? Contactez-nous !
                </h2>
                <p className="text-muted-foreground">
                  Notre équipe est disponible pour répondre à toutes vos questions.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span>Praia, Cap-Vert</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+238 XXX XXXX</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>contact@barrosrentacar.cv</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default QuiSommesNous;
