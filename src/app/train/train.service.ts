import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private readonly baseUrl = `${environment.apiUrl}/training`;
  constructor(private http: HttpClient) { }
  getQuestion(){
    return this.http.get<Question>(`${this.baseUrl}/getQuestion`);
  }
  sendAnswer(p0: { questionId: string; selectedOption: string; }): Observable<void>
  {
    return this.http.post<void>(`${this.baseUrl}/sendAnswer`, p0);
  }
}
