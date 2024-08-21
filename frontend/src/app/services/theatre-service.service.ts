import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Show, Theatre } from '../models';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatreServiceService {

  baseUrl : string =  `${environment.baseUrl}/Theatres`

  constructor(private http: HttpClient){}

  getTheatres() : Observable<Theatre[]> {
    return this.http.get<Theatre[]>(this.baseUrl);
  }

  getTheatresCount():number{
    let count:number=0;
    this.http.get<Theatre[]>(this.baseUrl).forEach((Theatre)=>{
      count+=1;
    })
    return count;
  }

  getTheatre(id:number) : Observable<Theatre> {
    return this.http.get<Theatre>(`${this.baseUrl}/${id}`);
  }

  postTheatre(theatre:Theatre) : Observable<Theatre> {
    return this.http.post<Theatre>(this.baseUrl,JSON.stringify(theatre));
  }

  deleteTheatre(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }

  getLocations() : Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/Locations`);
  }

  getShowsOfTheatre(id:number) : Observable<Show[]> {
    return this.http.get<Show[]>(`${this.baseUrl}/${id}/Shows`);
  }

  getTheatresOfLocation(location:string) : Observable<Theatre[]> {
    return this.http.get<Theatre[]>(`${this.baseUrl}/filter?location=${location}`);
  }
    
} 
