import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-adv-pie-chart',
  imports: [NgxChartsModule,CommonModule],
  templateUrl: './adv-pie-chart.component.html',
  styleUrl: './adv-pie-chart.component.scss'
})
export class AdvPieChartComponent {
  @Input() data: { name: string; value: number }[] = [];
  @Input() title: string = '';
  @Input() view: [number, number] = [400, 150];
  @Input() colorScheme: Color = {
    name: 'pieScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25']
  };

    onSelect(event: any) {
    console.log('Seleccionado:', event);
  }

  onActivate(event: any) {
    console.log('Activado:', event);
  }

  onDeactivate(event: any) {
    console.log('Desactivado:', event);
  }
}
