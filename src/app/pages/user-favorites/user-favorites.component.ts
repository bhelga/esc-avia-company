import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {
  user!: Passenger;
  favoriteFlights: Flight[] = [];
  page: number = 1;
  count: number = 2;

  showMenuEnabled: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(res => {
      this.user = res as Passenger;
    })
    try {
      this.favoriteFlights = JSON.parse(localStorage.getItem('favorites') ?? '') as Flight[];
    } catch (err) {
      this.favoriteFlights = [];
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  showMenu() {
    this.showMenuEnabled = !this.showMenuEnabled;
  }

}
