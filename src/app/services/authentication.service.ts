import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Passenger } from '../models/passenger';
import { environment } from 'src/environments/environment';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Passenger>;
    public currentUser: Observable<Passenger>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Passenger>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Passenger {
        return this.currentUserSubject.value;
    }

    login(login: string, password: string) {
        return this.http.get<Passenger>(environment.API_URL + `/passenger/${login}/${password}`)
            .pipe(map(user => {
                if (user && user.id) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null!);
    }
}