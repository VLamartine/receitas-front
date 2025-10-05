export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type LoginRequest = { email: string; password: string };
