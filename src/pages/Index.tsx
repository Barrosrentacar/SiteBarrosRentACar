import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import VehicleShowcase from "@/components/VehicleShowcase";
import GoogleReviews from "@/components/GoogleReviews";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <VehicleShowcase />
        <GoogleReviews />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
