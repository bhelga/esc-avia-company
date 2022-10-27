import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger';
import { PassengerView } from '../view-models/passenger-view';

@Injectable({ providedIn: 'root' })
export class PassengerService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Passenger[]>(environment.API_URL + `/passenger`);
    }

    getByPage(pageNumber: number, sortParam: string = "id") {
        return this.http.get<PassengerView>(environment.API_URL + `/passenger/published?page=${pageNumber}&size=3&sortParam=${sortParam}`)
    }

    getById(id: string) {
        return this.http.get<Passenger>(environment.API_URL + `/passenger/${id}`);
    }

    getByLogin(login: string) {
        return this.http.get<Passenger>(environment.API_URL + `/passenger/login/${login}`);
    }

    updatePassenger(id: string, user: Passenger): Observable<any> {
        return this.http.put<Passenger>(environment.API_URL + `/passenger/update/${id}`, user);
    }

    register(user: Passenger) {
        return this.http.post(environment.API_URL + `/passenger/create`, user);
    }

    delete(id: string) {
        return this.http.delete(environment.API_URL + `/passenger/delete/${id}`);
    }
}