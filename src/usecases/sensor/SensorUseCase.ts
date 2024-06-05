import { inject, injectable } from 'tsyringe';
import { FindSensorDto } from '../../dtos/sensor/findSensor.dto';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import { ISensor } from '../../interfaces/ISensor';
import type { ISensorRepository } from '../../repositories/sensor/ISensorRepository';
import type { IUserRepository } from '../../repositories/user/IUserRepository';

import { isUUID } from '../../utils/isUUID';
import { CreateSensorUseCaseDto, ISensorUseCase } from './ISensorUseCase';

@injectable()
export class SensorUseCase implements ISensorUseCase {
  constructor(
    @inject('ISensorRepository') private sensorRepository: ISensorRepository,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async create({ userId, name, model }: CreateSensorUseCaseDto): Promise<ISensor> {
    if (!name || !model) throw new Error('name and model is required');

    const user = await this.userRepository.findById({ id: userId });

    if (!user) throw new Error('User not found');

    const sensorExists = await this.sensorRepository.findByName({ name });

    if (sensorExists) throw new Error('Sensor with this name already exists');

    const sensor = await this.sensorRepository.create({
      model,
      name,
      user,
    });

    return sensor;
  }

  async find(): Promise<ISensor[]> {
    const sensors = await this.sensorRepository.find();

    return sensors;
  }

  async findByUser({ userId }: FindSensorDto): Promise<ISensor[]> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) throw new Error('User not found');

    const sensors = await this.sensorRepository.findByUser(user);

    return sensors;
  }

  async findById({ id }: FindSensorById): Promise<ISensor> {
    if (!isUUID(id)) throw new Error('Id must be an UUID');

    const sensor = await this.sensorRepository.findById({ id });

    if (!sensor) throw new Error('Sensor not found');

    return sensor;
  }
}
