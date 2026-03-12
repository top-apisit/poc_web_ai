import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, isLoading, variant = "primary", disabled, ...props },
    ref
  ) => {
    const baseStyles =
      "w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      ghost:
        "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
