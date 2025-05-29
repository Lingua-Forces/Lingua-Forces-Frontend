import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EvalQuestion } from '../models/eval-question';
import { EvalResponse } from '../models/eval-response';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  getQuestions(): Observable<EvalQuestion[]> {
    const mockQuestions: EvalQuestion[] = [
      { id: 1, question: 'What are your goals for learning English?' },
      { id: 2, question: 'Describe your daily routine in English.' },
      { id: 3, question: 'What do you like to do in your free time?' },
      { id: 4, question: 'Tell me about your family.' },
      { id: 5, question: 'Why do you want to improve your English?' }
    ];

    return of(mockQuestions).pipe(delay(500)); // simula carga desde backend
  }

  submitResponses(responses: EvalResponse[]) {
    console.log('Respuestas enviadas:', responses);
    // Aquí harías un POST real
    return of({ success: true }).pipe(delay(500));
  }
}
