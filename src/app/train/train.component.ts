import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { TrainService } from './train.service'; // lo debes crear
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
  selectedOption: string = '';
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
        this.currentQuestion = question;
        this.selectedOption = '';
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error al cargar pregunta', err);
        this.isLoading = false;
      }
    });
  }

  submitAnswer(): void {
    if (!this.selectedOption || !this.currentQuestion) return;

    this.trainService.sendAnswer({
      questionId: this.currentQuestion.id,
      selectedOption: this.selectedOption
    }).subscribe({
      next: () => {
        this.currentIndex++;
        if (this.currentIndex < this.MAX_QUESTIONS) {
          this.fetchQuestion();
        } else {
          this.router.navigate(['/train/result']);
        }
      },
      error: (err: any) => {
        console.error('Error al enviar respuesta', err);
      }
    });
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
