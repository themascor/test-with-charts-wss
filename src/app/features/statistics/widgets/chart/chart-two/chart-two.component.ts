import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractChartWidget } from '../models/abstract-chart-widget';
import { MatIcon } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { DataRangeResponse } from '../../../http/types/data-range-response';

@Component({
  selector: 'app-chart-two',
  standalone: true,
  imports: [
    BaseChartDirective, NgIf, MatIcon
  ],
  templateUrl: './chart-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTwoComponent extends AbstractChartWidget { 
  override adapter(
    rangeResponse: DataRangeResponse
  ): ChartConfiguration<'line'>['data'] {
    const labels = rangeResponse.data.map((item) => item.t.split('T')[0]);
    const data = rangeResponse.data.map((item) => item.v);
    return {
      labels,
      datasets: [
        {
          data,
          fill: false,
          tension: 0.5,
          borderColor: 'pink',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }
 }
