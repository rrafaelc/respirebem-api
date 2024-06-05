import { User } from '@prisma/client';
import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { FindUserByIdDto } from '../../dtos/user/findUserById.dto';

export type ICreateUserRepository = CreateUserDto;
export interface FindUserRepository {
  email: string;
}

export interface IUserRepository {
  create(dto: ICreateUserRepository): Promise<User>;
  findByEmail(dto: FindUserRepository): Promise<User | null>;
  findById(dto: FindUserByIdDto): Promise<User | null>;
}
