import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import { SensorDataController } from '../../../controllers/sensorData.controller';

const sensorData: FastifyPluginAsync = async (fastify): Promise<void> => {
  const sensorController = container.resolve(SensorDataController);

  fastify.post('/', async function (request, reply) {
    await sensorController.create(request, reply);
  });
};

export default sensorData;
