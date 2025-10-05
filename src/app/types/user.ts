export type User = {
  id?: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: Date;
  updated_at: Date;
};

export type UserLoginResponse = {
  user: User;
  token: string;
};
