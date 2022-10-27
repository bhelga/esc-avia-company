import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';
import { AdminAuthGuard } from './helpers/admin-auth.guard';
import { AuthGuard } from './helpers/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { PassengerPageComponent } from './pages/passenger-page/passenger-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserFavoritesComponent } from './pages/user-favorites/user-favorites.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'user', component: PassengerPageComponent, canActivate: [AuthGuard], },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard],},
  { path: 'favorites', component: UserFavoritesComponent, canActivate: [AuthGuard],},
  { path: 'edit', component: EditUserComponent, canActivate: [AuthGuard],},
  { path: 'reset', component: ResetPasswordComponent},
  { path: '', component: PassengerPageComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
