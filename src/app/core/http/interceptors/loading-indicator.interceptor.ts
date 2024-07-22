import { HttpEventType, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingIndicatorService } from '../../ui/services/loading-indicator.service';
import { finalize, tap } from 'rxjs';

export const loadingIndicatorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingIndicator = inject(LoadingIndicatorService);
  const id = req.headers.get('X-Request-ID');
  if (!id) {
    return next(req);
  }
  loadingIndicator.regRequest(id);
  return next(req).pipe(
    tap({
      next: (event) =>
        event.type === HttpEventType.Response &&
        loadingIndicator.endRequest(id),
      error: (err) => loadingIndicator.endRequest(id),
    }),
    finalize(() => loadingIndicator.endRequest(id))
  );
};
