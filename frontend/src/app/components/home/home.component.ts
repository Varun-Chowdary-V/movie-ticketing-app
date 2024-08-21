import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Movie, Show, Theatre } from '../../models';
import { TheatreServiceService } from '../../services/theatre-service.service';
import { ShowsService } from '../../services/shows.service';

interface MovieState {
  id: number,
  title:string,
  description: string,
  location: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  movies:Movie[]=[];
  searchQuery : string='';
  isLoggedIn : number = -1;
  selectedLanguage: string ='';
  selectedLocation: string ='';
  selectedGenre  : string = '';
  locations: string[] =[];
  movieState!:MovieState;
  movieSelected: boolean = false;

  constructor(private movieService:MovieServiceService, private showService:ShowsService, private router:Router, private userService: UserServiceService, private theatreService: TheatreServiceService) {
    
  }

  ngOnInit() : void {
    this.fetchData();
    this.userService.loginState$.subscribe(state => {
      this.isLoggedIn = state;
    })
  }

  getStarArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStar).fill('half'),
      ...Array(emptyStars).fill('empty')
    ];
  }


  fetchData() : void {
    this.theatreService.getLocations().subscribe({
      next: (locations:string[]) => {
        this.locations=locations;
      }
    })
    this.movieService.getMovies().subscribe({
      next: (movies:Movie[]) => {
        this.movies=movies;
      }
    })
    
  }

  login () : void {
    this.router.navigate(['/login'])
  }

  logout () : void {
    this.userService.setLoginState(-1);
  }

  filterMovies () : void {
    this.movieService.filterMovies(this.selectedLocation,this.selectedLanguage,this.selectedGenre).subscribe({
      next: (movies:Movie[]) => {
        this.movies = movies;
      }
    })
  }

  movieClicked (movie:Movie) : void {
    this.movieState = {
      id:movie.id,
      title:movie.title,
      description:movie.description,
      location:this.selectedLocation
    }
    this.movieSelected = true;
  }

}