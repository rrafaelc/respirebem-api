import { injectable } from 'tsyringe';
import { FindSensorDataDto } from '../../dtos/sensorData/findSensorData.dto';
import SensorData, { ISensorData } from '../../interfaces/ISensorData';
import connectDB from '../../lib/mongodb';
import { ISensorDataRepository } from './ISensorDataRepository';

@injectable()
export class SensorDataRepository implements ISensorDataRepository {
  async find({ sensor }: FindSensorDataDto): Promise<ISensorData[]> {
    await connectDB();

    try {
      const data: ISensorData[] = await SensorData.find({ sensor_id: sensor.id });

      return data;
    } catch (error: any) {
      throw new Error('Error getting sensor data');
    }
  }
}
