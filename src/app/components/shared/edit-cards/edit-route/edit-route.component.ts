import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteModel } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit {
  @Input() route!: RouteModel;
  @Output() closeEditor = new EventEmitter<void>();

  createMode: boolean = false;

  constructor(private routeService: RouteService) { }

  ngOnInit(): void {
    if (!this.route) {
      this.route = {
        id: '',
        duration: '',
        landingPoint: '',
        pointOfDeparture: '',
        avatar: '',
      }
      this.createMode = true;
    }
  }

  onClose() {
    this.closeEditor.emit();
  }

  onFileSelect(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
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
			this.route.avatar = reader.result?.toString() ?? ''; 
		}
  }

  onSave() {
    if (this.route.landingPoint && this.route.pointOfDeparture && this.route.duration) {
      if (!this.createMode) {
        this.routeService.updateRoute(this.route.id, this.route).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          })
        });
      }
      else {
        this.route.id = this.createUUID();
        this.routeService.register(this.route).subscribe(
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
