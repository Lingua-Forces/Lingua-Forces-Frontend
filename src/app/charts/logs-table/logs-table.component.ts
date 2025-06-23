import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ModelExecutionLog } from '../../models/model-charts';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-logs-table',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,CommonModule],
  templateUrl: './logs-table.component.html',
  styleUrl: './logs-table.component.scss'
})
export class LogsTableComponent implements AfterViewInit {
  @Input() logs: ModelExecutionLog[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() selectedModelType: string | null = null;
  dataSource = new MatTableDataSource<ModelExecutionLog>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.logs || [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}