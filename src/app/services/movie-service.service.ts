import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7258/api/Movies';


  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.baseUrl);
  }
}
