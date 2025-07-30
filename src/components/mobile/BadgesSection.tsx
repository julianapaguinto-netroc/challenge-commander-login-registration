import { Award, Medal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconType: 'award' | 'medal' | 'star';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate: string;
  challengeName?: string;
}

interface BadgesSectionProps {
  badges: Badge[];
  onViewAllBadges: () => void;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
};

export function BadgesSection({ badges, onViewAllBadges }: BadgesSectionProps) {
  const recentBadges = badges.slice(0, 4);

  return (
    <div className="card-gradient bg-white shadow-sm rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Badges & Trophies</h3>
        </div>
        {badges.length > 4 && (
          <Button variant="ghost" size="sm" onClick={onViewAllBadges}>
            View All ({badges.length})
          </Button>
        )}
      </div>

      {badges.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Earn your first badge by completing challenges!
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {recentBadges.map((badge) => (
            <div
              key={badge.id}
              className="aspect-square bg-background/50 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-background/70 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${rarityColors[badge.rarity]} flex items-center justify-center mb-1`}>
                {badge.iconType === 'award' && <Award className="w-6 h-6 text-white" />}
                {badge.iconType === 'medal' && <Medal className="w-6 h-6 text-white" />}
              </div>
              <p className="text-xs font-medium truncate w-full">{badge.name}</p>
            </div>
          ))}

          {badges.length > 4 && (
            <div
              className="aspect-square bg-background/30 rounded-lg p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-background/50 transition-colors border-2 border-dashed border-muted"
              onClick={onViewAllBadges}
            >
              <Plus className="w-4 h-4 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">+{badges.length - 4}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
