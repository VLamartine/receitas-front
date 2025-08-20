import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterRequest} from '@customTypes/auth';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http: HttpClient) {
  }

  login(body: any) {
  }

  register(body: RegisterRequest) {
    console.log(body);
  }
}
