import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './core/ui/navbar/navbar.component';
import { AuthService } from './core/auth/auth.service';
import { MatButton } from '@angular/material/button';
import { interval, map, Observable, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private ticker$!: Subject<void> | Observable<void>;
  private readonly auth = inject(AuthService);

  constructor() {
    const tickInterval = 1000 * 1;
    if (typeof Worker !== 'undefined') {
      this.ticker$ = new Subject();
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        (this.ticker$ as Subject<void>).next();
      };
      worker.postMessage(tickInterval);
    } else {
      this.ticker$ = interval(tickInterval).pipe(
        map((_) => undefined),
        takeUntilDestroyed()
      );
    }
    this.auth.regTicker(this.ticker$.pipe(takeUntilDestroyed()));
  }
}
