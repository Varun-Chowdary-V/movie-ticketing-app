import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7258/api/Users';

  constructor(private http: HttpClient) { }

  post(data: any) {
    return this.http.post(this.baseUrl, JSON.stringify(data),{headers:this.headers})
  }

  put(data: any) {
    return this.http.put(this.baseUrl, JSON.stringify(data),{headers:this.headers})
  }

  getMethod() {
    return this.http.get(this.baseUrl);
  }

}
