"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-[6px] w-full">
        {label && (
          <label className="text-[#0a0a0a] text-[14px] font-medium leading-[1.5]">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full bg-white border border-[#e5e5e5] rounded-[8px] px-4 py-[9.5px] text-[14px] text-[#0a0a0a] leading-[1.5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline-none placeholder:text-[#a3a3a3] focus:border-[#a3a3a3] transition-colors ${isPassword ? "pr-10" : ""} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#0a0a0a] transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 2.5L17.5 17.5M8.232 8.232A2.5 2.5 0 0010 10m0 0a2.5 2.5 0 001.768-.732M10 10L8.232 8.232M10 10l1.768 1.768M4.108 4.108A8.955 8.955 0 002.5 7.5C3.5 11.5 6.5 14.5 10 15.5c1.245-.355 2.37-.98 3.33-1.83M7.5 3.5C8.3 3.18 9.14 3 10 3c3.5 0 6.5 3 7.5 7a8.885 8.885 0 01-2.108 3.892" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 7.5C3.5 11.5 6.5 14.5 10 15.5S16.5 11.5 17.5 7.5C16.5 3.5 13.5.5 10 .5S3.5 3.5 2.5 7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
