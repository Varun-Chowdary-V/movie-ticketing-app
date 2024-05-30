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
  selectedMovie: Movie | null =null;
  selectedDate: string ='';
  selectedTime: string = ''; 
  today: string = '';
  defaultTimes: string[] = ['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM', '10:00 PM'];
 

  constructor(private service:MovieServiceService) {
    
  }



  ngOnInit() : void {
    this.fetchData();
    this.today = this.getTodayDate();
  }

  fetchData() : void {
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

  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
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

  movieClicked (movie:Movie) {
    this.selectedMovie = movie;
  }

  bookTicket () {
    if(this.selectedDate == '' || this.selectedTime == '' ) {
      alert("Select time and date");
    }

  }

  closeModal () {
    this.selectedMovie = null;
    this.selectedDate = '';
    this.selectedTime = '';
  }
}
