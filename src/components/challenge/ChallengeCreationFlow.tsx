import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ChallengeDetailsStep } from "./steps/ChallengeDetailsStep";
import { ChallengeParticipantsStep } from "./steps/ChallengeParticipantsStep";
import { ChallengeVisibilityStep } from "./steps/ChallengeVisibilityStep";
import { ParticipantSelectionStep } from "./steps/ParticipantSelectionStep";
import { TeamSetupStep } from "./steps/TeamSetupStep";
import { ChallengeTypeStep } from "./steps/ChallengeTypeStep";
import { ChallengeStagesStep } from "./steps/ChallengeStagesStep";
import { ReviewScheduleStep } from "./steps/ReviewScheduleStep";
import { CompletionStep } from "./steps/CompletionStep";
import { ProgressIndicator } from "./ProgressIndicator";

export interface ChallengeData {
  name: string;
  description: string;
  banner?: File;
  allowLeaderboard: boolean;
  selectedPersona?: string;
  selectedAdmins?: string[];

  participantType: "individual" | "team";
  visibility: "public" | "private";

  selectedParticipants?: string[];

  teamConfig?: {
    teamCount?: number;
    participantsPerTeam?: number;
    teams?: Array<{
      name: string;
      members: string[];
    }>;
  };

  challengeType: "single-task" | "multi-task";

  stages: Array<{
    title: string;
    description: string;
    rewardType: "points" | "gems" | "both";
    points?: number;
    gems?: number;
    // Add these:
    badgeTieringEnabled?: boolean;
    badgeTiers?: Array<{
      title: string;
      range: string;
      icon: File | null;
    }>;
  }>;

  publishOption: "now" | "scheduled";
  publishDate?: Date;
  startOption: "onPublish" | "scheduled";
  startDate?: Date;
  endDate?: Date;
}

const STEPS = [
  "Details",
  "Participants",
  "Visibility",
  "Select Members",
  "Team Setup",
  "Type",
  "Stages",
  "Review",
];

const SUCCESS_STEP = 8;

export const ChallengeCreationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [challengeData, setChallengeData] = useState<ChallengeData>({
    name: "",
    description: "",
    allowLeaderboard: true,
    participantType: "individual",
    visibility: "public",
    challengeType: "single-task",
    stages: [
      {
        title: "",
        description: "",
        rewardType: "points",
        points: 100,
      },
    ],
    publishOption: "now",
    startOption: "onPublish",
  });

  const updateChallengeData = (updates: Partial<ChallengeData>) => {
    setChallengeData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    const maxSteps = getActiveSteps().length;
    if (currentStep < maxSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const needsParticipantSelection = () => {
    return (
      challengeData.visibility === "private" &&
      challengeData.participantType === "individual"
    );
  };

  const needsTeamSetup = () => {
    return challengeData.participantType === "team";
  };

  const getActiveSteps = () => {
    let steps = [...STEPS];
    if (!needsParticipantSelection()) {
      steps = steps.filter((step) => step !== "Select Members");
    }
    if (!needsTeamSetup()) {
      steps = steps.filter((step) => step !== "Team Setup");
    }
    return steps;
  };

  const getCurrentStepComponent = () => {
    const activeSteps = getActiveSteps();
    const currentStepName = activeSteps[currentStep];

    switch (currentStepName) {
      case "Details":
        return (
          <ChallengeDetailsStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
          />
        );
      case "Participants":
        return (
          <ChallengeParticipantsStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Visibility":
        return (
          <ChallengeVisibilityStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Select Members":
        return (
          <ParticipantSelectionStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Team Setup":
        return (
          <TeamSetupStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Type":
        return (
          <ChallengeTypeStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Stages":
        return (
          <ChallengeStagesStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "Review":
        return (
          <ReviewScheduleStep
            data={challengeData}
            onUpdate={updateChallengeData}
            onNext={() => setCurrentStep(SUCCESS_STEP)}
            onBack={handleBack}
          />
        );
      default:
        if (currentStep === SUCCESS_STEP) {
          return (
            <CompletionStep
              data={challengeData}
              onCreateNew={() => {
                setCurrentStep(0);
                setChallengeData({
                  name: "",
                  description: "",
                  allowLeaderboard: true,
                  participantType: "individual",
                  visibility: "public",
                  challengeType: "single-task",
                  stages: [
                    {
                      title: "",
                      description: "",
                      rewardType: "points",
                      points: 100,
                    },
                  ],
                  publishOption: "now",
                  startOption: "onPublish",
                });
              }}
            />
          );
        }
        return null;
    }
  };

  const activeSteps = getActiveSteps();
  const isSuccess = currentStep === SUCCESS_STEP;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-soft/30 to-background">
      <div className="max-w-md mx-auto">
        {!isSuccess && (
          <div className="glass-card mx-6 mt-6 p-4">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-primary">
                Challenge Builder
              </h2>
              <p className="text-xs font-light text-muted-foreground">
                Create your perfect challenge
              </p>
            </div>
          </div>
        )}

        {!isSuccess && (
          <div className="pt-6 pb-4 px-6">
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={activeSteps.length}
              stepLabels={activeSteps}
            />
          </div>
        )}

        <div className="px-6 pb-6">{getCurrentStepComponent()}</div>
      </div>
    </div>
  );
};

export default ChallengeCreationFlow;
