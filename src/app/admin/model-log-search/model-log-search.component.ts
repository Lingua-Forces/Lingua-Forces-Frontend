import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-model-log-search',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, 
    MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatIconModule,CommonModule ],
  templateUrl: './model-log-search.component.html',
  styleUrl: './model-log-search.component.scss',
  standalone: true
})
export class ModelLogSearchComponent {
  @Input() userIds: string[] = [];
  @Output() search = new EventEmitter<any>();

  form: FormGroup;

  modelTypes = [
    { value: 'nlp', label: 'NLP' },
    { value: 'rl', label: 'RL' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      modelType: [],
      userId: [],
      dateRange: [[]]
    });
  }
  ngOnInit() {
  this.form = this.fb.group({
    modelType: [null, Validators.required],
    userId:    [null, Validators.required],
    dateRange: this.fb.group({
      start: [null, Validators.required],
      end:   [null, Validators.required]
    })
  });
}

onSearch() {
  if (this.form.invalid) return;

  const { modelType, userId, dateRange } = this.form.value;
  this.search.emit({
    modelType,
    userId,
    startDate: dateRange.start,
    endDate:   dateRange.end
  });
}
}
