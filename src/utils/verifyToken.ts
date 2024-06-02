import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/IJwtPayload';

export const verifyToken = (token: string) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET ?? '') as IJwtPayload;

  return decodedToken;
};
