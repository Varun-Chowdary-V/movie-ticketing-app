export interface Movie {
    id: number;
    title:string;
    description:string;
    lang:string;
    genre: string;
    duration: number;
    poster:string;
    rating:number    
}

export interface User{
    id:number;
    fname:string;
    lname:string;
    email:string;
    passwordHashed:string;
    role:string;
}

export interface Booking {
    id: number;
    userId: number;
    showId: number;
    bookingDateTime:Date;
    seats:string;
    price:number;
}

export interface Theatre {
    id:number;
    name:string;
    location:string;
    capacity:number;
}

export interface Show {
    id: number;
    movieId: number,
    theatreId: number,
    screenNumber:number,
    showTime:string,
    availableSeats:string,
    ticketFare: number,
}

export interface Review {
    id: number,
    movieId: number,
    userId: number,
    rating: number,
    comment: string,
    reviewDate:Date
}