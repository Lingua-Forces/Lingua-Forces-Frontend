import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-radar-chart',
  imports: [NgxChartsModule],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss',
})
export class RadarChartComponent {
  @Input() data: { name: string; series: { name: string; value: number }[] }[] = [];
  @Input() title: string = '';
  @Input() xAxisLabel: string = 'X';
  @Input() yAxisLabel: string = 'Y';

}
