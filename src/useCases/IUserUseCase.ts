import { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/IUser';

export interface IUserUseCase {
  create(request: CreateUserDto): Promise<IUser>;
}
