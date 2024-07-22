import { CommonModule, DatePipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractSummaryWidget } from '../models/abstract-summary-widget';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { filter, map } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-summary-one',
  standalone: true,
  imports: [NgIf, MatCardModule, MatChipsModule, NgTemplateOutlet, MatIcon, DatePipe],
  templateUrl: './summary-one.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryOneComponent extends AbstractSummaryWidget {
  
}
