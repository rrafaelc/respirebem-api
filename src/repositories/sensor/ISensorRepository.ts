import { User } from '@prisma/client';
import { CreateSensorDto } from '../../dtos/sensor/createSensor.dto';
import { FindSensorById } from '../../dtos/sensor/findSensorById.dto';
import { FindSensorByNameDto } from '../../dtos/sensor/findSensorByName.dto';
import { ISensor } from '../../interfaces/ISensor';

export interface CreateSensorRepository extends CreateSensorDto {
  user: User;
}

export interface ISensorRepository {
  create(dto: CreateSensorRepository): Promise<ISensor>;
  find(): Promise<ISensor[]>;
  findByUser(user: User): Promise<ISensor[]>;
  findById(dto: FindSensorById): Promise<ISensor | null>;
  findByName(dto: FindSensorByNameDto): Promise<ISensor | null>;
}
