import { inject, injectable } from 'tsyringe';
import type { ISensorDataRepository } from '../../repositories/sensorData/ISensorDataRepository';
import { CreateSensorDataRequest } from '../../requests/sensorData/createSensorDataRequest';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';
import { isUUID } from '../../utils/isUUID';
import type { ICepUseCase } from '../cep/ICepUseCase';
import { ISensorDataUseCase, IUseCaseSensorData } from './ISensorDataUseCase';

@injectable()
export class SensorDataUseCase implements ISensorDataUseCase {
  private intervalId: NodeJS.Timeout | null = null;
  private isSimulation: boolean = false;

  constructor(
    @inject('ICepUseCase') private cepUseCase: ICepUseCase,
    @inject('ISensorDataRepository') private sensorDataRepository: ISensorDataRepository,
  ) {}

  async create({ sensor_id, level, cep }: CreateSensorDataRequest): Promise<void> {
    if (!this.isSimulation) {
      await this.sensorDataRepository.create({
        sensor_id,
        level,
        cep,
      });

      await this.cepUseCase.findOrCreateByCep({ cep });
    } else {
      const mockIds = [
        'bbb1e3d0-a78f-4135-9995-98f2506fd844',
        '731ff817-7abc-4c69-a02a-ba0f8548b6fb',
        '666bf3cc-0772-42ba-baf0-f72e7cca85e9',
      ];

      const mockCeps = [
        '13970-005',
        '13970-010',
        '13970-020',
        '13970-030',
        '13970-040',
        '13970-050',
        '13970-060',
        '13970-065',
        '13970-070',
        '13970-080',
        '13970-084',
        '13970-125',
        '13970-127',
        '13970-130',
        '13970-140',
      ];

      const randomId = mockIds[Math.floor(Math.random() * mockIds.length)];
      const randomLevel = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
      const randomCep = mockCeps[Math.floor(Math.random() * mockCeps.length)];

      await this.sensorDataRepository.create({
        sensor_id: randomId,
        level: randomLevel,
        cep: randomCep,
      });

      await this.cepUseCase.findOrCreateByCep({ cep: randomCep });
    }
  }

  async find({ sensor_id, limit }: FindSensorDataRequest): Promise<IUseCaseSensorData[]> {
    if (!isUUID(sensor_id)) throw new Error('Id must be an UUID');

    const sensorData = await this.sensorDataRepository.find({
      sensor_id,
      limit,
    });

    const sensorDataWithLocation: IUseCaseSensorData[] = await Promise.all(
      sensorData.map(async (sen): Promise<IUseCaseSensorData> => {
        const location = await this.cepUseCase.findOrCreateByCep({ cep: sen.cep });

        return {
          _id: sen._id,
          sensor_id: sen.sensor_id,
          cep: sen.cep,
          level: sen.level,
          createdAt: sen.createdAt,
          updatedAt: sen.updatedAt,
          location,
        };
      }),
    );

    return sensorDataWithLocation;
  }

  async startCron(): Promise<void> {
    if (!this.intervalId) {
      const sensorData: CreateSensorDataRequest = {
        sensor_id: '',
        level: 0,
        cep: '',
      };

      const start = () => {
        this.isSimulation = true;
        this.create(sensorData);
      };

      this.intervalId = setInterval(start, 2000);
      console.log('SensorData creation started.');
    }
  }

  async stopCron(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isSimulation = false;
      console.log('SensorData creation stopped.');
    }
  }
}
