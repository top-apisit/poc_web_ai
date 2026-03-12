import { AuthResponse, ApiError, User } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ApiError;
    }

    return data as T;
  }

  async register(input: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async login(input: {
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  async logout(): Promise<{ success: boolean; message: string }> {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async getMe(): Promise<{ success: boolean; data: { user: User } }> {
    return this.request("/auth/me", {
      method: "GET",
    });
  }
}

export const api = new ApiClient();
