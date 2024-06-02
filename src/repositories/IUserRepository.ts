import { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<IUser>;
}
