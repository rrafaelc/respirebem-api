import mongoose, { Model, Schema } from 'mongoose';

export interface ISensorData {
  _id: string;
  sensor_id: string;
  level: number;
  cep: string;
}

const sensorDataSchema = new Schema<ISensorData>(
  {
    sensor_id: { type: String, required: true },
    level: { type: Number, required: true },
    cep: { type: String, required: true },
  },
  { timestamps: true },
);

const SensorData: Model<ISensorData> =
  mongoose.models.sensorData || mongoose.model('sensorData', sensorDataSchema);

export default SensorData;
