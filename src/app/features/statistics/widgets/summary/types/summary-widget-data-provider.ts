import { Observable } from "rxjs";
import { DynamicStatistics } from "../../../wss/dynamic-statistics.type";

export interface SummaryWidgetDataProvider {
    readonly summaryData$: Observable<DynamicStatistics  | null> 
 }
