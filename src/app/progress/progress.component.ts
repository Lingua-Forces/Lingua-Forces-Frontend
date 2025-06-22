import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import CalHeatmap from 'cal-heatmap';
import { MatCardModule } from '@angular/material/card';
import { MainHeaderComponent } from '../shared/main-header/main-header.component';
import { Badge } from '../models/badge';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  imports: [MainHeaderComponent, CommonModule, MatCardModule, MatDialogModule],
})
export class ProgressComponent implements AfterViewInit {
  @ViewChild('badgeDialog') badgeDialog!: TemplateRef<any>;

  @ViewChild('heatmapContainer', { static: true }) heatmapRef!: ElementRef;
  
  badges = [
    { name: 'Nivel A1', img: 'assets/images/badges/CEFR/A1.svg', description: "¡Llegaste al nivel A1!", nivel: 1 },
    this.createBadge('Fire', 1),
    this.createBadge('Bulb', 2),
    this.createBadge('Precision', 0),
  ];
  constructor(private dialog: MatDialog) {}
  
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
  createBadge(name: 'Fire' | 'Bulb' | 'Precision', nivel: number): Badge {
    const descriptions = {
      Fire: [
        'Tu viaje acaba de comenzar',
        'Buen ritmo de práctica',
        '¡Estás en llamas!',
        '🔥 Dominando los ejercicios'
      ],
      Bulb: [
        'Empieza a resolver problemas',
        '¡Resolviste 30 problemas!',
        'Eres una mente brillante. Resolviste 180 problemas',
        '🧠 Genio total. Resolviste 365 problemas'
      ],
      Precision: [
        'Comenzando con precisión',
        'Buen porcentaje de aciertos',
        'Precisión destacable',
        '🎯 ¡Casi perfecto!'
      ]
    };

    const maxNivel = descriptions[name].length - 1;
    const safeNivel = Math.min(nivel, maxNivel);

    return {
      name,
      nivel: safeNivel,
      description: descriptions[name][safeNivel],
      img: `assets/images/badges/${name}${safeNivel}.svg`
    };
  }

  openBadgeModal(badge: Badge): void {
    this.dialog.open(this.badgeDialog, {
      data: badge
    });
  }

}
