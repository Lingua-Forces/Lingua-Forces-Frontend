import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  standalone: true,
})
export class MainHeaderComponent implements OnInit {
  private readonly apiUrl = `${environment.apiUrl}/stats/placement/status`;
  navOpen = false;
  canTrain: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient
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
  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para reflejar el cambio de estado
  }
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}