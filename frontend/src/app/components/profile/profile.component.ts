import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { Booking, User } from '../../models';
import { Router } from '@angular/router';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() hideProfile! : () => void;
  

  constructor(private userService: UserServiceService, private movieService:MovieServiceService, private bookingService: BookingServiceService, private router : Router) { }

  ngOnInit(): void {
    
  }
  
  onCloseProfile() {
    
  }

  
  
}
