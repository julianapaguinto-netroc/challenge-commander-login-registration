import { useState } from "react";
import { SocialLogin } from "@/components/social-login";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToPrivacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    navigate("/otp-verification", { state: { from: "signup" } });
  };

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col min-h-screen p-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="mobile-card w-full max-w-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium text-foreground mb-2">
                Sign Up
              </h1>
              <p className="text-sm text-muted-foreground font-light">
                Please register with an active email to continue using our
                gamification app.
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full">
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    First Name<span className="text-red-500 ml-1">*</span>
                  </label>
                  <MobileInput
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="w-full">
                  <label className="text-sm font-medium text-foreground mb-1 block">
                    Last Name
                  </label>
                  <MobileInput
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Active Email<span className="text-red-500 ml-1">*</span>
                </label>
                <MobileInput
                  type="email"
                  placeholder="Active Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Create Password<span className="text-red-500 ml-1">*</span>
                </label>
                <MobileInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-center space-x-2 py-2">
                <Checkbox
                  id="privacy"
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToPrivacy: !!checked })
                  }
                />
                <label
                  htmlFor="privacy"
                  className="text-sm text-muted-foreground font-light cursor-pointer"
                >
                  I agree with privacy policy
                </label>
              </div>

              {/* Sign Up Button */}
              <MobileButton type="submit" className="mt-6">
                Sign up
              </MobileButton>
            </form>

            {/* Footer Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground font-light">
                You already have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
