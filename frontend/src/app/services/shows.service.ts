import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Booking, Movie, Show } from '../models';
import { MovieServiceService } from './movie-service.service';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  baseUrl : string = `${environment.baseUrl}/Shows`

  constructor(private http:HttpClient, private movieService:MovieServiceService) { }

  getAllShows() : Observable<Show[]> {
    return this.http.get<Show[]>(this.baseUrl);
  }

  getShowById(id:number) : Observable<Show> {
    return this.http.get<Show>(`${this.baseUrl}/${id}`);
  }

  postShow(show:Show) : Observable<Show> {
    return this.http.post<Show>(this.baseUrl, JSON.stringify(show));
  }

  deleteShow(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }

  getBookingsOfShow(id:number) : Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/${id}/Bookings`);
  }

  getMovieNameByShowId(id:number) : string {
    this.http.get<Show>(`${this.baseUrl}/${id}`).subscribe({
      next: (show:Show) => {
        this.movieService.getMovieById(show.movieId).subscribe({
          next:(movie:Movie)=>{
            return movie.title;
          }
        })
      },
      error: (err)=> {
        console.log(err);
        return "";
      }
    })
    return "";
  }

}
