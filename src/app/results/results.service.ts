import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EvaluationResult } from '../models/evaluation-result';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  getResult(): Observable<EvaluationResult> {
    const mockResult: EvaluationResult = {
      evaluatedAt: new Date().toISOString(),
      type: 'Inicial',
      cefrLevel: 'B1',
      vocabularyScore: '75',
      grammarScore: '70',
      conventionsScore: '80',
      sintaxScore: '78',
      cohesionScore: '72',
      phraseologyScore: '74',
      overallScore: '75'
    };

    return of(mockResult).pipe(delay(800)); // simula carga desde backend
  }
}
