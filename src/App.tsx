import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlayerRegistration from "./pages/PlayerRegistration";
import GameSelection from "./pages/GameSelection";
import PlayerDashboard from "./pages/PlayerDashboard";
import ProPlayerRegistration from "./pages/ProPlayerRegistration";
import ParentDashboard from "./pages/ParentDashboard";
import TrainerSelection from "./pages/TrainerSelection";
import Payment from "./pages/Payment";
import TrainerDashboard from "./pages/TrainerDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ClubOffers from "./pages/ClubOffers";
import Login from "./components/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player-registration" element={<PlayerRegistration />} />
          <Route path="/game-selection" element={<GameSelection />} />
          <Route path="/player-dashboard" element={<PlayerDashboard />} />
          <Route path="/pro-player-registration" element={<ProPlayerRegistration />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/trainer-selection" element={<TrainerSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/club-offers" element={<ClubOffers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
