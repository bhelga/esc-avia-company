import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';
import { FlightView } from '../view-models/flight-view';

@Injectable({ providedIn: 'root' })
export class FlightService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Flight[]>(environment.API_URL + `/flight`);
    }

    getByPage(pageNumber: number, sortParam: string = "id") {
        return this.http.get<FlightView>(environment.API_URL + `/flight/published?page=${pageNumber}&size=3&sortParam=${sortParam}`)
    }

    getById(id: string) {
        return this.http.get<Flight>(environment.API_URL + `/flight/${id}`);
    }

    updateFlight(id: string, flight: Flight): Observable<any> {
        return this.http.put<Flight>(environment.API_URL + `/flight/update/${id}`, flight);
    }

    register(flight: Flight) {
        return this.http.post(environment.API_URL + `/flight/create`, flight);
    }

    delete(id: string) {
        return this.http.delete(environment.API_URL + `/flight/delete/${id}`);
    }
}