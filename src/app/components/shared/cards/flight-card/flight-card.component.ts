import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight!: Flight;
  editMode: boolean = false;
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    // this.flight.shippingDatetime.toUTCString()
  }

  onCardClick() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    this.flightService.delete(this.flight.id).subscribe(res => {
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

  copyFlightId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.flight.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyPlaneId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.flight.planeId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyRouteId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.flight.routeId;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
