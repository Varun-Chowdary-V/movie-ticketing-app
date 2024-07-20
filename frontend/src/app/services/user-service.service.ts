import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7082/api/Users';
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
    console.log(this.baseUrl, JSON.stringify(data),{headers:this.headers})
    return this.http.post(this.baseUrl, JSON.stringify(data),{headers:this.headers})
  }

  put(data: any) {
    return this.http.put(this.baseUrl, JSON.stringify(data),{headers:this.headers})
  }

  getMethod() {
    return this.http.get(this.baseUrl);
  }

  hashPassword(password:string):string {
    const salt = bcrypt.genSaltSync(10); // Generate a salt
    const hash = bcrypt.hashSync(password, salt); // Hash the password with the salt
    return hash;
  }

  comparePassword(password:string,hash:string) : boolean {
    return bcrypt.compareSync(password,hash)
  }

}
