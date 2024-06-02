import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import type { IUserUseCase } from '../useCases/IUserUseCase';

@injectable()
export class UserController {
  constructor(@inject('IUserUseCase') private userUseCase: IUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    reply.send({ usuario: 'usuario' });
  }
}
