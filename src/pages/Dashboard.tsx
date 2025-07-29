import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Plus, Award, Gift, UserPlus } from "lucide-react";
import { BusinessHeader } from "@/components/mobile/BusinessHeader";
import { MarketingBanner } from "@/components/mobile/MarketingBanner";
import { FellowAstronauts } from "@/components/mobile/FellowAstronauts";
import { SpecialRewards } from "@/components/mobile/SpecialRewards";
import {
  ChallengeCard,
  type Challenge,
} from "@/components/mobile/ChallengeCard";
import { Button } from "@/components/ui/button";

const currentChallenges: Challenge[] = [
  {
    id: "1",
    name: "Eco-Friendly Workplace Initiative",
    category: "Go Green",
    role: "Commander",
    format: "Multi-stage",
    visibility: "Public",
    progressPercentage: 75,
    timeLeft: "12 days left",
    participants: 24,
    status: "active",
  },
  {
    id: "2",
    name: "Daily Fitness Challenge",
    category: "Active",
    role: "Team",
    format: "Single",
    visibility: "Private",
    progressPercentage: 60,
    timeLeft: "8 days left",
    participants: 15,
    status: "active",
  },
  {
    id: "3",
    name: "Healthy Recipe Exchange",
    category: "Culinary",
    role: "Supporter",
    format: "Multi-stage",
    visibility: "Public",
    progressPercentage: 45,
    timeLeft: "20 days left",
    participants: 32,
    status: "active",
  },
  {
    id: "4",
    name: "Team Building Adventure",
    category: "Active",
    role: "Admin",
    format: "Single",
    visibility: "Private",
    progressPercentage: 90,
    timeLeft: "3 days left",
    participants: 18,
    status: "active",
    isExpiring: true,
  },
  {
    id: "5",
    name: "Sustainable Innovation Lab",
    category: "Go Green",
    role: "Commander",
    format: "Multi-stage",
    visibility: "Public",
    progressPercentage: 30,
    timeLeft: "25 days left",
    participants: 41,
    status: "active",
  },
  {
    id: "6",
    name: "International Cuisine Week",
    category: "Culinary",
    role: "Supporter",
    format: "Single",
    visibility: "Public",
    progressPercentage: 80,
    timeLeft: "5 days left",
    participants: 27,
    status: "active",
  },
];

const pastChallenges: Challenge[] = [
  {
    id: "7",
    name: "Zero Waste Challenge",
    category: "Go Green",
    role: "Commander",
    format: "Single",
    visibility: "Public",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 35,
    status: "completed",
  },
  {
    id: "8",
    name: "Marathon Training Program",
    category: "Active",
    role: "Supporter",
    format: "Multi-stage",
    visibility: "Private",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 22,
    status: "completed",
  },
  {
    id: "9",
    name: "Master Chef Competition",
    category: "Culinary",
    role: "Supporter",
    format: "Single",
    visibility: "Public",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 19,
    status: "completed",
  },
  {
    id: "10",
    name: "Office Olympics",
    category: "Active",
    role: "Admin",
    format: "Multi-stage",
    visibility: "Private",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 45,
    status: "completed",
  },
  {
    id: "11",
    name: "Plant-Based Month",
    category: "Go Green",
    role: "Commander",
    format: "Single",
    visibility: "Public",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 38,
    status: "completed",
  },
  {
    id: "12",
    name: "Holiday Baking Contest",
    category: "Culinary",
    role: "Supporter",
    format: "Single",
    visibility: "Public",
    progressPercentage: 100,
    timeLeft: "Ended",
    participants: 29,
    status: "completed",
  },
];

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative mx-auto max-w-sm w-full min-h-screen welcome-bg overflow-hidden">
      <div className="w-full max-w-sm relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-medium">Challenge Commander</h1>
          <div className="w-10" />
        </header>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
        <div
          className={`absolute left-0 top-0 h-full w-3/4 max-w-xs bg-background border-r border-border z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-2">Menu</h2>
              <p className="text-sm text-muted-foreground font-light">
                Welcome back!
              </p>
            </div>
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-light">Gamification</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left">
                <Gift className="w-5 h-5 text-primary" />
                <span className="font-light">Rewards</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-5 pb-20">
          <div className="space-y-6">
            <BusinessHeader />
            <MarketingBanner />
            <FellowAstronauts />
            <SpecialRewards />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-poppins font-normal text-foreground flex items-center gap-2">
                  <span>🚀</span>
                  Current Challenges
                </h2>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Invite
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {currentChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={(id) => console.log("View challenge:", id)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-poppins font-normal text-foreground flex items-center gap-2">
                <span>🕓</span>
                Past Challenges
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {pastChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onViewDetails={(id) => console.log("View challenge:", id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* FAB */}
        <div className="fixed inset-0 flex justify-center items-end pointer-events-none pb-5 z-50">
          <div className="relative w-full max-w-sm px-6 pb-6 pointer-events-auto">
            <button
              onClick={() => navigate("/create-challenge")}
              className="absolute right-0 bottom-0 bg-primary text-white p-4 rounded-full shadow-xl transition-transform group"
            >
              <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background rounded-lg text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Create Challenge
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
