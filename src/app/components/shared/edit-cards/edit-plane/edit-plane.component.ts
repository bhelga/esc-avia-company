import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plane } from 'src/app/models/plane';
import { PlaneService } from 'src/app/services/plane.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-plane',
  templateUrl: './edit-plane.component.html',
  styleUrls: ['./edit-plane.component.scss']
})
export class EditPlaneComponent implements OnInit {
  @Input() plane!: Plane;
  @Output() closeEditor = new EventEmitter<void>();

  createMode: boolean = false;
  constructor(private planeService: PlaneService) { }

  ngOnInit(): void {
    if (!this.plane) {
      this.plane = {
        id: '',
        name: '',
        type: '',
        specifications: {
          developer: '',
          producer: '',
          startOfOperation: new Date(),
          length: 0,
          wingspan: 0,
          numberOfEngines: 0,
          engineType: '',
          engineThrust: 0,
          maximumFlightSpeed: 0,
        },
        seatsAmount: 0,
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
      this.plane.avatar = reader.result?.toString() ?? '';
    }
  }

  onSave() {
    if (this.plane.name && this.plane.type && this.plane.seatsAmount && this.plane.specifications.developer && this.plane.specifications.engineThrust
      && this.plane.specifications.engineType && this.plane.specifications.length && this.plane.specifications.maximumFlightSpeed && this.plane.specifications.numberOfEngines
      && this.plane.specifications.producer && this.plane.specifications.startOfOperation && this.plane.specifications.wingspan) {
      if (!this.createMode) {
        this.planeService.updatePlane(this.plane.id, this.plane).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          })
        });
      }
      else {
        this.plane.id = this.createUUID();
        this.planeService.register(this.plane).subscribe(res => {
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
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
  }
}
