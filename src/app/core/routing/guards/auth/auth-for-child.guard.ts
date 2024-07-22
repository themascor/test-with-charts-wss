import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  type CanActivateChildFn,
} from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ROUTER_PATHS } from '../../paths.type';

export const authForChildGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return !!auth.token || router.createUrlTree([ROUTER_PATHS.login.root]);
};
