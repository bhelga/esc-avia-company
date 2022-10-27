import { Component, Input, OnInit } from '@angular/core';
import { Booked } from 'src/app/models/booked';
import { BookedService } from 'src/app/services/booked.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {
  @Input() booking!: Booked;
  editMode: boolean = false;
  constructor(private bookingService: BookedService) { }

  ngOnInit(): void {
    // this.flight.shippingDatetime.toUTCString()
  }

  onCardClick() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    this.bookingService.delete(this.booking.id).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data was successfully deleted!',
      })
    });
  }

  onCardClose() {
    this.editMode = false;
  }

  copyBookingId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.booking.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyPassengerId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.booking.passengerId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyFlightId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.booking.flightId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
