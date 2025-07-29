import React from 'react';
import { ArrowLeft, Globe, Lock, Info } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';

interface ChallengeVisibilityStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ChallengeVisibilityStep: React.FC<ChallengeVisibilityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleSelection = (visibility: 'public' | 'private') => {
    onUpdate({ visibility });
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
            Challenge Visibility
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            Who can join this challenge?
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Public Option */}
        <button
          onClick={() => handleSelection('public')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.visibility === 'public' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-500/10">
              <Globe className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Public Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                Open to all users in the app/community
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">
                  Anyone can discover and join
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Private Option */}
        <button
          onClick={() => handleSelection('private')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.visibility === 'private' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-orange-500/10">
              <Lock className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Private Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                Invite-only for selected participants
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-xs text-muted-foreground">
                  Only invited users can join
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        disabled={!data.visibility}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      {/* Info Summary */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Current Setup</span>
          </div>
          <p className="text-xs font-light text-muted-foreground">
            {data.participantType === 'individual' ? 'Individual' : 'Team'} challenge • 
            {data.visibility === 'public' ? ' Anyone can join' : ' Invite-only'}
          </p>
        </div>
      </div>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span> Public challenges get more participants but private ones allow better control over who joins.
          </p>
        </div>
      </div>
    </div>
  );
};