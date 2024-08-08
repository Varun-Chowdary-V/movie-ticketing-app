import { Component, Input } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../../models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input() email : string = '' ;
  @Input() password : string = '' ;
  data : User | null = null;

  constructor(private service:UserServiceService, private router:Router) {

  }

  ngOnInit() {

  }

  submit() : void {
    if(this.email === ''||this.password === '') {
      alert("Invalid email or password");
    } else {
      this.service.getMethod().subscribe({
        next: (result: any) => {
          console.log("response data ==> ", result);
          this.data=result.find((element: { id:number, email: string; passwordHashed: string; } )  => {
            return (element.email===this.email && this.service.comparePassword(this.password,element.passwordHashed))
          });
          if(this.data==null){
            alert("Invalid email or password");
            this.email='';
            this.password='';
          }
          else{
            alert("Login Successful");
            console.log(this.data);
            this.email='';
            this.password='';
            this.service.setLoginState(this.data.id);
            this.router.navigate(['/'])
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
