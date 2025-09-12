export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginRequest = { email: string; password: string };
