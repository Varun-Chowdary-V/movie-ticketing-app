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

  getReservationsCount():number{
    let count:number=0;
    this.http.get<Booking[]>(this.baseUrl).forEach((Booking)=>{
      count+=1;
    })
    return count;
  }

  getTop5Shows() {
    let  showCountMap: { [key: number]: number } = {};
    this.getAllBookings().subscribe({
      next: (bookings:Booking[]) => {
        bookings.forEach((booking:Booking) => {
          if (showCountMap[booking.showId]) {
            showCountMap[booking.showId]++;
          } else {
              showCountMap[booking.showId] = 1;
          }
        })
      }
    })
    const showCounts = Object.keys(showCountMap).map((key:any) => ({
        showId: parseInt(key, 10),
        bookingCount: showCountMap[key]
    }));
    showCounts.sort((a, b) => b.bookingCount - a.bookingCount);
    return showCounts.slice(0, 5);
  
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
