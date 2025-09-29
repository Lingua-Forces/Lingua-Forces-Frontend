import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLottieOptions } from 'ngx-lottie';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideLottieOptions({
      player: () => player, // Aquí enlazamos con lottie-web
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
