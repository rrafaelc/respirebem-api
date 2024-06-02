import { UserCreateDto } from '../dtos/UserCreate.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserRepository {
  create(data: UserCreateDto): Promise<IUser>;
}
