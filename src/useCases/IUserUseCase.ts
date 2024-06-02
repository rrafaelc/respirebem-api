import { UserCreateDto } from '../dtos/UserCreate.dto';

export interface IUserUseCase {
  create(request: UserCreateDto): Promise<void>;
}
