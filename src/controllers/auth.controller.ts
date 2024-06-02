import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { LoginUserDto } from '../dtos/auth/loginUser.dto';
import type { IAuthUseCase } from '../usecases/auth/IAuthUseCase';

@injectable()
export class AuthController {
  constructor(@inject('IAuthUseCase') private authUseCase: IAuthUseCase) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as LoginUserDto;

    try {
      const user = await this.authUseCase.login(body);
      reply.status(200).send(user);
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }
}
