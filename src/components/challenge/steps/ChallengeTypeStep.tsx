import React from 'react';
import { ArrowLeft, Target, List, Info } from 'lucide-react';
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
  const handleSelection = (type: 'single-task' | 'multi-task') => {
    onUpdate({ challengeType: type });
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
            How complex is your challenge?
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Single Task Option */}
        <button
          onClick={() => handleSelection('single-task')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.challengeType === 'single-task' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Single-Task Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                One goal to achieve from start to finish
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-muted-foreground">
                  Simple and focused
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Multi Task Option */}
        <button
          onClick={() => handleSelection('multi-task')}
          className={`glass-card w-full p-6 text-left transition-all duration-300 ${
            data.challengeType === 'multi-task' 
              ? 'ring-2 ring-primary bg-primary-soft/20' 
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <List className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground">
                Multi-Task Challenge
              </h3>
              <p className="text-sm font-light text-muted-foreground mt-1">
                Multiple stages with different goals
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs text-muted-foreground">
                  Progressive journey
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <button
        onClick={onNext}
        disabled={!data.challengeType}
        className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 text-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>

      {/* Examples */}
      <div className="glass-card p-4 space-y-4">
        <h4 className="text-sm font-medium text-primary">Examples</h4>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Target className="w-4 h-4 text-green-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Single-Task</p>
              <p className="text-xs font-light text-muted-foreground">
                "Complete daily scripture reading for 30 days"
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <List className="w-4 h-4 text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Multi-Task</p>
              <p className="text-xs font-light text-muted-foreground">
                "Week 1: Read 1 chapter, Week 2: 2 chapters, Week 3: 3 chapters"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span> Single-task challenges are easier to track, while multi-task challenges provide more engagement through progression.
          </p>
        </div>
      </div>
    </div>
  );
};