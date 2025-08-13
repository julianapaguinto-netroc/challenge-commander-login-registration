import React, { useState } from "react";
import { ArrowLeft, Plus, Users, Search, Info, X } from "lucide-react";
import { ChallengeData } from "../ChallengeCreationFlow";

interface TeamSetupStepProps {
  data: ChallengeData;
  onUpdate: (updates: Partial<ChallengeData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const TeamSetupStep: React.FC<TeamSetupStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [searchTerms, setSearchTerms] = useState<{ [key: number]: string }>({});
  const [showDropdowns, setShowDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [teamLogos, setTeamLogos] = useState<{ [key: number]: File | null }>(
    {}
  );

  const getTeamLogoPreview = (index: number): string | null => {
    const file = teamLogos[index];
    return file ? URL.createObjectURL(file) : null;
  };

  const isPublicTeam = data.visibility === "public";

  // Mock community members - in real app this would come from API
  const communityMembers = [
    "Pastor Michael Johnson",
    "Sister Sarah Williams",
    "Deacon Mark Thompson",
    "Youth Leader Emma Davis",
    "Elder Robert Brown",
    "Minister Lisa Anderson",
    "Brother James Wilson",
    "Sister Mary Martinez",
    "Pastor David Garcia",
    "Deacon Paul Rodriguez",
    "Sister Jennifer Taylor",
    "Brother William Moore",
    "Elder Susan Jackson",
  ];

  const getFilteredMembers = (teamIndex: number) => {
    const searchTerm = searchTerms[teamIndex] || "";
    if (!searchTerm) return [];

    const teamMembers = data.teamConfig?.teams?.[teamIndex]?.members || [];
    return communityMembers
      .filter(
        (member) =>
          member.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !teamMembers.includes(member)
      )
      .slice(0, 10); // Show max 10 results
  };

  const validateAndNext = () => {
    const newErrors: { [key: string]: string } = {};

    if (isPublicTeam) {
      if (!data.teamConfig?.teamCount || data.teamConfig.teamCount < 2) {
        newErrors.teamCount = "At least 2 teams required";
      }
      if (
        !data.teamConfig?.participantsPerTeam ||
        data.teamConfig.participantsPerTeam < 1
      ) {
        newErrors.participantsPerTeam =
          "At least 1 participant per team required";
      }
    } else {
      if (!data.teamConfig?.teams || data.teamConfig.teams.length < 2) {
        newErrors.teams = "At least 2 teams required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const addTeam = () => {
    const currentTeams = data.teamConfig?.teams || [];
    onUpdate({
      teamConfig: {
        ...data.teamConfig,
        teams: [...currentTeams, { name: "", members: [] }],
      },
    });
  };

  const updateTeam = (
    index: number,
    updates: { name?: string; members?: string[] }
  ) => {
    const currentTeams = data.teamConfig?.teams || [];
    const updatedTeams = currentTeams.map((team, i) =>
      i === index ? { ...team, ...updates } : team
    );
    onUpdate({
      teamConfig: {
        ...data.teamConfig,
        teams: updatedTeams,
      },
    });
  };

  const presetGroups = [
    {
      name: "Team Ang",
      members: ["employee 4", "employee 5", "employee 6"],
      logo: "/logos/youth-ministry.png",
    },
    {
      name: "KDJ Company",
      members: ["employee 1", "employee 2", "employee 3"],
      logo: "/logos/choir-group.png",
    },
  ];

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
          <h1 className="text-2xl font-semibold text-foreground">Team Setup</h1>
          <p className="text-sm font-light text-muted-foreground">
            Configure teams for your challenge
          </p>
        </div>
      </div>

      {/* Content based on visibility type */}
      {isPublicTeam ? (
        // Public Team Setup
        <div className="glass-card p-6 space-y-6">
          <div className="text-center space-y-2">
            <Users className="w-12 h-12 text-primary mx-auto" />
            <h3 className="text-lg font-medium text-foreground">
              Public Team Challenge
            </h3>
            <p className="text-sm font-light text-muted-foreground">
              Teams will be created automatically when users join
            </p>
          </div>

          {/* Team Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              How many teams? *
            </label>
            <input
              type="number"
              min="2"
              className="soft-input w-full"
              placeholder="e.g. 4"
              value={data.teamConfig?.teamCount || ""}
              onChange={(e) =>
                onUpdate({
                  teamConfig: {
                    ...data.teamConfig,
                    teamCount: parseInt(e.target.value) || undefined,
                  },
                })
              }
            />
            {errors.teamCount && (
              <p className="text-xs text-destructive">{errors.teamCount}</p>
            )}
          </div>

          {/* Participants per team */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              Participants per team? *
            </label>
            <input
              type="number"
              min="1"
              className="soft-input w-full"
              placeholder="e.g. 5"
              value={data.teamConfig?.participantsPerTeam || ""}
              onChange={(e) =>
                onUpdate({
                  teamConfig: {
                    ...data.teamConfig,
                    participantsPerTeam: parseInt(e.target.value) || undefined,
                  },
                })
              }
            />
            {errors.participantsPerTeam && (
              <p className="text-xs text-destructive">
                {errors.participantsPerTeam}
              </p>
            )}
          </div>

          <div className="glass-card p-4 bg-blue-500/10">
            <div className="flex items-start space-x-3">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <p className="text-xs font-light text-muted-foreground">
                Users will be automatically assigned to teams as they join,
                creating a room-like experience for each team.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Private Team Setup
        <div className="space-y-4">
          <div className="glass-card p-6">
            <div className="text-center space-y-2 mb-6">
              <Users className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-lg font-medium text-foreground">
                Create Teams
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Add teams and assign users to each one
              </p>
            </div>

            {/* Teams List */}
            <div className="space-y-4">
              {(data.teamConfig?.teams || []).map((team, index) => (
                <div key={index} className="glass-card p-4 space-y-3">
                  <input
                    type="text"
                    className="soft-input w-full"
                    placeholder={`Team ${index + 1} Name`}
                    value={team.name}
                    onChange={(e) =>
                      updateTeam(index, { name: e.target.value })
                    }
                  />

                  <div className="space-y-2">
                    <div className="relative z-10">
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          className="soft-input flex-1"
                          placeholder="Search community members..."
                          value={searchTerms[index] || ""}
                          onChange={(e) => {
                            setSearchTerms((prev) => ({
                              ...prev,
                              [index]: e.target.value,
                            }));
                            setShowDropdowns((prev) => ({
                              ...prev,
                              [index]: e.target.value.length > 0,
                            }));
                          }}
                          onFocus={() =>
                            setShowDropdowns((prev) => ({
                              ...prev,
                              [index]: (searchTerms[index] || "").length > 0,
                            }))
                          }
                        />
                      </div>

                      {/* Search Results Dropdown */}
                      {showDropdowns[index] &&
                        getFilteredMembers(index).length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-xl z-[9999] max-h-48 overflow-y-auto">
                            {getFilteredMembers(index).map((member) => (
                              <button
                                key={member}
                                className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                                onClick={() => {
                                  updateTeam(index, {
                                    members: [...team.members, member],
                                  });
                                  setSearchTerms((prev) => ({
                                    ...prev,
                                    [index]: "",
                                  }));
                                  setShowDropdowns((prev) => ({
                                    ...prev,
                                    [index]: false,
                                  }));
                                }}
                              >
                                {member}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    {team.members.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-primary">
                          Selected Members ({team.members.length}):
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {team.members.map((member, memberIndex) => (
                            <div
                              key={memberIndex}
                              className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs flex items-center space-x-1"
                            >
                              <span>{member}</span>
                              <button
                                onClick={() => {
                                  const updatedMembers = team.members.filter(
                                    (_, i) => i !== memberIndex
                                  );
                                  updateTeam(index, {
                                    members: updatedMembers,
                                  });
                                }}
                                className="ml-1 hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional Team Logo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">
                      Team Logo (Optional)
                    </label>

                    {/* Drag and Drop / Browse File UI */}
                    <div className="border border-dashed border-muted-dark rounded-lg p-4 text-center relative bg-muted/10">
                      {/* Upload Icon */}
                      <div className="flex justify-center mb-2">
                        <svg
                          className="w-6 h-6 text-muted-foreground"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16V4m0 0L8 8m4-4l4 4m5 8a2 2 0 01-2 2H5a2 2 0 01-2-2"
                          />
                        </svg>
                      </div>

                      <p className="text-sm text-muted-foreground pb-3">
                        Upload Logo here
                      </p>

                      <label className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded cursor-pointer">
                        Browse File
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setTeamLogos((prev) => ({
                              ...prev,
                              [index]: file,
                            }));
                          }}
                        />
                      </label>
                    </div>

                    {/* File Preview & Remove */}
                    {teamLogos[index] && (
                      <div className="flex items-center justify-between px-4 py-2 bg-white rounded shadow mt-2">
                        <div className="flex items-center space-x-2 truncate">
                          <img
                            src={URL.createObjectURL(teamLogos[index]!)}
                            alt="Team Logo"
                            className="w-6 h-6 rounded object-cover"
                          />
                          <span className="text-sm truncate max-w-[140px]">
                            {teamLogos[index]!.name}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setTeamLogos((prev) => ({ ...prev, [index]: null }))
                          }
                          className="text-destructive hover:underline text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Team Button */}
              <button
                onClick={addTeam}
                className="w-full glass-card p-4 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add Another Team</span>
                </div>
              </button>

              <p className="text-center text-sm font-light text-primary">OR </p>
              <p className="text-center text-sm font-light text-muted-foreground">
                Use a preset group to quickly add teams and members
              </p>

              <select
                className="soft-input w-full mb-4"
                onChange={(e) => {
                  const selected = presetGroups.find(
                    (p) => p.name === e.target.value
                  );
                  if (selected) {
                    onUpdate({
                      teamConfig: {
                        ...data.teamConfig,
                        teams: [
                          ...(data.teamConfig?.teams || []),
                          {
                            name: selected.name,
                            members: selected.members,
                          },
                        ],
                      },
                    });
                    // Optional: preload logo in teamLogos state
                    fetch(selected.logo)
                      .then((res) => res.blob())
                      .then((blob) => {
                        const file = new File([blob], selected.name + ".png", {
                          type: blob.type,
                        });
                        setTeamLogos((prev) => ({
                          ...prev,
                          [data.teamConfig?.teams?.length || 0]: file,
                        }));
                      });
                  }
                }}
              >
                <option value="">-- Select Preset Group --</option>
                {presetGroups.map((group) => (
                  <option key={group.name} value={group.name}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.teams && (
              <p className="text-xs text-destructive mt-2">{errors.teams}</p>
            )}
          </div>
        </div>
      )}

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
            <span className="font-medium text-primary">Tip:</span>{" "}
            {isPublicTeam
              ? "For public team challenges, teams will be formed automatically when church members join the challenge."
              : "Search for employee by name or role to add them to teams."}
          </p>
        </div>
      </div>
    </div>
  );
};
