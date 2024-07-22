import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { WssAbstract } from '../../../core/wss/wss-abstract';
import {
  DynamicStatistics,
  StatisticWssMsgObject,
  StatisticWssParams,
} from './dynamic-statistics.type';

@Injectable()
export class StatisticWssService extends WssAbstract<DynamicStatistics, StatisticWssMsgObject > {
  protected override url: string =
    'wss://platform.fintacharts.com/api/streaming/ws/v1/realtime';

  private config: StatisticWssParams = {
    provider: null,
    instrumentId: null,
  };


  private currentSubscription: StatisticWssMsgObject | null = null;

  setConfig(config: StatisticWssParams) {
    this.checkConnection()
    Object.values(config).some((v) => v === null)
      ? this.cancelCurrentSubscription()
      : this.resubscribeTo(config);
  }

  private cancelCurrentSubscription() {
    if (!this.currentSubscription) {
      return;
    }
    this.sendMessage(this.buildUnsubscribeMessage(this.currentSubscription));
  }

  private resubscribeTo(config: StatisticWssParams) {
    this.cancelCurrentSubscription();
    const subscription = this.buildSubscriptionMessage(config);
    this.sendMessage(subscription);
    this.currentSubscription = subscription;
  }

  private buildSubscriptionMessage(config: StatisticWssParams): StatisticWssMsgObject {
    const msg: StatisticWssMsgObject = {
      type: 'l1-subscription',
      id: '1',
      instrumentId: config.instrumentId as string,
      provider: config.provider as string,
      subscribe: true,
      kinds: ['ask', 'bid', 'last'],
    };
    return msg;
  }

  private buildUnsubscribeMessage(subscription: StatisticWssMsgObject): StatisticWssMsgObject {
    const subscriptionObject: StatisticWssMsgObject = JSON.parse(JSON.stringify(subscription));
    subscriptionObject.subscribe = false;
    return subscriptionObject;
  }

  private checkConnection() {
    if (this.isConnected) {
      return;
    }
    this.init();
  }
}
