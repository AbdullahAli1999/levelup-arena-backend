import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import ClubOfferSection from "@/components/ClubOfferSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <UserTypeSection />
      <ClubOfferSection />
      <Footer />
    </div>
  );
};

export default Index;
