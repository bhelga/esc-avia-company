import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { Passenger } from 'src/app/models/passenger';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: Passenger;
  favoriteFlights: Flight[] = [];
  page: number = 1;
  count: number = 2;

  showMenuEnabled: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authenticationService: AuthenticationService,private passengerService: PassengerService, private router: Router) { }

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

  onSave() {
    if (this.newPassword && this.oldPassword !== this.user.password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Old password is not valid!',
      })
    }
    else {
      if (this.user.firstName && this.user.middleName && this.user.lastName  && this.newPassword === this.confirmPassword) {
        this.user.password = this.newPassword !== '' ? this.newPassword : this.user.password;
          this.passengerService.updatePassenger(this.user.id, this.user).subscribe(res => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Data was successfully updated!',
            })
          });
        
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Input is not valid!',
        })
      }
    }
  }

  onFileUpload(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must select an image',
      })
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Only images are supported',
      })
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.user.avatar = reader.result?.toString() ?? '';
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
