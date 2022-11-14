enum Role{
  Admin,
  User
}

export interface User {
  name: string;
  role: Role;
  api_token: string;
}

export interface UserAuthInfo {
  errors: unknown;
  user: User;
  isAuthenticated: boolean;
}

