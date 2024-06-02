import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateUserDto } from '../dtos/user/createUser.dto';
import { FindUserDto } from '../dtos/user/findUser.dto';
import type { IUserUseCase } from '../usecases/user/IUserUseCase';

@injectable()
export class UserController {
  constructor(@inject('IUserUseCase') private userUseCase: IUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as CreateUserDto;

    try {
      const user = await this.userUseCase.create(body);
      reply.status(201).send({ user });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as FindUserDto;

    try {
      const user = await this.userUseCase.find(params);
      reply.status(200).send({ user });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  }
}
