import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { EvalComponent } from '../../eval/eval.component';
import { TrainComponent } from '../../train/train.component';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss'
})
export class MainHeaderComponent {
  navOpen = false;
  constructor(
    private authService: AuthService
  ){}
  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para reflejar el cambio de estado
  }
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}
