import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Question } from '../models/question';
import { EvalResponse } from '../models/eval-response';
import { EvaluationResult } from '../models/evaluation-result';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  private readonly baseUrl = `${environment.apiUrl}/eval/placement`;
  private latestResult: EvaluationResult | null = null;

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/getQuestions`);
  }

  submitResponses(answers: EvalResponse[]): Observable<EvaluationResult> {
    return this.http.post<EvaluationResult>(`${this.baseUrl}/evaluate`, answers).pipe(
      tap(result => this.latestResult = result)
    );
  }

  getLatestResult(): EvaluationResult | null {
    return this.latestResult;
  }

  cacheResult(result: EvaluationResult): void {
    this.latestResult = result;
  }
  getQuestions2(): Observable<Question[]> {
    const mockQuestions: Question[] = [
      {
        id: '1',
        prompt: 'What are your goals for learning English?',
        type: 'free_text',
        skill: 'writing',
        level: 'A2',
        elo: 1000,
        options: [],
        readingText: '',
        questions: []
      },
      {
        id: '2',
        prompt: 'Describe your daily routine in English.',
        type: 'free_text',
        skill: 'writing',
        level: 'A2',
        elo: 1000,
        options: [],
        readingText: '',
        questions: []
      }
    ];

    return of(mockQuestions).pipe(delay(500));
  }
}
