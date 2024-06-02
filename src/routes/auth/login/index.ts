import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { AuthController } from '../../../controllers/auth.controller';

const login: FastifyPluginAsync = async (fastify): Promise<void> => {
  const authController = container.resolve(AuthController);

  fastify.post('/', async function (request, reply) {
    await authController.login(request, reply);
  });
};

export default login;
