import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () => import("./home/home").then((m) => m.Home),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./shopping-list/shopping-list.routes").then((m) => m.routes),
  },
];
