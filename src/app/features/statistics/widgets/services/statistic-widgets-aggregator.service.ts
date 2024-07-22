import { inject, Injectable, Signal, signal } from '@angular/core';
import { SummaryWidgetDataProvider } from '../summary/types/summary-widget-data-provider';
import { ChartWidgetDataProvider } from '../chart/types/chart-widget-data-provider';
import { SelectorWidgetDataProvider } from '../selector/types/selector-widget-data-provider';
import {
  combineLatest,
  filter,
  first,
  map,
  merge,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { StatisticsHttpService } from '../../http/statistics-http.service';
import { ProvidersListResponse } from '../../http/types/providers-list-response';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SelectorWidgetData } from '../selector/types/selector-widget-data';
import { InstrumentListResponse } from '../../http/types/instrument-list-response';
import { DataRangeResponse } from '../../http/types/data-range-response';
import { DynamicStatistics } from '../../wss/dynamic-statistics.type';
import { StatisticWssService } from '../../wss/statistic-wss.service';

@Injectable()
export class StatisticWidgetsAggregatorService
  implements
    SummaryWidgetDataProvider,
    ChartWidgetDataProvider,
    SelectorWidgetDataProvider
{
  private readonly statisticHttp = inject(StatisticsHttpService);
  private readonly statisticWss = inject(StatisticWssService);

 
  private readonly _getProviders$ = new Subject<void>();
  private readonly _getInstruments$ = new Subject<string | null>();
  private readonly _getDataRange$ = new Subject<{
    provider: string;
    instrumentId: string;
  } | null>();

  private _summaryData$ = new Subject<DynamicStatistics | null>();
  private provider: string | null = null;
  private instrumentId: string | null = null;

  private readonly _providersResponse$: Observable<ProvidersListResponse> =
    this._getProviders$.pipe(
      switchMap((_) => this.statisticHttp.getProviders()),
      takeUntilDestroyed(),
      shareReplay(1)
    );
  private readonly _instrumentsResponse$: Observable<InstrumentListResponse | null> =
    this._getInstruments$.pipe(
      switchMap((provider) =>
        provider === null
          ? of(null)
          : this.statisticHttp.getInstruments(provider)
      ),
      takeUntilDestroyed(),
      shareReplay(1)
    );

  public readonly dataRangeResponse$: Observable<DataRangeResponse | null> =
    this._getDataRange$.pipe(
      switchMap((args) =>
        args === null
          ? of(null)
          : this.statisticHttp.getDateRange(args.provider, args.instrumentId)
      ),
      takeUntilDestroyed(),
      shareReplay(1)
    );

  public readonly options$: Observable<SelectorWidgetData> = combineLatest([
    this._providersResponse$,
    this._instrumentsResponse$,
  ]).pipe(
    //tap(console.log),
    map(([providers, instruments]) => ({
      providers,
      instruments,
    }))
  );

  constructor() {}

  get summaryData$(): Observable<DynamicStatistics | null> {

    return merge(this.statisticWss.response$.pipe(filter(resp => resp === null || resp.type=== 'l1-update')), this._summaryData$);
  }

  setProvider(provider: string | null): void {
    this.provider = provider;
    this._instrumentsResponse$.pipe(first()).subscribe();
    this._getInstruments$.next(provider);
    this._summaryData$.next(null);
  }

  setInstrument(instrumentId: string | null): void {
    this.instrumentId = instrumentId;
    const provider = this.provider;

    this.dataRangeResponse$.pipe(first()).subscribe();
    this._getDataRange$.next(
      provider !== null && instrumentId !== null
        ? { provider, instrumentId }
        : null
    );
    this.statisticWss.setConfig({ provider, instrumentId });
  }

  updateProviders(): void {
    this._instrumentsResponse$.pipe(first()).subscribe();
    this._getInstruments$.next(null);
    this._providersResponse$.pipe(first()).subscribe();
    this._getProviders$.next();
    this.statisticWss.setConfig({
      provider: this.provider,
      instrumentId: this.instrumentId,
    });
    this._summaryData$.next(null);
  }
}
