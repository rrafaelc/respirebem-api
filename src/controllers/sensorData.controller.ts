import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { QUERY_LIMIT } from '../constants/constants';
import { CreateSensorDataRequest } from '../requests/sensorData/createSensorDataRequest';
import { CronSensorDataRequest } from '../requests/sensorData/cronSensorDataRequest';
import { FindSensorDataRequest } from '../requests/sensorData/findSensorDataRequest';
import type { ISensorDataUseCase } from '../usecases/sensorData/ISensorDataUseCase';

@injectable()
export class SensorDataController {
  constructor(@inject('ISensorDataUseCase') private sensorDataUseCase: ISensorDataUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      throw new Error('Endpoint not available yet');

      const body = request.body as CreateSensorDataRequest;

      const sensorData = await this.sensorDataUseCase.create(body);
      reply.code(201).send(sensorData);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sensor_id } = request.params as FindSensorDataRequest;
      const query = request.query as { limit?: string };

      const limit = query.limit ? parseInt(query.limit) : QUERY_LIMIT;

      const sensorData = await this.sensorDataUseCase.find({ sensor_id, limit });
      reply.code(200).send(sensorData);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }

  async cron(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { start } = request.body as CronSensorDataRequest;

      if (start) {
        await this.sensorDataUseCase.startCron();

        reply.code(200).send('Cron job started');
      } else {
        await this.sensorDataUseCase.stopCron();

        reply.code(200).send('Cron job stopped');
      }
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }
}
