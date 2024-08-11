import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Booking, Movie, Review, Show, Theatre, User } from '../../models';
import { TheatreServiceService } from '../../services/theatre-service.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  isLoggedIn: number = -1;
  searchQuery: string = '';
  selectedLocation: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';
  selectedDate: string = '';
  selectedTheatreId: number | null = null;
  selectedScreenId: number | null = null;
  selectedTime: string = '';
  showProfile: boolean = false;
  showModal: boolean = false;
  reviewRating: number = 0;
  reviewComment: string = '';
  user: User | null = null;
  filteredMovies: Movie[] = [];
  theatres: Theatre[] = [];
  screens: Screen[] = [];
  showTimes: string[] = [];
  userReviews: Review[] = [];
  bookings: Booking[] = [];
  locations: string[] = []; 
  genres: string[] = []; 
  languages: string[] = []; 
  selectedMovie: Movie | null = null;

  constructor(private http: HttpClient, private userService:UserServiceService,private router:Router) { }

  ngOnInit(): void {
    this.filterMovies();
    this.loadTheatres();
    this.loadLocations();
    this.loadGenres();
    this.loadLanguages();
    this.loadUserDetails();
  }

  login() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.isLoggedIn = -1;
  }
  
  filterMovies() {
    this.http.get<Movie[]>('api/movies/filter', {
      params: {
        location: this.selectedLocation,
        genre: this.selectedGenre,
        language: this.selectedLanguage
      }
    }).subscribe(movies => {
      this.filteredMovies = movies;
    });
  }

  // Load theatres
  loadTheatres() {
    this.http.get<Theatre[]>('api/theatres').subscribe(theatres => {
      this.theatres = theatres;
    });
  }

  // Load locations
  loadLocations() {
    this.http.get<string[]>('api/locations').subscribe(locations => {
      this.locations = locations;
    });
  }

  // Load genres
  loadGenres() {
    this.http.get<string[]>('api/genres').subscribe(genres => {
      this.genres = genres;
    });
  }

  // Load languages
  loadLanguages() {
    this.http.get<string[]>('api/languages').subscribe(languages => {
      this.languages = languages;
    });
  }

  // Load user details
  loadUserDetails() {
    this.http.get<User>('api/user/profile').subscribe(user => {
      this.user = user;
      this.loadUserReviews();
      this.loadUserBookings();
    });
  }

  // Load user reviews
  loadUserReviews() {
    this.http.get<Review[]>('api/user/reviews').subscribe(reviews => {
      this.userReviews = reviews;
    });
  }

  // Load user bookings
  loadUserBookings() {
    this.http.get<Booking[]>('api/user/bookings').subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  // Handle movie click
  movieClicked(movie: Movie) {
    this.selectedMovie = movie;
    this.showModal = true;
    this.loadShowTimes(movie.id);
  }

  // Load show times for selected movie
  loadShowTimes(movieId: number) {
    this.http.get<Show[]>('api/shows', {
      params: { movieId: movieId.toString() }
    }).subscribe(shows => {
      this.showTimes = shows.map(show => show.showTime);
    });
  }

  // Handle theatre selection
  handleTheatreSelect() {
    if (this.selectedTheatreId !== null) {
      this.http.get<Screen[]>('api/screens', {
        params: { theatreId: this.selectedTheatreId.toString() }
      }).subscribe(screens => {
        this.screens = screens;
      });
    }
  }

  // Handle screen selection
  handleScreenSelect() {
    if (this.selectedScreenId !== null) {
      this.http.get<Show[]>('api/shows', {
        params: { screenId: this.selectedScreenId.toString() }
      }).subscribe(shows => {
        this.showTimes = shows.map(show => show.showTime);
      });
    }
  }

  // Submit review
  submitReview() {
    if (this.selectedMovie && this.reviewRating > 0 && this.reviewComment) {
      const review: Review = {
        id: 0, // To be set by the backend
        movieId: this.selectedMovie.id,
        userId: this.user ? this.user.id : 0,
        rating: this.reviewRating,
        comment: this.reviewComment,
        reviewDate: new Date()
      };

      this.http.post('api/reviews', review).subscribe(() => {
        this.loadUserReviews(); // Refresh user reviews
        this.showModal = false; // Close modal
      });
    }
  }

  // Book ticket
  bookTicket() {
    if (this.selectedMovie && this.selectedDate && this.selectedTheatreId && this.selectedScreenId && this.selectedTime) {
      const booking: Booking = {
        id: 0, // To be set by the backend
        userId: this.user ? this.user.id : 0,
        showId: this.getShowId(), // Implement method to get showId
        bookingDateTime: new Date(),
        seats: '1', // Placeholder, implement seat selection
        price: this.getTicketFare() // Implement method to get ticket fare
      };

      this.http.post('api/bookings', booking).subscribe(() => {
        this.loadUserBookings(); // Refresh user bookings
        this.showModal = false; // Close modal
      });
    }
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }

  // Toggle profile visibility
  toggleProfile(event: Event) {
    event.preventDefault();
    this.showProfile = !this.showProfile;
  }

  // Hide profile when clicking outside
  hideProfileOnClick() {
    this.showProfile = false;
  }

  // Helper methods to get showId and ticket fare
  getShowId(): number {
    // Implement logic to get the selected showId
    return 0; // Placeholder
  }

  getTicketFare(): number {
    // Implement logic to get the ticket fare for the selected screen
    return 0; // Placeholder
  }
}
