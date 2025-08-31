import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RegisterRequest } from "@customTypes/auth";
import { Auth } from "@services/auth";
import { FormErrors } from "@customTypes/formErrors";

interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: "app-register",
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {
  registerForm: FormGroup<RegisterForm>;
  formErrors: string[] = [];

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: Auth,
  ) {
    this.registerForm = this.fb.group({
      name: this.fb.control("", {
        validators: [Validators.required],
      }),
      email: this.fb.control("", {
        validators: [Validators.required, Validators.email],
      }),
      password: this.fb.control("", {
        validators: [Validators.required],
      }),
      confirmPassword: this.fb.control("", {
        validators: [Validators.required],
      }),
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.registerForm
        .get("confirmPassword")
        ?.setErrors({ passwordMismatch: true });
      return;
    }

    const body: RegisterRequest = {
      name: this.registerForm.value.name || "",
      email: this.registerForm.value.email || "",
      password: this.registerForm.value.password || "",
      confirmPassword: this.registerForm.value.confirmPassword || "",
    };

    this.authService.register(body).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e: FormErrors) => {
        Object.keys(e).forEach((key) => {
          this.registerForm.get(key)?.setErrors({ invalid: true });
          this.formErrors.push(...e[key]);
        });

        this.registerForm.markAllAsTouched();
      },
    });
  }
}
