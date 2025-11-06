import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ShoppingListService } from "@services/shopping-list";
import { AsyncPipe, DatePipe } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "app-shopping-list-dashboard",
  imports: [
    MatButtonModule,
    RouterModule,
    AsyncPipe,
    MatListModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: "./shopping-list-dashboard.html",
  styleUrl: "./shopping-list-dashboard.scss",
})
export class ShoppingListDashboard {
  private readonly shoppingListService = inject(ShoppingListService);
  futureLists$ = this.shoppingListService.getShoppingLists({ fetch: "future" });
  pastLists$ = this.shoppingListService.getShoppingLists({ fetch: "past" });
}
