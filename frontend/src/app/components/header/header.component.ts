import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Booking, Movie, Show, User } from '../../models';
import { ShowsService } from '../../services/shows.service';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAdmin : boolean = false;
  showProfile: boolean = false;
  isLogggedIn:number;
  user: User|null=null;
  bookings:Booking[]=[];

  constructor(private router:Router, private userService:UserServiceService, private showService:ShowsService, private movieService:MovieServiceService) {
    this.isLogggedIn=this.userService.getLoginState();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = (event.target as HTMLElement).closest('.profile-container');
    if (!clickedInside) {
      this.hideProfile();
    }
  }

  goHome() {
    this.router.navigate(['/'])
  }

  profileClicked() :void {
    if(this.isLogggedIn==-1){
      this.router.navigate(['/login']);
    }
    this.showProfile = true;

  }

  getUserDetails() {
    this.userService.getUser(this.isLogggedIn).subscribe({
      next: (user:User) => {
        this.user=user;
      }
    })
  }

  getBookingsOfUser() {
    this.userService.getUserBookings(this.isLogggedIn).subscribe({
      next: (bookings:Booking[]) => {
        this.bookings=bookings;
      }
    })
  }

  getMovieTitle(showId:number) : string {
    this.showService.getShowById(showId).subscribe({
      next:(show:Show)=>{
        let movieId:number=show.movieId;
        this.movieService.getMovieById(movieId).subscribe({
          next:(movie:Movie)=>{
            return movie.title;
          }
        })
      }
    })
    return "";
  }

  hideProfile() : void {
    this.showProfile = false;
  }

  logout() {
    this.hideProfile();
    this.isLogggedIn=-1
    this.userService.setLoginState(this.isLogggedIn);
  }

}
