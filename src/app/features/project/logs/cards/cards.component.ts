import { Component, Input, inject } from '@angular/core';
import { WorkLogResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormatDateService } from '../../../../shared/utils/format-date.service';
import { TruncatePipe } from '../../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    TruncatePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-DE'
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() workLog!: WorkLogResponse

  formatDateService = inject(FormatDateService)
}
