import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EvalComponent } from './eval/eval.component';
import { authGuard } from './auth/auth.guard';
import { VerifyComponent } from './auth/verify/verify.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResultsComponent } from './results/results.component';
import { TrainComponent } from './train/train.component';
import { ProgressComponent } from './progress/progress.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'eval', component: EvalComponent, canActivate: [authGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [authGuard] },
  { path: 'train', component: TrainComponent, canActivate: [authGuard] }, // Assuming EvalComponent is used for training as well
  { path: 'progress', component: ProgressComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
