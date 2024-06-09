import { inject, injectable } from 'tsyringe';
import { MOCK_CEPS, MOCK_IDS } from '../../constants/constants';
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
      const randomId = MOCK_IDS[Math.floor(Math.random() * MOCK_IDS.length)];
      const randomLevel = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
      const randomCep = MOCK_CEPS[Math.floor(Math.random() * MOCK_CEPS.length)];

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
