import { Document } from "mongoose";
export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IBookRequest {
    start: ILocation;
    end: ILocation;
    bookedBy: string;
}

export interface IGeoLocation {
    type: string;
    coordinates: number[]
}

export interface GeoLocation {
    type: string;
    coordinates: number[]
}

export interface IUser extends Document {
    email: string;
    password: string;
}

export interface ICab extends Document {
    cabNumber: string;
    currentLocation: IGeoLocation;
}