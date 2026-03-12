"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button variant="ghost" onClick={logout} className="w-auto">
      Logout
    </Button>
  );
}
