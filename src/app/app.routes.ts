import { Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './auth/login/login.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
