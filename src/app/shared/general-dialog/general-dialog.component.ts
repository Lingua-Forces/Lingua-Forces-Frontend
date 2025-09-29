import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-general-dialog',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './general-dialog.component.html',
  styleUrl: './general-dialog.component.scss'
})
export class GeneralDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
