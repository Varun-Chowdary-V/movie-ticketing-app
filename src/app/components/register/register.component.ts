import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input() firstName : string ='' ;
  @Input() lastName : string ='' ;
  @Input() email : string ='' ;
  @Input() phone : string ='' ;
  @Input() dateofbirth : string ='' ;
  @Input() gender : string ='' ;
  @Input() password : string ='' ;
  data={} ;
  firstname: any;
  lastname: any;
  emailAddress: any;

  constructor(private service:UserServiceService) {
    console.log("Constructor")
  }

  ngOnInit() {

  }

  submit() {
    if (this.firstName ===''|| 
        this.lastName === ''||
        this.email === ''||
        this.dateofbirth === '' ||
        this.phone === '' ||
        this.gender === '' ||
        this.password === '' 
    ) {
      alert("All fields are mandatory");
    } else {
      this.data  = {
        FirstName: this.firstName,
        LastName: this.lastName,
        Email: this.email,
        Phone: this.phone,
        DOB: this.dateofbirth,
        Gender: this.gender,
        Password: this.password
      }
      console.log("Data in submit", this.data);
      this.service.post('Users',this.data).subscribe({
        next: (result: any) => {
          console.log("response data ==> ", result);
          this.firstname = result.firstName;
          this.lastname = result.lastName;
          this.emailAddress = result.email;
          localStorage.setItem('firstname', this.firstname);
          localStorage.setItem('lastname', this.lastname);
          localStorage.setItem('email', this.emailAddress);
          alert('Registration Successful');
        },
        error: error => {
          console.log("error",error);
          alert('Error in register');
          }
      })

    }
  }
  

}
