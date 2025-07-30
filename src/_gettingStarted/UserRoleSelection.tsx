import { useState } from "react";
import { MobileButton } from "@/components/ui/mobile-button";
import { useNavigate } from "react-router-dom";
import { User, Crown, Shield, Heart } from "lucide-react";

const roles = [
  {
    id: "participant",
    title: "Participant",
    description: "Join challenges and track your progress",
    icon: User,
  },
  {
    id: "commander",
    title: "Commander",
    description: "Create and manage challenges for your organization",
    icon: Crown,
  },
  {
    id: "admin",
    title: "Admin",
    description: "Oversee platform administration of challenges",
    icon: Shield,
  },
  {
    id: "supporter",
    title: "Supporter",
    description: "Support and encourage challenge participants",
    icon: Heart,
  },
];

export default function UserRoleSelection() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleContinue = () => {
    if (selectedRole) {
      // Store the selected role in localStorage or state management
      localStorage.setItem("selectedRole", selectedRole);
      navigate("/affiliation-check");
    }
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Choose Your Role
              </h1>
              <p className="text-sm text-muted-foreground font-light">
                Select the role that best describes your participation in challenges.
              </p>
            </div>

            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.id}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${
                        selectedRole === role.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-foreground">{role.title}</h3>
                        <p className="text-xs text-muted-foreground font-light">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <MobileButton
              onClick={handleContinue}
              disabled={!selectedRole}
              className="mt-6"
            >
              Continue
            </MobileButton>
          </div>
        </div>
      </div>
    </div>
  );
}