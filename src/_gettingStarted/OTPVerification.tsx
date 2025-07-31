import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpScreen() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every((digit) => digit.trim() !== "")) {
      const code = otp.join("");
      // Optionally validate code with backend
      navigate("/welcome");
    } else {
      alert("Please enter the full 6-digit OTP.");
    }
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimer(60);
    // Optionally trigger backend resend logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-background text-primary space-y-6">
      <h1 className="text-xl font-semibold">Enter OTP</h1>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        We've sent a 6-digit code to your phone. Enter it below to continue.
      </p>

      <div className="flex space-x-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el!)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg border border-muted-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full max-w-xs mt-4 py-2 px-4 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
      >
        Verify
      </button>

      <div className="text-sm text-muted-foreground mt-2">
        {timer > 0 ? (
          <span>
            Resend code in <span className="font-medium">{timer}s</span>
          </span>
        ) : (
          <button onClick={handleResend} className="text-primary hover:underline">
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
