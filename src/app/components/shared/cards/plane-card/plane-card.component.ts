import { Component, Input, OnInit } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { PlaneService } from 'src/app/services/plane.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plane-card',
  templateUrl: './plane-card.component.html',
  styleUrls: ['./plane-card.component.scss']
})
export class PlaneCardComponent implements OnInit {
  @Input() plane!: Plane;
  editMode: boolean = false;

  constructor(private planeService: PlaneService) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    this.planeService.delete(this.plane.id).subscribe(res => {
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
    selBox.value = this.plane.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
