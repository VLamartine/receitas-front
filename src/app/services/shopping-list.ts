import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@customTypes/api-response";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "@customTypes/product";
import { CreateShoppingListBody } from "@customTypes/shopping-list";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  create(body: CreateShoppingListBody): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shopping-list`, body);
  }
}
