import React from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary-soft text-center px-6">
      <div className="w-[220px] sm:w-[280px] h-[220px] sm:h-[280px]">
        <DotLottieReact
          src="https://lottie.host/ad44948a-6f80-4444-80da-3348bb910eec/7CmRPdoHB0.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-primary">
        Welcome!
      </h1>
      <p className="mt-2 text-sm text-primary-600 max-w-xs">
        Let’s get started with our gamification app.
      </p>

      <button
        onClick={() => navigate("/user-role")}
        className="mt-8 px-6 py-2 rounded-xl bg-primary text-white text-sm font-medium shadow hover:bg-primary/90 transition"
      >
        Get Started
      </button>
    </div>
  );
}
