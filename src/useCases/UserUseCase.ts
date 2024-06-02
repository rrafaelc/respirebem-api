import { inject, injectable } from 'tsyringe';
import type { UserCreateDto } from '../dtos/UserCreate.dto';
import type { IUserRepository } from '../repositories/IUserRepository';
import type { IUserUseCase } from './IUserUseCase';

@injectable()
export class UserUseCase implements IUserUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async create({ name, email, password }: UserCreateDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
