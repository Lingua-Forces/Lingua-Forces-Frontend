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
import { Badge } from '../models/badge';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-progress',
  imports: [MainHeaderComponent, QuestionsTableComponent, AdvPieChartComponent,
    GroupedBarChartComponent, LineChartComponent, RouterModule, RouterLink,
    MatIcon, CommonModule, MatTooltipModule, HeatMapCalendarComponent,
      MatDialogModule,
  MatButtonModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss'
})
export class ProgressComponent implements OnInit {
  displayedColumns: string[] = [];
  dashboard!: ProgressDashboardResponseDTO;
  test_text: string = "hi there";
  userBadges: Badge[] = [];

  @ViewChild('badgeModal') badgeModalTemplate!: TemplateRef<any>;

  constructor(
    private progressService: ProgressService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBadges();
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

  private loadBadges() {
    this.progressService.getBadges().subscribe({
      next: (badges) => {
        this.userBadges = badges;
        console.log('Badges loaded successfully:', this.userBadges);
        for (const badge of this.userBadges) {
          console.log(`Badge: ${badge.badgeName}, Image: ${badge.badgeImageUrl}, Description: ${badge.badgeDescription}`);
        }
      },
      error: (error) => {
        console.error('Error loading badges:', error);
      }
    })
  }

  setDisplayedColumns() {
    this.displayedColumns = [
      'answeredAt', 'prompt', 'questionType', 'skill', 'questionElo', 'userAnswer', 'correct'
    ];
  }

  getVisibleBadges() {
    // Por ejemplo, máximo 3 en desktop
    return this.userBadges;
  }

  hasDashboardData(): boolean {
    return !!this.dashboard && !!this.dashboard.kpiUserLevel;
  }

  hasBadges(): boolean {
    return this.userBadges && this.userBadges.length > 0;
  }

  hasCorrectAnswersData(): boolean {
    return !!this.dashboard?.correctAnswersProportion &&
      this.dashboard.correctAnswersProportion.length >= 2 &&
      this.dashboard.correctAnswersProportion[0]?.value > 0 &&
      this.dashboard.correctAnswersProportion[1]?.value > 0;
  }

  hasEloProgressData(): boolean {
    return !!this.dashboard?.eloProgressOverTime &&
      this.dashboard.eloProgressOverTime.length > 0 &&
      this.dashboard.eloProgressOverTime[0].series?.length > 0;
  }

  hasScoreComparisonData(): boolean {
    return !!this.dashboard?.scoreComparison &&
      this.dashboard.scoreComparison.length > 0 &&
      this.dashboard.scoreComparison[0].series?.length > 0;
  }

  hasActivityCalendar(): boolean {
    return !!this.dashboard?.activityCalendar && this.dashboard.activityCalendar.length > 0;
  }

  hasResponseHistory(): boolean {
    return !!this.dashboard?.responseHistory && this.dashboard.responseHistory.length > 0;
  }

  openBadgesModal(): void {
    this.dialog.open(this.badgeModalTemplate, {
      width: '600px',
      data: this.userBadges
    });
  }


}

