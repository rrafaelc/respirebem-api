import { injectable } from 'tsyringe';

import { CreateUserDto } from '../dtos/createUser.dto';
import { IUser } from '../interfaces/IUser';
import { prisma } from '../lib/prisma';
import { IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<IUser> {
    const userExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) throw new Error('User already exists with this email');

    const user = await prisma.user.create({
      data,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    };
  }
}
