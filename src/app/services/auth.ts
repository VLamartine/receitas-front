import { computed, Injectable, signal } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from "@angular/common/http";
import { LoginRequest, RegisterRequest } from "@customTypes/auth";
import { environment } from "@env/environment";
import { catchError, tap, throwError } from "rxjs";
import { User, UserLogin } from "@customTypes/user";
import { ADD_AUTH_HEADER } from "@interceptors/auth-interceptor";
import mapErrors from "@utils/mapErrors";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private user = signal<User | null>(null);

  public readonly currentUser = computed(() => this.user());

  constructor(private http: HttpClient) {
    this.checkLoggedUser();
  }

  login(body: LoginRequest) {
    return this.http
      .post<UserLogin>(`${this.apiUrl}/auth/login`, body, {
        context: new HttpContext().set(ADD_AUTH_HEADER, false),
      })
      .pipe(
        tap((res) => {
          this.saveCurrentUser(res);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error.error);
        }),
      );
  }

  register(body: RegisterRequest) {
    return this.http
      .post<UserLogin>(`${this.apiUrl}/user`, body, {
        context: new HttpContext().set(ADD_AUTH_HEADER, false),
      })
      .pipe(
        tap((res) => {
          this.saveCurrentUser(res);
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
  saveCurrentUser = (user: UserLogin) => {
    const { token, ...userInfo } = user;
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
