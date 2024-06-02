import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from './repositories/IUserRepository';
import { UserRepository } from './repositories/UserRepository';
import { AuthUseCase } from './usecases/auth/AuthUseCase';
import { IAuthUseCase } from './usecases/auth/IAuthUseCase';
import { IUserUseCase } from './usecases/user/IUserUseCase';
import { UserUseCase } from './usecases/user/UserUseCase';

container.register<IUserRepository>('IUserRepository', UserRepository);
container.register<IUserUseCase>('IUserUseCase', UserUseCase);
container.register<IAuthUseCase>('IAuthUseCase', AuthUseCase);

export { container };
