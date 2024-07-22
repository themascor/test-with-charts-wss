import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { AbstractChartWidget } from '../models/abstract-chart-widget';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DataRangeResponse } from '../../../http/types/data-range-response';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-chart-one',
  standalone: true,
  imports: [BaseChartDirective, NgIf, MatIcon],
  templateUrl: './chart-one.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartOneComponent extends AbstractChartWidget {
  
}
