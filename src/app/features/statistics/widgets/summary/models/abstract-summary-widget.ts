import { inject } from "@angular/core";
import { SUMMARY_WIDGET_DATA_PROVIDER_TOKEN } from "./summary-widgets-token";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";

export abstract class AbstractSummaryWidget {
  public readonly dataProvider = inject(SUMMARY_WIDGET_DATA_PROVIDER_TOKEN, {skipSelf: true});
  public data = toSignal(this.dataProvider.summaryData$, {
    initialValue: null,
  });
  public ask = toSignal(
    this.dataProvider.summaryData$.pipe(
      filter((d) => d === null || !!d.ask),
      map((d) => d?.ask || null)
    ),
    { initialValue: null }
  );
  public bid = toSignal(
    this.dataProvider.summaryData$.pipe(
      filter((d) => d === null || !!d.bid),
      map((d) => d?.bid || null)
    ),
    { initialValue: null }
  );
  public last = toSignal(
    this.dataProvider.summaryData$.pipe(
      filter((d) => d === null || !!d.last),
      map((d) => d?.last || null)
    ),
    { initialValue: null }
  );

}
