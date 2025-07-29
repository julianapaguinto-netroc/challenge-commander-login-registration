import { ChevronRight, Clock, Users, User, Crown, Shield, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export interface Challenge {
  id: string;
  name: string;
  category: 'Go Green' | 'Active' | 'Culinary' | 'Learning' | 'Creative';
  role: 'Team' | 'Individual' | 'Commander' | 'Admin' | 'Supporter';
  format: 'Single' | 'Multi-stage';
  visibility: 'Private' | 'Public';
  progressPercentage: number;
  timeLeft: string;
  participants: number;
  status: 'active' | 'completed' | 'upcoming';
  isExpiring?: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onViewDetails: (challengeId: string) => void;
}

const categoryColors = {
  'Go Green': 'bg-green-100 text-green-700 border-green-200',
  'Active': 'bg-blue-100 text-blue-700 border-blue-200',
  'Culinary': 'bg-orange-100 text-orange-700 border-orange-200'
};

const roleColors = {
  'Team': 'bg-blue-100 text-blue-700 border-blue-200',
  'Individual': 'bg-gray-100 text-gray-700 border-gray-200',
  'Commander': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Admin': 'bg-red-100 text-red-700 border-red-200',
  'Supporter': 'bg-indigo-100 text-indigo-700 border-indigo-200',
};

export function ChallengeCard({ challenge, onViewDetails }: ChallengeCardProps) {
  return (
    <div className="card-gradient bg-white shadow-sm rounded-xl p-4 mb-3 border border-border/50">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-foreground flex-1 pr-2 leading-snug">
          {challenge.name}
        </h3>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      </div>
      
      {/* Tags Row */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge 
          variant="outline" 
          className={`text-xs px-2 py-0.5 ${categoryColors[challenge.category]}`}
        >
          {challenge.category}
        </Badge>
        <Badge 
          variant="outline" 
          className={`text-xs px-2 py-0.5 ${roleColors[challenge.role]}`}
        >
          {challenge.role === 'Commander' && <Crown className="w-3 h-3 mr-1" />}
          {challenge.role === 'Admin' && <Shield className="w-3 h-3 mr-1" />}
          {challenge.role === 'Team' && <Users className="w-3 h-3 mr-1" />}
          {challenge.role === 'Individual' && <User className="w-3 h-3 mr-1" />}
          {challenge.role === 'Supporter' && <User className="w-3 h-3 mr-1" />}
          {challenge.role}
        </Badge>
        <Badge variant="outline" className="text-xs px-2 py-0.5">
          {challenge.format}
        </Badge>
        <Badge 
          variant="outline" 
          className={`text-xs px-2 py-0.5 ${
            challenge.visibility === 'Private' 
              ? 'bg-red-100 text-red-700 border-red-200' 
              : 'bg-green-100 text-green-700 border-green-200'
          }`}
        >
          {challenge.visibility === 'Private' ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
          {challenge.visibility}
        </Badge>
      </div>
      
      {/* Progress Row */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Progress</span>
          <span>{challenge.progressPercentage}%</span>
        </div>
        <Progress value={challenge.progressPercentage} className="h-1.5" />
      </div>
      
      {/* Bottom Info Row */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className={challenge.isExpiring ? 'text-warning font-medium' : ''}>
            {challenge.timeLeft}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{challenge.participants} participants</span>
        </div>
      </div>
      
      {/* Action Button */}
      <Button 
        variant={challenge.status === 'completed' ? 'outline' : 'default'}
        size="sm" 
        className="w-full mt-3 text-xs"
        onClick={() => onViewDetails(challenge.id)}
      >
        {challenge.status === 'completed' ? 'View Results' : 
         challenge.status === 'upcoming' ? 'View Details' : 'Continue Challenge'}
      </Button>
    </div>
  );
}