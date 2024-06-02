export interface I_User {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

export type IUser = Omit<I_User, 'password'>;
