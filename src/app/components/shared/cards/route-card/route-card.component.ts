import { Component, Input, OnInit } from '@angular/core';
import { RouteModel } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-route-card',
  templateUrl: './route-card.component.html',
  styleUrls: ['./route-card.component.scss']
})
export class RouteCardComponent implements OnInit {
  @Input() route!: RouteModel;
  editMode: boolean = false;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.editMode = !this.editMode;
  }

  onDelete() {
    this.routeService.delete(this.route.id).subscribe(res => {
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
    selBox.value = this.route.id;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
