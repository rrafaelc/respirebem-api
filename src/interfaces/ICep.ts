import mongoose, { Model, Schema } from 'mongoose';

export interface ICep {
  _id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  createdAt: Date;
  updatedAt: Date;
}

const cepDataSchema = new Schema<ICep>(
  {
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    complemento: { type: String, required: true },
    bairro: { type: String, required: true },
    localidade: { type: String, required: true },
    uf: { type: String, required: true },
  },
  { timestamps: true },
);

const CepData: Model<ICep> = mongoose.models.sensorData || mongoose.model('cepData', cepDataSchema);

export default CepData;
