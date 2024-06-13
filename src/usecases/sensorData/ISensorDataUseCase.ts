import { ICep } from '../../interfaces/ICep';
import { ISensorData } from '../../interfaces/ISensorData';
import { CreateSensorDataRequest } from '../../requests/sensorData/createSensorDataRequest';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';

export interface IUseCaseSensorData extends ISensorData {
  location: ICep | null;
}

export interface StartCron {
  sensor_id: string;
}

export interface ISensorDataUseCase {
  create(request: CreateSensorDataRequest): Promise<void>;
  find(request: FindSensorDataRequest): Promise<IUseCaseSensorData[]>;
  startCron(request: StartCron): Promise<void>;
  stopCron(): Promise<void>;
}
