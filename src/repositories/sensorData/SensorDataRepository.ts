import { injectable } from 'tsyringe';
import { CreateSensorDataDto } from '../../dtos/sensorData/createSensorData.dto';
import { FindSensorDataDto } from '../../dtos/sensorData/findSensorData.dto';
import SensorData, { ISensorData } from '../../interfaces/ISensorData';
import connectDB from '../../lib/mongodb';
import { ISensorDataRepository } from './ISensorDataRepository';

@injectable()
export class SensorDataRepository implements ISensorDataRepository {
  async create({ sensor_id, level, cep }: CreateSensorDataDto): Promise<ISensorData> {
    await connectDB();

    const newSensorData = new SensorData({
      sensor_id,
      level,
      cep,
    });

    try {
      const savedSensorData = await newSensorData.save();

      return savedSensorData;
    } catch (error: any) {
      console.log({ error: error.message });
      throw new Error('Error creating sensor data');
    }
  }

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
