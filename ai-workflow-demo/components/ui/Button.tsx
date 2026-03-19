import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center gap-2 min-h-[40px] px-6 py-[9.5px] rounded-[8px] text-[14px] font-medium leading-[1.5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#1c1917] text-white hover:bg-[#2c2925] active:bg-[#111]",
    secondary:
      "bg-white text-[#0a0a0a] border border-[#e5e5e5] hover:bg-[#f5f5f5]",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
