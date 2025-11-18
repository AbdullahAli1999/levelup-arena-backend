import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import ClubOfferSection from "@/components/ClubOfferSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorTrail from "@/components/CursorTrail";
import SkillsShowcase from "@/components/SkillsShowcase";
import AchievementsSection from "@/components/AchievementsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CursorTrail />
      <ScrollProgressBar />
      <Header />
      <Hero />
      <UserTypeSection />
      <SkillsShowcase />
      <AchievementsSection />
      <ClubOfferSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
