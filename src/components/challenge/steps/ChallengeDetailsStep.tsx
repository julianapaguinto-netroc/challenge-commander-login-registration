import React, { useState } from "react";
import { Upload, Info } from "lucide-react";
import { ChallengeData } from "../ChallengeCreationFlow";

interface ChallengeDetailsStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
}

export const ChallengeDetailsStep: React.FC<ChallengeDetailsStepProps> = ({
  data,
  onUpdate,
  onNext,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (!data.name.trim()) {
      newErrors.name = "Challenge name is required";
    }
    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!data.selectedPersona) {
      newErrors.selectedPersona = "Please select a target persona";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Create New Challenge
        </h1>
        <p className="text-sm font-light text-muted-foreground">
          Let's start with the basics
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card p-6 space-y-6">
        {/* Challenge Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Challenge Name *
          </label>
          <input
            type="text"
            className="soft-input w-full"
            placeholder="e.g. 30-Day Fitness Challenge"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Description *
          </label>
          <textarea
            className="soft-input w-full min-h-[100px] resize-none"
            placeholder="Describe what this challenge is about..."
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description}</p>
          )}
        </div>

        {/* Banner Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Challenge Banner (Optional)
          </label>
          <div className="relative">
            <div className="glass-card p-6 border-2 border-dashed border-primary/30 text-center cursor-pointer hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-light text-muted-foreground">
                Tap to upload an image
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard Toggle */}
        <div className="glass-card p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground">
                Allow Leaderboard?
              </h3>
              <p className="text-xs font-light text-muted-foreground mt-1">
                Show participant rankings and progress
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={data.allowLeaderboard}
                onChange={(e) =>
                  onUpdate({ allowLeaderboard: e.target.checked })
                }
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        {/* Persona Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            Select Target *
          </label>

          <select
            className="soft-input w-full"
            value={data.selectedPersona || ""}
            onChange={(e) => onUpdate({ selectedPersona: e.target.value })}
          >
            <option value="" disabled>
              Select a target
            </option>
            {JSON.parse(localStorage.getItem("selectedAudiences") || "[]").map(
              (aud: string) => (
                <option key={aud} value={aud}>
                  {aud}
                </option>
              )
            )}
          </select>

          {!data.selectedPersona && errors.selectedPersona && (
            <p className="text-xs text-destructive">{errors.selectedPersona}</p>
          )}
        </div>
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
            <span className="font-medium text-primary">Tip:</span> Choose a
            clear, motivating name that explains what participants will achieve.
          </p>
        </div>
      </div>
    </div>
  );
};
