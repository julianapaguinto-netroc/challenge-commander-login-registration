import * as React from "react"
import { cn } from "@/lib/utils"

export interface MobileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn("mobile-input", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
MobileInput.displayName = "MobileInput"

export { MobileInput }