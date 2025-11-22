import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () =>
      import("./shopping-list-dashboard/shopping-list-dashboard").then(
        (m) => m.ShoppingListDashboard,
      ),
  },
  {
    path: "new",
    loadComponent: () =>
      import("./create-shopping-list/create-shopping-list").then(
        (m) => m.CreateShoppingList,
      ),
  },
  {
    path: ":id",
    loadComponent: () =>
      import("./create-shopping-list/create-shopping-list").then(
        (m) => m.CreateShoppingList,
      ),
  },
];
