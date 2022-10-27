import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RouteModel } from '../models/route';
import { RouteView } from '../view-models/route-view';

@Injectable({ providedIn: 'root' })
export class RouteService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<RouteModel[]>(environment.API_URL + `/route`);
    }

    getByPage(pageNumber: number, sortParam: string = "id") {
        return this.http.get<RouteView>(environment.API_URL + `/route/published?page=${pageNumber}&size=3&sortParam=${sortParam}`)
    }

    getById(id: string) {
        return this.http.get<RouteModel>(environment.API_URL + `/route/${id}`);
    }

    updateRoute(id: string, route: RouteModel): Observable<any> {
        return this.http.put<RouteModel>(environment.API_URL + `/route/update/${id}`, route);
    }

    register(route: RouteModel) {
        return this.http.post(environment.API_URL + `/route/create`, route);
    }

    delete(id: string) {
        return this.http.delete(environment.API_URL + `/route/delete/${id}`);
    }
}