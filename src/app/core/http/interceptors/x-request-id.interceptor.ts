import type { HttpInterceptorFn } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
export const xRequestIdInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      setHeaders: {
        'X-Request-ID': uuidv4(),
      },
    })
  );
};
