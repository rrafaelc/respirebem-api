import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { FindUserDto } from '../../dtos/user/findUser.dto';
import { IUser } from '../../interfaces/IUser';

export interface IUserUseCase {
  create(request: CreateUserDto): Promise<IUser>;
  find(request: FindUserDto): Promise<IUser | null>;
}
