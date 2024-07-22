export interface InstrumentListResponse {
  paging: Paging;
  data: Instrument[];
}

export interface Instrument {
  id: string;
  symbol: string;
  kind: string;
  description: string;
  tickSize: number;
  currency: string;
  baseCurrency: string;
  mappings: Mappings;
}

interface Mappings {
  'active-tick': ActiveTick;
  simulation?: ActiveTick;
  oanda: ActiveTick;
  dxfeed?: ActiveTick;
}

interface ActiveTick {
  symbol: string;
  exchange: string;
  defaultOrderSize: number;
}

interface Paging {
  page: number;
  pages: number;
  items: number;
}
