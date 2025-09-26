import { Component, inject, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "@services/auth";
import { LoginRequest } from "@customTypes/auth";
import { ErrorGeneric } from "@customTypes/error";
import { HttpStatusCode } from "@angular/common/http";

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: "app-login",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  loginForm: FormGroup<LoginForm>;
  unauthorized = signal<boolean>(false);
  router = inject(Router);
  authService = inject(AuthService);

  constructor(private fb: NonNullableFormBuilder) {
    this.loginForm = this.fb.group({
      email: this.fb.control("", {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control("", {
        validators: [Validators.required],
      }),
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const login: LoginRequest = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || "",
    };

    this.authService.login(login).subscribe({
      next: () => {
        this.router.navigate(["/"]).then();
      },
      error: (error: ErrorGeneric) => {
        if (error.statusCode === HttpStatusCode.Unauthorized) {
          this.unauthorized.set(true);
        }
      },
    });
  }
}
