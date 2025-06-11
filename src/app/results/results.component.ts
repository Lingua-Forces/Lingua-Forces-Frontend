import { Component, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { CommonModule } from '@angular/common';
import { EvaluationResult } from '../models/evaluation-result';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MainHeaderComponent, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent implements OnInit {
  result: EvaluationResult | null = null;

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.resultsService.getResult().subscribe((res) => {
      this.result = res;
    });
  }
}
