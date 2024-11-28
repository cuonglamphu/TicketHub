import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md px-3 py-2 text-base",
          "bg-white/90 shadow-[4px_4px_0_0_#000000]",
          "border-2 border-black transition-all duration-200",
          "placeholder:text-gray-500",
          "focus:outline-none focus:ring-2 focus:ring-[#FFEB3B] focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:ring-red-500",
          "hover:shadow-[2px_2px_0_0_#000000] active:shadow-none",
          "active:translate-x-[4px] active:translate-y-[4px]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
