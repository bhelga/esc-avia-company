import { Flight } from "../models/flight";

export interface FlightView {
    totalPages: number;
    flights: Flight[];
}