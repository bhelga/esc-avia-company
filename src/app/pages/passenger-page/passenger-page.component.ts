import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Route, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { Plane } from 'src/app/models/plane';
import { RouteModel } from 'src/app/models/route';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FlightService } from 'src/app/services/flight.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { PlaneService } from 'src/app/services/plane.service';
import { RouteService } from 'src/app/services/route.service';
import { PassengerView } from 'src/app/view-models/passenger-view';

@Component({
  selector: 'app-passenger-page',
  templateUrl: './passenger-page.component.html',
  styleUrls: ['./passenger-page.component.scss']
})
export class PassengerPageComponent implements OnInit {
  currentUser?: Passenger;
  showMenuEnabled: boolean = false

  passengers: Passenger[] = [];
  flights: Flight[] = [];
  routes: RouteModel[] = [];
  planes: Plane[] = [];

  searched: {
    flight: Flight,
    plane: Plane,
    route: RouteModel,
  }[] = [];

  landingPoint: string = 'Chernivtsi, Ukraine';
  pointOfDeparture: string = 'Kiev, Ukraine';
  shippingDatetime: Date = new Date("2022-02-20T20:00:00.885+00:00");

  class: string = 'economy class';
  minPrice: number = 0;
  maxPrice: number = 10000;

  pageOfItems!: Array<any>;

  page: number = 1;
  count: number = 2;

  constructor(private authenticationService: AuthenticationService, private passengerService: PassengerService,
    private flightService: FlightService, private routeService: RouteService, private planeService: PlaneService, private router: Router) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.router.events.subscribe((event: any) => {
          if (event instanceof NavigationStart) {
              // Show progress spinner or progress bar
             this.showMenuEnabled = false;
          }
      });
     }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    showMenu() {
        this.showMenuEnabled = !this.showMenuEnabled;
    }

  ngOnInit(): void {
    this.loadAllUsers();
    this.loadAllFlights();
    this.loadAllPlanes();
    this.loadAllRoutes();
  }

  onSearch() {
    this.searched = [];
    this.routes.forEach(route => {
      if(route.landingPoint === this.landingPoint && route.pointOfDeparture === this.pointOfDeparture) {
        this.flights.forEach(flight => {
          if (flight.routeId === route.id && this.compareDates(flight.shippingDatetime.toLocaleString(), this.shippingDatetime.toLocaleString()) && flight.flightClass === this.class
            && flight.price > this.minPrice && flight.price < this.maxPrice) {
            let linkedRoute: RouteModel;
            let linkedPlane: Plane;
            this.routeService.getById(flight.routeId).subscribe(res => {
              linkedRoute = res as RouteModel;
              this.planeService.getById(flight.planeId).subscribe(result => {
                linkedPlane = result as Plane;
                this.searched.push({
                  flight: flight,
                  route: linkedRoute,
                  plane: linkedPlane,
                });
              })
            })
            
          }
        });
      }
    });
  }

  applyFilters() {

  }

  loadAllUsers() {
    this.passengerService.getAll().subscribe(res => {
      this.passengers = res as Passenger[];
    })
  }

  loadAllFlights() {
    this.flightService.getAll().subscribe(result => {
      this.flights = result as Flight[];
    })
  }

  loadAllRoutes() {
    this.routeService.getAll().subscribe(result => {
      this.routes = result as RouteModel[];
    })
  }

  loadAllPlanes() {
    this.planeService.getAll().subscribe(result => {
      this.planes = result as Plane[];
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  private compareDates(d1: string, d2: string) {
    d1 = d1.slice(0, 10);
    let date1 = new Date(d1);
    let date2 = new Date(d2);
    
    if(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate() 
    // && date1.getHours() === date2.getHours()
    // && date1.getMinutes() === date2.getMinutes()
    ) {
      return true;
    }
    return false;
  };


}
