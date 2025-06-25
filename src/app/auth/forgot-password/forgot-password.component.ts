import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';
import { VerificationRequest } from '../../models/verification-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UtilsService } from '../../shared/utils/utils.service';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule, FormsModule,ReactiveFormsModule, NgIf, FooterComponent, AuthHeaderComponent ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./../auth.module.scss'],
})
export class ForgotPasswordComponent{
  form: FormGroup;
  private baseUrl: string = environment.apiUrl;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private signUpService: SignUpService 
  ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendForgotPasswordEmail() {
    if (this.form.invalid) { return; }
    const body: VerificationRequest = this.form.value as VerificationRequest;
    // console.log('Se envió correo de verificación a la dirección:', body.email); // eliminar esta línea en producción
    this.http.post(`${this.baseUrl}/auth/forgot-password`, body).subscribe({
      next: (response) => {
        console.log("Correo de verificacion enviado exitosamente:", response);
        this.utils.showSnackBar('Correo de verificación enviado exitosamente');
      },
      error: (error) => {
        console.error('Error al enviar el correo de verificación:', error);
        this.utils.showSnackBar('El correo electrónico no está registrado');
      }
    })
  }
  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }
}
