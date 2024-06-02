import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { UserController } from '../../controllers/user.controller';

const user: FastifyPluginAsync = async (fastify): Promise<void> => {
  const userController = container.resolve(UserController);

  fastify.get('/email/:email', async function (request, reply) {
    await userController.find(request, reply);
  });

  fastify.post('/', async function (request, reply) {
    await userController.create(request, reply);
  });
};

export default user;
