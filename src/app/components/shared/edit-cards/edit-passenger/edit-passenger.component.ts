import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Passenger } from 'src/app/models/passenger';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-edit-passenger',
  templateUrl: './edit-passenger.component.html',
  styleUrls: ['./edit-passenger.component.scss']
})
export class EditPassengerComponent implements OnInit {
  @Input() passenger!: Passenger;
  @Output() closeEditor = new EventEmitter<void>();
  password: string = '';
  confirmedPassword: string = '';
  link: string = '';
  file?: File;
  createMode: boolean = false;

  constructor(private passengerService: PassengerService, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    if (!this.passenger) {
      this.passenger = {
        id: '',
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
        role: '',
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
			if (this.passenger) {
        this.passenger.avatar = reader.result?.toString() ?? ''; 
      }
		}
  }

  onSave() {
    if (this.passenger.firstName && this.passenger.middleName && this.passenger.lastName && this.passenger.role && this.password === this.confirmedPassword) {
      this.passenger.password = this.password;
      if (!this.createMode) {
        this.passengerService.updatePassenger(this.passenger.id, this.passenger).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully updated!',
          })
        });
      }
      else {
        let uuid: string = this.createUUID();
        this.passenger.id = uuid;
        this.passengerService.register(this.passenger).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data was successfully saved!',
          })
        });
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
