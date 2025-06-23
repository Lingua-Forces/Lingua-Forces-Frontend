import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  standalone: true
})
export class LineChartComponent {
  @Input() data: { name: string; series: { name: string; value: number }[] }[] = [];
  @Input() title: string = '';
  @Input() xAxisLabel: string = 'X';
  @Input() yAxisLabel: string = 'Y';
}
