import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Plane } from '../models/plane';
import { PlaneView } from '../view-models/plane-view';

@Injectable({ providedIn: 'root' })
export class PlaneService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Plane[]>(environment.API_URL + `/plane`);
    }

    getByPage(pageNumber: number, sortParam: string = "id") {
        return this.http.get<PlaneView>(environment.API_URL + `/plane/published?page=${pageNumber}&size=3&sortParam=${sortParam}`)
    }

    getById(id: string) {
        return this.http.get<Plane>(environment.API_URL + `/plane/${id}`);
    }

    updatePlane(id: string, plane: Plane): Observable<any> {
        return this.http.put<Plane>(environment.API_URL + `/plane/update/${id}`, plane);
    }

    register(plane: Plane) {
        return this.http.post(environment.API_URL + `/plane/create`, plane);
    }

    delete(id: string) {
        return this.http.delete(environment.API_URL + `/plane/delete/${id}`);
    }
}