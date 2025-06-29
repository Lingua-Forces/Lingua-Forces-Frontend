import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-header',
  imports: [RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent implements OnInit {
  navOpen = false;
  constructor(
    private authService: AuthService,
  ){}
  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para reflejar el cambio de estado
  }
  toggleNav() {
    this.navOpen = !this.navOpen;
  }
}