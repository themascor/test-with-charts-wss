import { Observable } from "rxjs";
import { DataRangeResponse } from "../../../http/types/data-range-response";

export interface ChartWidgetDataProvider { 
   readonly dataRangeResponse$: Observable<DataRangeResponse | null> 
}
