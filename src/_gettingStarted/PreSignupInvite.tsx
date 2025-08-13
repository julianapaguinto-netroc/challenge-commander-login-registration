import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";

export default function PreSignupInvite() {
  const navigate = useNavigate();
  const [inviteLink, setInviteLink] = useState("");
  const [showPublicMessage, setShowPublicMessage] = useState(false);

  useEffect(() => {
    document.title = "Private Challenge Invite | Sign Up";
  }, []);

  const handlePrimaryContinue = () => {
    if (inviteLink.trim()) {
      navigate("/my-challenges");
    } else {
      setShowPublicMessage(true);
    }
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <main className="flex-1 flex items-center justify-center">
          <section className="mobile-card w-full max-w-sm">
            {/* Question */}
            <h1 className="text-2xl font-medium text-foreground mb-4">
              Were you invited to a private challenge?
            </h1>

            {/* Input */}
            <div className="space-y-2 mb-2">
              <MobileInput
                value={inviteLink}
                onChange={(e) => setInviteLink(e.target.value)}
                placeholder="Paste your invite link here"
                aria-label="Invite link"
                inputMode="url"
              />
              <p className="text-xs text-muted-foreground">
                If you can’t find your invite link, please check your email inbox.
              </p>
            </div>

            {/* Info and actions */}
            {showPublicMessage ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  You’ll be joining public challenges.
                </p>
                <MobileButton
                  onClick={() => navigate("/signup")}
                  className="rounded-full"
                >
                  Continue
                </MobileButton>
              </div>
            ) : (
              <MobileButton onClick={handlePrimaryContinue} className="mt-4 rounded-full">
                Continue
              </MobileButton>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
