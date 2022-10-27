import { Passenger } from "../models/passenger";

export interface PassengerView {
    totalPages: number;
    passengers: Passenger[];
}