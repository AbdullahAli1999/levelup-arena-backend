import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UserTypeSection from "@/components/UserTypeSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorTrail from "@/components/CursorTrail";
import SkillsShowcase from "@/components/SkillsShowcase";
import AchievementsSection from "@/components/AchievementsSection";
import LeaderboardSection from "@/components/LeaderboardSection";

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
      <LeaderboardSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
