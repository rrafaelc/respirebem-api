import { ISensorData } from '../../interfaces/ISensorData';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';

export interface ISensorDataUseCase {
  find(request: FindSensorDataRequest): Promise<ISensorData[]>;
}
