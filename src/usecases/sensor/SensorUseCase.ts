import { inject, injectable } from 'tsyringe';
import { FindSensorDto } from '../../dtos/sensor/findSensor.dto';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import type { ISensorRepository } from '../../repositories/sensor/ISensorRepository';
import type { ISensorDataRepository } from '../../repositories/sensorData/ISensorDataRepository';
import type { IUserRepository } from '../../repositories/user/IUserRepository';
import { isUUID } from '../../utils/isUUID';
import { CreateSensorUseCaseDto, ISensorAllDatas, ISensorUseCase } from './ISensorUseCase';

@injectable()
export class SensorUseCase implements ISensorUseCase {
  constructor(
    @inject('ISensorRepository') private sensorRepository: ISensorRepository,
    @inject('ISensorDataRepository') private sensorDataRepository: ISensorDataRepository,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async create({ userId, name, model }: CreateSensorUseCaseDto): Promise<ISensorAllDatas> {
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

    return { ...sensor, data: [] };
  }

  async find(): Promise<ISensorAllDatas[]> {
    const sensors = await this.sensorRepository.find();

    const sensorAllData: ISensorAllDatas[] = await Promise.all(
      sensors.map(async (sensor): Promise<ISensorAllDatas> => {
        const sensorData = await this.sensorDataRepository.find({ sensor });

        return {
          ...sensor,
          data: sensorData,
        };
      }),
    );

    return sensorAllData;
  }

  async findByUser({ userId }: FindSensorDto): Promise<ISensorAllDatas[]> {
    const user = await this.userRepository.findById({ id: userId });

    if (!user) throw new Error('User not found');

    const sensors = await this.sensorRepository.findByUser(user);

    const sensorAllData: ISensorAllDatas[] = await Promise.all(
      sensors.map(async (sensor): Promise<ISensorAllDatas> => {
        const sensorData = await this.sensorDataRepository.find({ sensor });

        return {
          ...sensor,
          data: sensorData,
        };
      }),
    );

    return sensorAllData;
  }

  async findById({ id }: FindSensorById): Promise<ISensorAllDatas> {
    if (!isUUID(id)) throw new Error('Id must be an UUID');

    const sensor = await this.sensorRepository.findById({ id });

    if (!sensor) throw new Error('Sensor not found');

    const sensorData = await this.sensorDataRepository.find({ sensor });

    return {
      ...sensor,
      data: sensorData,
    };
  }
}
