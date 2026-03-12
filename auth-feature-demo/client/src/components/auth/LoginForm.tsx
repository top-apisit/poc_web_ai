"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/types/auth";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    try {
      const response = await api.login(data);
      login(response.data.token, response.data.user);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Input
        id="username"
        label="Username or Email"
        placeholder="Enter username or email"
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Sign In
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
