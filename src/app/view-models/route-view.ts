import { RouteModel } from "../models/route";

export interface RouteView {
    totalPages: number;
    routes: RouteModel[];
}