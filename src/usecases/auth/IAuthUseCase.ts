import { LoginUserDto } from '../../dtos/auth/loginUser.dto';
import { IAuth } from '../../interfaces/IAuth';

export interface IAuthUseCase {
  login(request: LoginUserDto): Promise<IAuth>;
}
