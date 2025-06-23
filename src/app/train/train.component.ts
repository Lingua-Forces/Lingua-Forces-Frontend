import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { TrainService } from './train.service';
import { Question, RlModelLog } from '../models/question';
import { UserAnswer } from '../models/user-answer';
import { Option } from '../models/option';
import { TrainingResponse } from '../models/training-response';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { StatsResponse } from '../models/stats-response';

@Component({
  selector: 'app-train',
  standalone: true,
  templateUrl: './train.component.html',
  styleUrl: './train.component.scss',
  imports: [MainHeaderComponent, FormsModule, CommonModule, MatButtonModule, MatDialogModule],
})
export class TrainComponent implements OnInit {

  currentQuestion: Question | null = null;
  currentIndex: number = 0;
  selectedOption: string = '';
  selectedKey: string = '';
  userElo: number = 0;
  hasSubmitted = false;
  userStreak: number = 0;
  trainingResponse: TrainingResponse | null = null;
  @ViewChild('resultDialog') resultDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;


  constructor(private trainService: TrainService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    // obtener elo del usuario inicial
    this.getUserElo();
    console.log('ELO del usuario al iniciar:', this.userElo);
    this.fetchQuestion();
  }
  fetchQuestion(): void {
    this.trainService.getQuestion().subscribe({
      next: (question: Question) => {
        console.log('Pregunta recibida:', question);
        this.currentQuestion = question;
        console.log('Pregunta cargada:', question);
      },
      error: (err: any) => {
        console.error('Error al cargar pregunta', err);
      }
    });
  }
  nextQuestion(): void {
    this.fetchQuestion();
    this.hasSubmitted = false;
  }
  submitAnswer(): void {
    if (!this.selectedKey || !this.currentQuestion|| !this.currentQuestion.rlModelLog) return;

    this.trainService.submitAnswer({
      id: this.currentQuestion.id,
      key: this.selectedKey,
      rlModelLog: this.currentQuestion.rlModelLog 
    }).subscribe({
      next: (response) => {
        this.trainingResponse = response;
        this.userElo = response.currentElo;
        this.userStreak = Math.max(0, response.currentStreak);
        this.openResultModal();
        this.selectedKey = '';
        this.selectedOption = '';
      },
      error: (err) => console.error(err)
    });
  }

  openResultModal(): void {
    this.dialogRef = this.dialog.open(this.resultDialog, {
      panelClass: 'custom-result-dialog'
    });
  }

  closeResultModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  onOptionChange(option: Option): void {
    this.selectedOption = option.text;
    this.selectedKey = option.key;
  }
  getColorForRange(range: number): string {
    const colors = ['#A8E6CF', '#56C596', '#FFD93D', '#FF9F1C', '#FF6B6B', '#355C7D'];
    return colors[Math.floor(range / 500)] || '#ccc';
  }

  getUserElo(): void {
    this.trainService.getStats().subscribe({
      next: (stats: StatsResponse) => {
        this.userElo = stats.currentElo;
      },
      error: (err: any) => {
        console.error('Error al obtener el ELO del usuario', err);
      }
    });
  }

}
