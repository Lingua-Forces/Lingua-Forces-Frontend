import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';


import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from '../../environments/environment';


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

      login(authRequest: LoginRequest) {
        return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, authRequest)
          .pipe(
            map(response => {
              localStorage.setItem(authKey, JSON.stringify(response));
              this._auth.set(response);
              return response.user;
            })
          );
      }
    
  

  logout() {
    localStorage.removeItem(authKey);
    //this._auth = undefined;
    this._auth.set(null);
  }

}
