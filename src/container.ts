import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from './repositories/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { IUserUseCase } from './usecases/IUserUseCase';
import { UserUseCase } from './usecases/UserUseCase';

container.register<IUserRepository>('IUserRepository', UserRepository);
container.register<IUserUseCase>('IUserUseCase', UserUseCase);

export { container };
