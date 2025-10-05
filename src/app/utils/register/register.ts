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
import { AuthService } from "@services/auth";
import { FormError } from "@customTypes/error";

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
    private authService: AuthService,
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
      this.formErrors.push("As senhas devem ser iguais");
      this.registerForm.markAllAsTouched();
      return;
    }

    const body: RegisterRequest = {
      name: this.registerForm.value.name || "",
      email: this.registerForm.value.email || "",
      password: this.registerForm.value.password || "",
      passwordConfirmation: this.registerForm.value.confirmPassword || "",
    };

    this.formErrors = [];

    this.authService.register(body).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e: FormError) => {
        Object.keys(e).forEach((key) => {
          this.registerForm.get(key)?.setErrors({ invalid: true });
          this.formErrors.push(...e[key]);
        });

        this.registerForm.markAllAsTouched();
      },
    });
  }
}
