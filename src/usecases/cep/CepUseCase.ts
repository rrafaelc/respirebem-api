import AsyncLock from 'async-lock';
import axios from 'axios';
import NodeCache from 'node-cache';
import { inject, injectable } from 'tsyringe';
import { VIA_CEP_URL } from '../../constants/constants';
import { FindCepByCepDto } from '../../dtos/cep/findCepByCep.dto';
import { ICep } from '../../interfaces/ICep';
import type { ICepRepository } from '../../repositories/cep/ICepRepositoty';
import { ICepUseCase } from './ICepUseCase';

export interface ViaCep extends ICep {
  erro?: boolean;
}

@injectable()
export class CepUseCase implements ICepUseCase {
  private cache: NodeCache;
  private lock: AsyncLock;

  constructor(@inject('ICepRepository') private cepRepository: ICepRepository) {
    this.cache = new NodeCache({ stdTTL: 10 });
    this.lock = new AsyncLock();
  }

  async findOrCreateByCep({ cep }: FindCepByCepDto): Promise<ICep | null> {
    return this.lock.acquire(cep, async () => {
      let cepData = this.cache.get<ICep>(cep);
      if (cepData) {
        return cepData;
      }

      cepData = (await this.cepRepository.findByCep({ cep })) ?? undefined;
      if (cepData) {
        this.cache.set(cep, cepData);
        return cepData;
      }

      try {
        const response = await axios.get<ViaCep>(`${VIA_CEP_URL}/${cep}/json/`);
        const viaCepData = response.data;

        if (viaCepData.erro) {
          return null;
        }

        const newCepData = {
          cep: viaCepData.cep,
          logradouro: viaCepData.logradouro,
          complemento: viaCepData.complemento ? viaCepData.complemento : 'vazio',
          bairro: viaCepData.bairro,
          localidade: viaCepData.localidade,
          uf: viaCepData.uf,
        } as ICep;

        await this.cepRepository.create(newCepData);

        this.cache.set(cep, newCepData);

        return newCepData;
      } catch (error: any) {
        console.log({ error: error.message });

        return null;
      }
    });
  }
}
