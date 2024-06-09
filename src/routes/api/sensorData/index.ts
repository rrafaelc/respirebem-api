import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { SensorDataController } from '../../../controllers/sensorData.controller';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';

const sensorData: FastifyPluginAsync = async (fastify): Promise<void> => {
  const sensorController = container.resolve(SensorDataController);

  fastify.get('/:sensor_id', async function (request, reply) {
    await sensorController.find(request, reply);
  });

  fastify.post('/', async function (request, reply) {
    await sensorController.create(request, reply);
  });

  fastify.post('/simulation', { preHandler: ensureAuthenticated }, async function (request, reply) {
    await sensorController.cron(request, reply);
  });
};

export default sensorData;
