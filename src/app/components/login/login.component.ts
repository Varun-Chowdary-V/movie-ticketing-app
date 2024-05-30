import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() email : string = '' ;
  @Input() password : string = '' ;
  data : any = {};

  constructor(private service:UserServiceService) {

  }

  ngOnInit() {

  }

  submit() {
    if(this.email === ''||this.password === '') {
      alert("Invalid email or password");
    } else {
      this.service.getMethod('Users').subscribe({
        next: (result: any) => {
          console.log("response data ==> ", result);
          this.data=result.some((element: { email: string; password: string; } )  => {
            return (element.email===this.email && element.password===this.password)
          });
          if(this.data.length===0){
            alert("Invalid email or password");
            console.log(this.data);
          }
          else{
            alert("Login Successful");
            console.log(this.data);
          }
          
        },
        error: error => {
          console.log("error",error);
          alert('Error in register');
        }
      })
    }
  }
}
