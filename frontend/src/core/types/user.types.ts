export enum Role {
  Admin,
  Doctor,
}

export interface User {
  username: string;
  // role: Role;
}

export interface UserAuthInfo {
  errors: any;
  user: User;
  isAuthenticated: boolean;
}
