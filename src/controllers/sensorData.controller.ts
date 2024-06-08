import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateSensorDataRequest } from '../requests/sensorData/createSensorDataRequest';
import type { ISensorDataUseCase } from '../usecases/sensorData/ISensorDataUseCase';

@injectable()
export class SensorDataController {
  constructor(@inject('ISensorDataUseCase') private sensorDataUseCase: ISensorDataUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as CreateSensorDataRequest;

      const sensor = await this.sensorDataUseCase.create(body);
      reply.code(201).send(sensor);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }
}
