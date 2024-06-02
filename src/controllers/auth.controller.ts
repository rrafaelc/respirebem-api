import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { LoginUserDto } from '../dtos/auth/loginUser.dto';
import type { IAuthUseCase } from '../usecases/auth/IAuthUseCase';

@injectable()
export class AuthController {
  constructor(@inject('IAuthUseCase') private authUseCase: IAuthUseCase) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as LoginUserDto;

      if (!email || !password) throw new Error('email and password are required in body');

      const user = await this.authUseCase.login({ email, password });
      reply.code(200).send(user);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }
}
