import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Brain, Trophy, Zap } from "lucide-react";
import banner from "../assets/challenges-banner.png";

export default function RecommendedPage() {
  const navigate = useNavigate();

  const commanderRecommendations = [
    {
      id: "1",
      name: "30-Day Space Fitness Challenge",
      category: "Active",
      role: "Commander",
      commander: "FitLife Studio",
      avatar: "💪",
      format: "single",
      visibility: "Public",
      progressPercentage: 0,
      timeLeft: "30 days left",
      participants: 1247,
      status: "upcoming",
      description: "Build astronaut-level fitness with space-themed workouts",
    },
    {
      id: "2",
      name: "Sustainable Living Mission",
      category: "Go Green",
      role: "Commander",
      commander: "EcoWarriors",
      avatar: "🌱",
      format: "multi",
      visibility: "Public",
      progressPercentage: 0,
      timeLeft: "7 days left",
      participants: 892,
      status: "upcoming",
      description: "Reduce your carbon footprint like a true space explorer",
    },
  ];

  const interestRecommendations = [
    {
      id: "3",
      name: "Healthy Cooking Academy",
      category: "Culinary",
      role: "Participant",
      commander: "Culinary Institute",
      points: 300,
      format: "single",
      visibility: "Private",
      progressPercentage: 0,
      timeLeft: "14 days left",
      participants: 215,
      status: "upcoming",
      description: "Master nutritious meals for optimal performance",
    },
    {
      id: "4",
      name: "Morning Yoga Journey",
      category: "Go Green",
      role: "Participant",
      commander: "Wellness Center",
      points: 250,
      format: "multi",
      visibility: "Public",
      progressPercentage: 0,
      timeLeft: "10 days left",
      participants: 132,
      status: "upcoming",
      description: "Start your day with mindful movement",
    },
  ];

  const aiRecommendations = [
    {
      id: "5",
      name: "Advanced Nutrition Tracking",
      reason: "Based on your culinary progress",
      category: "Culinary",
      role: "Supporter",
      commander: "Culinary Institute",
      points: 500,
      format: "single",
      visibility: "Private",
      progressPercentage: 0,
      timeLeft: "20 days left",
      participants: 65,
      status: "upcoming",
      description: "Take your nutrition knowledge to the next level",
    },
    {
      id: "6",
      name: "Team Leadership Challenge",
      reason: "Perfect for your experience level",
      category: "Active",
      role: "Supporter",
      commander: "FitLife Studio",
      points: 400,
      format: "multi",
      visibility: "Public",
      progressPercentage: 0,
      timeLeft: "Ended",
      participants: 88,
      status: "upcoming",
      description: "Lead your team to victory in space missions",
    },
  ];

  return (
    <div className="">
      <div className="relative w-full">
        <img src={banner} alt="Space Banner" className="w-full" />
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full whitespace-nowrap bg-[#73101e] text-white font-semibold text-sm shadow-md">
          RECOMMENDED FOR YOU
        </div>
      </div>

      <section className="p-4 bg-white">
        {/* Commander Recommendations */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              From Commanders You Follow
            </h2>
          </div>
          <div className="space-y-3">
            {commanderRecommendations.map((challenge, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    challenge.format === "single"
                      ? "/single-stage-challenge"
                      : "/multi-stage-challenge",
                    { state: { challenge } }
                  )
                }
                className="cursor-pointer"
              >
                <Card className="mobile-card flex flex-col justify-between h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-space-gray flex items-center justify-center text-xl">
                      {challenge.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">
                        {challenge.name}
                      </h3>
                      <p className="text-xs text-primary mb-1">
                        by {challenge.commander}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-2">
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.format === "multi"
                            ? "Multi-stage"
                            : "Single-stage"}
                        </span>
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.visibility}
                        </span>
                      </div>
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
              </div>
            ))}
          </div>
        </section>

        {/* Interest Recommendations */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              Based on Your Interests
            </h2>
          </div>
          <div className="space-y-3">
            {interestRecommendations.map((challenge, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    challenge.format === "single"
                      ? "/single-stage-challenge"
                      : "/multi-stage-challenge",
                    { state: { challenge } }
                  )
                }
                className="cursor-pointer"
              >
                <Card className="mobile-card flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {challenge.name}
                      </h3>
                      <p className="text-xs text-primary mb-1">
                        by {challenge.commander}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-2">
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.format === "multi"
                            ? "Multi-stage"
                            : "Single-stage"}
                        </span>
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.visibility}
                        </span>
                      </div>
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
              </div>
            ))}
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground font-poppins">
              AI Suggested For You
            </h2>
          </div>
          <div className="space-y-3">
            {aiRecommendations.map((challenge, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    challenge.format === "single"
                      ? "/single-stage-challenge"
                      : "/multi-stage-challenge",
                    { state: { challenge } }
                  )
                }
                className="cursor-pointer"
              >
                <Card className="mobile-card flex flex-col justify-between h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">
                        {challenge.name}
                      </h3>
                      <p className="text-xs text-primary mb-1">
                        by {challenge.commander}
                      </p>
                      <p className="text-xs text-primary mb-1">
                        {challenge.reason}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs mb-2">
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.format === "multi"
                            ? "Multi-stage"
                            : "Single-stage"}
                        </span>
                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {challenge.visibility}
                        </span>
                      </div>
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
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
