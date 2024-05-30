import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7258/api/';

  constructor(private http: HttpClient) { }

  post(url: string,data: any) {
    return this.http.post(this.baseUrl + url, JSON.stringify(data),{headers:this.headers})
  }

  put(url: string,data: any) {
    return this.http.put(this.baseUrl+url, JSON.stringify(data),{headers:this.headers})
  }

  getMethod(url : string) {
    return this.http.get(this.baseUrl+url);
  }

}
