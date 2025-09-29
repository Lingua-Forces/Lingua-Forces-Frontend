import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { UserResponseDTO } from '../../models/model-charts';

@Component({
  selector: 'app-questions-table',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,CommonModule],
  templateUrl: './questions-table.component.html',
  styleUrl: './questions-table.component.scss'
})
export class QuestionsTableComponent implements AfterViewInit {
  @Input() questions: UserResponseDTO[] = [];
  @Input() displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<UserResponseDTO>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges() {
    this.dataSource.data = this.questions || [];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
