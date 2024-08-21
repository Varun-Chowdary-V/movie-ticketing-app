import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie, Review, Show } from '../models';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  baseUrl : string = `${environment.baseUrl}/Movies`;

  constructor(private http: HttpClient) {
  }

  getMoviesCount():number{
    let count:number=0;
    this.http.get<Movie[]>(this.baseUrl).forEach((Movie)=>{
      count+=1;
    })
    return count;
  }

  getMovies() :Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl);
  }

  getMovieById(id:number) : Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id}`);
  }

  addMovie(movie:Movie) : Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl,JSON.stringify(movie));
  }

  deleteMovie(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }

  getReviewsOfMovie(id:number) : Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/${id}/Reviews`);
  }

  getShowsOfMovie(id:number) : Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}/${id}/Shows`);
  }

  filterMovies(location:string,language:string,genre:string) :Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/filter?location=${location}&language=${language}&genre=${genre}`);
  }
  
}
