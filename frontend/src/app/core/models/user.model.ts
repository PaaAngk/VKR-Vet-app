import { Role } from "src/graphql/generated";

export interface User {
  login: string;
  access_token: string;
  fullName: string;
  id: number;
  role:Role
}
