import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { API_VERSION_TOKEN } from './core/http/api-version/api-version-token';
import { API_VERSION } from './core/http/api-version/api-version';
import { authInterceptor } from './core/http/interceptors/auth.interceptor';
import { xRequestIdInterceptor } from './core/http/interceptors/x-request-id.interceptor';
import { loadingIndicatorInterceptor } from './core/http/interceptors/loading-indicator.interceptor';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        xRequestIdInterceptor,
        loadingIndicatorInterceptor,
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideAnimationsAsync(),
    {
      provide: API_VERSION_TOKEN,
      useValue: API_VERSION,
    }, provideCharts(withDefaultRegisterables()),
  ],
};
