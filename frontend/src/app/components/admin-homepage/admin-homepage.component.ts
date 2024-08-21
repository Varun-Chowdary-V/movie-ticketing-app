import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { TheatreServiceService } from '../../services/theatre-service.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
  totalUsers?: number = 0;
  totalTheatres?: number = 0;
  totalMovies?: number = 0;
  totalReservations?: number = 0;

  // Example data for the bar graph
  bestMoviesData: { movieName: string; reservations: number }[] = [];

  constructor(private userService: UserServiceService, private theatreService:TheatreServiceService, private movieService:MovieServiceService, private bookingService:BookingServiceService) {}

  ngOnInit(): void {
    
    this.totalUsers = this.userService.getUsersCount();
    this.totalTheatres = this.theatreService.getTheatresCount();
    this.totalMovies = this.movieService.getMoviesCount();
    this.totalReservations = this.bookingService.getReservationsCount();

    // Example data for best movies
    this.bestMoviesData = [
      { movieName: 'Movie A', reservations: 1200 },
      { movieName: 'Movie B', reservations: 950 },
      { movieName: 'Movie C', reservations: 800 },
      { movieName: 'Movie D', reservations: 670 },
      { movieName: 'Movie E', reservations: 540 }
    ];

    // Generate the bar graph
    this.generateBarGraph();
  }

  reservations = [
    { id: 1234, user: 'John Doe', movie: 'Avengers: Endgame', theatre: 'AMC Theatres', date: '2023-04-15' },
    { id: 5678, user: 'Jane Smith', movie: 'Dune', theatre: 'Regal Cinemas', date: '2023-04-20' },
    { id: 9012, user: 'Bob Johnson', movie: 'The Batman', theatre: 'Cinemark Theatres', date: '2023-04-25' },
  ];

  movies = [
    { id: 1, title: 'Avengers: Endgame', genre: 'Action, Adventure', releaseDate: '2019-04-26' },
    { id: 2, title: 'Dune', genre: 'Sci-Fi, Drama', releaseDate: '2021-10-22' },
    { id: 3, title: 'The Batman', genre: 'Action, Crime', releaseDate: '2022-03-04' },
  ];

  theatres = [
    { id: 1, name: 'AMC Theatres', location: 'New York, NY', screens: 20 },
    { id: 2, name: 'Regal Cinemas', location: 'Los Angeles, CA', screens: 15 },
    { id: 3, name: 'Cinemark Theatres', location: 'Chicago, IL', screens: 18 },
  ];

  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', reservations: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', reservations: 3 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', reservations: 2 },
  ];

  generateBarGraph(): void {
    const barGraphElement = document.querySelector('.best-movies-bargraph') as HTMLElement;

    if (barGraphElement) {
      // Clear any existing content
      barGraphElement.innerHTML = '';

      // Find the maximum reservations to scale the graph
      const maxReservations = Math.max(...this.bestMoviesData.map(movie => movie.reservations));

      this.bestMoviesData.forEach(movie => {
        // Create a container for each bar
        const barContainer = document.createElement('div');
        barContainer.style.display = 'flex';
        barContainer.style.alignItems = 'center';
        barContainer.style.marginBottom = '8px';

        // Create a label for the movie
        const label = document.createElement('span');
        label.textContent = movie.movieName;
        label.style.flex = '1';
        label.style.color = '#ffffff';

        // Create the bar
        const bar = document.createElement('div');
        bar.style.height = '20px';
        bar.style.flex = `${movie.reservations / maxReservations}`;
        bar.style.backgroundColor = '#17a2b8';
        bar.style.borderRadius = '5px';
        bar.style.marginLeft = '10px';

        // Append the label and bar to the container
        barContainer.appendChild(label);
        barContainer.appendChild(bar);

        // Append the container to the bar graph element
        barGraphElement.appendChild(barContainer);
      });
    }
  }
}
