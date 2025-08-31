import { Component } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-auth-layout",
  imports: [MatCardModule, MatButtonModule, RouterOutlet],
  templateUrl: "./auth-layout.html",
  styleUrl: "./auth-layout.scss",
})
export class AuthLayout {}
