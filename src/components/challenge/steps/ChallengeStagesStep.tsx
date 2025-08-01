import React, { useState } from "react";
import { ArrowLeft, Plus, Trophy, Gem, Coins, Info, X } from "lucide-react";
import { ChallengeData } from "../ChallengeCreationFlow";

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
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};

    data.stages.forEach((stage, index) => {
      if (!stage.title.trim()) {
        newErrors[`title_${index}`] = "Stage title is required";
      }
      if (!stage.description.trim()) {
        newErrors[`description_${index}`] = "Goal description is required";
      }
      if (
        stage.rewardType === "points" &&
        (!stage.points || stage.points <= 0)
      ) {
        newErrors[`points_${index}`] = "Points must be greater than 0";
      }
      if (stage.rewardType === "gems" && (!stage.gems || stage.gems <= 0)) {
        newErrors[`gems_${index}`] = "Gems must be greater than 0";
      }
      if (stage.rewardType === "both") {
        if (!stage.points || stage.points <= 0) {
          newErrors[`points_${index}`] = "Points must be greater than 0";
        }
        if (!stage.gems || stage.gems <= 0) {
          newErrors[`gems_${index}`] = "Gems must be greater than 0";
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      const firstErrorElement = document.querySelector(".text-destructive");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  const updateStage = (
    index: number,
    updates: Partial<(typeof data.stages)[0]>
  ) => {
    const updatedStages = data.stages.map((stage, i) =>
      i === index ? { ...stage, ...updates } : stage
    );
    onUpdate({ stages: updatedStages });
  };

  const addStage = () => {
    if (data.challengeType === "multi-task") {
      onUpdate({
        stages: [
          ...data.stages,
          {
            title: "",
            description: "",
            rewardType: "points",
            points: 100,
            badgeTieringEnabled: false,
            badgeTiers: [],

            enableRewards: false,
            rewardSystemType: undefined,
            rewardSystemInput: "",
            pointsCounterOnceOff: undefined,
            pointsCapPerStaff: undefined,
          },
        ],
      });
    }
  };

  const removeStage = (index: number) => {
    if (data.stages.length > 1) {
      const updatedStages = data.stages.filter((_, i) => i !== index);
      onUpdate({ stages: updatedStages });
    }
  };

  const isSingleTask = data.challengeType === "single-task";

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            Challenge {isSingleTask ? "Goal" : "Stages"}
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            {isSingleTask
              ? "Define your challenge goal"
              : "Set up progressive stages"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.stages.map((stage, index) => (
          <div key={index} className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium text-foreground">
                  {isSingleTask ? "Challenge Goal" : `Stage ${index + 1}`}
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                {isSingleTask ? "Goal Title" : "Stage Title"} *
              </label>
              <input
                type="text"
                className="soft-input w-full"
                placeholder={
                  isSingleTask
                    ? "e.g. Complete Daily Workout"
                    : `e.g. Week ${index + 1} Target`
                }
                value={stage.title}
                onChange={(e) => updateStage(index, { title: e.target.value })}
              />
              {errors[`title_${index}`] && (
                <p className="text-xs text-destructive">
                  {errors[`title_${index}`]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">
                Goal Description *
              </label>
              <textarea
                className="soft-input w-full min-h-[80px] resize-none"
                placeholder="Describe what participants need to achieve..."
                value={stage.description}
                onChange={(e) =>
                  updateStage(index, { description: e.target.value })
                }
              />
              {errors[`description_${index}`] && (
                <p className="text-xs text-destructive">
                  {errors[`description_${index}`]}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-primary">
                Rewards *
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    value: "points",
                    icon: Coins,
                    label: "Points",
                    color: "text-yellow-500",
                  },
                  {
                    value: "gems",
                    icon: Gem,
                    label: "Gems",
                    color: "text-blue-500",
                  },
                  {
                    value: "both",
                    icon: Trophy,
                    label: "Both",
                    color: "text-purple-500",
                  },
                ].map(({ value, icon: Icon, label, color }) => (
                  <button
                    key={value}
                    onClick={() =>
                      updateStage(index, { rewardType: value as any })
                    }
                    className={`glass-card p-3 text-center transition-all duration-200 ${
                      stage.rewardType === value
                        ? "ring-2 ring-primary bg-primary-soft/20"
                        : "hover:scale-105"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
                    <span className="text-xs font-medium text-foreground">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(stage.rewardType === "points" ||
                  stage.rewardType === "both") && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-primary">
                      Points
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="soft-input w-full"
                      placeholder="100"
                      value={stage.points || ""}
                      onChange={(e) =>
                        updateStage(index, {
                          points: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    {errors[`points_${index}`] && (
                      <p className="text-xs text-destructive">
                        {errors[`points_${index}`]}
                      </p>
                    )}
                  </div>
                )}

                {(stage.rewardType === "gems" ||
                  stage.rewardType === "both") && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-primary">
                      Gems
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="soft-input w-full"
                      placeholder="10"
                      value={stage.gems || ""}
                      onChange={(e) =>
                        updateStage(index, {
                          gems: parseInt(e.target.value) || undefined,
                        })
                      }
                    />
                    {errors[`gems_${index}`] && (
                      <p className="text-xs text-destructive">
                        {errors[`gems_${index}`]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Reward Toggle */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-primary">
                  Enable Challenge Reward Type?
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ease-in-out ${
                    stage.enableRewards
                      ? "bg-primary border-primary/70"
                      : "bg-muted border-border"
                  }`}
                  role="switch"
                  aria-checked={stage.enableRewards}
                  onClick={() =>
                    updateStage(index, { enableRewards: !stage.enableRewards })
                  }
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      stage.enableRewards ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {stage.enableRewards && (
                <div className="space-y-3 mt-4">
                  <div className="flex flex-wrap gap-6 text-sm ml-1">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="points"
                        checked={stage.rewardSystemType === "points"}
                        onChange={() =>
                          updateStage(index, {
                            rewardSystemType: "points",
                            rewardSystemInput: "",
                          })
                        }
                        className="form-radio text-primary"
                      />
                      Reward Point System
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="non-points"
                        checked={stage.rewardSystemType === "non-points"}
                        onChange={() =>
                          updateStage(index, {
                            rewardSystemType: "non-points",
                            rewardSystemInput: "",
                          })
                        }
                        className="form-radio text-primary"
                      />
                      Non-Reward Point System
                    </label>
                  </div>

                  {stage.rewardSystemType === "points" && (
                    <input
                      type="number"
                      placeholder="Enter base points"
                      className="w-full max-w-sm px-3 py-2 rounded-md border border-border bg-background text-sm"
                      value={stage.rewardSystemInput}
                      onChange={(e) =>
                        updateStage(index, {
                          rewardSystemInput: e.target.value,
                        })
                      }
                    />
                  )}

                  {stage.rewardSystemType === "non-points" && (
                    <select
                      className="w-full max-w-sm px-3 py-2 rounded-md border border-border bg-background text-sm"
                      value={stage.rewardSystemInput}
                      onChange={(e) =>
                        updateStage(index, {
                          rewardSystemInput: e.target.value,
                        })
                      }
                    >
                      <option value="">Select a non-reward option</option>
                      {/* You can insert options here */}
                    </select>
                  )}
                </div>
              )}
            </div>

            {/* Constant Display: Points Counter Options */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-primary block mb-1">
                  Will points stop after 1st achievement?
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
                  value={stage.pointsCounterOnceOff || ""}
                  onChange={(e) =>
                    updateStage(index, {
                      pointsCounterOnceOff: e.target.value as
                        | "once"
                        | "recurring",
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="once">Once-Off</option>
                  <option value="recurring">Recurring</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-primary block mb-1">
                  Limit maximum points per staff?
                </label>
                <select
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
                  value={stage.pointsCapPerStaff || ""}
                  onChange={(e) =>
                    updateStage(index, {
                      pointsCapPerStaff: e.target.value as "yes" | "no",
                    })
                  }
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            {/* Badge Tiering Section */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-primary">
                  Badge Tiering Required?
                </label>
                <button
                  type="button"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border transition-colors duration-200 ease-in-out ${
                    stage.badgeTieringEnabled
                      ? "bg-primary border-primary/70"
                      : "bg-muted border-border"
                  }`}
                  role="switch"
                  aria-checked={stage.badgeTieringEnabled}
                  onClick={() =>
                    updateStage(index, {
                      badgeTieringEnabled: !stage.badgeTieringEnabled,
                      badgeTiers: !stage.badgeTieringEnabled
                        ? [{ title: "", range: "", icon: null }]
                        : [],
                    })
                  }
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      stage.badgeTieringEnabled
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {stage.badgeTieringEnabled && (
                <div className="space-y-4">
                  {stage.badgeTiers?.map((tier, tierIndex) => (
                    <div
                      key={tierIndex}
                      className="glass-card p-4 space-y-2 border border-muted"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-primary">
                          Badge Tier {tierIndex + 1}
                        </h4>
                        <button
                          onClick={() => {
                            const newTiers = [...(stage.badgeTiers || [])];
                            newTiers.splice(tierIndex, 1);
                            updateStage(index, { badgeTiers: newTiers });
                          }}
                          className="text-destructive p-1 hover:bg-destructive/10 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">
                          Badge Title{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          className="soft-input w-full"
                          placeholder="e.g. Gold"
                          value={tier.title}
                          onChange={(e) => {
                            const newTiers = [...(stage.badgeTiers || [])];
                            newTiers[tierIndex].title = e.target.value;
                            updateStage(index, { badgeTiers: newTiers });
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">
                          Points Range{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          className="soft-input w-full"
                          placeholder="e.g. 100-200"
                          value={tier.range}
                          onChange={(e) => {
                            const newTiers = [...(stage.badgeTiers || [])];
                            newTiers[tierIndex].range = e.target.value;
                            updateStage(index, { badgeTiers: newTiers });
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-muted-foreground">
                          Badge Icon <span className="text-destructive">*</span>
                        </label>
                        <label
                          htmlFor={`badge-icon-${index}-${tierIndex}`}
                          className="flex items-center justify-between px-4 py-2 border-2 border-dashed border-muted-dark rounded-xl bg-background hover:bg-muted/5 transition cursor-pointer"
                        >
                          <span className="text-sm text-muted-foreground">
                            {tier.icon?.name || "Choose badge icon"}
                          </span>
                          <div className="text-primary text-sm font-medium underline">
                            Browse
                          </div>
                          <input
                            id={`badge-icon-${index}-${tierIndex}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              const newTiers = [...(stage.badgeTiers || [])];
                              newTiers[tierIndex].icon = file;
                              updateStage(index, { badgeTiers: newTiers });
                            }}
                          />
                        </label>
                      </div>

                      {/* Image Preview + Delete */}
                      {tier.icon && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="relative w-10 h-10">
                            <img
                              src={URL.createObjectURL(tier.icon)}
                              alt="Badge Preview"
                              className="w-10 h-10 rounded object-cover border border-muted"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newTiers = [...(stage.badgeTiers || [])];
                                newTiers[tierIndex].icon = null;
                                updateStage(index, { badgeTiers: newTiers });
                              }}
                              className="absolute -top-2 -right-2 bg-background text-muted-foreground rounded-full p-0.5 shadow hover:text-destructive"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground italic line-clamp-1">
                            {tier.icon.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      updateStage(index, {
                        badgeTiers: [
                          ...(stage.badgeTiers || []),
                          { title: "", range: "", icon: null },
                        ],
                      })
                    }
                    className="text-sm text-primary hover:underline"
                  >
                    + Add another tier
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

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

      <button
        onClick={validateAndNext}
        className="bubble-button w-full py-4 text-white font-medium"
      >
        Continue
      </button>

      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Tip:</span>{" "}
            {isSingleTask
              ? "Make your goal specific and measurable for clear success criteria."
              : "Design stages to gradually increase in difficulty for better engagement."}
          </p>
        </div>
      </div>
    </div>
  );
};
