import { Component, OnInit } from '@angular/core';
import { EvalService } from './eval.service';
import { Question } from '../models/question';
import { EvalResponse } from '../models/eval-response';
import { EvaluationResult } from '../models/evaluation-result';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReevaluationEnabled } from '../models/reevaluation-enabled';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-eval',
  standalone: true,
  templateUrl: './eval.component.html',
  styleUrl: './eval.component.scss',
  imports: [MainHeaderComponent, FormsModule, CommonModule, MatProgressSpinnerModule]
})
export class EvalComponent implements OnInit {
  questions: Question[] = [];
  currentIndex = 0;
  answers: EvalResponse[] = [];
  currentAnswer = '';
  isReevaluation = false;

  constructor(private evalService: EvalService, private router: Router) {}

  ngOnInit(): void {
    this.evalService.canReevaluate().subscribe({
      next: (res: ReevaluationEnabled) => {
        this.isReevaluation = res.enabled;
        console.log('Reevaluation enabled:', this.isReevaluation);
        if (this.isReevaluation) {
          this.evalService.getReevaluationQuestions().subscribe((qs) => {
            this.questions = qs;
          });
        } else {
          this.evalService.getQuestions().subscribe((qs) => {
            this.questions = qs;
          });
        }
      },
      error: () => {
        this.evalService.getQuestions().subscribe((qs) => {
          this.questions = qs;
        });
      }
    });
  }

  get currentQuestion(): Question | null {
    return this.questions[this.currentIndex] ?? null;
  }

  nextQuestion() {
    if (!this.currentQuestion) return;

    this.answers.push({
      questionId: this.currentQuestion.id,
      userAnswer: this.currentAnswer.trim()
    });

    this.currentAnswer = '';
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.submit();
    }
  }

  submit() {
    if (this.isReevaluation) {
      // Reevaluación
      this.evalService.reevaluate(this.answers).subscribe((result: EvaluationResult) => {
        this.evalService.cacheResult(result);
        this.router.navigate(['/results']);
      });
    } else {
      // Placement
      this.evalService.submitResponses(this.answers).subscribe((result: EvaluationResult) => {
        this.evalService.cacheResult(result);
        this.router.navigate(['/results']);
      });
    }
  }
}