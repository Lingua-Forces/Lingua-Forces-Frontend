import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { UserAnswer } from '../models/user-answer';
import { TrainingResponse } from '../models/training-response';
import { StatsResponse } from '../models/stats-response';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private readonly baseUrl = `${environment.apiUrl}/training`;
  constructor(private http: HttpClient) { }
  /*
  
  export interface Question {
    id: string;
    prompt: string;
    type: string;
    skill: string;
    level: string;
    elo: number;
    options?: Option[];
    readingText?: string;
  }
  */
  exampleQuestion: Question = {
    id: '1',
    prompt: 'What is the capital of France?',
    type: 'multiple-choice',
    skill: 'geography',
    level: 'beginner',
    elo: 100,
    options: [
      { key: 'A', text: 'Berlin' },
      { key: 'B', text: 'Madrid' },
    ],
    readingText: 'This is a sample reading text related to the question.' 
  }

  getQuestionExample(): Observable<Question>{
    return new Observable<Question>((observer) => {
      setTimeout(() => {
        observer.next(this.exampleQuestion);
        observer.complete();
      }
      , 1000); // Simula un retraso de 1 segundo
    });
  }
  getQuestion(){
    return this.http.get<Question>(`${this.baseUrl}/getQuestion`);
  }
  submitAnswer(userAnswer: UserAnswer): Observable<TrainingResponse>{
    return this.http.post<TrainingResponse>(`${this.baseUrl}/submitAnswer`, userAnswer);
  }
  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>( `${environment.apiUrl}/stats`);
  }
  getCorrectAnswer(question: Question): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/getCorrectAnswer/${question.id}`);
  }
}
