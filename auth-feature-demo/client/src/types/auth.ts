export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expiresIn: number;
    user: User;
  };
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}
