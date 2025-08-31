import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpContext,
  HttpErrorResponse,
} from "@angular/common/http";
import { RegisterRequest } from "@customTypes/auth";
import { environment } from "@env/environment";
import { catchError, tap } from "rxjs";
import { User, UserLogin } from "@customTypes/user";
import { ADD_AUTH_HEADER } from "@interceptors/auth-interceptor";
import mapErrors from "@utils/mapErrors";
@Injectable({
  providedIn: "root",
})
export class Auth {
  private apiUrl = environment.apiUrl;
  private currentUser: User | null = null;
  constructor(private http: HttpClient) {}

  login(_body: any) {}

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
          throw mapErrors(error);
        }),
      );
  }

  saveCurrentUser = (user: UserLogin) => {
    const { token, ...userInfo } = user;
    this.currentUser = userInfo;
    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("token", token);
  };
}
