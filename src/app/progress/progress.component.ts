import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import CalHeatmap from 'cal-heatmap';

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements AfterViewInit {
  @ViewChild('heatmapContainer', { static: true }) heatmapRef!: ElementRef;

  ngAfterViewInit(): void {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1); // enero
    const data = [];

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      data.push({
        date: d.toISOString().split('T')[0],
        value: Math.floor(Math.random() * 5)
      });
    }

    const cal = new CalHeatmap();
    cal.paint({
      itemSelector: this.heatmapRef.nativeElement,
      range: 12,
      date: { start: start },
      domain: { type: 'month' },
      subDomain: { type: 'day' },
      data: {
        type: 'json',
        source: data,
        x: 'date',
        y: 'value'
      },
      scale: {
        color: {
          type: 'linear',
          scheme: 'greens',
          domain: [0, 4]
        }
      },
      tooltip: {
        enabled: true,
        text: (date: Date, value: number | null) =>
          `${date.toDateString()}: ${value ?? 0} ejercicios`
      }
    });
  }
}
