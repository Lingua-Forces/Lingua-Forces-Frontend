import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../models/login-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';
import { UtilsService } from '../../shared/utils/utils.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule,ReactiveFormsModule, NgIf, FooterComponent, AuthHeaderComponent ],
  templateUrl: './login.component.html',
  styleUrls: ['./../auth.module.scss'],
})
export class LoginComponent implements OnInit {
  private readonly apiUrl = `${environment.apiUrl}/stats/placement/status`;
  form: FormGroup;
  showPassword = false;
  canTrain: boolean = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private utils: UtilsService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  const authData = this.authService.auth();
  if (authData) {
    if (authData.user?.role === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.checkPlacementStatus()
      if (!this.canTrain) {
        this.router.navigate(['/eval']);
      }
      else {
        this.router.navigate(['/train']);
      }
        

    }
  }
}

  login(): void {
    if (this.form.invalid) {
      return;
    }
    const credentials: LoginRequest = this.form.value as LoginRequest;

    this.authService.login(credentials).subscribe({
      next: (response) => {       
        this.utils.showSnackBar('Inicio de sesión exitoso');
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        }
        else{
          this.checkPlacementStatus()
          if (!this.canTrain) {
            this.router.navigate(['/eval']);
          }
          else {
            this.router.navigate(['/train']);
          }
        }
      },
      
      error: (err) => {
        console.error('Error en el inicio de sesión:', err.message);
        if (err.status === 401) {
          this.utils.showSnackBar('El correo o la contraseña son incorrectos');
        }
        else if (err.status === 403) {
          this.utils.showSnackBar('El usuario no está autorizado');
        }
        else if (err.status === 500) {
          this.utils.showSnackBar('El usuario no está verificado');
        }
        else {
          this.utils.showSnackBar('Error en el inicio de sesión '+ err.status);
        }
      },
    });
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

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

}
