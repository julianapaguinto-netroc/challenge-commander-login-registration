import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";

// Make sure this users array is the same as in Login.tsx
let users = [
  {
    email: "new.commander@example.com",
    password: "Temp1234!", // default password
    flow: "new-user",
  },
  {
    email: "old.commander@example.com",
    password: "OldUser123!",
    flow: "my-challenges",
  },
];

export default function PreSignupInvite() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Set Password";
  }, []);

  const handlePrimaryContinue = () => {
    if (!password.trim()) {
      setError("Password cannot be empty.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Update the new user's password
    const userIndex = users.findIndex(u => u.flow === "new-user");
    if (userIndex !== -1) {
      users[userIndex].password = password;
      users[userIndex].flow = "my-challenges"; // mark as updated
    }

    setError("");
    navigate("/"); // redirect back to login
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <main className="flex-1 flex items-center justify-center">
          <section className="mobile-card w-full max-w-sm">
            <h1 className="text-2xl font-medium text-foreground">Almost there!</h1>
            <p className="text-xs text-gray-500 mb-4">
              Kindly set your new password to start using your account.
            </p>

            <div className="space-y-2 mb-2">
              <MobileInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create your new password"
                aria-label="new password"
                type="password"
              />
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            <MobileButton onClick={handlePrimaryContinue} className="mt-4 rounded-full">
              Proceed
            </MobileButton>
          </section>
        </main>
      </div>
    </div>
  );
}
