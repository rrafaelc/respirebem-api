import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';
import { CreateSensorDto } from '../dtos/sensor/createSensor.dto';
import { FindSensorById } from '../dtos/sensor/findSensorById.dto';
import type { ISensorUseCase } from '../usecases/sensor/ISensorUseCase';

@injectable()
export class SensorController {
  constructor(@inject('ISensorUseCase') private sensorUseCase: ISensorUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;

      if (!user) throw new Error('User not found');

      const body = request.body as CreateSensorDto;

      const sensor = await this.sensorUseCase.create({ ...body, userId: user.id });
      reply.code(201).send(sensor);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }

  async find(_: FastifyRequest, reply: FastifyReply) {
    try {
      const sensors = await this.sensorUseCase.find();

      reply.code(200).send(sensors);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const params = request.params as FindSensorById;

      const sensor = await this.sensorUseCase.findById(params);

      reply.code(200).send(sensor);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }

  async findByUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;

      if (!user) throw new Error('User not found');

      const sensors = await this.sensorUseCase.findByUser({ userId: user.id });

      reply.code(200).send(sensors);
    } catch (error: any) {
      reply.code(400).send({ error: error.message });
    }
  }
}
