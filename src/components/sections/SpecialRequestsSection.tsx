import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, FileCheck, HandHeart, Zap } from "lucide-react";

export default function SpecialRequestsSection() {
  const requests = [
    {
      id: 1,
      type: "gems",
      icon: Gift,
      title: "GEMS Received!",
      description: "Jane sent you 40 gems",
      action: "Accept",
      actionType: "primary",
    },
    {
      id: 2,
      type: "verification",
      icon: FileCheck,
      title: "Verification Request",
      description: "Review submission for this",
      action: "Review",
      actionType: "outline",
    },
    {
      id: 3,
      type: "contributor",
      icon: HandHeart,
      title: "Be a contributor of rewards for a Challenge",
      description: "Jane requests 40 gems",
      action: "Accept",
      actionType: "primary",
    },
    {
      id: 4,
      type: "nudge",
      icon: Zap,
      title: "Jane Nudged you",
      description: "Encouragement is here (Ultimate Howler)",
      action: null,
      actionType: "none",
    },
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "gems":
        return "text-cosmic-gold";
      case "verification":
        return "text-space-blue";
      case "contributor":
        return "text-primary";
      case "nudge":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getCardStyle = (type: string) => {
    switch (type) {
      case "gems":
        return "border-l-4 border-l-cosmic-gold bg-gradient-to-r from-yellow-50 to-white";
      case "verification":
        return "border-l-4 border-l-space-blue bg-gradient-to-r from-blue-50 to-white";
      case "contributor":
        return "border-l-4 border-l-primary bg-gradient-to-r from-red-50 to-white";
      case "nudge":
        return "border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white";
      default:
        return "";
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-lg font-semibold text-primary font-poppins mb-4">
        Special Requests
      </h2>

      <div className="space-y-3">
        {requests.map((request) => {
          const IconComponent = request.icon;
          return (
            <Card
              key={request.id}
              className={`mobile-card ${getCardStyle(request.type)}`}
            >
              <div className="flex items-center justify-between gap-3">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center ${getIconColor(
                    request.type
                  )}`}
                >
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Text content */}
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    {request.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {request.description}
                  </p>
                </div>

                {/* Button - vertically centered */}
                {request.action && (
                  <div className="flex items-center">
                    <Button
                      className={
                        request.actionType === "primary"
                          ? "btn-astronaut"
                          : "btn-outline-astronaut"
                      }
                      size="sm"
                    >
                      {request.action}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
