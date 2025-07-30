import { Star, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PointsLevelProps {
  currentPoints: number;
  dailyMaxPoints?: number;
  nextLevelPoints?: number;
  currentLevel: string;
  progressPercentage: number;
}

export function PointsLevel({ 
  currentPoints, 
  dailyMaxPoints, 
  nextLevelPoints, 
  currentLevel,
  progressPercentage 
}: PointsLevelProps) {
  const maxPoints = dailyMaxPoints || nextLevelPoints || 1000;
  
  return (
    <div className="card-gradient rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <div>
            <p className="text-sm font-light text-muted-foreground">Current Level</p>
            <h3 className="font-medium text-foreground">{currentLevel}</h3>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-light text-muted-foreground">Points</p>
          <p className="font-semibold text-primary text-lg">{currentPoints.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {dailyMaxPoints ? "Daily Progress" : "Next Level"}
          </span>
          <span className="font-medium">
            {currentPoints.toLocaleString()} / {maxPoints.toLocaleString()}
          </span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-muted"
        />
      </div>
    </div>
  );
}