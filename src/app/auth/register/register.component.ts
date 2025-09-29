import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';  // Para los inputs
import { MatFormFieldModule } from '@angular/material/form-field';  // Para los campos de formulario
import { SignUpService } from '../services/sign-up.service';
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UtilsService } from '../../shared/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../auth.module.scss'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, AuthHeaderComponent, FooterComponent ],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private router: Router,
    private utils: UtilsService 
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      lastName: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
    
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register(): void {
    if (this.form.invalid) {
      return;
    }
    const { firstName, lastName, email, password, confirmPassword } = this.form.value;

    const registerRequest = { firstName, lastName, email, password, confirmPassword };

    this.signUpService.signup(registerRequest).subscribe({
      next: (response) => {
        localStorage.setItem('signupEmail', email);
        this.utils.showSnackBar('Cuenta creada exitosamente. Verifica tu correo electrónico');
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        if (err.status === 409) {
          this.utils.showSnackBar('El correo electrónico ya está registrado');
        }
        else{
          this.utils.showSnackBar('Hubo un problema al crear la cuenta');
        }
        console.error(err);
      },
    });
  }

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

}
