import { Routes } from "@angular/router";
import { authGuard } from "@guards/auth-guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("@utils/login/login").then((m) => m.Login),
  },
  {
    path: "register",
    loadComponent: () =>
      import("@utils/register/register").then((m) => m.Register),
  },
  {
    path: "",
    loadChildren: () => import("@modules/routes").then((m) => m.routes),
    canActivate: [authGuard],
  },
  // {
  //   path: "**",
  //   redirectTo: "home",
  // },
];
