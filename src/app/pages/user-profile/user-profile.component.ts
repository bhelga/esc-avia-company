import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Booked } from 'src/app/models/booked';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookedService } from 'src/app/services/booked.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user!: Passenger;
  bookings!: Booked[];
  flights: {
    booking: Booked,
    flight: Flight
  }[] = [];
  showMenuEnabled: boolean = false;

  page: number = 1;
  count: number = 1;

  constructor(private authenticationService: AuthenticationService, private bookingService: BookedService, private flightService: FlightService,
    private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(res => {
      this.user = res as Passenger;
      this.bookingService.getByUserId(this.user.id).subscribe(res => {
        this.bookings = res as Booked[];
        this.bookings.forEach(booking => {
          this.flightService.getById(booking.flightId).subscribe(res => {
            this.flights.push({ flight: res as Flight, booking: booking });
          })
        });
      })
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  showMenu() {
    this.showMenuEnabled = !this.showMenuEnabled;
  }

}
