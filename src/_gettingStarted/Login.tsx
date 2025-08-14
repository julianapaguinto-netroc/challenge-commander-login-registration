import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { SocialLogin } from "@/components/social-login";
import { Eye, EyeOff } from "lucide-react";
import welcomeIllustration from "@/assets/welcome-illustration.png";

// Dummy users
let users = [
  {
    email: "new.commander@example.com",
    password: "Temp1234!", // default password
    flow: "new-user",
    role: "commander",
    persona: "SMEs",
    selectedAudiences: ["Employees"],
  },
  {
    email: "old.commander@example.com",
    password: "OldUser123!",
    flow: "homescreen-commander",
    role: "commander",
    persona: "SMEs",
    selectedAudiences: ["Employees"],
  },
  {
    email: "old.community@example.com",
    password: "OldCommunity123!",
    flow: "homescreen-commander",
    role: "commander",
    persona: "Community",
    selectedAudiences: ["Youth Leaders", "Religious Leaders"],
  },
];
// endl-----------Dummy users

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userIndex = users.findIndex((u) => u.email === formData.email);

    if (userIndex === -1) {
      setError("Invalid email or password.");
      return;
    }

    const user = users[userIndex];

    // If default password, redirect to new-user
    if (formData.password === user.password && user.flow === "new-user") {
      navigate("/otp-verification", { state: { from: "/" } });
      return;
    }

    // Otherwise, check if password matches updated password
    if (formData.password !== user.password) {
      setError("Invalid email or password.");
      return;
    }

    // Normal login flow
    localStorage.setItem("selectedRole", user.role);
    localStorage.setItem("persona", user.persona);
    localStorage.setItem(
      "selectedAudiences",
      JSON.stringify(user.selectedAudiences)
    );
    navigate("/homescreen-commander");
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            {/* Illustration */}
            <div className="text-center mb-8">
              <img
                src={welcomeIllustration}
                alt="Welcome illustration"
                className="w-full h-48 object-contain mb-6"
              />
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Welcome back!
              </h1>
              <p className="text-sm text-muted-foreground font-light">
                Please login to use our gamification app.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <MobileInput
                type="email"
                placeholder="jhon.doe@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <div className="relative">
                <MobileInput
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary font-light"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <MobileButton type="submit" className="mt-6">
                Login
              </MobileButton>
            </form>

            {/* Footer Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground font-light">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground font-light">
                or sign up with
              </span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            {/* Social Login */}
            <SocialLogin title="" />
          </div>
        </div>
      </div>
    </div>
  );
}
