import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Question } from '../models/question';
import { EvalResponse } from '../models/eval-response';
import { EvaluationResult } from '../models/evaluation-result';
import { environment } from '../../environments/environment';
import { ReevaluationEnabled } from '../models/reevaluation-enabled';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  private readonly baseUrl = `${environment.apiUrl}/eval/`;
  private latestResult: EvaluationResult | null = null;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}placement/getQuestions`);
  }

  submitResponses(answers: EvalResponse[]): Observable<EvaluationResult> {
    return this.http.post<EvaluationResult>(`${this.baseUrl}placement/evaluate`, answers).pipe(
      tap(result => this.latestResult = result)
    );
  }
  canReevaluate(): Observable<ReevaluationEnabled> {
    return this.http.get<ReevaluationEnabled>(`${this.baseUrl}reevaluation/canReevaluate`)
  }

  hasCompletedPlacement(): Observable<{ completed: boolean }> {
    return this.http.get<{ completed: boolean }>(`${environment.apiUrl}/stats/placement/status`);
  }

  getReevaluationQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}reevaluation/getQuestions`);
  }

  reevaluate(answers: EvalResponse[]): Observable<EvaluationResult> {
    return this.http.post<EvaluationResult>(`${this.baseUrl}reevaluation/evaluate`, answers).pipe(
      tap(result => this.latestResult = result)
    );
  }

  getLatestResult(): EvaluationResult | null {
    return this.latestResult;
  }

  cacheResult(result: EvaluationResult): void {
    this.latestResult = result;
  }

}
