import { CreateSensorDataDto } from '../../dtos/sensorData/createSensorData.dto';
import { FindSensorDataDto } from '../../dtos/sensorData/findSensorData.dto';
import { ISensorData } from '../../interfaces/ISensorData';

export interface ISensorDataRepository {
  create(dto: CreateSensorDataDto): Promise<ISensorData>;
  find(dto: FindSensorDataDto): Promise<ISensorData[]>;
}
