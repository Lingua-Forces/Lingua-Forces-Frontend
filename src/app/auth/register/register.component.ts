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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [RouterModule,ReactiveFormsModule, CommonModule,MatFormFieldModule ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
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
        this.showSnackBar('Cuenta creada exitosamente');
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        this.showSnackBar('Hubo un problema al crear la cuenta');
        console.error(err);
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
