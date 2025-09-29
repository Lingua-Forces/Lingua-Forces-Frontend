import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-admin-simulation',
  imports: [AdminHeaderComponent,CommonModule,MatButtonModule,MatInputModule,MatFormFieldModule,
          MatDatepickerModule,MatNativeDateModule, MatIconModule, ReactiveFormsModule,MatSelectModule,
          MatOptionModule,MatCheckboxModule,MatProgressSpinnerModule
  ],
  templateUrl: './admin-simulation.component.html',
  styleUrl: './admin-simulation.component.scss'
})
export class AdminSimulationComponent implements OnInit {
  userIds: string[] = [];
  usernames:  string[] = [];
  simForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.simForm = this.fb.group({
      userId: [null, Validators.required],
      dateRange: this.fb.group({
        start: [null, Validators.required],
        end:   [null, Validators.required],
      }),
      minExercisesPerDay: [1,[Validators.required, Validators.min(1)]],
      maxExercisesPerDay: [10,[Validators.required, Validators.min(1)]],
      includeReevaluation: [false]
    });
  }

  ngOnInit(): void {

    this.getUsersIds();
  }

  getUsersIds() : void {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        this.userIds = response.userIds || [];
        this.usernames = response.usernames || [];
      },
      error: (error) => {
        console.error('Error fetching user IDs:', error);
      }
    });
  }

  onSimulate() {
    if (this.simForm.invalid) {
      return;
    }
    this.loading = true;
    const { userId, dateRange, maxExercisesPerDay,minExercisesPerDay, includeReevaluation } = this.simForm.value;
    const request = {
      userId,
      startDate: dateRange.start.toISOString(),
      endDate: dateRange.end.toISOString(),
      maxExercisesPerDay,
      minExercisesPerDay,
      includeReevaluation
    };

    this.adminService.simulate(request).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('Simulación completada exitosamente', '', { duration: 2200 });
      },
      error: (error) => {
        this.loading = false;
        console.error('Error starting simulation:', error);
        this.snackBar.open('Error al iniciar la simulación.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
