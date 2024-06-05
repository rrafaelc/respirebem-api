import { User } from '@prisma/client';
import { injectable } from 'tsyringe';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import { FindSensorByNameDto } from '../../dtos/sensor/findSensorByName.dto';
import { ISensor } from '../../interfaces/ISensor';
import { prisma } from '../../lib/prisma';
import { CreateSensorRepository, ISensorRepository } from './ISensorRepository';

@injectable()
export class SensorRepository implements ISensorRepository {
  async create({ model, name, user }: CreateSensorRepository): Promise<ISensor> {
    const sensor = await prisma.sensor.create({
      data: {
        name,
        model,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return sensor;
  }

  async find(): Promise<ISensor[]> {
    const sensors = await prisma.sensor.findMany();

    return sensors;
  }

  async findByUser(user: User): Promise<ISensor[]> {
    const sensors = await prisma.sensor.findMany({
      where: {
        userId: user.id,
      },
    });

    return sensors;
  }

  async findById({ id }: FindSensorById): Promise<ISensor | null> {
    const sensor = await prisma.sensor.findFirst({
      where: {
        id,
      },
    });

    return sensor;
  }

  async findByName({ name }: FindSensorByNameDto): Promise<ISensor | null> {
    const sensor = await prisma.sensor.findFirst({
      where: {
        name,
      },
    });

    return sensor;
  }
}
