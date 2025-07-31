import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

type ExtendedUserInfo = UserInfo & {
  points: number;
  tier: number;
  tierLabel: string;
  nextTierLabel: string;
  pointsToNextTier: number;
  dailyProgressToGo: number;
};

const MyActivitiesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activityTab, setActivityTab] = useState<TabType>("challenges");

  const currentUser: ExtendedUserInfo = {
    id: "user-1",
    name: "My Info",
    isCurrentUser: true,
    points: 500,
    tier: 1,
    tierLabel: "Trainee",
    nextTierLabel: "System Engineer",
    pointsToNextTier: 153,
    dailyProgressToGo: 100,
  };

  const friends: ExtendedUserInfo[] = [
    {
      id: "friend-1",
      name: "Alex Chen",
      points: 1890,
      tier: 2,
      tierLabel: "System Engineer",
      nextTierLabel: "Space Explorer",
      pointsToNextTier: 210,
      dailyProgressToGo: 60,
    },
    {
      id: "friend-2",
      name: "Sarah Johnson",
      points: 3250,
      tier: 4,
      tierLabel: "Galaxy Navigator",
      nextTierLabel: "Star Commander",
      pointsToNextTier: 250,
      dailyProgressToGo: 80,
    },
    {
      id: "friend-3",
      name: "Mike Rodriguez",
      points: 470,
      tier: 1,
      tierLabel: "Trainee",
      nextTierLabel: "System Engineer",
      pointsToNextTier: 30,
      dailyProgressToGo: 10,
    },
    {
      id: "friend-4",
      name: "Juan Dela Cruz",
      points: 1570,
      tier: 2,
      tierLabel: "System Engineer",
      nextTierLabel: "Space Explorer",
      pointsToNextTier: 130,
      dailyProgressToGo: 45,
    },
  ];

  const [selectedUser, setSelectedUser] =
    useState<ExtendedUserInfo>(currentUser);

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
      category: "Active",
      role: "Individual",
      format: "Single",
      visibility: "Public",
      progressPercentage: 100,
      timeLeft: "Starts tomorrow",
      participants: 156,
      status: "completed",
    },
  ];

  const handleUserSelect = (user: ExtendedUserInfo) => {
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
    <div className="min-h-screen">
      <div className="max-w-sm mx-auto">
        <ScrollArea className="h-[calc(100vh-80px)]">
          {/* background section */}
          <div className="mt-5">
            <div className="px-4">
              <h1 className="text-xl font-semibold text-foreground mb-3">
                My Activities
              </h1>
            </div>
            <div className="space-y-4">
              {/* Selector */}
              <div className="flex px-1 overflow-x-auto gap-2 scrollbar-hide">
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

              {/* Points */}
              <Card className="p-4 mx-3 flex flex-col gap-3 rounded-xl shadow-sm">
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
                        {selectedUser.points}
                      </span>
                      <span className="text-xs text-muted-foreground font-light leading-none">
                        pts
                      </span>
                    </div>
                    <div className="mt-1 inline-flex items-center text-xs text-primary bg-primary/10 rounded-full px-2 py-0.5">
                      Tier {selectedUser.tier} › {selectedUser.tierLabel}
                    </div>
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center shrink-0">
                    <Trophy className="w-10 h-10 text-cosmic-gold" />
                  </div>
                </div>

                <div className="mt-1">
                  <div className="text-xs text-primary mb-1 font-medium">
                    Next: Tier {selectedUser.tier + 1} -{" "}
                    {selectedUser.nextTierLabel}
                  </div>
                  <div className="relative w-full">
                    <Progress
                      value={Math.min(
                        100,
                        (1 - selectedUser.pointsToNextTier / 500) * 100
                      )}
                      className="h-2 rounded-full bg-muted"
                    />
                    <div className="absolute right-0 top-0 text-[10px] mt-2 text-muted-foreground">
                      {selectedUser.pointsToNextTier}pts to go
                    </div>
                  </div>
                </div>

                <div className="mt-1 mb-3">
                  <div className="text-xs text-primary mb-1 font-medium">
                    Daily Progress
                  </div>
                  <div className="relative w-full">
                    <Progress
                      value={Math.min(
                        100,
                        (1 - selectedUser.dailyProgressToGo / 100) * 100
                      )}
                      className="h-2 rounded-full bg-muted"
                    />
                    <div className="absolute right-0 top-0 text-[10px] mt-2 text-muted-foreground">
                      {selectedUser.dailyProgressToGo}pts to go
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tabs */}
              <div className="border-b px-1 shadow-sm border-border overflow-x-auto scrollbar-hide flex gap-2">
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
            </div>
          </div>

          <div className="px-4 pt-4 bg-white">
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
                  onViewAllBadges={() => console.log("View all badges")}
                />
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">
                    Current & Past Challenges
                  </h3>
                  {mockChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onViewDetails={() => {
                        const path =
                          challenge.format === "Single"
                            ? "/single-stage-challenge"
                            : "/multi-stage-challenge";

                        navigate(path, { state: { challenge } });
                      }}
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
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MyActivitiesPage;
