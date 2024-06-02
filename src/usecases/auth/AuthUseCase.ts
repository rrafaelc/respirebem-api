import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { LoginUserDto } from '../../dtos/auth/loginUser.dto';
import { IAuth } from '../../interfaces/IAuth';
import { IJwtPayload } from '../../interfaces/IJwtPayload';
import type { IUserRepository } from '../../repositories/IUserRepository';
import { IAuthUseCase } from './IAuthUseCase';

@injectable()
export class AuthUseCase implements IAuthUseCase {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async login({ email, password }: LoginUserDto): Promise<IAuth> {
    try {
      const user = await this.userRepository.findByEmail({ email });

      if (!user) throw new Error('Email or password is incorrect');

      const match = await bcrypt.compare(password, user.password);

      if (!match) throw new Error('Email or password is incorrect');

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        } as IJwtPayload,
        process.env.JWT_SECRET ?? '',
        {
          expiresIn: '1d',
        },
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isActive: user.isActive,
        },
        access_token: token,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
