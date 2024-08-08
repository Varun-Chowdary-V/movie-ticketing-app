export interface Movie {
    id: number;
    title:string;
    description:string;
    lang:string;
    genre: string;
    duration: number;
    poster:string;
    trailer:string    
}

export interface Screen {
    screenId:number;
    movieId:number;
    theatreId:number;
    showTime: string;
}

export interface User{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    passwordHashed:string;
    role:string;
}

export interface Booking {
    id: number;
    userId: number;
    movieId: number;
    theatreId:number;
    bookingDate:string;
    bookingTime:string;
    seatsString:string;
    price:number;
}