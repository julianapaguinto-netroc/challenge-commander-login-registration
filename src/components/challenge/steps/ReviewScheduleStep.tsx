import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Info,
  Trophy,
  Users,
  Globe,
  Lock,
  Check,
  ChevronDown,
} from "lucide-react";
import { ChallengeData } from "../ChallengeCreationFlow";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // optional className helper if you use it

interface ReviewScheduleStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Dummy admin list (replace with actual API data)
const availableAdmins = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Lee" },
];

export const ReviewScheduleStep: React.FC<ReviewScheduleStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAdmins = availableAdmins.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateAndCreate = () => {
    const newErrors: { [key: string]: string } = {};

    if (data.publishOption === "scheduled" && !data.publishDate) {
      newErrors.publishDate = "Publish date is required";
    }

    if (data.startOption === "scheduled" && !data.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!data.endDate) {
      newErrors.endDate = "End date is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsCreating(true);
      setTimeout(() => {
        setIsCreating(false);
        onNext();
      }, 2000);
    }
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
            Review & Schedule
          </h1>
          <p className="text-sm font-light text-muted-foreground">
            Final check before launch
          </p>
        </div>
      </div>

      {/* Challenge Summary */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-foreground">
            Challenge Summary
          </h3>
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-primary">{data.name}</h4>
            <p className="text-xs font-light text-muted-foreground mt-1">
              {data.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">
                {data.participantType === "individual" ? "Individual" : "Team"}{" "}
                Challenge
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {data.visibility === "public" ? (
                <Globe className="w-4 h-4 text-green-500" />
              ) : (
                <Lock className="w-4 h-4 text-orange-500" />
              )}
              <span className="text-xs text-muted-foreground">
                {data.visibility === "public" ? "Public" : "Private"}
              </span>
            </div>
          </div>
          <div className="glass-card p-3 bg-primary-soft/10">
            <div className="text-xs font-medium text-primary mb-1">
              {data.challengeType === "single-task"
                ? "1 Goal"
                : `${data.stages.length} Stages`}
            </div>
            <div className="text-xs font-light text-muted-foreground">
              Total rewards:{" "}
              {data.stages.reduce(
                (total, stage) =>
                  total + (stage.points || 0) + (stage.gems || 0),
                0
              )}{" "}
              points/gems
            </div>
          </div>
        </div>
      </div>

      {/* Admin Selection */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-foreground">Assign Admins</h3>
        </div>
        <p className="text-sm font-light text-muted-foreground">
          Type to search and select admins who will manage this challenge.
        </p>

        {/* Search Input with Suggestions */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search admins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="soft-input w-full"
          />
          {searchQuery.trim() !== "" && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg max-h-60 overflow-auto">
              {filteredAdmins
                .filter((admin) => !data.selectedAdmins?.includes(admin.id))
                .map((admin) => (
                  <button
                    key={admin.id}
                    onClick={() => {
                      const updated = new Set(data.selectedAdmins || []);
                      updated.add(admin.id);
                      onUpdate({ selectedAdmins: Array.from(updated) });
                      setSearchQuery(""); // Clear input after selection
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                  >
                    {admin.name}
                  </button>
                ))}
              {filteredAdmins.length === 0 && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No matches
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Admins */}
        <div className="flex flex-wrap gap-2">
          {data.selectedAdmins?.map((adminId) => {
            const admin = availableAdmins.find((a) => a.id === adminId);
            if (!admin) return null;
            return (
              <div
                key={admin.id}
                className="flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded-full space-x-1"
              >
                <span>{admin.name}</span>
                <button
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    onUpdate({
                      selectedAdmins: data.selectedAdmins?.filter(
                        (id) => id !== admin.id
                      ),
                    })
                  }
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Schedule Settings */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium text-foreground">
            Schedule Settings
          </h3>
        </div>

        {/* Publish Option */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-primary">
            When to publish challenge?
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="publishOption"
                value="now"
                checked={data.publishOption === "now"}
                onChange={() => onUpdate({ publishOption: "now" })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">Publish Now</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="publishOption"
                value="scheduled"
                checked={data.publishOption === "scheduled"}
                onChange={() => onUpdate({ publishOption: "scheduled" })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">
                Schedule for later
              </span>
            </label>
          </div>

          {data.publishOption === "scheduled" && (
            <div className="ml-7">
              <input
                type="datetime-local"
                className="soft-input w-full"
                value={
                  data.publishDate
                    ? data.publishDate.toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  onUpdate({ publishDate: new Date(e.target.value) })
                }
              />
              {errors.publishDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.publishDate}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Start Option */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-primary">
            When does the challenge start?
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="startOption"
                value="onPublish"
                checked={data.startOption === "onPublish"}
                onChange={() => onUpdate({ startOption: "onPublish" })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">Start on publish</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="startOption"
                value="scheduled"
                checked={data.startOption === "scheduled"}
                onChange={() => onUpdate({ startOption: "scheduled" })}
                className="w-4 h-4 text-primary"
              />
              <span className="text-sm text-foreground">
                Start on specific date
              </span>
            </label>
          </div>

          {data.startOption === "scheduled" && (
            <div className="ml-7">
              <input
                type="datetime-local"
                className="soft-input w-full"
                value={
                  data.startDate
                    ? data.startDate.toISOString().slice(0, 16)
                    : ""
                }
                onChange={(e) =>
                  onUpdate({ startDate: new Date(e.target.value) })
                }
              />
              {errors.startDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.startDate}
                </p>
              )}
            </div>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            When does the challenge end? *
          </label>
          <input
            type="datetime-local"
            className="soft-input w-full"
            value={data.endDate ? data.endDate.toISOString().slice(0, 16) : ""}
            onChange={(e) => onUpdate({ endDate: new Date(e.target.value) })}
          />
          {errors.endDate && (
            <p className="text-xs text-destructive">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Create Button */}
      <button
        onClick={validateAndCreate}
        disabled={isCreating}
        className="bubble-button w-full py-4 text-white font-medium relative overflow-hidden"
      >
        {isCreating ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Creating Challenge...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <span>Create Challenge</span>
          </div>
        )}
      </button>

      {/* Final Tip */}
      <div className="glass-card p-4 bg-primary-soft/20">
        <div className="flex items-start space-x-3">
          <Info className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs font-light text-muted-foreground">
            <span className="font-medium text-primary">Ready to launch:</span>{" "}
            Once created, you can edit challenge details before the start date.
          </p>
        </div>
      </div>
    </div>
  );
};
