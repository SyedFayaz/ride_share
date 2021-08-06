import { model, Schema, Model } from 'mongoose';
import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User: Model<IUser> = model('User', UserSchema);
export default User;