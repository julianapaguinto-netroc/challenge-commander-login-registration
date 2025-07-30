import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./_gettingStarted/Welcome";
import SignUp from "./_gettingStarted/SignUp";
import Login from "./_gettingStarted/Login";
import Dashboard from "./_gettingStarted/Dashboard";
import NotFound from "./_gettingStarted/NotFound";
import ChallengeCreationFlow from "@/components/challenge/ChallengeCreationFlow";
import PersonaSelection from "@/_gettingStarted/PersonaSelection";
import OrganizationInfo from "@/_gettingStarted/OrgDetailsForm";
import UserRoleSelection from "./_gettingStarted/UserRoleSelection";
import AffiliationCheck from "./_gettingStarted/AffiliationCheck";
import MyChallengesPage from "./_myChallenges/MobileApp";
import ChallengeCommander from "@/_myChallenges/ChallengeCommander";
import SingleStageChallenge from "@/_challengeDetails/SingleStage";
import MultiStageChallenge from "@/_challengeDetails/MultiStage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/homescreen-commander" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/user-role" element={<UserRoleSelection />} />
          <Route path="/affiliation-check" element={<AffiliationCheck />} />
          <Route path="/create-challenge" element={<ChallengeCreationFlow />} />
          <Route path="/persona-selection" element={<PersonaSelection />} />
          <Route path="/organization-info" element={<OrganizationInfo />} />
          <Route path="/my-challenges" element={<MyChallengesPage />} />
          <Route path="/challenge-commander" element={<ChallengeCommander />} />
          <Route path="/single-stage-challenge" element={<SingleStageChallenge />} />
          <Route path="/multi-stage-challenge" element={<MultiStageChallenge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
