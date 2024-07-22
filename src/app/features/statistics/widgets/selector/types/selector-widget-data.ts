import { InstrumentListResponse } from "../../../http/types/instrument-list-response";
import { ProvidersListResponse } from "../../../http/types/providers-list-response";

export interface SelectorWidgetData {
    providers?: ProvidersListResponse | null,
    instruments?: InstrumentListResponse | null
}