import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule,ReactiveFormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.module.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.auth()) {
      this.router.navigate(['/eval']);
    }
  }

  login(): void {
    if (this.form.invalid) {
      return;
    }
    const credentials: LoginRequest = this.form.value as LoginRequest;

    this.authService.login(credentials).subscribe({
      next: (response) => {       
        this.showSnackBar('Inicio de sesión exitoso');
        this.router.navigate(['/eval']); // Redirigir a la página de inicio
      },
      
      error: (err) => {
        console.error('Error en el inicio de sesión:', err.message);
        if (err.status === 401) {
          this.showSnackBar('El correo o la contraseña son incorrectos');
        }
        else if (err.status === 403) {
          this.showSnackBar('El usuario no está autorizado');
        }
        else if (err.status === 500) {
          this.showSnackBar('El usuario no está verificado');
        }
        else {
          this.showSnackBar('Error en el inicio de sesión '+ err.status);
        }
      },
    });
  }

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
    });
  }
}
