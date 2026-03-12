"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { api } from "@/lib/api";
import { ApiError } from "@/types/auth";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);

    try {
      await api.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.error?.message || "Something went wrong");
    }
  };

  if (success) {
    return (
      <div className="space-y-6">
        <Alert
          type="success"
          message="Account created successfully! Redirecting to login..."
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Input
        id="username"
        label="Username"
        placeholder="Enter username"
        error={errors.username?.message}
        {...register("username")}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Enter password (min. 8 characters)"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Create Account
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
