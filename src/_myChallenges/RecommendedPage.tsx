import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Brain, Trophy, Zap } from "lucide-react";
import banner from "../assets/challenges-banner.png";

export default function RecommendedPage() {
  const commanderRecommendations = [
    {
      id: 1,
      title: "30-Day Space Fitness Challenge",
      commander: "FitLife Studio",
      avatar: "💪",
      category: "Active",
      participants: 1247,
      description: "Build astronaut-level fitness with space-themed workouts",
    },
    {
      id: 2,
      title: "Sustainable Living Mission",
      commander: "EcoWarriors",
      avatar: "🌱",
      category: "Go Green",
      participants: 892,
      description: "Reduce your carbon footprint like a true space explorer",
    },
  ];

  const interestRecommendations = [
    {
      id: 1,
      title: "Healthy Cooking Academy",
      category: "Culinary",
      commander: "Culinary Institute",
      points: 300,
      description: "Master nutritious meals for optimal performance",
    },
    {
      id: 2,
      title: "Morning Yoga Journey",
      category: "Go Green",
      commander: "Wellness Center",
      points: 250,
      description: "Start your day with mindful movement",
    },
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: "Advanced Nutrition Tracking",
      reason: "Based on your culinary progress",
      category: "Culinary",
      commander: "Culinary Institute",
      points: 500,
      description: "Take your nutrition knowledge to the next level",
    },
    {
      id: 2,
      title: "Team Leadership Challenge",
      reason: "Perfect for your experience level",
      category: "Active",
      commander: "FitLife Studio",
      points: 400,
      description: "Lead your team to victory in space missions",
    },
  ];

  return (
    <div className="">
      {/* From Commanders You Follow */}
      <div className="relative w-full mb-4">
        <img src={banner} alt="Space Banner" className="w-full" />

        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full whitespace-nowrap bg-[#73101e] text-white font-semibold text-sm shadow-md">
          RECOMMENDED FOR YOU
        </div>
      </div>

      <section className="p-3">
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4 ">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              From Commanders You Follow
            </h2>
          </div>
          <div className="space-y-3">
            {commanderRecommendations.map((challenge) => (
              <Card
                key={challenge.id}
                className="mobile-card flex flex-col justify-between h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-space-gray flex items-center justify-center text-xl">
                    {challenge.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-primary mb-1">
                      by {challenge.commander}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {challenge.participants}
                      </span>
                      <span
                        className={`badge-category ${
                          challenge.category === "Active"
                            ? "badge-active"
                            : challenge.category === "Go Green"
                            ? "badge-go-green"
                            : "badge-culinary"
                        }`}
                      >
                        {challenge.category}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="btn-astronaut w-full mt-3">
                  Join Challenge
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Based on Your Interests */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              Based on Your Interests
            </h2>
          </div>
          <div className="space-y-3">
            {interestRecommendations.map((challenge) => (
              <Card
                key={challenge.id}
                className="mobile-card flex flex-col justify-between h-full"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-primary mb-1">
                      by {challenge.commander}
                    </p>
                    <span
                      className={`badge-category ${
                        challenge.category === "Culinary"
                          ? "badge-culinary"
                          : challenge.category === "Go Green"
                          ? "badge-go-green"
                          : "badge-active"
                      }`}
                    >
                      {challenge.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {challenge.points}
                    </div>
                    <div className="text-xs text-muted-foreground">pts</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {challenge.description}
                </p>
                <Button className="btn-astronaut w-full mt-auto">
                  Join Challenge
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Suggestions */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              AI Suggested For You
            </h2>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((challenge) => (
              <Card
                key={challenge.id}
                className="mobile-card flex flex-col justify-between h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-primary mb-1">
                      by {challenge.commander}
                    </p>
                    <p className="text-xs text-primary mb-2">
                      {challenge.reason}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`badge-category ${
                          challenge.category === "Active"
                            ? "badge-active"
                            : challenge.category === "Go Green"
                            ? "badge-go-green"
                            : "badge-culinary"
                        }`}
                      >
                        {challenge.category}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {challenge.points} pts
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="btn-astronaut w-full mt-3">
                  Join Challenge
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
