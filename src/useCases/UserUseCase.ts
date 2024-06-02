import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import type { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/IUser';
import type { IUserRepository } from '../repositories/IUserRepository';
import type { IUserUseCase } from './IUserUseCase';
import { SALT_ROUNDS } from './constants';

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
}
