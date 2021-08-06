import { model, Schema, Model } from 'mongoose';
import { IBookRequest } from '../interfaces';

const locationSchema = new Schema({
    type: { type: String, required: true },
    coordinates: { type: [Number], required: true }
}, { _id: false });

const BookingSchema: Schema = new Schema({
    start: { type: locationSchema, required: true },
    end: { type: locationSchema, required: true },
    bookedBy: { type: String, required: true }
});
BookingSchema.index({ 'start': '2dsphere' });
BookingSchema.index({ 'end': '2dsphere' });

const Booking: Model<IBookRequest> = model('Booking', BookingSchema);
export default Booking;