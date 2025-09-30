import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { ShoppingListService } from "@services/shopping-list";
import { forkJoin } from "rxjs";
import { ApiResponse } from "@customTypes/api-response";

@Component({
  selector: "app-shopping-list-dashboard",
  imports: [MatButtonModule, RouterModule],
  templateUrl: "./shopping-list-dashboard.html",
  styleUrl: "./shopping-list-dashboard.scss",
})
export class ShoppingListDashboard implements OnInit {
  private readonly shoppingListService = inject(ShoppingListService);
  futureShoppingLists!: ApiResponse<any>;
  pastShoppingLists!: ApiResponse<any>;

  ngOnInit() {
    forkJoin([
      this.shoppingListService.getShoppingLists({ fetch: "future" }),
      this.shoppingListService.getShoppingLists({ fetch: "past" }),
    ]).subscribe({
      next: ([futureShoppingLists, pastShoppingLists]) => {
        this.futureShoppingLists = futureShoppingLists;
        this.pastShoppingLists = pastShoppingLists;
      },
      error: (error) => {
        console.error("Error fetching shopping lists:", error);
      },
      complete: () => {
        console.log("Shopping lists fetched successfully");
      },
    });
  }
}
