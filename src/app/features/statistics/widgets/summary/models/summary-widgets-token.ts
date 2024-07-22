import { InjectionToken } from "@angular/core";
import { SummaryWidgetDataProvider } from "../types/summary-widget-data-provider";

export const SUMMARY_WIDGET_DATA_PROVIDER_TOKEN = new InjectionToken<SummaryWidgetDataProvider>('SummaryWidgetDataProviderToken');