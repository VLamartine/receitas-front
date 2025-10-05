import { computed, inject, Injectable, signal } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from "@angular/common/http";
import { LoginRequest, RegisterRequest } from "@customTypes/auth";
import { environment } from "@env/environment";
import { catchError, tap, throwError } from "rxjs";
import { User, UserLoginResponse } from "@customTypes/user";
import { ADD_AUTH_HEADER } from "@interceptors/auth-interceptor";
import mapErrors from "@utils/mapErrors";
import { ApiResponse } from "@customTypes/api-response";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private user = signal<User | null>(null);

  public readonly currentUser = computed(() => this.user());
  private readonly http = inject(HttpClient);
  constructor() {
    this.checkLoggedUser();
  }

  login(body: LoginRequest) {
    return this.http
      .post<ApiResponse<UserLoginResponse>>(`${this.apiUrl}/login`, body, {
        context: new HttpContext().set(ADD_AUTH_HEADER, false),
      })
      .pipe(
        tap((res) => {
          if (!res.success || !res.data) {
            throw new HttpErrorResponse({
              error: "Erro ao fazer login",
            });
          }
          this.saveCurrentUser(res.data);
        }),
      );
  }

  register(body: RegisterRequest) {
    return this.http
      .post<ApiResponse<UserLoginResponse>>(`${this.apiUrl}/register`, body, {
        context: new HttpContext().set(ADD_AUTH_HEADER, false),
      })
      .pipe(
        tap((res) => {
          if (!res.success || !res.data) {
            throw new HttpErrorResponse({
              error: "Erro ao fazer login",
            });
          }
          this.saveCurrentUser(res.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => mapErrors(error));
        }),
      );
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.user.set(null);
  }
  saveCurrentUser = (user: UserLoginResponse) => {
    console.log(user);
    const { token, user: userInfo } = user;
    this.user.set(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("token", token);
  };

  checkLoggedUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      this.user.set(JSON.parse(user));
    }
  };
}
