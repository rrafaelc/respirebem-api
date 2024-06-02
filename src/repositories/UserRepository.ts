import { injectable } from 'tsyringe';

import { User } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { FindUserRepository, ICreateUserRepository, IUserRepository } from './IUserRepository';

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: ICreateUserRepository): Promise<User> {
    throw new Error('Endpoint not available');

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
}
