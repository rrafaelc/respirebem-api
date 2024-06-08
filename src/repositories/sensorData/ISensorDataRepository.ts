import { FindSensorDataDto } from '../../dtos/sensorData/findSensorData.dto';
import { ISensorData } from '../../interfaces/ISensorData';

export interface ISensorDataRepository {
  find(dto: FindSensorDataDto): Promise<ISensorData[]>;
}
