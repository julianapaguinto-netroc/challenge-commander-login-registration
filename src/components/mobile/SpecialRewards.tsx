import { Gift, Trophy, Star, Leaf, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rewards = [
  {
    id: 1,
    icon: Leaf,
    name: "Eco Warrior Badge",
    description: "For reducing 50% carbon footprint",
    value: "500 pts",
    challenge: "Eco-Friendly Workplace Initiative",
    cardStyle:
      "border-l-4 border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white",
    iconColor: "text-yellow-500",
  },
  {
    id: 2,
    icon: Trophy,
    name: "$200 Wellness Voucher",
    description: "Amazon gift card for fitness gear",
    value: "$200",
    challenge: "Daily Fitness Challenge",
    cardStyle:
      "border-l-4 border-l-space-blue bg-gradient-to-r from-blue-50 to-white",
    iconColor: "text-space-blue",
  },
  {
    id: 3,
    icon: Utensils,
    name: "Master Chef Kit",
    description: "Professional cooking utensils set",
    value: "$150",
    challenge: "Healthy Recipe Exchange",
    cardStyle:
      "border-l-4 border-l-primary bg-gradient-to-r from-red-50 to-white",
    iconColor: "text-primary",
  },
];

export const SpecialRewards = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-poppins font-normal text-foreground flex items-center gap-2">
        <span>🎁</span>
        Special Rewards
      </h2>
      <p className="text-sm font-poppins font-light text-muted-foreground -mt-2">
        Items you can win in current challenges
      </p>

      <div className="space-y-3">
        {rewards.map((reward) => {
          const IconComponent = reward.icon;
          return (
            <Card
              key={reward.id}
              className={`p-4 shadow-card hover:shadow-hover transition-all duration-300 rounded-xl ${reward.cardStyle}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-full bg-white shadow-sm flex-shrink-0 ${reward.iconColor}`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-poppins font-medium text-foreground">
                        {reward.name}
                      </h3>
                      <p className="text-sm font-poppins font-light text-muted-foreground">
                        {reward.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="font-poppins font-medium text-primary border-primary whitespace-nowrap"
                    >
                      {reward.value}
                    </Badge>
                  </div>

                  <div className="pt-1">
                    <p className="text-xs font-poppins font-light text-muted-foreground">
                      Available in:
                    </p>
                    <p className="text-xs font-poppins font-medium text-primary">
                      {reward.challenge}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
