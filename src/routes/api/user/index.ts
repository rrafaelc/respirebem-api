import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { UserController } from '../../../controllers/user.controller';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';

const user: FastifyPluginAsync = async (fastify): Promise<void> => {
  const userController = container.resolve(UserController);

  fastify.get(
    '/email/:email',
    { preHandler: ensureAuthenticated },
    async function (request, reply) {
      await userController.find(request, reply);
    },
  );

  fastify.post('/', async function (request, reply) {
    await userController.create(request, reply);
  });
};

export default user;
