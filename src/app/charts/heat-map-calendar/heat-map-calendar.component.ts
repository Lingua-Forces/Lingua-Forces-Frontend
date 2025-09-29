import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import CalHeatmap from 'cal-heatmap';
import Tooltip from 'cal-heatmap/plugins/Tooltip';
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Your locale
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData'; // This plugin provides weekdaysShort
dayjs.extend(weekday);
dayjs.extend(localeData);

@Component({
  selector: 'app-heat-map-calendar',
  imports: [CommonModule],
  templateUrl: './heat-map-calendar.component.html',
  styleUrl: './heat-map-calendar.component.scss',
  standalone: true
})
export class HeatMapCalendarComponent implements AfterViewInit {
  
  @ViewChild('heatmapContainer', { static: true }) heatmapRef!: ElementRef;
  @Input() title: string = 'Heat Map Calendar';
  @Input() data: { name: string; value: number }[] = [];
  ngAfterViewInit(): void {
      const start = dayjs().subtract(11, 'month').startOf('month').toDate();
      const cal = new CalHeatmap();
      cal.paint({
        itemSelector: this.heatmapRef.nativeElement,
        range: 12,
        date: { start: start },
        
        domain: { type: 'month', padding:[0, 0, 0, 0],gutter:4 },
        subDomain: { type: 'ghDay', label: '', width: 23, height: 23  },
        data: {
          type: 'json',
          source: this.data,
          x: 'name',
          y: 'value'
        },
        scale: {
          color: {
            type: 'linear',
            scheme: 'greens',
            domain: [0, 10]
          }
        },
      },
      [
        [
          Tooltip,
          {
            text: (date: Date, value: number | null,) =>
             `${dayjs(date).locale('es').format('DD MMM YYYY')}: ${value ?? 0} excercises`,
          }
        ],
        [
      CalendarLabel,
      {
        width: 30,
        textAlign: 'start',
        text: () => {const days = dayjs.weekdaysShort();      // ['dom','lun',…,'sáb']
          const start = 6;                         // índice de sábado
          return [...days.slice(start), ...days.slice(0, start)];

      } 
    }
    ],
      ]
    );
    }
  }