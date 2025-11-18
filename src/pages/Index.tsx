import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import ClubOfferSection from "@/components/ClubOfferSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <UserTypeSection />
      <ClubOfferSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
