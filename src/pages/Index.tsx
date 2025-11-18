import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import ClubOfferSection from "@/components/ClubOfferSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
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
