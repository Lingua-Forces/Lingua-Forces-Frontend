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
