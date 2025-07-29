import React, { useState } from 'react';
import { ArrowLeft, Plus, Trophy, Gem, Coins, Info, X } from 'lucide-react';
import { ChallengeData } from '../ChallengeCreationFlow';

interface ChallengeStagesStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ChallengeStagesStep: React.FC<ChallengeStagesStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};
    
    data.stages.forEach((stage, index) => {
      if (!stage.title.trim()) {
        newErrors[`title_${index}`] = 'Stage title is required';
      }
      if (!stage.description.trim()) {
        newErrors[`description_${index}`] = 'Goal description is required';
      }
      if (stage.rewardType === 'points' && (!stage.points || stage.points <= 0)) {
        newErrors[`points_${index}`] = 'Points must be greater than 0';
      }
      if (stage.rewardType === 'gems' && (!stage.gems || stage.gems <= 0)) {
        newErrors[`gems_${index}`] = 'Gems must be greater than 0';
      }
      if (stage.rewardType === 'both') {
        if (!stage.points || stage.points <= 0) {
          newErrors[`points_${index}`] = 'Points must be greater than 0';
        }
        if (!stage.gems || stage.gems <= 0) {
          newErrors[`gems_${index}`] = 'Gems must be greater than 0';
        }
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-destructive');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const updateStage = (index: number, updates: Partial<typeof data.stages[0]>) => {
    const updatedStages = data.stages.map((stage, i) => 
      i === index ? { ...stage, ...updates } : stage
    );
    onUpdate({ stages: updatedStages });
  };

  const addStage = () => {
    if (data.challengeType === 'multi-task') {
      onUpdate({
        stages: [...data.stages, {
          title: '',
          description: '',
          rewardType: 'points',
          points: 100
        }]
      });
    }
  };

  const removeStage = (index: number) => {
    if (data.stages.length > 1) {
      const updatedStages = data.stages.filter((_, i) => i !== index);
      onUpdate({ stages: updatedStages });
    }
  };

  const isSingleTask = data.challengeType === 'single-task';

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
            Challenge {isSingleTask ? 'Goal' : 'Stages'}
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            {isSingleTask ? 'Define your challenge goal' : 'Set up progressive stages'}
          </p>
        </div>
      </div>

      {/* Stages */}
      <div className="space-y-4">
        {data.stages.map((stage, index) => (
          <div key={index} className="glass-card p-6 space-y-4">
            {/* Stage Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium text-foreground">
                  {isSingleTask ? 'Challenge Goal' : `Stage ${index + 1}`}
                </h3>
              </div>
              {!isSingleTask && data.stages.length > 1 && (
                <button
                  onClick={() => removeStage(index)}
                  className="p-1 rounded-full hover:bg-destructive/10 text-destructive"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Stage Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {isSingleTask ? 'Goal Title' : 'Stage Title'} *
              </label>
              <input
                type="text"
                className="soft-input w-full"
                placeholder={isSingleTask ? "e.g. Complete Daily Workout" : `e.g. Week ${index + 1} Target`}
                value={stage.title}
                onChange={(e) => updateStage(index, { title: e.target.value })}
              />
              {errors[`title_${index}`] && (
                <p className="text-xs text-destructive">{errors[`title_${index}`]}</p>
              )}
            </div>

            {/* Goal Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Goal Description *
              </label>
              <textarea
                className="soft-input w-full min-h-[80px] resize-none"
                placeholder="Describe what participants need to achieve..."
                value={stage.description}
                onChange={(e) => updateStage(index, { description: e.target.value })}
              />
              {errors[`description_${index}`] && (
                <p className="text-xs text-destructive">{errors[`description_${index}`]}</p>
              )}
            </div>

            {/* Reward Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-primary">
                Rewards *
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'points', icon: Coins, label: 'Points', color: 'text-yellow-500' },
                  { value: 'gems', icon: Gem, label: 'Gems', color: 'text-blue-500' },
                  { value: 'both', icon: Trophy, label: 'Both', color: 'text-purple-500' }
                ].map(({ value, icon: Icon, label, color }) => (
                  <button
                    key={value}
                    onClick={() => updateStage(index, { rewardType: value as any })}
                    className={`glass-card p-3 text-center transition-all duration-200 ${
                      stage.rewardType === value 
                        ? 'ring-2 ring-primary bg-primary-soft/20' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                    <span className="text-xs font-medium text-foreground">{label}</span>
                  </button>
                ))}
              </div>

              {/* Reward Inputs */}
              <div className="grid grid-cols-2 gap-3">
                {(stage.rewardType === 'points' || stage.rewardType === 'both') && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-primary">Points</label>
                    <input
                      type="number"
                      min="1"
                      className="soft-input w-full"
                      placeholder="100"
                      value={stage.points || ''}
                      onChange={(e) => updateStage(index, { points: parseInt(e.target.value) || undefined })}
                    />
                    {errors[`points_${index}`] && (
                      <p className="text-xs text-destructive">{errors[`points_${index}`]}</p>
                    )}
                  </div>
                )}
                
                {(stage.rewardType === 'gems' || stage.rewardType === 'both') && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-primary">Gems</label>
                    <input
                      type="number"
                      min="1"
                      className="soft-input w-full"
                      placeholder="10"
                      value={stage.gems || ''}
                      onChange={(e) => updateStage(index, { gems: parseInt(e.target.value) || undefined })}
                    />
                    {errors[`gems_${index}`] && (
                      <p className="text-xs text-destructive">{errors[`gems_${index}`]}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Stage Button (Multi-task only) */}
        {!isSingleTask && (
          <button
            onClick={addStage}
            className="w-full glass-card p-4 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Another Stage</span>
            </div>
          </button>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={validateAndNext}
        className="bubble-button w-full py-4 text-white font-medium"
      >
        Continue
      </button>

      {/* Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span> {isSingleTask 
              ? 'Make your goal specific and measurable for clear success criteria.'
              : 'Design stages to gradually increase in difficulty for better engagement.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};