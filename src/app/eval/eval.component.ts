import { Component, OnInit } from '@angular/core';
import { EvalService } from './eval.service';
import { Question } from '../models/question';
import { EvalResponse } from '../models/eval-response';
import { EvaluationResult } from '../models/evaluation-result';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-eval',
  standalone: true,
  templateUrl: './eval.component.html',
  styleUrl: './eval.component.scss',
  imports: [MainHeaderComponent, FormsModule, CommonModule, LottieComponent]
})
export class EvalComponent implements OnInit {
  questions: Question[] = [];
  currentIndex = 0;
  answers: EvalResponse[] = [];
  currentAnswer = '';
  robotMessage = "¡Hola! Soy tu asistente IA. Responde las preguntas con calma 😊";
  robotMessages: string[] = [
    "¡Sigue así! Yo, como tu asistente IA 🤖, analizaré tus respuestas 🚀",
    "Recuerda escribir con calma y claridad ✍️. Una IA evaluará tu nivel.",
    "¡Muy bien! Estoy registrando tus respuestas para evaluarlas con IA ⭐",
    "No te preocupes por los errores 💡, la IA entiende tu progreso.",
    "¡Excelente! Tu esfuerzo será valorado por mi motor de IA 💪",
    "Cada respuesta me ayuda a calcular tu nivel real de inglés con IA 🌍",
    "¡Vamos! Estoy usando IA para darte una evaluación justa 😃",
    "Tómate tu tiempo ⏳, yo como IA analizaré la calidad de tu respuesta.",
    "¡Muy bien! Tu desempeño está siendo evaluado automáticamente con IA 👏",
    "Recuerda: lo importante es expresarte 😉. La IA te dará un nivel preciso."
  ];
  

  loadingAnimation: AnimationOptions = {
    path: '/assets/lottie/bot.json', // tu archivo en assets
    loop: true,
    autoplay: true,
  };
  constructor(private evalService: EvalService, private router: Router) {}

  ngOnInit(): void {
    this.evalService.getQuestions().subscribe((qs) => {
      this.questions = qs;
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
    if(this.currentIndex < this.questions.length){
      this.robotMessage = this.robotMessages[Math.floor(Math.random() * this.robotMessages.length)];
    }
    if (this.currentIndex >= this.questions.length) {
      this.submit();
    }
  }

  submit() {
    this.evalService.submitResponses(this.answers).subscribe((result: EvaluationResult) => {
      this.evalService.cacheResult(result);
      this.router.navigate(['/results']);
    });
  }
}
