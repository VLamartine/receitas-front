import { Component, signal } from "@angular/core";
import { AuthLayout } from "./layouts/auth-layout/auth-layout";

@Component({
  selector: "app-root",
  imports: [AuthLayout],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("frontend");
}
