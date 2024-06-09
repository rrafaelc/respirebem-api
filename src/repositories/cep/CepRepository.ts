import { injectable } from 'tsyringe';
import { CreateCepDto } from '../../dtos/cep/createCep.dto';
import { FindCepByCepDto } from '../../dtos/cep/findCepByCep.dto';
import CepData, { ICep } from '../../interfaces/ICep';
import connectDB from '../../lib/mongodb';
import { ICepRepository } from './ICepRepositoty';

@injectable()
export class CepRepository implements ICepRepository {
  async create({
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
  }: CreateCepDto): Promise<ICep> {
    await connectDB();

    const newCepData = new CepData({
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
    });

    try {
      const data = await newCepData.save();

      return data;
    } catch (error: any) {
      console.log({ error: error.message });

      throw new Error('Error creating cep data');
    }
  }

  async findByCep({ cep }: FindCepByCepDto): Promise<ICep | null> {
    await connectDB();

    try {
      const data: ICep | null = await CepData.findOne({
        cep,
      });

      return data;
    } catch (error: any) {
      throw new Error('Error getting cep data');
    }
  }
}
