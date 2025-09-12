import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from "@services/auth";

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (!authService.currentUser()) {
    return router.createUrlTree(["/login"]);
  }
  return true;
};
