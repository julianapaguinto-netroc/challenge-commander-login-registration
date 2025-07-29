import React from 'react';
import { ArrowLeft, User, Users, Info } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';

interface ChallengeParticipantsStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ChallengeParticipantsStep: React.FC<ChallengeParticipantsStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleSelection = (type: 'individual' | 'team') => {
    onUpdate({ participantType: type });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Challenge Type
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            How will people participate?
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Individual Option */}
        <button
          onClick={() => handleSelection('individual')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.participantType === 'individual' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Individual Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                Each person competes on their own
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">
                  Perfect for personal goals
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Team Option */}
        <button
          onClick={() => handleSelection('team')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.participantType === 'team' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Team Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                Groups work together towards a common goal
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs text-muted-foreground">
                  Great for collaboration
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        disabled={!data.participantType}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span> Individual challenges are great for habits and personal goals, while team challenges work well for collaborative projects.
          </p>
        </div>
      </div>
    </div>
  );
};