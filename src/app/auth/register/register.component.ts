import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ IMPORTANTE

@Component({
  selector: 'app-register',
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
