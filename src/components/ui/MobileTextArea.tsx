import React from "react";
import { cn } from "@/lib/utils";

interface MobileTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const MobileTextArea = React.forwardRef<
  HTMLTextAreaElement,
  MobileTextAreaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-2 rounded-md bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      rows={4}
      {...props}
    />
  );
});

MobileTextArea.displayName = "MobileTextArea";
