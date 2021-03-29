import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {

  constructor(private us:UserService,private rt:Router) { }

  ngOnInit(): void {
  }

  onSubmit(credObj)
  {
    if(credObj.password == credObj.cpassword)
    {
      this.us.changePassword(credObj).subscribe(
        res => {
          if(res["message"] == "Invalid Username")
          {
            alert(res["message"]);
          }
          else{
            alert(res["message"]);
            this.rt.navigateByUrl("/login");
          }
        }
      )
    }
    else{
      alert("Passwords are not matched. Enter again");
    }
  }

}
