import {
  CommonModule,
  DatePipe,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractSummaryWidget } from '../models/abstract-summary-widget';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-summary-two',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    NgTemplateOutlet,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './summary-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryTwoComponent extends AbstractSummaryWidget {}
