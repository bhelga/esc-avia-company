import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passenger-card',
  templateUrl: './passenger-card.component.html',
  styleUrls: ['./passenger-card.component.scss']
})
export class PassengerCardComponent implements OnInit {
  @Input() passenger!: Passenger;
  editMode: boolean = false;

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    this.passengerService.delete(this.passenger.id).subscribe(res => {
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

  copyId(event: any) {
    event.stopPropagation();
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.passenger.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
