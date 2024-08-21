import { Component, Input } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { BookingServiceService } from '../../services/booking-service.service';
import { Booking, Show, Theatre } from '../../models';
import { TheatreServiceService } from '../../services/theatre-service.service';
import { ShowsService } from '../../services/shows.service';
import { UserServiceService } from '../../services/user-service.service';

interface MovieState {
  id: number,
  title:string,
  description: string,
  location: string,
}

interface BookingState {
  theatreId: number,
  showId: number,
  bookingDate: string,
  bookingTime: string,
  seats: string,
  price: number
}

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.css'
})

export class SeatComponent {
  bookingState : BookingState = {
    theatreId: -1,
    showId: -1,
    bookingDate: '',
    bookingTime: '',
    seats: '',
    price:0
  };
  @Input() movieState!: MovieState;
  today: string = '';
  defaultTimes: string[] = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];
  theatres:Theatre[] =[];
  shows:Show[] =[];
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  cols: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  available: string[] = ['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8', 'H1', 'H2', 'H3', 'H4'];
  selected: string[] = [];

  ticketPrice: number = 200;
  totalPrice: number = 0;
  currency: string = "Rs";

  constructor(private userService:UserServiceService,private bookingService:BookingServiceService, private showService: ShowsService, private router:Router, private theatreService:TheatreServiceService) {}

  ngOnInit () : void {
    this.today=this.getTodayDate();
  }

  handleTheatreSelect() : void {
    this.showService.getAllShows().subscribe({
      next: (shows:Show[]) => {
        this.shows=shows.filter((show) => {
          return (show.theatreId == this.bookingState.theatreId);
        })
      }
    })
  }

  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getAvailableSeats() {
    this.showService.getShowById(this.bookingState.showId).subscribe({
      next: (show:Show) => {
        this.available=show.availableSeats.split(', ');
        this.ticketPrice = show.ticketFare
      }
    })
  }

  getStatus (seatPos: string) : string {
    if(this.available.indexOf(seatPos) == -1) {
      return 'reserved';
    } else if(this.selected.indexOf(seatPos) !== -1) {
      return 'selected';
    }
    return '';
  }

  clearSelected () : void {
    this.selected = [];
  }

  seatClicked (seatPos:string) : void {
    let index = this.selected.indexOf(seatPos);

    if(index !== -1) {
      this.selected.splice(index, 1)
    } else {
      if(this.available.indexOf(seatPos) !== -1)
        this.selected.push(seatPos);
    };
  }

  getTheatresAtLocation() {
    this.theatreService.getTheatresOfLocation(this.movieState.location).subscribe({
      next: (theatres:Theatre[]) => {
        this.theatres = theatres;
      }
    })
  }

  getShows () {
    this.showService.getAllShows().subscribe({
      next:(shows:Show[]) => {
        shows.find((show:Show)=> show.movieId==this.movieState.id )
      }
    })
  }

  handleCheckout() : void {
    let booking : Booking = {
      id:Math.random()*653126453,
    userId: this.userService.getLoginState(),
    showId: this.bookingState.showId,
    bookingDateTime:new Date(this.bookingState.bookingDate+this.bookingState.bookingTime),
    seats:this.bookingState.seats,
    price:this.bookingState.price,

    }
    this.bookingService.createBooking(booking);
  }
}