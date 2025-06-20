import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { TrainService } from './train.service';
import { Question } from '../models/question';

@Component({
  selector: 'app-train',
  standalone: true,
  templateUrl: './train.component.html',
  styleUrl: './train.component.scss',
  imports: [MainHeaderComponent, FormsModule, CommonModule],
})
export class TrainComponent implements OnInit {
  currentQuestion: Question | null = null;
  currentIndex: number = 0;
  selectedOptions: string[] = [];
  isLoading = true;
  MAX_QUESTIONS = 5;

  constructor(private trainService: TrainService, private router: Router) {}

  ngOnInit(): void {
    this.fetchQuestion();
  }

  fetchQuestion(): void {
    this.isLoading = true;
    this.trainService.getQuestion().subscribe({
      next: (question: Question) => {
        console.log('Pregunta recibida:', question);
        this.currentQuestion = question;
        // Inicializa el array de respuestas (una por cada pregunta embebida)
        this.selectedOptions = question.questions?.map(() => '') || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar pregunta', err);
        this.isLoading = false;
      }
    });
  }

 allAnswered(): boolean {
  return !!(
    this.currentQuestion &&
    this.currentQuestion.questions &&
    this.selectedOptions.length === this.currentQuestion.questions.length &&
    this.selectedOptions.every(opt => !!opt)
  );
}



  nextQuestion(): void {
    if (this.currentIndex < this.MAX_QUESTIONS - 1) {
      this.currentIndex++;
      this.fetchQuestion();
    } else {
      this.router.navigate(['/train/result']);
    }
  }
}
