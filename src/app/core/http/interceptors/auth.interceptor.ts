import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SKIP_AUTH_HTTP_CONTEXT } from './http-context/skip-auth.http-context';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const accessToken = inject(AuthService).token?.access_token;
  const skip: boolean = req.context.get(SKIP_AUTH_HTTP_CONTEXT);

  if (!accessToken || skip) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  );
}
