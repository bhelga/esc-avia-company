import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthenticationService } from './services/authentication.service';
import { PassengerPageComponent } from './pages/passenger-page/passenger-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { PassengerCardComponent } from './components/shared/cards/passenger-card/passenger-card.component';
import { EditPassengerComponent } from './components/shared/edit-cards/edit-passenger/edit-passenger.component';
import { FlightCardComponent } from './components/shared/cards/flight-card/flight-card.component';
import { EditFlightComponent } from './components/shared/edit-cards/edit-flight/edit-flight.component';
import { PlaneCardComponent } from './components/shared/cards/plane-card/plane-card.component';
import { EditPlaneComponent } from './components/shared/edit-cards/edit-plane/edit-plane.component';
import { RouteCardComponent } from './components/shared/cards/route-card/route-card.component';
import { EditRouteComponent } from './components/shared/edit-cards/edit-route/edit-route.component';
import { FlightInfoCardComponent } from './components/shared/cards/flight-info-card/flight-info-card.component';
import { BookingCardComponent } from './components/shared/cards/booking-card/booking-card.component';
import { EditBookingComponent } from './components/shared/edit-cards/edit-booking/edit-booking.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserFavoritesComponent } from './pages/user-favorites/user-favorites.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';
import { AdminAuthGuard } from './helpers/admin-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    PassengerPageComponent,
    LoginComponent,
    PassengerCardComponent,
    EditPassengerComponent,
    FlightCardComponent,
    EditFlightComponent,
    PlaneCardComponent,
    EditPlaneComponent,
    RouteCardComponent,
    EditRouteComponent,
    FlightInfoCardComponent,
    BookingCardComponent,
    EditBookingComponent,
    UserProfileComponent,
    UserFavoritesComponent,
    EditUserComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthGuard,
    AdminAuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
