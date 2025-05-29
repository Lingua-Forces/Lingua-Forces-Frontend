import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';


import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';
import { environment } from '../../environments/environment';
import { UserProfile } from '../models/user-profile';


const authKey = 'study_auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private _auth = signal<LoginResponse | null>(null);

  auth = computed(() => this._auth());

  constructor() {
    const authString = localStorage.getItem(authKey);

    if (authString) {
      this._auth.set(JSON.parse(authString));
    }
  }

  login2(authRequest: LoginRequest) {
    // return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, authRequest)
    return this.http.post<LoginResponse>(`url/to/api/auth/login`, authRequest)
      .pipe(
        map(response => {
          localStorage.setItem(authKey, JSON.stringify(response));
          this._auth.set(response);
          return response.user;
        })
      );
  }
  login(authRequest: LoginRequest) {
    const mockUser = {
      email: 'saelcc03@gmail.com',
      password: '123456',
      firstname: 'samusito',
      lastname: 'el grande',
    };

    if (
      authRequest.email === mockUser.email &&
      authRequest.password === mockUser.password
    ) {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        user: {
          firstName: mockUser.firstname,
          lastName: mockUser.lastname,
          email: mockUser.email
        }
      };

      localStorage.setItem(authKey, JSON.stringify(mockResponse));
      this._auth.set(mockResponse);

      return of(mockResponse).pipe(delay(500), map(res => res.user));
    } else {
      return throwError(() => new Error('Credenciales inválidas'));
    }
  }


  register(registerRequest: RegisterRequest) {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http.post<UserProfile>(url, registerRequest);
  }

  
  logout() {
    localStorage.removeItem(authKey);
    //this._auth = undefined;
    this._auth.set(null);
  }



}
