import { Crown, ExternalLink } from "lucide-react";

export interface ChallengeCommander {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  totalChallenges: number;
  businessName?: string;
}

interface CommanderSectionProps {
  commanders: ChallengeCommander[];
  onViewCommander: (commanderId: string) => void;
}

export function CommanderSection({ commanders, onViewCommander }: CommanderSectionProps) {
  if (commanders.length === 0) {
    return null;
  }

  return (
    <div className="card-gradient rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Challenge Commanders</h3>
      </div>
      
      <div className="space-y-2">
        {commanders.slice(0, 3).map((commander) => (
          <div 
            key={commander.id}
            className="flex items-center justify-between p-3 bg-background/50 rounded-lg cursor-pointer hover:bg-background/70 transition-colors"
            onClick={() => onViewCommander(commander.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{commander.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {commander.businessName || commander.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Challenges</p>
                <p className="text-sm font-medium">{commander.totalChallenges}</p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}