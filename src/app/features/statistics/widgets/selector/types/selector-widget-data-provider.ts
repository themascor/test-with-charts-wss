import { Observable } from "rxjs";
import { SelectorWidgetData } from "./selector-widget-data";

export interface SelectorWidgetDataProvider {
    readonly options$: Observable<SelectorWidgetData>;
    setProvider(provider: string | null): void;
    setInstrument(instrument: string | null): void;
 }


