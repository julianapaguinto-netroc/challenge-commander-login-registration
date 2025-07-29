import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="progress-pill">
        <div 
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {/* Step Counter */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-primary">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="text-sm font-light text-muted-foreground">
          {stepLabels[currentStep]}
        </div>
      </div>
      
      {/* Step Dots */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index <= currentStep 
                ? 'bg-primary shadow-sm' 
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};