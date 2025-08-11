import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Copy,
  Share,
  MessageCircle,
  Trophy,
  Medal,
  Crown,
  Calendar,
  Gift,
  Users,
  Target,
  FileText,
  Clock,
  CheckCircle,
  ChevronDown,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import challengeHero from "@/assets/marketing-banner-2.jpg";

import { useLocation, useNavigate } from "react-router-dom";
import { type Challenge } from "@/components/mobile/ChallengeCard";

const SingleStageChallenge = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [leaderboardView, setLeaderboardView] = useState("individual");

  const challengeImages = [challengeHero, challengeHero, challengeHero];

  const leaderboardData = [
    {
      id: 1,
      name: "Johnny",
      score: 2340,
      time: "01:24",
      rank: 1,
      avatar: "👤",
    },
    {
      id: 2,
      name: "Jennifer",
      score: 2250,
      time: "01:45",
      rank: 2,
      avatar: "👤",
    },
    { id: 3, name: "Trang", score: 2100, time: "02:10", rank: 3, avatar: "👤" },
    {
      id: 4,
      name: "John Wick",
      score: 1890,
      time: "02:23",
      rank: 4,
      avatar: "👤",
    },
    {
      id: 5,
      name: "Rocco Lampone",
      score: 1750,
      time: "02:45",
      rank: 5,
      avatar: "👤",
    },
  ];

  const teamLeaderboardData = [
    {
      id: 1,
      name: "EcoWarriors Alpha",
      score: 4500,
      members: 12,
      rank: 1,
      avatar: "🌱",
    },
    {
      id: 2,
      name: "Green Guardians",
      score: 4200,
      members: 10,
      rank: 2,
      avatar: "🌿",
    },
    {
      id: 3,
      name: "Planet Protectors",
      score: 3800,
      members: 8,
      rank: 3,
      avatar: "🌍",
    },
    {
      id: 4,
      name: "Sustainability Squad",
      score: 3600,
      members: 15,
      rank: 4,
      avatar: "♻️",
    },
    {
      id: 5,
      name: "Nature Champions",
      score: 3400,
      members: 6,
      rank: 5,
      avatar: "🌳",
    },
  ];

  const submissions = [
    { date: "Dec 15, 2024", status: "verified" },
    { date: "Dec 10, 2024", status: "pending" },
    { date: "Dec 5, 2024", status: "verified" },
  ];

  const messages = [
    {
      sender: "Challenge Admin",
      message: "Welcome to EcoWarriors Challenge!",
      time: "2h ago",
    },
    {
      sender: "Team Leader",
      message: "Great progress everyone! Keep it up!",
      time: "4h ago",
    },
    {
      sender: "Jennifer",
      message: "Just submitted my tree planting proof 🌱",
      time: "6h ago",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % challengeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + challengeImages.length) % challengeImages.length
    );
  };

  // for the Play Button dynamic
  const { state } = useLocation();
  const navigate = useNavigate();
  const challenge: Challenge | undefined = state?.challenge;

  if (!challenge) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-sm text-muted-foreground">
          Challenge not found.
        </p>
      </div>
    );
  }

  const isCompleted = challenge.status === "completed";
  let buttonLabel = "Continue Challenge";
  if (challenge.status === "completed") {
    buttonLabel = "View Results";
  } else if (challenge.status === "upcoming") {
    buttonLabel = "Play Challenge";
  }

  return (
    <div className="mobile-container relative">
      <div className="w-full flex items-center py-2 bg-white shadow-sm z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="text-muted-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-4 text-base font-medium">Challenge Details</h1>
      </div>

      {/* Header with Image Carousel */}
      <div className="relative mt-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={challengeImages[currentImageIndex]}
            alt="Challenge"
            className="w-full h-full object-cover"
          />

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-smooth"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-smooth"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">EW</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">
                  Challenge #1
                </h1>
                <p className="text-white/80 text-sm">by EcoWarriors</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="status"
                className="bg-primary/20 text-white border-white/30 text-xs px-2 py-1 h-6"
              >
                Team Challenge
              </Button>
              <Button
                variant="status"
                className="bg-primary/20 text-white border-white/30 text-xs px-2 py-1 h-6"
              >
                Single Goal
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full pt-1 pb-2"
      >
        <TabsList className="w-full grid grid-cols-4 bg-white shadow-sm">
          <TabsTrigger value="details" className="text-xs">
            Details
          </TabsTrigger>
          <TabsTrigger value="status" className="text-xs">
            Status
          </TabsTrigger>
          <TabsTrigger value="participate" className="text-xs">
            Participate
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-xs">
            Messages
          </TabsTrigger>
        </TabsList>

        <div className="px-4">
          {/* Details Tab */}
          <TabsContent value="details" className="mobile-padding space-y-4">
            {/* Play Challenge Button */}
            {challenge.type !== "Supporter" && (
              <Button
                disabled={isCompleted}
                onClick={() => {
                  if (!isCompleted) {
                    navigate("/play");
                  }
                }}
                className={`mt-6 w-full ${
                  isCompleted
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : ""
                }`}
              >
                {buttonLabel}
              </Button>
            )}

            <Card className="p-4 shadow-card">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Challenge Period</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Start: Dec 1, 2024</p>
                  <p>End: Dec 31, 2024</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 shadow-card">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Challenge Type</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Multi-stage bundled challenge
                </p>
              </div>
            </Card>

            <Card className="p-4 shadow-card">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Reward</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly starter kit + $100 gift card for top performers
                </p>
              </div>
            </Card>

            {/* invited as verifier */}
            <Card className="border-l-4 border-l-cosmic-gold bg-gradient-to-r from-[hsl(var(--cosmic-gold)/0.1)] to-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                {/* Icon with golden tint */}
                <div className="w-10 h-10 rounded-full bg-cosmic-gold/10 text-cosmic-gold shadow-sm flex items-center justify-center">
                  <Target className="h-5 w-5" />
                </div>

                {/* Text section */}
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    ✨ Verifier Invitation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Help review and verify submitted challenges.
                  </p>
                </div>

                {/* Action */}
                <div className="flex items-center">
                  <Button
                    size="sm"
                    className="bg-cosmic-gold text-primary hover:bg-cosmic-gold/90 rounded-full px-4 py-1"
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status" className="mobile-padding space-y-4">
            {/* Leaderboard Toggle */}
            <div className="flex items-center justify-center mb-4">
              <div className="bg-muted p-1 rounded-lg">
                <Button
                  variant={
                    leaderboardView === "individual" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => setLeaderboardView("individual")}
                  className="text-xs"
                >
                  Individual
                </Button>
                <Button
                  variant={leaderboardView === "team" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLeaderboardView("team")}
                  className="text-xs"
                >
                  Team
                </Button>
              </div>
            </div>

            {/* Modern Leaderboard */}
            <Card className="p-6 shadow-card bg-gradient-to-br from-background to-muted/30">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-xl gradient-text">
                    {leaderboardView === "individual"
                      ? "Individual Champions"
                      : "Team Champions"}
                  </h3>
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {leaderboardView === "individual"
                    ? "Top performers this challenge"
                    : "Leading teams in the challenge"}
                </p>
              </div>

              {/* Champion Cards - Top 3 */}
              <div className="space-y-3 mb-6">
                {(leaderboardView === "individual"
                  ? leaderboardData
                  : teamLeaderboardData
                )
                  .slice(0, 3)
                  .map((user, index) => (
                    <div
                      key={user.id}
                      className={`relative p-4 rounded-2xl border-2 shadow-lg transition-all hover:scale-105 ${
                        index === 0
                          ? "bg-gradient-to-r from-cosmic-gold/20 to-white border-cosmic-gold shadow-cosmic-gold/20"
                          : index === 1
                          ? "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 shadow-primary/10"
                          : "bg-gradient-to-r from-muted to-background border-border shadow-muted/20"
                      }`}
                    >
                      {/* Rank Badge */}
                      <div
                        className={`absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-cosmic-gold text-white"
                            : index === 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.rank}
                      </div>

                      {/* Trophy Icons */}
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                            <Crown className="w-3 h-3 text-cosmic-gold" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border-2 ${
                              index === 0
                                ? "bg-cosmic-gold/20 border-cosmic-gold"
                                : index === 1
                                ? "bg-primary/20 border-primary"
                                : "bg-muted border-border"
                            }`}
                          >
                            {user.avatar}
                          </div>
                          <div>
                            <p
                              className={`font-bold text-base ${
                                index === 0
                                  ? "text-cosmic-gold"
                                  : "text-foreground"
                              }`}
                            >
                              {user.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-accent" />
                              <span className="text-sm text-muted-foreground">
                                {leaderboardView === "individual"
                                  ? user.time
                                  : `${user.members} members`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-2xl font-bold ${
                              index === 0 ? "gradient-text" : "text-foreground"
                            }`}
                          >
                            {user.score}
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Zap className="w-3 h-3 text-accent" />
                            <span className="text-xs text-muted-foreground">
                              points
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Other Rankings */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                  Other Rankings
                </h4>
                {(leaderboardView === "individual"
                  ? leaderboardData
                  : teamLeaderboardData
                )
                  .slice(3)
                  .map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm font-bold">
                          {user.rank}
                        </div>
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {leaderboardView === "individual"
                              ? user.time
                              : `${user.members} members`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          {user.score}
                        </p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Invite Section */}
            <Card className="p-4 shadow-card">
              <h3 className="font-semibold text-primary mb-3">
                Invite Fellow Astronauts
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="w-4 h-4" />
                    Share Link
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="w-4 h-4" />
                    QR Code
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Astronaut Friends:</p>
                  {[
                    "Jean-Paul Sartre",
                    "Martin Heidegger",
                    "Friedrich Nietzsche",
                  ].map((friend) => (
                    <div
                      key={friend}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-full"></div>
                        <span className="text-sm">{friend}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Invite
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Participate Tab */}
          <TabsContent value="participate" className="mobile-padding space-y-4">
            <Card className="p-4 shadow-card">
              <h3 className="font-semibold text-primary mb-4">Submit Proof</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload photo or document
                  </p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                <Button className="w-full">Submit Proof</Button>
              </div>
            </Card>

            <Card className="p-4 shadow-card">
              <h3 className="font-semibold text-primary mb-3">
                Submission History
              </h3>
              <div className="space-y-3">
                {submissions.map((submission, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">
                            {submission.date}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Submission #{index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="status"
                      className={
                        submission.status === "verified"
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }
                    >
                      {submission.status === "verified" ? (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Pending
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="mobile-padding space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Messages</h3>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>

            {/* Compose Message Section */}
            <Card className="p-4 shadow-card border-2 border-primary">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary">
                    Compose Message
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Send to:
                    </label>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent className="select-content">
                        <SelectItem value="all">All Participants</SelectItem>
                        <SelectItem value="team">Team Members Only</SelectItem>
                        <SelectItem value="admins">Challenge Admins</SelectItem>
                        <SelectItem value="verifiers">Verifiers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <textarea
                    className="w-full p-3 rounded-lg border border-border bg-background text-sm resize-none"
                    rows={3}
                    placeholder="Type your message..."
                  />
                  <Button size="sm" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </Card>

            {/* Received Messages */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">
                Recent Messages
              </h4>
              {messages.map((message, index) => (
                <Card key={index} className="p-3 shadow-card">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">
                        {message.sender[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{message.sender}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.time}
                        </p>
                      </div>
                      <p className="text-sm text-foreground">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SingleStageChallenge;
