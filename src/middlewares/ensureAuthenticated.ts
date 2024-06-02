import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { verifyToken } from '../utils/verifyToken';

export const ensureAuthenticated = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      reply.code(401).send({ message: 'Token is missing' });
      return;
    }

    const { id, name, email } = verifyToken(token);

    request.user = {
      id,
      name,
      email,
    };

    done();
  } catch (error: any) {
    reply.code(400).send({ message: 'Invalid token' });
  }
};
