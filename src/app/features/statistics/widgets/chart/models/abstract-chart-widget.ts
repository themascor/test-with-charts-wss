import { inject, Signal, signal } from "@angular/core";
import { CHART_WIDGET_DATA_PROVIDER_TOKEN } from "./chart-widget-token";
import { toSignal, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { tap, filter, map } from "rxjs";
import { DataRangeResponse } from "../../../http/types/data-range-response";

export abstract class AbstractChartWidget {
  public readonly dataProvider = inject(CHART_WIDGET_DATA_PROVIDER_TOKEN, {skipSelf: true});
  public lineChartData!: Signal<ChartConfiguration<'line'>['data']>;
  public isChartData = signal(false);
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = false;
  constructor() {
    this.lineChartData = toSignal(
      this.dataProvider.dataRangeResponse$.pipe(
        tap((response) => this.isChartData.set(this.isData(response))),
        filter((response) => this.isData(response)),
        map((options) => this.adapter(options as DataRangeResponse)),
        takeUntilDestroyed()
      ),
      {
        initialValue: {
          labels: [],
          datasets: [],
        },
      }
    );
  }

  protected adapter(
    rangeResponse: DataRangeResponse
  ): ChartConfiguration<'line'>['data'] {
    const labels = rangeResponse.data.map((item) => item.t.split('T')[0]);
    const data = rangeResponse.data.map((item) => item.v);
    return {
      labels,
      datasets: [
        {
          data,
          label: 'Series A',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }

  private isData(rangeResponse: DataRangeResponse | null): boolean {
    if (rangeResponse === null) {
      return false;
    }
    return Array.isArray(rangeResponse?.data)
      ? rangeResponse.data.length > 0
      : false;
  }

}
