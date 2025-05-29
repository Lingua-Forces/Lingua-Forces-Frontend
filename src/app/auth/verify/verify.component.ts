import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private signUpService: SignUpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    console.log('Token:', token);
    
    if (token) {
      this.signUpService.verify(token).subscribe({
        next: (response) => {
          console.log('Verificación exitosa:', response);
          localStorage.removeItem('signupEmail');
          this.router.navigate(['']);
          this.showSnackBar('Verificación exitosa');
          
        },
        error: (error) => {
          console.error('Error en la verificación:', error);
          this.showSnackBar('Error en la verificación');
        }
      }
      );
    } else {
      console.error('Token no encontrado en la URL');
      
    }
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }

}
