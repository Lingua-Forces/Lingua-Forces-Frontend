import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReevaluationEnabled } from '../../models/reevaluation-enabled';
import { EvalService } from '../../eval/eval.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink,RouterModule,CommonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  standalone: true,
})
export class MainHeaderComponent implements OnInit {
  private readonly apiUrl = `${environment.apiUrl}/stats/placement/status`;
  navOpen = false;
  canTrain: boolean = false;
  canReevaluate: ReevaluationEnabled = { enabled: false, remainingQuestions: 0 };
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private evalService: EvalService,
    private dialog: MatDialog
  ){}
  ngOnInit(): void {
    this.checkPlacementStatus();
  }
  
  checkPlacementStatus(): void {
    this.http.get<boolean>(this.apiUrl)
      .subscribe({
        next: (res) => this.canTrain = res,
        error: (err) => {
          console.error('Error al obtener estado del placement', err);
          this.canTrain = false;
        }
      });
  }

  goToEval() {
    this.evalService.canReevaluate().subscribe({
      next: (res) => {
        if (res.enabled || !this.canTrain) {
          this.router.navigate(['/eval']);
        } else {
          const msg = res.remainingQuestions
            ? ` You need to complete ${res.remainingQuestions} more exercises to be eligible for a level reassessment.`
            : 'You cannot access the evaluation at this time.';
          const dialogRef = this.dialog.open(GeneralDialogComponent, {
            data: { message: msg }
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/progress']);
          });
        }
      },
      error: () => {
        const dialogRef = this.dialog.open(GeneralDialogComponent, {
          data: { message: 'No se pudo comprobar el estado de reevaluación. Intenta más tarde.' }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/progress']);
        });
      }
    });
  }
  isOnEvalRoute(): boolean {
    // Opcional, para marcar el botón como activo si estás en /eval
    return this.router.url === '/eval';
  }

  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para reflejar el cambio de estado
  }
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}