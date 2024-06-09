import { FindCepByCepDto } from '../../dtos/cep/findCepByCep.dto';
import { ICep } from '../../interfaces/ICep';

export interface ICepUseCase {
  findOrCreateByCep(dto: FindCepByCepDto): Promise<ICep | null>;
}
