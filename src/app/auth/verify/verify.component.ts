import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { AuthHeaderComponent } from '../../shared/auth-header/auth-header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { UtilsService } from '../../shared/utils/utils.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './../auth.module.scss',
  imports: [RouterModule, AuthHeaderComponent, FooterComponent],
})
export class VerifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private signUpService: SignUpService,
    private router: Router,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams['token'];
    console.log('Token:', token);

    if (token) {
      this.signUpService.verify(token).subscribe({
        next: (response) => {
          console.log('Verificación exitosa:', response);
          localStorage.removeItem('signupEmail');
          this.router.navigate(['eval']);
          this.utils.showSnackBar('Verificación exitosa');

        },
        error: (error) => {
          console.error('Error en la verificación:', error);
          this.utils.showSnackBar('Error en la verificación');
        }
      }
      );
    } else {
      console.error('Token no encontrado en la URL');

    }
  }

  resendVerification(): void {
    const email = localStorage.getItem('signupEmail');

    if (!email) {
      this.utils.showSnackBar('No se encontró un correo electrónico para reenviar la verificación');
      return;
    }

    this.signUpService.resendVerificationEmail({ email }).subscribe({
      next: () => {
        this.utils.showSnackBar('Correo de verificación reenviado');
      },
      error: (error) => {
        console.error('Error al reenviar correo:', error);
        this.utils.showSnackBar('Error al reenviar el correo de verificación');
      }
    });
  }


}
