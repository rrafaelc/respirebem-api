import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import type { CreateUserDto } from '../../dtos/user/createUser.dto';
import { FindUserDto } from '../../dtos/user/findUser.dto';
import { IUser } from '../../interfaces/IUser';
import type { IUserRepository } from '../../repositories/IUserRepository';
import { SALT_ROUNDS } from '../constants';
import type { IUserUseCase } from './IUserUseCase';

@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async create({ name, email, password }: CreateUserDto): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async find({ email }: FindUserDto): Promise<IUser> {
    try {
      const user = await this.userRepository.findByEmail({ email });

      if (!user) throw new Error('User not found');

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
