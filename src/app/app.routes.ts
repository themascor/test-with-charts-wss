import { Routes } from '@angular/router';
import { StatisticPageComponent } from './features/statistics/statistic-page/statistic-page.component';
import { ROUTER_OUTLETS } from './core/routing/outlets.type';
import { ROUTER_PATHS } from './core/routing/paths.type';
import { Page404Component } from './core/pages/page-404/page-404.component';
import { StatisticWidgetsAggregatorService } from './features/statistics/widgets/services/statistic-widgets-aggregator.service';
import { LoginComponent } from './core/pages/login/login.component';
import { authForRootGuard } from './core/routing/guards/auth/auth-for-root.guard';
import { authForChildGuard } from './core/routing/guards/auth/auth-for-child.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_PATHS.statistic.root,
    pathMatch: 'full',
  },
  {
    path: ROUTER_PATHS.statistic.root,
    component: StatisticPageComponent,
    canActivate: [authForRootGuard],
    canActivateChild: [authForChildGuard],
    children: [
      {
        path: '',
        redirectTo: `/${ROUTER_PATHS.statistic.root}/(${ROUTER_OUTLETS.SELECTOR}:${ROUTER_PATHS.statistic.selector.one}//${ROUTER_OUTLETS.SUMMARY}:${ROUTER_PATHS.statistic.summary.one}//${ROUTER_OUTLETS.CHART}:${ROUTER_PATHS.statistic.chart.one})`,
        pathMatch: 'full',
      },
      {
        path: `${ROUTER_PATHS.statistic.selector.one}`,
        outlet: ROUTER_OUTLETS.SELECTOR,
        loadComponent: () =>
          import(
            './features/statistics/widgets/selector/selector-one/selector-one.component'
          ).then((m) => m.SelectorOneComponent),
      },
      {
        path: `${ROUTER_PATHS.statistic.selector.two}`,
        outlet: ROUTER_OUTLETS.SELECTOR,
        loadComponent: () =>
          import(
            './features/statistics/widgets/selector/selector-two/selector-two.component'
          ).then((m) => m.SelectorTwoComponent),
      },
      {
        path: `${ROUTER_PATHS.statistic.chart.one}`,
        outlet: ROUTER_OUTLETS.CHART,
        loadComponent: () =>
          import(
            './features/statistics/widgets/chart/chart-one/chart-one.component'
          ).then((m) => m.ChartOneComponent),
      },
      {
        path: `${ROUTER_PATHS.statistic.chart.two}`,
        outlet: ROUTER_OUTLETS.CHART,
        loadComponent: () =>
          import(
            './features/statistics/widgets/chart/chart-two/chart-two.component'
          ).then((m) => m.ChartTwoComponent),
      },
      {
        path: `${ROUTER_PATHS.statistic.summary.one}`,
        outlet: ROUTER_OUTLETS.SUMMARY,
        loadComponent: () =>
          import(
            './features/statistics/widgets/summary/summary-one/summary-one.component'
          ).then((m) => m.SummaryOneComponent),
      },
      {
        path: `${ROUTER_PATHS.statistic.summary.two}`,
        outlet: ROUTER_OUTLETS.SUMMARY,
        loadComponent: () =>
          import(
            './features/statistics/widgets/summary/summary-two/summary-two.component'
          ).then((m) => m.SummaryTwoComponent),
      },
    ],
  },
  {
    path: ROUTER_PATHS.login.root,
    component: LoginComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
];
