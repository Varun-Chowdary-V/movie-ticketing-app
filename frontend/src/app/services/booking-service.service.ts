import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  baseUrl : string = `${environment.baseUrl}/Bookings`

  constructor(private http:HttpClient){

  }

  getAllBookings() : Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBookingById(id:number) : Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  createBooking(booking:Booking) : Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl,JSON.stringify(booking));
  }

  deleteBooking(id:number) : void {
    this.http.delete(`${this.baseUrl}/${id}`);
  }
}
