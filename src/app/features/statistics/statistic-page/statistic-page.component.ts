import { CommonModule, JsonPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ROUTER_OUTLETS } from '../../../core/routing/outlets.type';
import { CHART_WIDGET_DATA_PROVIDER_TOKEN } from '../widgets/chart/models/chart-widget-token';
import { StatisticWidgetsAggregatorService } from '../widgets/services/statistic-widgets-aggregator.service';
import { SELECTOR_WIDGET_DATA_PROVIDER_TOKEN } from '../widgets/selector/models/selector-widget-token';
import { SUMMARY_WIDGET_DATA_PROVIDER_TOKEN } from '../widgets/summary/models/summary-widgets-token';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ROUTER_PATHS } from '../../../core/routing/paths.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { StatisticsHttpService } from '../http/statistics-http.service';
import { MatButton } from '@angular/material/button';
import { StatisticWssService } from '../wss/statistic-wss.service';

interface WidgetConfigForm {
  [ROUTER_OUTLETS.CHART]: FormControl<string>;
  [ROUTER_OUTLETS.SELECTOR]: FormControl<string>;
  [ROUTER_OUTLETS.SUMMARY]: FormControl<string>;
}

const emptyForm = {
  [ROUTER_OUTLETS.CHART]: '',
  [ROUTER_OUTLETS.SELECTOR]: '',
  [ROUTER_OUTLETS.SUMMARY]: '',
};

@Component({
  selector: 'app-statistic-page',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgFor,
    NgTemplateOutlet,
    MatButton,
    JsonPipe
  ],
  providers: [
    StatisticWssService,
    StatisticsHttpService,
    StatisticWidgetsAggregatorService,
    {
      provide: CHART_WIDGET_DATA_PROVIDER_TOKEN,
      useExisting: StatisticWidgetsAggregatorService,
    },
    {
      provide: SELECTOR_WIDGET_DATA_PROVIDER_TOKEN,
      useExisting: StatisticWidgetsAggregatorService,
    },
    {
      provide: SUMMARY_WIDGET_DATA_PROVIDER_TOKEN,
      useExisting: StatisticWidgetsAggregatorService,
    },
  ],
  templateUrl: './statistic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './statistic-page.component.scss'
})



export class StatisticPageComponent implements OnInit{

  public aggregator = inject(StatisticWidgetsAggregatorService)
  readonly routerOutletNames = {
    selector: ROUTER_OUTLETS.SELECTOR,
    chart: ROUTER_OUTLETS.CHART,
    summary: ROUTER_OUTLETS.SUMMARY,
  };

  readonly dropDownOptions = {
    [ROUTER_OUTLETS.CHART]: [
      ROUTER_PATHS.statistic.chart.one,
      ROUTER_PATHS.statistic.chart.two,
    ],
    [ROUTER_OUTLETS.SELECTOR]: [
      ROUTER_PATHS.statistic.selector.one,
      ROUTER_PATHS.statistic.selector.two,
    ],
    [ROUTER_OUTLETS.SUMMARY]: [
      ROUTER_PATHS.statistic.summary.one,
      ROUTER_PATHS.statistic.summary.two,
    ],
  };
  readonly fg = new FormGroup<WidgetConfigForm>({
    [ROUTER_OUTLETS.CHART]: new FormControl<string>('', { nonNullable: true }),
    [ROUTER_OUTLETS.SELECTOR]: new FormControl<string>('', {
      nonNullable: true,
    }),
    [ROUTER_OUTLETS.SUMMARY]: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.fg.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((_) => this.onFgChange());
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((event) => this.onNavigationEnd(event));
  }
  ngOnInit(): void {
    this.getProviders();
  }

  public getProviders() : void {
    this.aggregator.updateProviders()
  }

  private onFgChange(): void {
    this.updateRouteFromForm();
  }

  private onNavigationEnd(event: NavigationEnd): void {
    this.updateFormFromRoute();
  }

  private updateRouteFromForm() {
    const value = this.fg.value;
    const outlets = Object.keys(value)
      .filter((key) => !!value[key as ROUTER_OUTLETS])
      .reduce(
        (acc, outletName) => ({
          ...acc,
          [outletName]: [value[outletName as ROUTER_OUTLETS]],
        }),
        {}
      );
    this.router.navigate([{ outlets }], { relativeTo: this.route });
  }

  private updateFormFromRoute() {
    const mappedFgValue: { [key in ROUTER_OUTLETS]: string } =
      this.route.children.reduce(
        (acc, route) => ({
          ...acc,
          [route.outlet as ROUTER_OUTLETS]: route.snapshot.url[0].path,
        }),
        {} as any
      );

    this.fg.patchValue(
      { ...emptyForm, ...mappedFgValue },
      { emitEvent: false }
    );
  }
}
