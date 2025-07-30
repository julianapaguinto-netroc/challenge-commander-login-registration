import { useState } from "react";
import { MobileButton } from "@/components/ui/mobile-button";
import { useNavigate } from "react-router-dom";
import { Building, Users } from "lucide-react";

export default function AffiliationCheck() {
  const navigate = useNavigate();
  const [isAffiliated, setIsAffiliated] = useState<boolean | null>(null);

  const handleContinue = () => {
    if (isAffiliated !== null) {
      localStorage.setItem("isAffiliated", isAffiliated.toString());

      const selectedRole = localStorage.getItem("selectedRole");

      if (selectedRole === "commander" && isAffiliated === false) {
        navigate("/homescreen-commander");
      } else if (isAffiliated) {
        navigate("/persona-selection");
      } else {
        navigate("/my-challenges");
      }
    }
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Organization Affiliation
              </h1>
              <p className="text-sm text-muted-foreground font-light">
                Are you affiliated with any company, organization, or community?
              </p>
            </div>

            <div className="space-y-3">
              <button
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isAffiliated === true
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/50"
                }`}
                onClick={() => setIsAffiliated(true)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isAffiliated === true
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <Building className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-foreground">Yes</h3>
                    <p className="text-xs text-muted-foreground font-light">
                      I'm part of a company, organization, or community
                    </p>
                  </div>
                </div>
              </button>

              <button
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isAffiliated === false
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/50"
                }`}
                onClick={() => setIsAffiliated(false)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-xl ${
                      isAffiliated === false
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-foreground">No</h3>
                    <p className="text-xs text-muted-foreground font-light">
                      I'm participating as an individual/I will create my own
                      challenges
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <MobileButton
              onClick={handleContinue}
              disabled={isAffiliated === null}
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
