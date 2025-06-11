import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { Router } from '@angular/router';
import { EvaluationResult } from '../models/evaluation-result';
import { EvalService } from '../eval/eval.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, MainHeaderComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  result: EvaluationResult | null = null;

  constructor(private evalService: EvalService, private router: Router) {}

  ngOnInit(): void {
    this.result = this.evalService.getLatestResult();

    if (!this.result) {
      // Si no hay resultado cacheado, redirigimos al usuario a la evaluación
      this.router.navigate(['/eval']);
    }
  }
  getResult2(): Observable<EvaluationResult> {
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
    return of(mockResult);
  }
}