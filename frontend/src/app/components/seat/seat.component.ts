import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { BookingServiceService } from '../../services/booking-service.service';
import { Theatre } from '../../models';
import { TheatreServiceService } from '../../services/theatre-service.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})

export class SeatComponent {

  movieTitle:string='';
  screen:string = "Harihara Cinemas";
  time:string = '';
  movieId!:number ;
  theatreId!:number;
  screenId!:number;
  userId!:number;


  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  reserved: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selected: string[] = [];

  ticketPrice: number = 200;
  convinienceFee: number = 30;
  totalPrice: number = 0;
  currency: string = "Rs";
  booking : any;

  constructor(private bookingService:BookingServiceService, private router:Router, private theatreService:TheatreServiceService) {}

  ngOnInit () : void {
    this.bookingService.booking$.subscribe(state => {
      this.booking = state;
    })
    console.log(this.booking)
    this.movieTitle=this.booking.movie.title;
    this.time = this.booking.date + " " + this.booking.time;
    this.getReservedSeats();
  }

  getReservedSeats() {
    this.theatreService.getTheatre(this.booking.theatreId).subscribe({
      next: (result) =>{
        console.log("Get reserved seatss",result);
        this.reserved = result.bookedSeats.split(', ')
      } 
    })
  }

  //Get status of each seat
  getStatus (seatPos: string) : string {
    if(this.reserved.indexOf(seatPos) !== -1) {
      return 'reserved';
    } else if(this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return '';
  }

  //uncheck all seats 
  clearSelected () : void {
    this.selected = [];
  }

  //Handle click
  seatClicked (seatPos:string) : void {
    let index = this.selected.indexOf(seatPos);

    if(index !== -1) {
      // Seat is already selected
      this.selected.splice(index, 1)
    } else {
      // Push to selected array only i it is not reserved
      if(this.reserved.indexOf(seatPos) === -1)
        this.selected.push(seatPos);
    };
  }

  //Checkout handler
  showSelected() : void {
    if(this.selected.length > 0) {
      alert("For movie "+this.movieTitle+" at "+ this.screen + " on "+ this.time + "\nSelected seats: " + this.selected + "\nTotal: " + (this.ticketPrice * this.selected.length + this.convinienceFee));
      this.router.navigate(['/'])
    } else {
      alert("No seats selected!");
    }
  }
}
