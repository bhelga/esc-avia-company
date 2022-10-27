import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Booked } from '../models/booked';
import { BookedView } from '../view-models/booked-view';

@Injectable({ providedIn: 'root' })
export class BookedService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Booked[]>(environment.API_URL + `/booked`);
    }

    getByPage(pageNumber: number, sortParam: string = "id") {
        return this.http.get<BookedView>(environment.API_URL + `/booked/published?page=${pageNumber}&size=3&sortParam=${sortParam}`)
    }

    getById(id: string) {
        return this.http.get<Booked>(environment.API_URL + `/booked/${id}`);
    }

    updateBooked(id: string, flight: Booked): Observable<any> {
        return this.http.put<Booked>(environment.API_URL + `/booked/update/${id}`, flight);
    }

    createBooked(flight: Booked) {
        return this.http.post(environment.API_URL + `/booked/create`, flight);
    }

    delete(id: string) {
        return this.http.delete(environment.API_URL + `/booked/delete/${id}`);
    }

    getByUserId(id: string) {
        return this.http.get<Booked[]>(environment.API_URL + `/booked/relatedTo/${id}`);
    }
}