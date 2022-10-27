import { Component, Input, OnInit } from '@angular/core';
import { Booked } from 'src/app/models/booked';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { Plane } from 'src/app/models/plane';
import { RouteModel } from 'src/app/models/route';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookedService } from 'src/app/services/booked.service';
import { PlaneService } from 'src/app/services/plane.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-info-card',
  templateUrl: './flight-info-card.component.html',
  styleUrls: ['./flight-info-card.component.scss']
})
export class FlightInfoCardComponent implements OnInit {
  @Input() flight!: Flight;
  @Input() plane?: Plane;
  @Input() route?: RouteModel;
  @Input() bookingMode: boolean = false;
  @Input() booking?: Booked;

  arrivalDate: Date = new Date();

  constructor(private bookedService: BookedService, private authenticationService: AuthenticationService, private planeService: PlaneService,
    private routeService: RouteService) {

  }

  ngOnInit(): void {
    if (!this.route && !this.plane) {
      this.planeService.getById(this.flight.planeId).subscribe(result => {
        this.plane = result as Plane;
        this.routeService.getById(this.flight.routeId).subscribe(res => {
          this.route = res as RouteModel;
          this.arrivalDate = new Date(this.flight.shippingDatetime.toString());
          let hours: number = +this.route.duration.split("h")[0];
          let minutes: number = +this.route.duration.split("h")[1].trim().slice(0, -1);
          this.arrivalDate.setHours(this.arrivalDate.getHours() + hours);
          this.arrivalDate.setMinutes(this.arrivalDate.getMinutes() + minutes);
        })
      })
    } else {

      this.arrivalDate = new Date(this.flight.shippingDatetime.toString());
      if (this.route) {
        let hours: number = +this.route.duration.split("h")[0];
        let minutes: number = +this.route.duration.split("h")[1].trim().slice(0, -1);
        this.arrivalDate.setHours(this.arrivalDate.getHours() + hours);
        this.arrivalDate.setMinutes(this.arrivalDate.getMinutes() + minutes);
      }
    }
  }

  deleteFromBooked() {
    if(this.booking) {
      this.bookedService.delete(this.booking.id).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `Your booking was deleted!`,
        })
      })
    }
  }

  addToBooked() {
    let booked;
    try {
      booked = JSON.parse(localStorage.getItem('booked') ?? '');
    }
    catch (ex) {
      booked = [];
    }
    finally {
      booked.push({
        flight: this.flight,
        plane: this.plane,
        route: this.route,
      });
      localStorage.setItem('booked', JSON.stringify(booked));
      let currentUserId;
      this.authenticationService.currentUser.subscribe(res => {
        currentUserId = (res as Passenger).id;
        let booking: Booked = {
          id: this.createUUID().toString(),
          flightId: this.flight.id,
          passengerId: currentUserId,
          status: "Waiting for approval"
        };
        this.bookedService.createBooked(booking).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Your booking was saved! You can see the status in the cabinet!`,
          })
        });
      });

    }
  }

  addToFavorites() {
    let booking;
    try {
      booking = JSON.parse(localStorage.getItem('favorites') ?? '');
    }
    catch (ex) {
      booking = [];
    }
    finally {
      booking.push(this.flight);
      localStorage.setItem('favorites', JSON.stringify(booking));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Added to favorites! You can find it in your cabinet!`,
      })
    }
  }

  private createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
