import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VerificationRequest } from '../../models/verification-request';
import { UserProfile } from '../../models/user-profile';
import { RegisterRequest } from '../../models/register-request';
import { ResetPassRequest } from '../../models/reset-pass-request';
// import { ResetPassRequest } from '../interfaces/resetPassword-request.interface';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  signup(signupRequest: RegisterRequest) {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<UserProfile>(url, signupRequest);
  }

  verify(token: string): Observable<UserProfile> {
    let params = new HttpParams().set('token', token);
    return this.http.put<UserProfile>(this.baseUrl + '/auth/verify', null, { params });
  }
  
  resendVerificationEmail(body: VerificationRequest) {
    return this.http.post(`${this.baseUrl}/auth/resend-verification`, body);
  }

  changePassword(resetPassRequest: ResetPassRequest)   {
    return this.http.put(this.baseUrl+'/auth/reset-password', resetPassRequest,{ responseType: 'text' });
  }

  sendPasswordResetEmail(verificationRequest:VerificationRequest)  {
    return this.http.post(this.baseUrl+'/auth/forgot-password', verificationRequest,{ responseType: 'text' });
  }

}