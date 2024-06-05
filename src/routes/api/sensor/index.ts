import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { SensorController } from '../../../controllers/sensor.controller';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';

const sensor: FastifyPluginAsync = async (fastify): Promise<void> => {
  const sensorController = container.resolve(SensorController);

  fastify.post('/', { preHandler: ensureAuthenticated }, async function (request, reply) {
    await sensorController.create(request, reply);
  });

  fastify.get('/', async function (request, reply) {
    await sensorController.find(request, reply);
  });

  fastify.get('/:id', async function (request, reply) {
    await sensorController.findById(request, reply);
  });

  fastify.get('/user', { preHandler: ensureAuthenticated }, async function (request, reply) {
    await sensorController.findByUser(request, reply);
  });
};

export default sensor;
