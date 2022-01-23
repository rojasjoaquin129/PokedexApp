import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-explicacion',
  templateUrl: './dialog-explicacion.component.html',
  styleUrls: ['./dialog-explicacion.component.scss'],
})
export class DialogExplicacionComponent {
  constructor(public dialogRef: MatDialogRef<DialogExplicacionComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
