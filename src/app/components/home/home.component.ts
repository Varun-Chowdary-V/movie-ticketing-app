import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';

interface Movie {
  id:number,
  title: string;
  description: string;
  lang: string;
  duration: number;
  poster: string;
  trailer: string;
  location: string[];
  locationSerialized: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  data : Movie[] =[];
  searchQuery : string='';
  isLoggedIn : boolean = false;
  selectedLanguage: string ='';
  filteredMovies : Movie[] = [] ;
  selectedLocation: string ='';

  constructor(private service:MovieServiceService) {
    this.service.get().subscribe({
      next: (result: any) => {
        this.data=result;
        console.log(this.data);
        this.filteredMovies=result;
      },
      error: error => {
        console.log("error in fetching movies data",error);
      }
    })
  }

  login () {

  }

  logout () {

  }

  filterMovies () {
    this.filteredMovies = this.data.filter(movie => {
      return (!this.selectedLanguage || movie.lang === this.selectedLanguage) &&
             (!this.selectedLocation || movie.location.includes(this.selectedLocation)) &&
             (!this.searchQuery || movie.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    });
  }

  movieClicked () {

  }

}
