import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() firstName : string ='' ;
  @Input() lastName : string ='' ;
  @Input() email : string ='' ;
  @Input() password : string ='' ;
  hashedPassword:string ='';
  data:User|null = null;
  firstname: string = '';
  lastname: string ='';
  emailAddress: string = '';

  constructor(private service:UserServiceService, private router: Router) {
  }

  ngOnInit() {

  }

  submit() : void {
    if (this.firstName ===''|| 
        this.lastName === ''||
        this.email === ''||
        this.password === '' 
    ) {
      alert("All fields are mandatory");
    } else {
      this.hashedPassword = this.service.hashPassword(this.password);
      this.data  = {
        id: Math.random()*10000,
        fname: this.firstName,
        lname: this.lastName,
        email: this.email,
        passwordHashed : this.hashedPassword,
        role:"User"
      }
      console.log("Data in submit", this.data);
      this.service.post(this.data).subscribe({
        next: (result: any) => {
          console.log("response data ==> ", result);
          this.firstname = result.firstName;
          this.lastname = result.lastName;
          this.emailAddress = result.email;
          localStorage.setItem('firstname', this.firstname);
          localStorage.setItem('lastname', this.lastname);
          localStorage.setItem('email', this.emailAddress);
          alert('Registration Successful');
          this.firstName = ''; 
          this.lastName = '';
          this.email = '';
          this.password = '';
          this.router.navigate(['/login']);        

        },
        error: error => {
          console.log("error",error);
          alert('Error in register');
          }
      })

    }
  }

}
