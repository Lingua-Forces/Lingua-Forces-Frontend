import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EvalService } from '../eval/eval.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlacementCompletedGuard implements CanActivate {
  constructor(private evalService: EvalService, private router: Router) {}
  
  
  canActivate(): Observable<boolean> {
    return this.evalService.hasCompletedPlacement().pipe(
      map(res => {
        if (res) {
          return true;
        } else {
          this.router.navigate(['/eval']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/eval']);
        return of(false);
      })
    );
  }
}