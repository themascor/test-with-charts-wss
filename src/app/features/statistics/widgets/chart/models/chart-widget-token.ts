import { InjectionToken } from "@angular/core";
import { ChartWidgetDataProvider } from "../types/chart-widget-data-provider";

export const CHART_WIDGET_DATA_PROVIDER_TOKEN = new InjectionToken<ChartWidgetDataProvider>('ChartWidgetDataProviderToken');
