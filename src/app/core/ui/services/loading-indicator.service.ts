import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingIndicatorService {
  private readonly router = inject(Router);
  private readonly routerLoading: Signal<boolean>;
  private readonly httpLoading = signal(false);
  private requests: Set<string> = new Set<string>();

  public readonly loading: Signal<boolean> = computed(
    () => this.httpLoading() || this.routerLoading()
  );

  constructor() {
    this.routerLoading = toSignal(
      this.router.events.pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ),
        map((event) => event instanceof NavigationStart),
        takeUntilDestroyed()
      ),
      { initialValue: false }
    );
  }

  regRequest(url: string) {
    this.requests.add(url)
    this.httpLoading.set(true);
  }
  
  endRequest(url:string) {
    this.requests.delete(url)
    this.requests.size === 0 && this.httpLoading.set(false)
  }

}
