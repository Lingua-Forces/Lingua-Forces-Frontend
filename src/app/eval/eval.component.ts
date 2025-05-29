import { Component, OnInit } from '@angular/core';
import { EvalService } from './eval.service';
import { EvalQuestion } from '../models/eval-question';
import { EvalResponse } from '../models/eval-response';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eval',
  standalone: true,
  templateUrl: './eval.component.html',
  styleUrl: './eval.component.scss',
  imports: [MainHeaderComponent, FormsModule, CommonModule]
})
export class EvalComponent implements OnInit {
  questions: EvalQuestion[] = [];
  currentIndex = 0;
  answers: EvalResponse[] = [];
  currentAnswer = '';

  constructor(private evalService: EvalService) {}

  ngOnInit(): void {
    this.evalService.getQuestions().subscribe((qs) => {
      this.questions = qs;
    });
  }

  get currentQuestion(): EvalQuestion | null {
    return this.questions[this.currentIndex] ?? null;
  }

  nextQuestion() {
    if (!this.currentQuestion) return;

    this.answers.push({
      questionId: this.currentQuestion.id,
      answer: this.currentAnswer.trim()
    });

    this.currentAnswer = '';
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.submit();
    }
  }

  submit() {
    this.evalService.submitResponses(this.answers).subscribe((res) => {
      alert('Respuestas enviadas correctamente.');
      // Redirigir a otra página o mostrar resumen, etc.
    });
  }
}
