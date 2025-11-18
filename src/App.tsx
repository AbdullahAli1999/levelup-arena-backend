import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
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
import MyBookings from "./pages/MyBookings";
import BookingConfirmation from "./pages/BookingConfirmation";
import ProGameSelection from "./pages/ProGameSelection";
import ProRequirements from "./pages/ProRequirements";
import ModeratorRegistration from "./pages/ModeratorRegistration";
import ModeratorPending from "./pages/ModeratorPending";
import ProPendingStatus from "./pages/ProPendingStatus";
import TrainerRegistration from "./pages/TrainerRegistration";
import ParentRegistration from "./pages/ParentRegistration";
import TrainerAvailability from "./pages/TrainerAvailability";
import SessionDetail from "./pages/SessionDetail";
import Leaderboards from "./pages/Leaderboards";
import AddChild from "./pages/AddChild";
import ChildStats from "./pages/ChildStats";
import ContactTrainer from "./pages/ContactTrainer";
import ProDashboard from "./pages/ProDashboard";
import ProContracts from "./pages/ProContracts";
import ProApprovals from "./pages/ProApprovals";
import ProApprovalDetail from "./pages/ProApprovalDetail";
import ContractModeration from "./pages/ContractModeration";
import ReviewModeration from "./pages/ReviewModeration";
import UserRoleManagement from "./pages/UserRoleManagement";
import GameManagement from "./pages/GameManagement";
import TrainerApprovals from "./pages/TrainerApprovals";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import PaymentSuccess from "./pages/PaymentSuccess";
import EditChild from "./pages/EditChild";
import NotificationHistory from "./pages/NotificationHistory";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEmailNotifications } from "./hooks/useEmailNotifications";
import RouteTransition from "./components/RouteTransition";

const queryClient = new QueryClient();

// Component to handle global notifications
const GlobalNotifications = () => {
  useEmailNotifications();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <GlobalNotifications />
          <RouteTransition>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/player-registration" element={<PlayerRegistration />} />
          <Route path="/game-selection" element={<GameSelection />} />
          <Route path="/player-dashboard" element={<PlayerDashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/pro-game-selection" element={<ProGameSelection />} />
          <Route path="/pro-requirements" element={<ProRequirements />} />
          <Route path="/pro-player-registration" element={<ProPlayerRegistration />} />
          <Route path="/pro-pending" element={<ProPendingStatus />} />
          <Route path="/parent-registration" element={<ParentRegistration />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/trainer-registration" element={<TrainerRegistration />} />
          <Route path="/trainer-availability" element={<TrainerAvailability />} />
          <Route path="/trainer-selection" element={<TrainerSelection />} />
          <Route path="/sessions/:id" element={<SessionDetail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
          <Route path="/moderator-registration" element={<ModeratorRegistration />} />
          <Route path="/moderator-pending" element={<ModeratorPending />} />
          <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/club-offers" element={<ClubOffers />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/add-child" element={<AddChild />} />
          <Route path="/edit-child/:id" element={<EditChild />} />
          <Route path="/child-stats/:id" element={<ChildStats />} />
          <Route path="/contact-trainer" element={<ContactTrainer />} />
          <Route path="/pro-dashboard" element={<ProDashboard />} />
          <Route path="/pro-contracts" element={<ProContracts />} />
          <Route path="/pro-approvals" element={<ProApprovals />} />
          <Route path="/pro-approvals/:id" element={<ProApprovalDetail />} />
          <Route path="/contract-moderation" element={<ContractModeration />} />
          <Route path="/review-moderation" element={<ReviewModeration />} />
          <Route path="/user-management" element={<UserRoleManagement />} />
          <Route path="/game-management" element={<GameManagement />} />
          <Route path="/trainer-approvals" element={<TrainerApprovals />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notification-history" element={<NotificationHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </RouteTransition>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
