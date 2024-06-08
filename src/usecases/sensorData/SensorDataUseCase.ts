import { inject, injectable } from 'tsyringe';
import { ISensorData } from '../../interfaces/ISensorData';
import type { ISensorRepository } from '../../repositories/sensor/ISensorRepository';
import type { ISensorDataRepository } from '../../repositories/sensorData/ISensorDataRepository';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';
import { ISensorDataUseCase } from './ISensorDataUseCase';

@injectable()
export class SensorDataUseCase implements ISensorDataUseCase {
  constructor(
    @inject('ISensorDataRepository') private sensorDataRepository: ISensorDataRepository,
    @inject('ISensorRepository') private sensorRepository: ISensorRepository,
  ) {}

  async find({ sensor_id }: FindSensorDataRequest): Promise<ISensorData[]> {
    const sensor = await this.sensorRepository.findById({
      id: sensor_id,
    });

    if (!sensor) throw new Error('Sensor not found');

    const sensorData = await this.sensorDataRepository.find({
      sensor,
    });

    return sensorData;
  }
}
