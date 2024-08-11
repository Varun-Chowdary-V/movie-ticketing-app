import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Review } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl:string=`${environment.baseUrl}/Reviews`

  constructor(private http:HttpClient) { }

  getAllReviews() : Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  getReviewById(id:number) : Observable<Review> {
    return this.http.get<Review>(`${this.baseUrl}/${id}`);
  }

  createReview(review:Review) : Observable<Review> {
    return this.http.post<Review>(this.baseUrl, JSON.stringify(review));
  }

  deleteReview(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }


}
