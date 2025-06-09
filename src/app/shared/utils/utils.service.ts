// src/app/shared/utils/utils.service.ts

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      verticalPosition: 'top',
    });
  }
}
