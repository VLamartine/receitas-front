import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@customTypes/api-response";
import { HttpClient, HttpParams } from "@angular/common/http";
import {
  CreateShoppingListBody,
  ShoppingList,
  ShoppingListFetch,
  UpdateShoppingListBody,
} from "@customTypes/shopping-list";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  create(body: CreateShoppingListBody): Observable<ApiResponse<ShoppingList>> {
    return this.http.post<ApiResponse<ShoppingList>>(
      `${this.apiUrl}/shopping-lists`,
      body,
    );
  }

  getShoppingLists(
    options: ShoppingListFetch = {} as ShoppingListFetch,
  ): Observable<ApiResponse<ShoppingList[]>> {
    const params = new HttpParams({
      fromObject: {
        page: options.page ?? 1,
        limit: options.limit ?? 10,
        fetch: options.fetch ?? "all",
      },
    });
    return this.http.get<ApiResponse<ShoppingList[]>>(
      `${this.apiUrl}/shopping-lists`,
      { params },
    );
  }

  getShoppingList(id: string): Observable<ApiResponse<ShoppingList>> {
    return this.http.get<ApiResponse<ShoppingList>>(
      `${this.apiUrl}/shopping-lists/${id}`,
    );
  }

  updateShoppingList(
    id: string,
    body: UpdateShoppingListBody,
  ): Observable<ApiResponse<ShoppingList>> {
    return this.http.put<ApiResponse<ShoppingList>>(
      `${this.apiUrl}/shopping-lists/${id}`,
      body,
    );
  }
}
