import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  baseUrl : string = 'https://localhost:7258/api/Movie';
  private movieTimeSubject: BehaviorSubject<any>;
  public movieTime$: Observable<any>;


  constructor(private http: HttpClient) {
    this.movieTimeSubject = new BehaviorSubject<any>({});
    this.movieTime$ = this.movieTimeSubject.asObservable();
   }

  get() {
    return this.http.get(this.baseUrl);
  }

  // Method to update the login state
  setMovieState(movieAndTime: any): void {
    this.movieTimeSubject.next(movieAndTime);
  }

  // Method to get the current login state
  getMovieState(): Observable<any> {
    return this.movieTimeSubject.value;
  }
}
