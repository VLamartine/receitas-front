import { Component, inject } from "@angular/core";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { Auth } from "@services/auth";

@Component({
  selector: "app-app-layout",
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: "./app-layout.html",
  styleUrl: "./app-layout.scss",
})
export class AppLayout {
  authService = inject(Auth);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]).then();
  }
}
