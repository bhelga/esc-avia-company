import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent implements OnInit {
  @Input() flight!: Flight;
  @Output() closeEditor = new EventEmitter<void>();
  password: string = '';
  confirmedPassword: string = '';
  createMode: boolean = false;
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    if (!this.flight) {
      this.flight = {
        id: '',
        price: 0,
        flightClass: '',
        planeId: '',
        routeId: '',
        routeNumber: 0,
        shippingDatetime: new Date(),
        avatar: '',
      }
      this.createMode = true;
    }
  }

  onClose() {
    this.closeEditor.emit();
  }

  onFileSelect(event: any) {
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
      this.flight.avatar = reader.result?.toString() ?? '';
    }
  }

  onSave() {
    if (this.flight.flightClass && this.flight.planeId && this.flight.routeId && this.flight.price && this.flight.routeNumber && this.flight.shippingDatetime) {
      if (!this.createMode) {
        this.flightService.updateFlight(this.flight.id, this.flight).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          })
        });
      }
      else {
        this.flight.id = this.createUUID();
        this.flightService.register(this.flight).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          });
        })
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
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
