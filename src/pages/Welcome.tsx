import { SocialLogin } from "@/components/social-login"
import { MobileButton } from "@/components/ui/mobile-button"
import { useNavigate } from "react-router-dom"
import welcomeIllustration from "@/assets/welcome-illustration.png"

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="mobile-container welcome-bg">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="mobile-card w-full max-w-sm">
          {/* Illustration */}
          <div className="text-center mb-8">
            <img 
              src={welcomeIllustration} 
              alt="Welcome illustration" 
              className="w-full h-48 object-contain mb-6"
            />
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-foreground mb-3">Welcome</h1>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Please login or sign up to continue using our app.
            </p>
          </div>

          {/* Social Login */}
          <SocialLogin />

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground font-light">or login with email</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Get Started Button */}
          <MobileButton 
            className="mb-6"
            onClick={() => navigate('/signup')}
          >
            Get Started
          </MobileButton>

          {/* Footer Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-light">
              You already have an account?{" "}
              <button 
                onClick={() => navigate('/login')}
                className="text-primary font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}