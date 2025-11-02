import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, AuthHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
