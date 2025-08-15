import React from 'react';
import { ArrowLeft, List, Info, Plus, Users } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';

interface ChallengeTypeStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ChallengeTypeStep: React.FC<ChallengeTypeStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const handleToggle = () => {
    const newIsMultiStage = !data.isMultiStage;
    onUpdate({ 
      isMultiStage: newIsMultiStage,
      challengeType: newIsMultiStage ? 'multi-task' : 'single-task'
    });
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
            Challenge Structure
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            Configure your challenge stages
          </p>
        </div>
      </div>

      {/* Multi-Stage Toggle */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <List className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Multi-Stage Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Create multiple stages with different goals
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              data.isMultiStage ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                data.isMultiStage ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
      </div>

      {/* Max Participants Field for Public Individual Challenges */}
      {data.visibility === 'public' && data.participantType === 'individual' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">
                Participant Limit
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Set maximum number of participants (optional)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Maximum Participants
            </label>
            <input
              type="number"
              placeholder="e.g., 100 (leave empty for unlimited)"
              value={data.maxParticipants || ''}
              onChange={(e) => onUpdate({ maxParticipants: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              min="1"
            />
          </div>
        </div>
      )}
        
        {data.isMultiStage && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Plus className="w-4 h-4" />
              <span>You can add multiple stages in the next step</span>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-medium transition-all duration-300"
      >
        Continue
      </button>

      {/* Examples */}
      <div className="glass-card p-4 space-y-4">
        <h4 className="text-sm font-medium text-primary">Example</h4>
        
        <div className="flex items-start space-x-3">
          <List className="w-4 h-4 text-blue-500 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Multi-Stage Challenge</p>
            <p className="text-xs font-light text-muted-foreground">
              "Stage 1: Read 1 chapter, Stage 2: 2 chapters, Stage 3: 3 chapters"
            </p>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span> Multi-stage challenges provide more engagement through progression and allow participants to build habits gradually.
          </p>
        </div>
      </div>
    </div>
  );
};