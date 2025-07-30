import { Gift, ExternalLink, BadgeCheck, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'points' | 'gift' | 'discount';
  isRedeemed: boolean;
  challengeName?: string;
}

interface RewardsSectionProps {
  rewards: Reward[];
  onRedeemReward: (rewardId: string) => void;
}

const typeIconMap = {
  badge: BadgeCheck,
  points: Gift,
  gift: Gift,
  discount: Percent
};

const getIconColor = (type: string) => {
  switch (type) {
    case "badge":
      return "text-blue-500";
    case "points":
      return "text-primary";
    case "gift":
      return "text-cosmic-gold";
    case "discount":
      return "text-green-500";
    default:
      return "text-muted-foreground";
  }
};

const getCardStyle = (type: string) => {
  switch (type) {
    case "badge":
      return "border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white";
    case "points":
      return "border-l-4 border-l-primary bg-gradient-to-r from-red-50 to-white";
    case "gift":
      return "border-l-4 border-l-cosmic-gold bg-gradient-to-r from-yellow-50 to-white";
    case "discount":
      return "border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white";
    default:
      return "";
  }
};

export function RewardsSection({ rewards, onRedeemReward }: RewardsSectionProps) {
  const unredeemedRewards = rewards.filter(r => !r.isRedeemed);

  if (unredeemedRewards.length === 0) {
    return (
      <div className="card-gradient rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Rewards</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-4">
          Complete challenges to earn rewards!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-primary">Rewards</h3>
        <Badge variant="secondary" className="ml-auto">
          {unredeemedRewards.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {unredeemedRewards.slice(0, 3).map((reward) => {
          const Icon = typeIconMap[reward.type] || Gift;
          return (
            <Card key={reward.id} className={`mobile-card ${getCardStyle(reward.type)}`}>
              <div className="flex items-center justify-between gap-3">
               
                {/* Text */}
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground">{reward.name}</h4>
                  <p className="text-xs text-muted-foreground">{reward.description}</p>
                  {reward.challengeName && (
                    <p className="text-xs text-primary font-medium mt-1">
                      From: {reward.challengeName}
                    </p>
                  )}
                </div>

                {/* Redeem Button */}
                <div className="flex items-center">
                  <Button
                    className="btn-astronaut text-xs px-3"
                    size="sm"
                    onClick={() => onRedeemReward(reward.id)}
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {unredeemedRewards.length > 3 && (
          <Button variant="ghost" size="sm" className="w-full text-primary">
            View All ({unredeemedRewards.length - 3} more)
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
