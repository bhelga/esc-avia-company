import { Specifications } from "./specifications";

export interface Plane {
    id: string;
    name: string;
    type: string;
    specifications: Specifications;
    seatsAmount: number;
    avatar: string;
}