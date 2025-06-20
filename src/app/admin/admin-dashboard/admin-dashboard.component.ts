import { Component, model, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../../shared/admin-header/admin-header.component';
import { ModelLogSearchComponent } from '../model-log-search/model-log-search.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { KpiCardComponent } from '../../charts/kpi-card/kpi-card.component';
import { AdminDashboardResponseDTO } from '../../models/model-charts';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from '../../charts/line-chart/line-chart.component';
import { GroupedBarChartComponent } from '../../charts/grouped-bar-chart/grouped-bar-chart.component';
import { LogsTableComponent } from '../../charts/logs-table/logs-table.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminHeaderComponent,ModelLogSearchComponent,MatFormFieldModule, 
            MatInputModule, MatButtonModule, ReactiveFormsModule, 
            MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatIconModule,
            KpiCardComponent,CommonModule, LineChartComponent, LogsTableComponent,
            GroupedBarChartComponent,MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = [];
  userIds: string[] = [];
  dashboard!: AdminDashboardResponseDTO;
  hasSearched = false;  
  selectedModelType: string | null = null;

  constructor(
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.getUsersIds();
  }

  onSearch(filters: any) {
    this.selectedModelType = filters.modelType;
    this.hasSearched = true;
    this.setDisplayedColumns();   
    this.loadDashboard(filters);     
  }

  getUsersIds() : void {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        this.userIds = response.userIds || [];
      },
      error: (error) => {
        console.error('Error fetching user IDs:', error);
      }
    });
  }

  private loadDashboard2(filters: any) {
    //hacemos un mock
    this.dashboard = {
      kpiTotalExecutions: { label: 'Total de ejecuciones en el mes', value: "1000" },
      kpiDailyAverage: { label: 'Promedio de ejecuciones por día', value: "10" },
      kpiAvgInferenceTime: { label: 'Promedio de tiempo de ejecucion', value: "500 ms" },
      executionsOverTime: [{
        name: 'Ejecuciones',
        series: [
          { name: '2025-06-01', value: 5 },
          { name: '2025-06-02', value: 8 },
          { name: '2025-06-03', value: 6 },
          { name: '2025-06-04', value: 12 },
          { name: '2025-06-05', value: 9 },
          { name: '2025-06-06', value: 15 },
          { name: '2025-06-07', value: 11 },
          { name: '2025-06-08', value: 14 }
        ]
      }
      ],
      scoreDistributionByCriterion: [
      {
        name: 'a',
        series: [
          { name: '1', value: 2 },
          { name: '2', value: 5 },
          { name: '3', value: 8 },
          { name: '4', value: 4 },
          { name: '5', value: 1 }
        ]
      },
      {
        name: 'b',
        series: [
          { name: '1', value: 1 },
          { name: '2', value: 3 },
          { name: '3', value: 7 },
          { name: '4', value: 6 },
          { name: '5', value: 2 }
        ]
      },
      {
        name: 'c',
        series: [
          { name: '1', value: 2 },
          { name: '2', value: 5 },
          { name: '3', value: 8 },
          { name: '4', value: 4 },
          { name: '5', value: 1 }
        ]
      },
      {
        name: 'd',
        series: [
          { name: '1', value: 1 },
          { name: '2', value: 3 },
          { name: '3', value: 7 },
          { name: '4', value: 6 },
          { name: '5', value: 2 }
        ]
      },
      {
        name: 'e',
        series: [
          { name: '1', value: 2 },
          { name: '2', value: 5 },
          { name: '3', value: 8 },
          { name: '4', value: 4 },
          { name: '5', value: 1 }
        ]
      },
      {
        name: 'f',
        series: [
          { name: '1', value: 1 },
          { name: '2', value: 3 },
          { name: '3', value: 7 },
          { name: '4', value: 6 },
          { name: '5', value: 2 }
        ]
      }
      ],
      avgScoreByCriterion: [
      {
        name: 'a',
        series: [
          { name: 'avg', value: 2 },
        ]
      },
      {
        name: 'b',
        series: [
          { name: 'avg', value: 1 },
        ]
      },
      {
        name: 'c',
        series: [
          { name: 'avg', value: 2.5 },
        ]
      },
      {
        name: 'd',
        series: [
          { name: 'avg', value: 4 },
        ]
      },
      {
        name: 'e',
        series: [
          { name: 'avg', value: 2.5 },
        ]
      },
      {
        name: 'f',
        series: [
          { name: 'avg', value: 1 },
        ]
      }
      ],
      eloProgressOverTime: [
    {
      name: "ELO usuario",
      series: [
        { name: "1", value: 1400 },
        { name: "2", value: 1410 },
        { name: "3", value: 1420 },
        { name: "4", value: 1430 },
        { name: "5", value: 1440 },
        { name: "6", value: 1450 }
      ]
    },
    {
      name: "ELO pregunta",
      series: [
        { name: "1", value: 1200 },
        { name: "2", value: 1300 },
        { name: "3", value: 1350 },
        { name: "4", value: 1400 },
        { name: "5", value: 1420 },
        { name: "6", value: 1440 }
      ]
    }
  ],
  successRateByEloDiff: [
    {
      name: "% acierto por diferencial",
      series: [
        { name: "-300", value: 20.0 },
        { name: "-200", value: 30.0 },
        { name: "-100", value: 45.0 },
        { name: "0",    value: 60.0 },
        { name: "100",  value: 75.0 },
        { name: "200",  value: 85.0 },
        { name: "300",  value: 90.0 }
      ]
    }
  ],
      lastExecutions: [
        {
          timestamp: '2025-06-01T12:00:00Z',
          userId: 'user1',
          modelName: 'Model A',
          modelVersion: 'v1.0',
          modelType: 'nlp',
          inputText: 'Sample input text',
          predictedScores: [0.8, 0.9, 0.85],
          inferenceTimeMs: 200
        }
        ,
        {
          timestamp: '2025-06-02T12:00:00Z',
          userId: 'user2',
          modelName: 'Model B',
          modelVersion: 'v1.1',
          modelType: 'rl',
          eloQuestionPrev: 1500,
          resultPrev: 1,
          eloQuestionNext: 1520,
          inferenceTimeMs: 250
        }
      ]
    };
  }


  private loadDashboard(filters: any) {
    this.adminService.getDashboardData(filters).subscribe({
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


  setDisplayedColumns() {
  if (this.selectedModelType === 'nlp') {
    this.displayedColumns = [
      'timestamp', 'userId', 'modelName', 'modelVersion', 'inputText', 'predictedScores', 'inferenceTimeMs'
    ];
  } else if (this.selectedModelType === 'rl') {
    this.displayedColumns = [
      'timestamp', 'userId', 'modelName', 'modelVersion', 'eloQuestionPrev', 'resultPrev', 'eloQuestionNext','inferenceTimeMs'
    ];
  } else {
    // Default (por si acaso)
    this.displayedColumns = [
      'date', 'userId', 'modelName', 'modelVersion', 'inferenceTimeMs'
    ];
  }
}


}
