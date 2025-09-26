import { Component, inject, signal } from "@angular/core";
import { AuthLayout } from "./layouts/auth-layout/auth-layout";
import { AuthService } from "@services/auth";
import { AppLayout } from "./layouts/app-layout/app-layout";

@Component({
  selector: "app-root",
  imports: [AuthLayout, AppLayout],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("frontend");
  authService = inject(AuthService);
}
