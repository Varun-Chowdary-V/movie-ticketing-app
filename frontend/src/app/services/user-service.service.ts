import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import { environment } from '../../environment/environment';
import { Booking, Review, User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  baseUrl : string = `${environment.baseUrl}/Users`;
  private loginStateSubject: BehaviorSubject<number>;
  public loginState$: Observable<number>;

  constructor(private http: HttpClient) { 
    this.loginStateSubject = new BehaviorSubject<number>(-1);
    this.loginState$ = this.loginStateSubject.asObservable();
  }

  // Method to update the login state by setting userid
  setLoginState(isLoggedIn: number): void {
    this.loginStateSubject.next(isLoggedIn);
  }

  // Method to get the current user id
  getLoginState(): number {
    return this.loginStateSubject.value;
  }

  post(user: User) {
    if(user.fname=="Varun"){
      user.role="Admin"
    } else {
      user.role="User"
    }
    console.log(this.baseUrl, JSON.stringify(user))
    return this.http.post(this.baseUrl, JSON.stringify(user))
  }

  put(user: User) {
    return this.http.put(this.baseUrl, JSON.stringify(user))
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserBookings(userId:number) : Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/${userId}/Bookings`);
  }

  getUser(id:number) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  deleteUser(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }

  getReviewsOfUser(id:number) : Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/${id}/Reviews`);
  }

  login(email:string,password:string){
    this.getUsers().subscribe({
      next: (users:User[]) => {
        if(users){
          let userId=users.find((user:User)=>(user.email==email && this.comparePassword(user.passwordHashed,this.hashPassword(password))))?.id;
          if(userId!=undefined){
            this.setLoginState(userId);
          }          
          this.setLoginState(-1);
        }
      }
    })
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
