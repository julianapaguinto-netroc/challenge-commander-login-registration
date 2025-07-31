import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, ChevronRight } from "lucide-react";

export default function KeepGoingSection() {
  const navigate = useNavigate();

  const challenges = [
    {
      id: 1,
      title: "Challenge #1",
      commander: "Commander Jane",
      status: "active", // ← changed from "Private" and replaces progressStatus
      type: "Team Participant",
      participantCount: 5,
      category: "Go Green",
      progress: 65,
      challengeType: "Multiple",
      expiresIn: "3 days left",
    },
    {
      id: 2,
      title: "Challenge #2",
      commander: "Coach John",
      status: "active",
      type: "Individual Participant",
      participantCount: 1,
      category: "Active",
      progress: 40,
      challengeType: "Single",
      expiresIn: "5 days left",
    },
    {
      id: 3,
      title: "Challenge #3",
      commander: "Chef Emma",
      status: "active",
      type: "Supporter",
      participantCount: 0,
      category: "Culinary",
      progress: 99,
      challengeType: "Multiple",
      expiresIn: "2 days left",
    },
  ];

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Go Green":
        return "badge-go-green";
      case "Active":
        return "badge-active";
      case "Culinary":
        return "badge-culinary";
      default:
        return "badge-category";
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Private" ? "badge-private" : "badge-public";
  };

  const handleCardClick = (challenge: any) => {
    const route =
      challenge.challengeType === "Single"
        ? "/single-stage-challenge"
        : "/multi-stage-challenge";
    navigate(route, { state: { challenge } }); // 👈 pass full challenge object
  };

  return (
    <section className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary font-poppins">
          Keep Going!
        </h2>
        <Button variant="ghost" className="text-primary text-sm font-poppins">
          View All ({challenges.length})
        </Button>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className="p-4 shadow-sm space-y-2 cursor-pointer hover:shadow-md transition"
            onClick={() => handleCardClick(challenge)}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-base text-foreground">
                {challenge.title}
              </h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>

            <p className="text-sm text-muted-foreground">
              by {challenge.commander}
            </p>

            <div className="flex flex-wrap gap-2 text-sm">
              <span
                className={`badge-category ${getCategoryBadge(
                  challenge.category
                )}`}
              >
                {challenge.category}
              </span>
              <span className="badge-public">{challenge.type}</span>
              <span className="badge-private">
                {challenge.challengeType} Challenge
              </span>
              <span className={getStatusBadge(challenge.status)}>
                {challenge.status}
              </span>

              {challenge.status === "active" && (
                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs">
                  Continue Challenge
                </span>
              )}
              {challenge.status === "completed" && (
                <span className="bg-gray-200 text-gray-500 px-2 py-0.5 rounded text-xs">
                  Completed
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Progress value={challenge.progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span className="text-primary font-medium">
                  {challenge.progress}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{challenge.expiresIn}</span>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{challenge.participantCount}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
