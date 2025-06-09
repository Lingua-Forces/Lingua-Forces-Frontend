import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPassRequest } from '../../models/reset-pass-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';
import { HttpClient } from '@angular/common/http';
import { SignUpService } from '../services/sign-up.service';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-reset-password',
  imports: [RouterModule, FormsModule,ReactiveFormsModule, NgIf, FooterComponent, AuthHeaderComponent ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./../auth.module.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  showPassword = false;
  baseUrl: any;
  token: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private signUpService: SignUpService,
    private utils: UtilsService
    
  ){
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }
  resetPassword(): void {
    if (this.form.invalid) { return; }
    const data: ResetPassRequest = {
      token: this.token!,
      newPassword: this.form.value.newPassword
    }
    this.signUpService.changePassword(data).subscribe({
      next: (response) => {
        this.utils.showSnackBar('Contraseña actualizada exitosamente');
        console.log('Contraseña actualizada exitosamente:', response);
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.error('Error al actualizar la contraseña:', error);
        this.utils.showSnackBar('Error al actualizar la contraseña');
      }
    });
    console.log('Tu nueva password bro:', data); // eliminar esta línea en producción

  }
  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }
}
