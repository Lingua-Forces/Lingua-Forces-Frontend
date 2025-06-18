import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  /**
   * Intercepts HTTP requests to add an Authorization header if a token is available.
   * If a 403 error occurs, it logs out the user and redirects to the login page.
   *
   * @param request The outgoing HTTP request.
   * @param next The next handler in the chain.
   * @returns An observable of the HTTP event stream.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excluded = ['/login', '/register', '/verify', '/reset-password', 'forgotPassword'].some(url => request.url.includes(url));
    
    if (excluded) {
      return next.handle(request);
    }

    const token = this.authService.auth()?.token;
    let $response;
    if(token){
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      $response = next.handle(clonedRequest);
    }
    else {
      $response = next.handle(request);
    }
    return $response
      .pipe(tap({
        error: error => {
          if( error instanceof HttpErrorResponse && error.status === 403) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      }));
  }
}