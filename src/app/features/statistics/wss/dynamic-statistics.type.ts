export interface DynamicStatistics {
  type: string;
  instrumentId: string;
  provider: string;
  ask?: Ask;
  last?: Last;
  bid?: Ask;
}

interface Last {
  timestamp: string;
  price: number;
  volume: number;
  change: number;
  changePct: number;
}

interface Ask {
  timestamp: string;
  price: number;
  volume: number;
}



export interface StatisticWssMsgObject {
  type: string;
  id: string;
  instrumentId: string;
  provider: string;
  subscribe: boolean;
  kinds: string[];
}

export interface StatisticWssParams {
  provider: string | null;
  instrumentId: string | null;
}