import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "@customTypes/api-response";
import { Unit, UnitQueryOptions } from "@customTypes/unit";

@Injectable({
  providedIn: "root",
})
export class UnitsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAll(options: UnitQueryOptions = {}): Observable<ApiResponse<Unit[]>> {
    let params = new HttpParams();

    if (options.purchasable) {
      params = params.set("purchasable", options.purchasable);
    }
    return this.http.get<ApiResponse<Unit[]>>(`${this.apiUrl}/units`, {
      params,
    });
  }
}
