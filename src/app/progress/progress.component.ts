import { Component, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { ProgressService } from './progress.service';
import { QuestionsTableComponent } from '../charts/questions-table/questions-table.component';
import { AdvPieChartComponent } from "../charts/adv-pie-chart/adv-pie-chart.component";
import { ProgressDashboardResponseDTO } from '../models/model-charts';
import { RadarChartComponent } from '../charts/radar-chart/radar-chart.component';
import { GroupedBarChartComponent } from '../charts/grouped-bar-chart/grouped-bar-chart.component';
import { LineChartComponent } from '../charts/line-chart/line-chart.component';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeatMapCalendarComponent } from '../charts/heat-map-calendar/heat-map-calendar.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-progress',
  imports: [MainHeaderComponent, QuestionsTableComponent, AdvPieChartComponent,
            GroupedBarChartComponent,LineChartComponent,RouterModule,RouterLink,
            MatIcon,CommonModule,MatTooltipModule,HeatMapCalendarComponent],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {
  displayedColumns: string[] = [];
  dashboard!: ProgressDashboardResponseDTO;
  allBadges = [
    { name: 'Completionist', img: 'assets/badges/completionist.png',description: 'Complete all tasks in a category' },
    { name: 'Streak Master', img: 'assets/badges/streak.png',description: 'Complete all tasks in a category' }, 
    { name: 'Grammar Pro', img: 'assets/badges/grammar.png',description: 'Complete all tasks in a category' },
  ];

  constructor(
      private progressService: ProgressService,
    ) {}
  
    ngOnInit(): void {
      this.loadDashboard();
    }

    private loadDashboard() {
    this.progressService.getDashboardData().subscribe({
      next: (response) => {
        this.dashboard = response;
        this.setDisplayedColumns();
        console.log('Dashboard loaded successfully:', this.dashboard);
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
      }
    });
  }

    private loadDashboard2() {
    //hacemos un mock
    this.dashboard = {
      kpiUserLevel: { label: 'Current level', value: 'B2' },
      kpiUserElo: { label: 'Current ELO', value: '1300' },
      kpiUserMaxStreak: { label: 'Highest Streak', value: '5 days' },
      kpiUserCurrentStreak: { label: 'Current Streak', value: '3 days' },
      responseHistory: [
        {
          answeredAt: '2025-06-01T10:30:00Z',
          questionId: 'q101',
          prompt: 'Translate the following sentence: "She is reading a book."',
          skill: 'translation',
          questionType: 'open-ended',
          questionElo: '1320',
          userAnswer: 'Ella está leyendo un libro.',
          correct: 'true'
        },
        {
          answeredAt: '2025-06-02T14:15:00Z',
          questionId: 'q102',
          prompt: 'Choose the correct past form of the verb "go".',
          skill: 'grammar',
          questionType: 'multiple-choice',
          questionElo: '1280',
          userAnswer: 'went',
          correct: 'true'
        },
        {
          answeredAt: '2025-06-03T09:45:00Z',
          questionId: 'q103',
          prompt: 'Fill in the blank: "They ___ to the cinema yesterday."',
          skill: 'grammar',
          questionType: 'fill-in-the-blank',
          questionElo: '1350',
          userAnswer: 'go',
          correct: 'false'
        }
      ],
      correctAnswersProportion: [
        { name: 'Correctas', value: 18 },
        { name: 'Incorrectas', value: 7 }
      ],
      eloProgressOverTime: [{
        name: "ELO",
        series: [
          { name: "16-06-2025", value: 10 },
          { name: "17-06-2025", value: 5 },
          { name: "18-06-2025", value: 3 },
          { name: "19-06-2025", value: 10 },
          { name: "20-06-2025", value: 5 },
          { name: "21-06-2025", value: 3 },
          { name: "22-06-2025", value: 5 },
          { name: "23-06-2025", value: 3 },
          { name: "24-06-2025", value: 5 },
          { name: "25-06-2025", value: 3 },
          { name: "26-06-2025", value: 5 },
          { name: "27-06-2025", value: 3 }
        ]
      }
      ],
      scoreComparison: [
        { name: 'a',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
        { name: 'b',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
        { name: 'c',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
        { name: 'd',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
        { name: 'e',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
        { name: 'f',
          series: [
            { name: 'first test', value: 1 },
            { name: 'last test', value: 5 },
          ]
        },
      ],
      activityCalendar: [
        { name: '2025-06-01', value: 2 },
        { name: '2025-06-02', value: 3 },
        { name: '2025-06-03', value: 1 },
        { name: '2025-06-04', value: 4 },
        { name: '2025-06-05', value: 2 }
      ]
      
    };
  }
  

  setDisplayedColumns() {
    this.displayedColumns = [
      'answeredAt', 'prompt', 'questionType', 'skill', 'questionElo','userAnswer','correct'
    ];
  }

  getVisibleBadges() {
  // Por ejemplo, máximo 3 en desktop
    return this.allBadges.slice(0, 3);
  } 

  openBadgesModal() {}


}

