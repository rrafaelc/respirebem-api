import { ISensorData } from '../../interfaces/ISensorData';
import { CreateSensorDataRequest } from '../../requests/sensorData/createSensorDataRequest';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';

export interface ISensorDataUseCase {
  create(request: CreateSensorDataRequest): Promise<ISensorData>;
  find(request: FindSensorDataRequest): Promise<ISensorData[]>;
}
