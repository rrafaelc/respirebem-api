import { CreateSensorDto } from '../../dtos/sensor/createSensor.dto';
import { FindSensorDto } from '../../dtos/sensor/findSensor.dto';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import { ISensor } from '../../interfaces/ISensor';

export interface CreateSensorUseCaseDto extends CreateSensorDto {
  userId: string;
}

export interface ISensorUseCase {
  create(request: CreateSensorUseCaseDto): Promise<ISensor>;
  find(): Promise<ISensor[]>;
  findByUser(request: FindSensorDto): Promise<ISensor[]>;
  findById(request: FindSensorById): Promise<ISensor>;
}
