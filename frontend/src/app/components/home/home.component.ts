import { Component } from '@angular/core';
import { MovieServiceService } from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';

interface Movie {
  id:number,
  title: string;
  description: string;
  lang: string;
  duration: number;
  poster: string;
  trailer: string;
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
  movieState : any = { };

  constructor(private service:MovieServiceService, private router:Router, private userService: UserServiceService) {
    
  }

  ngOnInit() : void {
    this.fetchData();
    this.today = this.getTodayDate();
    this.userService.loginState$.subscribe(state => {
      this.isLoggedIn = state;
    })
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
    this.router.navigate(['/login'])
  }

  logout () {
    this.userService.setLoginState(false);
  }

  filterMovies () {
    this.filteredMovies = this.data.filter(movie => {
      return (!this.selectedLanguage || movie.lang === this.selectedLanguage) &&
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
    this.movieState = {
      movie:this.selectedMovie,
      date:this.selectedDate,
      time:this.selectedTime
    }
    this.service.setMovieState(this.movieState);
    if(this.isLoggedIn){
      this.router.navigate(['/seat']);
    } else {
      alert("Login to continue");
      this.router.navigate(['/login']);
    }
    
  }

  closeModal () {
    this.selectedMovie = null;
    this.selectedDate = '';
    this.selectedTime = '';
  }
}
