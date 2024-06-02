import { injectable } from 'tsyringe';

import { UserCreateDto } from '../dtos/UserCreate.dto';
import { IUser } from '../interfaces/IUser';
import { IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: UserCreateDto): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
