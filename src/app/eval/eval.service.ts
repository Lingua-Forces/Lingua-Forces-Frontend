// eval.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../models/question';
import { EvalResponse } from '../models/eval-response';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  getQuestions(): Observable<Question[]> {
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

  submitResponses(responses: EvalResponse[]) {
    console.log('Respuestas enviadas:', responses);
    return of({ success: true }).pipe(delay(500));
  }
}
