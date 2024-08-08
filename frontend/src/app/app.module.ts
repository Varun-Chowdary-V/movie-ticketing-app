import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { SeatComponent } from './components/seat/seat.component';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { provideHttpClient,withInterceptorsFromDi} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'seat', component:SeatComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
