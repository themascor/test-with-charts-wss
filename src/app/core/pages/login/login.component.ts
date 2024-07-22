import { CommonModule, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatProgressSpinner,
  MatSpinner,
} from '@angular/material/progress-spinner';
import { AuthService } from '../../auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatProgressSpinner, NgIf, MatButton, MatIcon],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private login$ = this.auth.login().pipe(takeUntilDestroyed());
  public success = signal(!!this.auth.token);
  public loading = signal(false);

  ngOnInit(): void {
    this.getToken();
  }
  getToken(): void {
    this.loading.set(true);
    this.success.set(false);
    this.login$.subscribe({
      next: (res) => {
        this.loading.set(false);
        this.success.set(!!res);
        if (res) {
          this.router.navigate(['/']);
        }
      },
      error: (e) => {
        this.loading.set(false);
        this.success.set(!!this.auth.token);
      },
      complete: () => {
        this.loading.set(false);
        this.success.set(!!this.auth.token);
      },
    });
  }
}
