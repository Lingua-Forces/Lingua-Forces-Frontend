import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EvaluationResult } from '../models/evaluation-result';
import { environment } from '../../environments/environment';
import { UsersId } from '../models/users-id';
import { AdminRequest } from '../models/admin-request';
import { AdminDashboardResponseDTO } from '../models/model-charts';
import { SimulationRequest } from '../models/simulation-request';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly baseUrl = `${environment.apiUrl}/admin`;
  private latestResult: EvaluationResult | null = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersId> {
    return this.http.get<UsersId>(`${this.baseUrl}/users`);
  }

  getDashboardData(request: AdminRequest): Observable<AdminDashboardResponseDTO> {
    const url = `${this.baseUrl}/dashboard`;
    return this.http.post<AdminDashboardResponseDTO>(url, request);
  }

  simulate(request: SimulationRequest): Observable<any> {
    const url = `${this.baseUrl}/simulate-training`;
    return this.http.post<any>(url, request);
  }
}
