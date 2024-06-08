import 'reflect-metadata';
import { container } from 'tsyringe';
import { ISensorRepository } from './repositories/sensor/ISensorRepository';
import { SensorRepository } from './repositories/sensor/SensorRepository';
import { ISensorDataRepository } from './repositories/sensorData/ISensorDataRepository';
import { SensorDataRepository } from './repositories/sensorData/SensorDataRepository';
import { IUserRepository } from './repositories/user/IUserRepository';
import { UserRepository } from './repositories/user/UserRepository';
import { AuthUseCase } from './usecases/auth/AuthUseCase';
import { IAuthUseCase } from './usecases/auth/IAuthUseCase';
import { ISensorUseCase } from './usecases/sensor/ISensorUseCase';
import { SensorUseCase } from './usecases/sensor/SensorUseCase';
import { ISensorDataUseCase } from './usecases/sensorData/ISensorDataUseCase';
import { SensorDataUseCase } from './usecases/sensorData/SensorDataUseCase';
import { IUserUseCase } from './usecases/user/IUserUseCase';
import { UserUseCase } from './usecases/user/UserUseCase';

container.register<IUserRepository>('IUserRepository', UserRepository);
container.register<ISensorRepository>('ISensorRepository', SensorRepository);
container.register<ISensorDataRepository>('ISensorDataRepository', SensorDataRepository);
container.register<IUserUseCase>('IUserUseCase', UserUseCase);
container.register<ISensorUseCase>('ISensorUseCase', SensorUseCase);
container.register<ISensorDataUseCase>('ISensorDataUseCase', SensorDataUseCase);
container.register<IAuthUseCase>('IAuthUseCase', AuthUseCase);

export { container };
