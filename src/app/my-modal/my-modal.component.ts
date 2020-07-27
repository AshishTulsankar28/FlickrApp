import { Component, OnInit,Inject  } from '@angular/core';
import { ModalData } from '../models/flickerResp';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public curPhoto: ModalData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

}
