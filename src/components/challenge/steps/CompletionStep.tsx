import React from 'react';
import { Sparkles, Trophy, Share2, Plus } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';
import { useNavigate } from 'react-router-dom'; // ✅ navigation hook

interface CompletionStepProps {
  data: ChallengeData;
  onCreateNew: () => void;
}

export const CompletionStep: React.FC<CompletionStepProps> = ({
  data,
  onCreateNew,
}) => {
  const navigate = useNavigate(); // ✅ initialize navigation

  return (
    <div className="space-y-6 text-center pt-5">
      {/* Success Animation Area */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary-glow/20 to-primary/10 animate-pulse"></div>

        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg animate-bounce">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              🎉 Challenge Created!
            </h1>
            <p className="text-sm font-light text-muted-foreground">
              Your challenge "{data.name}" is ready to inspire participants
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Summary Card */}
      <div className="glass-card p-6 text-left space-y-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-foreground">{data.name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="glass-card p-3 bg-primary-soft/20">
            <div className="text-lg font-semibold text-primary">
              {data.challengeType === 'single-task' ? '1' : data.stages.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {data.challengeType === 'single-task' ? 'Goal' : 'Stages'}
            </div>
          </div>

          <div className="glass-card p-3 bg-primary-soft/20">
            <div className="text-lg font-semibold text-primary">
              {data.participantType === 'individual' ? 'Individual' : 'Team'}
            </div>
            <div className="text-xs text-muted-foreground">
              Challenge Type
            </div>
          </div>
        </div>

        <div className="glass-card p-3 bg-green-500/10">
          <div className="text-center">
            <div className="text-sm font-medium text-green-600">
              {data.publishOption === 'now' ? '✅ Published Now' : '⏰ Scheduled'}
            </div>
            <div className="text-xs text-muted-foreground">
              {data.startOption === 'onPublish' ? 'Starts immediately' : 'Starts on schedule'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="bubble-button w-full py-4 text-white font-medium">
          <div className="flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share Challenge</span>
          </div>
        </button>

        <button
          onClick={onCreateNew}
          className="glass-card w-full py-4 border-2 border-primary/30 hover:border-primary/50 transition-colors text-primary font-medium"
        >
          <div className="flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Another Challenge</span>
          </div>
        </button>

        {/* ✅ Redirect Button to HomeScreen Commander */}
        <button
          onClick={() => navigate('/homescreen-commander')}
          className="text-sm text-primary underline hover:text-primary/80 transition mt-2"
        >
          ← Back to Home
        </button>
      </div>

      {/* Celebration Message */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-primary">
            Ready to motivate and engage your community!
          </p>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
};
