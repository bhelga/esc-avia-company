import { Booked } from "../models/booked";

export interface BookedView {
    totalPages: number;
    bookeds: Booked[];
}