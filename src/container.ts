import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from './repositories/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { IUserUseCase } from './useCases/IUserUseCase';
import { UserUseCase } from './useCases/UserUseCase';

container.register<IUserRepository>('IUserRepository', UserRepository);
container.register<IUserUseCase>('IUserUseCase', UserUseCase);

export { container };
