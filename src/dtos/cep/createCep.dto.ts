import { ICep } from '../../interfaces/ICep';

export type CreateCepDto = Omit<ICep, '_id' | 'createdAt' | 'updatedAt'>;
