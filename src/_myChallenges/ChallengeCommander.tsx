import { BusinessHeader } from "@/components/mobile/BusinessHeader";
import { MarketingBanner } from "@/components/mobile/MarketingBanner";
import { FellowAstronauts } from "@/components/mobile/FellowAstronauts";
import { SpecialRewards } from "@/components/mobile/SpecialRewards";
import {
  ChallengeCard,
  type Challenge,
} from "@/components/mobile/ChallengeCard";
import { Button } from "@/components/ui/button";
import { UserPlus, Menu } from "lucide-react";

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

const ChallengeCommander = () => {
  const handleViewDetails = (challengeId: string) => {
    console.log("View challenge:", challengeId);
    // Navigation or modal logic can go here
  };

  return (
    <div className="min-h-screen bg-background font-poppins w-full max-w-sm mx-auto px-1">
      <div className="bg-white shadow-sm">
        <div className="px-4 py-2 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-primary">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        <BusinessHeader />
        <MarketingBanner />
        <FellowAstronauts />
        <SpecialRewards />

        {/* Current Challenges */}
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
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Past Challenges */}
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
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCommander;
