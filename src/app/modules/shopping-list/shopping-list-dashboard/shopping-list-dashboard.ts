import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-shopping-list-dashboard",
  imports: [MatButtonModule, RouterModule],
  templateUrl: "./shopping-list-dashboard.html",
  styleUrl: "./shopping-list-dashboard.scss",
})
export class ShoppingListDashboard {}
