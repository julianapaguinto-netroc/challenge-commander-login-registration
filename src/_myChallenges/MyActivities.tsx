// MyActivitiesPage.tsx
import { useState } from "react";
import { UserInfo } from "@/components/mobile/UserSelector";
import { PointsLevel } from "@/components/mobile/PointsLevel";
import { RewardsSection, Reward } from "@/components/mobile/RewardsSection";
import { GemsSection } from "@/components/mobile/GemsSection";
import { BadgesSection, Badge } from "@/components/mobile/BadgesSection";
import {
  CommanderSection,
  ChallengeCommander,
} from "@/components/mobile/CommanderSection";
import { ChallengeCard, Challenge } from "@/components/mobile/ChallengeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import astronautImage from "@/assets/astronaut-character.png";
import { Trophy } from "lucide-react";
import AffiliatedCommandersSection from "@/components/sections/AffiliatedCommandersSection";

const TABS = ["challenges", "achievements", "leaderboard", "points"] as const;
type TabType = (typeof TABS)[number];

const MyActivitiesPage = () => {
  const { toast } = useToast();
  const [activityTab, setActivityTab] = useState<TabType>("challenges");

  const currentUser: UserInfo = {
    id: "user-1",
    name: "My Info",
    isCurrentUser: true,
  };

  const friends: UserInfo[] = [
    { id: "friend-1", name: "Alex Chen" },
    { id: "friend-2", name: "Sarah Johnson" },
    { id: "friend-3", name: "Mike Rodriguez" },
    { id: "friend-4", name: "Juan Dela Cruz" },
  ];

  const [selectedUser, setSelectedUser] = useState<UserInfo>(currentUser);

  const mockRewards: Reward[] = [
    {
      id: "r1",
      name: "Green Warrior Badge",
      description: "Completed 5 eco-friendly challenges",
      type: "badge",
      isRedeemed: false,
      challengeName: "Go Green Week",
    },
    {
      id: "r2",
      name: "100 Bonus Points",
      description: "Perfect attendance reward",
      type: "points",
      isRedeemed: false,
      challengeName: "Daily Steps Challenge",
    },
  ];

  const mockBadges: Badge[] = [
    {
      id: "b1",
      name: "First Steps",
      description: "Completed your first challenge",
      iconType: "award",
      rarity: "common",
      earnedDate: "2024-01-15",
    },
    {
      id: "b2",
      name: "Team Player",
      description: "Participated in 5 team challenges",
      iconType: "medal",
      rarity: "rare",
      earnedDate: "2024-01-20",
    },
    {
      id: "b3",
      name: "Streak Master",
      description: "7-day challenge streak",
      iconType: "award",
      rarity: "epic",
      earnedDate: "2024-01-25",
    },
    {
      id: "b4",
      name: "Legend",
      description: "Reached Commander level",
      iconType: "medal",
      rarity: "legendary",
      earnedDate: "2024-02-01",
    },
  ];

  const mockCommanders: ChallengeCommander[] = [
    {
      id: "c1",
      name: "Dr. Emily Watson",
      title: "Wellness Expert",
      businessName: "HealthTech Solutions",
      totalChallenges: 12,
    },
    {
      id: "c2",
      name: "Chef Marco",
      title: "Culinary Master",
      businessName: "Green Kitchen Co.",
      totalChallenges: 8,
    },
  ];

  const mockChallenges: Challenge[] = [
    {
      id: "ch1",
      name: "30-Day Hydration Challenge",
      category: "Active",
      role: "Individual",
      format: "Multi-stage",
      visibility: "Public",
      progressPercentage: 65,
      timeLeft: "5 days left",
      participants: 234,
      status: "active",
    },
    {
      id: "ch2",
      name: "Office Green Team Initiative",
      category: "Go Green",
      role: "Team",
      format: "Single",
      visibility: "Private",
      progressPercentage: 100,
      timeLeft: "Completed",
      participants: 12,
      status: "completed",
    },
    {
      id: "ch3",
      name: "Healthy Cooking Masterclass",
      category: "Culinary",
      role: "Commander",
      format: "Multi-stage",
      visibility: "Public",
      progressPercentage: 25,
      timeLeft: "2 hours left",
      participants: 89,
      status: "active",
      isExpiring: true,
    },
    {
      id: "ch4",
      name: "Mindfulness & Meditation",
      category: "Learning",
      role: "Individual",
      format: "Single",
      visibility: "Public",
      progressPercentage: 0,
      timeLeft: "Starts tomorrow",
      participants: 156,
      status: "upcoming",
    },
  ];

  const handleUserSelect = (user: UserInfo) => {
    setSelectedUser(user);
    toast({
      title: `Viewing ${
        user.isCurrentUser ? "your" : user.name + "'s"
      } activities`,
      description: user.isCurrentUser
        ? "Showing your personal dashboard"
        : `Now displaying ${user.name}'s progress and achievements`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto bg-background min-h-screen">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 border-b border-border/50">
          <h1 className="text-xl font-semibold text-foreground mb-3">
            My Activities
          </h1>
        </div>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-4">
            {/* Horizontal User Selector */}
            <div className="flex overflow-x-auto gap-2 scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {[currentUser, ...friends].map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                      selectedUser.id === user.id
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                    } text-sm whitespace-nowrap bg-background`}
                  >
                    <div className="w-6 h-6 rounded-full bg-muted" />
                    <span>{user.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Points Card */}
            <Card className="p-4 flex flex-col gap-3 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-20 h-20 overflow-hidden shrink-0">
                  <img
                    src={astronautImage}
                    alt="Astronaut"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary leading-none">
                      2847
                    </span>
                    <span className="text-xs text-muted-foreground font-light leading-none">
                      pts
                    </span>
                  </div>
                  <div className="mt-1 inline-flex items-center text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">
                    Tier 3 › Space Explorer
                  </div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <Trophy className="w-10 h-10 text-cosmic-gold" />
                </div>
              </div>
              <div className="mt-1">
                <div className="text-xs text-primary mb-1 font-medium">
                  Next: Tier 4 - Galaxy Navigator
                </div>
                <div className="relative w-full">
                  <Progress value={95} className="h-2 rounded-full bg-muted" />
                  <div className="absolute right-0 top-0 text-[10px] mt-2 text-muted-foreground">
                    153pts to go
                  </div>
                </div>
              </div>
              <div className="mt-1 mb-3">
                <div className="text-xs text-primary mb-1 font-medium">
                  Daily Progress
                </div>
                <div className="relative w-full">
                  <Progress value={55} className="h-2 rounded-full bg-muted" />
                  <div className="absolute right-0 top-0 text-[10px] mt-2 text-muted-foreground">
                    100pts to go
                  </div>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="px-4 border-b border-border overflow-x-auto scrollbar-hide flex gap-2">
              <div className="flex gap-4 min-w-max">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivityTab(tab)}
                    className={`capitalize px-2 pb-1 text-sm font-medium border-b-2 ${
                      activityTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activityTab === "challenges" && (
              <>
                <RewardsSection
                  rewards={mockRewards}
                  onRedeemReward={() => {}}
                />

                <GemsSection totalGems={1250} onUseGems={() => {}} />

                <AffiliatedCommandersSection />

                <BadgesSection
                  badges={mockBadges}
                  onViewAllBadges={() => {
                    // Handle view all (optional: open modal or navigate to another screen)
                    console.log("View all badges");
                  }}
                />

                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">
                    Current & Past Challenges
                  </h3>
                  {mockChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onViewDetails={() => {}}
                    />
                  ))}
                </div>
              </>
            )}

            {activityTab === "achievements" && (
              <>
                <BadgesSection badges={mockBadges} onViewAllBadges={() => {}} />
                <div className="card-gradient rounded-xl p-4">
                  <h3 className="font-medium mb-3">Recent Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    Your recent achievements and milestones will appear here.
                  </p>
                </div>
              </>
            )}

            {activityTab === "leaderboard" && (
              <div className="card-gradient rounded-xl p-4">
                <h3 className="font-medium mb-3">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">
                  See how you rank against other astronauts in your challenges.
                </p>
              </div>
            )}

            {activityTab === "points" && (
              <div className="card-gradient rounded-xl p-4">
                <h3 className="font-medium mb-3">Points Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed breakdown of your points earned from various
                  activities.
                </p>
              </div>
            )}

            <div className="h-4" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MyActivitiesPage;
