import { useState } from "react";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const audienceOptions = {
  Community: ["Youth Leaders", "Parents", "Religious Leaders", "Volunteers"],
  Company: ["Employees", "Team Leads", "HR", "Managers"],
  Education: ["Students", "Teachers", "School Admins", "Clubs"],
  Marketplace: ["Consumers"],
  SMEs: ["Employees"],
};

export default function PersonaSelection() {
  const navigate = useNavigate();
  const [persona, setPersona] = useState<"Community" | "Company" | "Education" | "Marketplace" | "SMEs" | "">("");
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [uniqueCode, setUniqueCode] = useState("");

  const selectedRole = localStorage.getItem("selectedRole");
  const isAffiliated = localStorage.getItem("isAffiliated") === "true";

  // Hides persona + audience if participant AND affiliated
  const shouldShowPersonaSelection = !(selectedRole === "participant" && isAffiliated);

  const toggleAudience = (audience: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audience)
        ? prev.filter((item) => item !== audience)
        : [...prev, audience]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store selections
    localStorage.setItem("persona", persona);
    localStorage.setItem("selectedAudiences", JSON.stringify(selectedAudiences));
    localStorage.setItem("uniqueCode", uniqueCode);

    const allowedRoles = ["participant", "supporter", "admin", "affiliated"];

    if (selectedRole === "commander") {
      navigate("/organization-info");
    } else if (selectedRole && allowedRoles.includes(selectedRole)) {
      navigate("/my-challenges");
    } else {
      console.warn("Unrecognized or missing role:", selectedRole);
    }
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-medium text-foreground mb-2">You are affiliated!</h1>
              <p className="text-sm text-muted-foreground font-light">
                Help us personalize your experience by choosing your persona and audience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Organization Code */}
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-light">
                  Organization/Community Code
                </label>
                <MobileInput
                  type="text"
                  placeholder="Enter your unique code"
                  value={uniqueCode}
                  onChange={(e) => setUniqueCode(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground font-light">
                  This code is provided by your organization or community
                </p>
              </div>

              {/* Persona and Audience Selection */}
              {shouldShowPersonaSelection && (
                <>
                  {/* Persona Selection */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground font-light">
                      Select your persona:
                    </label>
                    <div className="flex overflow-x-auto justify-center gap-2 sm:flex-wrap sm:overflow-visible">
                      {["Community", "Company", "Education", "Marketplace", "SMEs"].map((p) => (
                        <button
                          key={p}
                          type="button"
                           className={`flex-shrink-0 min-w-[110px] px-3 py-2 text-sm border rounded-lg text-center ${
                            persona === p
                              ? "border-primary text-primary font-medium"
                              : "border-border text-muted-foreground"
                          }`}
                          onClick={() => {
                            setPersona(p as any);
                            setSelectedAudiences([]);
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audience Selection */}
                  {persona && (
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground font-light">
                        Who is your target audience?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {audienceOptions[persona].map((aud) => (
                          <label key={aud} className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedAudiences.includes(aud)}
                              onCheckedChange={() => toggleAudience(aud)}
                            />
                            <span className="text-sm text-foreground">{aud}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Continue Button */}
              <MobileButton
                type="submit"
                className="mt-6"
                disabled={!uniqueCode.trim()}
              >
                Continue
              </MobileButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
