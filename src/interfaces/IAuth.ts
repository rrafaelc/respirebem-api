import { IUser } from './IUser';

export interface IAuth {
  user: IUser;
  access_token: string;
  expires_at: string;
}
