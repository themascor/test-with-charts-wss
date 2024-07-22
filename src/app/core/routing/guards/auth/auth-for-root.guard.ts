import { inject } from '@angular/core';
import { Router, UrlTree, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ROUTER_PATHS } from '../../paths.type';

export const authForRootGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return !!auth.token || router.createUrlTree([ROUTER_PATHS.login.root]);
};
