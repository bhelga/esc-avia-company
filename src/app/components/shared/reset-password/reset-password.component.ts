import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  loginForm!: FormGroup;
  user?: Passenger;

  canBeUpdated: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  findUser() {
    this.passengerService.getByLogin(this.loginForm.get('login')?.value).subscribe(
      (data: Passenger) => {
        this.user = data as Passenger;
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There are no user with this login!',
        })
      });
  }

  checkFullName() {
    let userFullName: string = `${this.user?.firstName} ${this.user?.middleName} ${this.user?.lastName}`;
    if (this.loginForm.get('fullName')?.value.trim() === userFullName) {
      this.canBeUpdated = true;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Name!',
      });
    }
  }

  onSubmit() {
    if (this.canBeUpdated && this.user && this.loginForm.get('password')) {
      this.user.password = this.loginForm.get('password')?.value;
      this.passengerService.updatePassenger(this.user.id, this.user).subscribe(
        (data: Passenger) => {
          this.router.navigate(['/login'])
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password was changed!',
          })
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Some errors occurs!',
          });
        });;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Some errors occurs!',
      });
    }
  }
}
