import { ICep } from '../../interfaces/ICep';
import { ISensorData } from '../../interfaces/ISensorData';
import { CreateSensorDataRequest } from '../../requests/sensorData/createSensorDataRequest';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';

export interface IUseCaseSensorData extends ISensorData {
  location: ICep | null;
}

export interface ISensorDataUseCase {
  create(request: CreateSensorDataRequest): Promise<void>;
  find(request: FindSensorDataRequest): Promise<IUseCaseSensorData[]>;
  startCron(): Promise<void>;
  stopCron(): Promise<void>;
}
