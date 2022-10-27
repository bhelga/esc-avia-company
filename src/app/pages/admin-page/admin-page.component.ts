import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booked } from 'src/app/models/booked';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { Plane } from 'src/app/models/plane';
import { RouteModel } from 'src/app/models/route';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookedService } from 'src/app/services/booked.service';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { PlaneService } from 'src/app/services/plane.service';
import { RouteService } from 'src/app/services/route.service';
import { BookedView } from 'src/app/view-models/booked-view';
import { FlightView } from 'src/app/view-models/flight-view';
import { PassengerView } from 'src/app/view-models/passenger-view';
import { PlaneView } from 'src/app/view-models/plane-view';
import { RouteView } from 'src/app/view-models/route-view';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  passengers: Passenger[] = [];
  flights: Flight[] = [];
  routes: RouteModel[] = [];
  planes: Plane[] = [];
  bookings: Booked[] = [];

  passengerId: string = '';

  passengerPageNumber: number = 0;
  passengerPagesCount: number = 0;
  passengerActive: boolean = true;
  createPassenger: boolean = false;
  flightPageNumber: number = 0;
  flightPagesCount: number = 0;
  flightActive: boolean = false;
  createFlight: boolean = false;
  routePageNumber: number = 0;
  routePagesCount: number = 0;
  routeActive: boolean = false;
  createRoute: boolean = false;
  planePageNumber: number = 0;
  planePagesCount: number = 0;
  planeActive: boolean = false;
  createPlane: boolean = false;
  bookingPageNumber: number = 0;
  bookingPagesCount: number = 0;
  bookingActive: boolean = false;
  createBooking: boolean = false;

  passengerSort: string = 'id';
  flightSort: string = 'id';
  planeSort: string = 'id';
  routeSort: string = 'id';
  bookingSort: string = 'id';

  currentPage: number = 0;


  constructor(private authenticationService: AuthenticationService, private passengerService: PassengerService,
    private flightService: FlightService, private routeService: RouteService, private planeService: PlaneService,
    private bookedService: BookedService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllUsersByPage(this.passengerPageNumber);
    this.loadAllFlightsByPage(this.flightPageNumber);
    this.loadAllRoutesByPage(this.routePageNumber);
    this.loadAllPlanesByPage (this.planePageNumber);
    this.loadAllBookingsByPage(this.bookingPageNumber);
  }

  onExitClick() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onPassengerIcon() {
    this.passengerActive = true;
    this.flightActive = false;
    this.routeActive = false;
    this.planeActive = false;
    this.bookingActive = false;
  }

  onFlightIcon() {
    this.passengerActive = false;
    this.flightActive = true;
    this.routeActive = false;
    this.planeActive = false;
    this.bookingActive = false;
  }

  onRouteIcon() {
    this.passengerActive = false;
    this.flightActive = false;
    this.routeActive = true;
    this.planeActive = false;
    this.bookingActive = false;
  }

  onPlaneIcon() {
    this.passengerActive = false;
    this.flightActive = false;
    this.routeActive = false;
    this.planeActive = true;
    this.bookingActive = false;
  }

  onBookingIcon() {
    this.passengerActive = false;
    this.flightActive = false;
    this.routeActive = false;
    this.planeActive = false;
    this.bookingActive = true;
  }

  onPassengerPageClick(event: any) {
    this.currentPage = event.target.localName !== 'select' ? event?.target?.id - 1 : this.currentPage;
    this.loadAllUsersByPage(this.currentPage);
  }

  onFlightPageClick(event: any) {
    this.currentPage = event.target.localName !== 'select' ? event?.target?.id - 1 : this.currentPage;
    this.loadAllFlightsByPage(this.currentPage);
  }

  onPlanePageClick(event: any) {
    this.currentPage = event.target.localName !== 'select' ? event?.target?.id - 1 : this.currentPage;
    this.loadAllPlanesByPage(this.currentPage);
  }

  onRoutePageClick(event: any) {
    this.currentPage = event.target.localName !== 'select' ? event?.target?.id - 1 : this.currentPage;
    this.loadAllRoutesByPage(this.currentPage);
  }

  onBookingPageClick(event: any) {
    this.currentPage = event.target.localName !== 'select' ? event?.target?.id - 1 : this.currentPage;
    this.loadAllBookingsByPage(this.currentPage);
  }

  onCreatePassenger() {
    this.createPassenger = !this.createPassenger;
  }

  onCreateFlight() {
    this.createFlight = !this.createFlight;
  }

  onCreatePlane() {
    this.createPlane = !this.createPlane;
  }

  onCreateRoute() {
    this.createRoute = !this.createRoute;
  }

  onCreateBooking() {
    this.createBooking = !this.createBooking;
  }

  loadAllUsersByPage(passengerPageNumber: number) {
    this.passengerService.getByPage(passengerPageNumber, this.passengerSort).subscribe(result => {
      this.passengers = (result as PassengerView).passengers as Passenger[];

      this.passengerPagesCount = (result as PassengerView).totalPages;
    })
  }

  loadAllFlightsByPage(flightPageNumber: number) {
    this.flightService.getByPage(flightPageNumber, this.flightSort).subscribe(result => {
      this.flights = (result as FlightView).flights as Flight[];
      this.flightPagesCount = (result as FlightView).totalPages;
    })
  }

  loadAllRoutesByPage(routePageNumber: number) {
    this.routeService.getByPage(routePageNumber, this.routeSort).subscribe(result => {
      this.routes = (result as RouteView).routes as RouteModel[];
      this.routePagesCount = (result as RouteView).totalPages;
    })
  }

  loadAllPlanesByPage(planePageNumber: number) {
    this.planeService.getByPage(planePageNumber, this.planeSort).subscribe(result => {
      this.planes = (result as PlaneView).planes as Plane[];
      this.planePagesCount = (result as PlaneView).totalPages;
    })
  }

  loadAllBookingsByPage(bookingPageNumber: number) {
    this.bookedService.getByPage(bookingPageNumber, this.bookingSort).subscribe(result => {
      this.bookings = (result as BookedView).bookeds as Booked[];
      this.bookingPagesCount = (result as BookedView).totalPages;
    })
  }

  findUserById() {

  }
}
