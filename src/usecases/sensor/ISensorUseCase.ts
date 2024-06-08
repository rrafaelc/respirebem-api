import { CreateSensorDto } from '../../dtos/sensor/createSensor.dto';
import { FindSensorDto } from '../../dtos/sensor/findSensor.dto';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import { ISensor } from '../../interfaces/ISensor';
import { ISensorData } from '../../interfaces/ISensorData';

export interface CreateSensorUseCaseDto extends CreateSensorDto {
  userId: string;
}

export interface ISensorAllDatas extends ISensor {
  data: ISensorData[];
}

export interface ISensorUseCase {
  create(request: CreateSensorUseCaseDto): Promise<ISensorAllDatas>;
  find(): Promise<ISensorAllDatas[]>;
  findByUser(request: FindSensorDto): Promise<ISensorAllDatas[]>;
  findById(request: FindSensorById): Promise<ISensorAllDatas>;
}
