import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-grouped-bar-chart',
  imports: [NgxChartsModule],
  templateUrl: './grouped-bar-chart.component.html',
  styleUrl: './grouped-bar-chart.component.scss'
})
export class GroupedBarChartComponent {
  @Input() title: string = 'Gráfico de barras agrupadas';
  @Input() data: any[] = [];
  @Input() xAxisLabel: string = 'Criterio';
  @Input() yAxisLabel: string = 'Frecuencia';
  colorScheme = { domain: [
    '#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1f77b4',
    '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b',
    '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ]
 };
}
