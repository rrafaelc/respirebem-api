import { CreateCepDto } from '../../dtos/cep/createCep.dto';
import { FindCepByCepDto } from '../../dtos/cep/findCepByCep.dto';
import { ICep } from '../../interfaces/ICep';

export interface ICepRepository {
  create(dto: CreateCepDto): Promise<ICep>;
  findByCep(dto: FindCepByCepDto): Promise<ICep | null>;
}
