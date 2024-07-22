import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvidersListResponse } from './types/providers-list-response';
import { environment } from '../../../../environments/environment';
import { API_VERSION_TOKEN } from '../../../core/http/api-version/api-version-token';
import { InstrumentListResponse } from './types/instrument-list-response';
import { DataRangeResponse } from './types/data-range-response';

@Injectable()
export class StatisticsHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiVersion = inject(API_VERSION_TOKEN).main;

  constructor() {}

  public getProviders(): Observable<ProvidersListResponse> {
    return this.http.get<ProvidersListResponse>(
      `${environment.URI}/${this.apiVersion}/api/instruments/v1/providers`
    );
  }

  public getInstruments(provider: string): Observable<InstrumentListResponse> {
    const params = new HttpParams().appendAll({ provider, kind: 'forex' });
    return this.http.get<InstrumentListResponse>(
      `${environment.URI}/${this.apiVersion}/api/instruments/v1/instruments`,
      { params }
    );
  }

  public getDateRange(
    provider: string,
    instrumentId: string
  ): Observable<DataRangeResponse> {
    const params = new HttpParams().appendAll({
      provider,
      instrumentId,
      interval: 1,
      periodicity: 'day',
      startDate: '2024-06-01',
    });
    return this.http.get<DataRangeResponse>(
      `${environment.URI}/${this.apiVersion}/api/bars/v1/bars/date-range`,
      { params }
    );
  }
}
