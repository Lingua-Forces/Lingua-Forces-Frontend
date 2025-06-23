import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input() label!: string;
  @Input() value!: number | string;
}