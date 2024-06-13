import { inject, injectable } from 'tsyringe';
import { MOCK_CEPS } from '../../constants/constants';
import type { ISensorDataRepository } from '../../repositories/sensorData/ISensorDataRepository';
import { CreateSensorDataRequest } from '../../requests/sensorData/createSensorDataRequest';
import { FindSensorDataRequest } from '../../requests/sensorData/findSensorDataRequest';
import { isUUID } from '../../utils/isUUID';
import type { ICepUseCase } from '../cep/ICepUseCase';
import { ISensorDataUseCase, IUseCaseSensorData, StartCron } from './ISensorDataUseCase';

@injectable()
export class SensorDataUseCase implements ISensorDataUseCase {
  private intervalId: NodeJS.Timeout | null = null;
  private timeoutId: NodeJS.Timeout | null = null;
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
      const randomLevel = Math.floor(Math.random() * (900 - 100 + 1)) + 100;
      const randomCep = MOCK_CEPS[Math.floor(Math.random() * MOCK_CEPS.length)];

      await this.sensorDataRepository.create({
        sensor_id,
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

  async startCron({ sensor_id }: StartCron): Promise<void> {
    if (!this.intervalId) {
      const sensorData: CreateSensorDataRequest = {
        sensor_id,
        level: 0,
        cep: '',
      };

      const start = () => {
        this.isSimulation = true;
        this.create(sensorData);
      };

      this.intervalId = setInterval(start, 2000);
      console.log('SensorData creation started.');

      // Stop the cron after 5 minutes (300000 milliseconds)
      this.timeoutId = setTimeout(() => {
        this.stopCron();
      }, 300000);
    }
  }

  async stopCron(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.isSimulation = false;
      console.log('SensorData creation stopped.');
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
