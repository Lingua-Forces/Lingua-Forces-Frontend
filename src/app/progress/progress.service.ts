import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EvaluationResult } from '../models/evaluation-result';
import { environment } from '../../environments/environment';
import { ProgressDashboardResponseDTO } from '../models/model-charts';
import { Badge } from '../models/badge';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly baseUrl = `${environment.apiUrl}/stats`;
  private latestResult: EvaluationResult | null = null;

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<ProgressDashboardResponseDTO> {
    return this.http.get<ProgressDashboardResponseDTO>(`${this.baseUrl}/dashboard`);
  }

  getBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.baseUrl}/badges`);
  }
  
}
