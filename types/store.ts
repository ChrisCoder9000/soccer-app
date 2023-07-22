import { userTypes } from "@/backend/models/User";

export interface IAuthenticatedUser {
  id: string;
  email: string;
  username: string;
  type: userTypes;
}
