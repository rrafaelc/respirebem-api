import { injectable } from 'tsyringe';

import { User } from '@prisma/client';
import { FindUserByIdDto } from '../../dtos/user/findUserById.dto';
import { prisma } from '../../lib/prisma';
import { FindUserRepository, ICreateUserRepository, IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: ICreateUserRepository): Promise<User> {
    const userExists = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExists) throw new Error('User already exists with this email');

    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail({ email }: FindUserRepository): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        isActive: true,
      },
    });

    return user;
  }

  async findById({ id }: FindUserByIdDto): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
}
