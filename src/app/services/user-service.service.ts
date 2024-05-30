import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7258/api/Users';
  private loginStateSubject: BehaviorSubject<boolean>;
  public loginState$: Observable<boolean>;

  constructor(private http: HttpClient) { 
    this.loginStateSubject = new BehaviorSubject<boolean>(false);
    this.loginState$ = this.loginStateSubject.asObservable();
  }

  // Method to update the login state
  setLoginState(isLoggedIn: boolean): void {
    this.loginStateSubject.next(isLoggedIn);
  }

  // Method to get the current login state
  getLoginState(): boolean {
    return this.loginStateSubject.value;
  }

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
