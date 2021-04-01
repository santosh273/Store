import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { faUserTie,faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faUserTie = faUserTie;
  faKey = faKey;

  constructor(private us:UserService,private rt:Router) { }

  ngOnInit(): void {
  }

  onSubmit(userObj)
  {
    this.us.registerUser(userObj).subscribe(
      res=>{
        if(res["message"] == "success")
        {
          alert("Registration successfull");
          this.rt.navigateByUrl("/forms/login");
        }
        else
        {
          alert(res["message"]);
        }
        
        
      },
      err => {
        console.log(err);
        alert("Something went Wrong...Try again...");
      }

    )
  }

}
