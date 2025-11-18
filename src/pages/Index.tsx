import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorTrail from "@/components/CursorTrail";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorTrail />
      <ScrollProgressBar />
      <Header />
      <Hero />
      <UserTypeSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
