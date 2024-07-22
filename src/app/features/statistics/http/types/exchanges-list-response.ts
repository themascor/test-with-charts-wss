 export interface ExchangesListResponse {
  data: Data;
}

interface Data {
  oanda: string[];
  dxfeed: string[];
  simulation: string[];
  alpaca: string[];
  cryptoquote: string[];
  'active-tick': string[];
}