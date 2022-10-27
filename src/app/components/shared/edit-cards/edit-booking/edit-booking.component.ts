import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booked } from 'src/app/models/booked';
import { BookedService } from 'src/app/services/booked.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.scss']
})
export class EditBookingComponent implements OnInit {
  @Input() booking!: Booked;
  @Output() closeEditor = new EventEmitter<void>();

  createMode: boolean = false;

  constructor(private bookingService: BookedService) { }

  ngOnInit(): void {
    if (!this.booking) {
      this.booking = {
        id: '',
        passengerId: '',
        flightId: '',
        status: ''
      }
      this.createMode = true;
    }
  }

  onClose() {
    this.closeEditor.emit();
  }


  onSave() {
    if (this.booking.flightId && this.booking.passengerId && this.booking.status) {
      if (!this.createMode) {
        this.bookingService.updateBooked(this.booking.id, this.booking).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          })
        });
      }
      else {
        this.booking.id = this.createUUID();
        this.bookingService.createBooked(this.booking).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Data was successfully saved!',
            })
          },
          (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `Something went wrong! ${err}`,
            })
          }
        )
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Input is not valid!',
      })
    }
  }

  private createUUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
}
