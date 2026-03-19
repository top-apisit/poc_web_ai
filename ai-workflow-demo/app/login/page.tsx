"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Door-open icon — matches Figma node 10:775 (Icon / door-open)
function DoorOpenIcon() {
  return (
    <svg
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Door frame */}
      <rect x="6" y="1" width="20" height="22" rx="1" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Open door panel */}
      <path d="M26 3l10 2v14l-10 2V3z" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Door knob */}
      <circle cx="24" cy="12" r="1.25" fill="#0a0a0a" />
      {/* Hinge lines */}
      <line x1="6" y1="1" x2="6" y2="23" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulated login delay for demo purposes
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert(`Demo login: ${email}`);
  }

  return (
    // Override global dark theme — this page is intentionally light (matches Figma)
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      {/* Card — Figma node 49:13239 */}
      <div
        className="bg-white rounded-[12px] p-8 flex flex-col gap-10 w-full"
        style={{
          maxWidth: 400,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header — Figma node 49:13240 */}
        <div className="flex flex-col gap-3">
          {/* Icon — Figma node 49:13241 */}
          <DoorOpenIcon />

          {/* Title + subtitle — Figma node 49:13242 */}
          <div className="flex flex-col gap-1">
            <h1
              className="text-[#0a0a0a] font-medium leading-[1.2]"
              style={{ fontSize: 24 }}
            >
              Login to your account
            </h1>
            <p className="text-[#737373] text-[14px] font-normal leading-[1.5]">
              Enter your email below to login to your account
            </p>
          </div>
        </div>

        {/* Login Form — Figma node 49:13245 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email field — Figma node 49:13246 */}
          <Input
            label="Email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          {/* Password field — Figma node 49:13249 */}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          {/* Login button — Figma node 49:13252 */}
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
