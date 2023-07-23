import { userTypes } from "./general";

export interface IAuthenticatedUser {
  id: string;
  email: string;
  username: string;
  type: userTypes;
  kickPower?: number;
  speed?: number;
  name?: string;
}
