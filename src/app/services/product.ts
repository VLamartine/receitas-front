import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@customTypes/api-response";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Product } from "@customTypes/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(options: Record<string, any>): Observable<ApiResponse<Product>> {
    let params = new HttpParams();
    if (options["searchTerm"]) {
      params = params.set("search", options["searchTerm"]);
    }
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/product`, {
      params,
    });
  }
}
