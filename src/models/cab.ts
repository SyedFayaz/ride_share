import { model, Schema, Model, Document } from 'mongoose';
import { ICab } from '../interfaces';

const locationSchema = new Schema({
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
}, { _id: false });

const CabSchema: Schema = new Schema({
    cabNumber: { type: String, required: true },
    currentLocation: { type: locationSchema, required: true }
});

CabSchema.index({ 'currentLocation': '2dsphere' });

const CabModel: Model<ICab> = model('Cab', CabSchema);
export default CabModel;