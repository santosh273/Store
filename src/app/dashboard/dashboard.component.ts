import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { faTrash,faPencilAlt,faStopwatch,faSave,faTimes,faPlusCircle,faStickyNote,faSearch} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  faStopwatch = faStopwatch;
  faSave = faSave;
  faTimes = faTimes;
  faPlus = faPlusCircle;
  faStickyNote = faStickyNote;
  faSearch = faSearch;

  searchTerm;
  activities;
  length;
  level;
  quotient;
  remainder;
  two;
  one;
  username = localStorage.getItem("username");
  activityObj = {"username":"","id":"","title":"","activity":""};
  activityObj2 = {"username":"","id":"","title":"","activity":""};

  constructor(private as:ActivityService,private rt:Router,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getActivities();

  }

  transform()
  {
    document.getElementById("t1").style.display = "none";
    document.getElementById("t2").style.display = "block";
  }

  close()
  {
    document.getElementById("t1").style.display = "block";
    document.getElementById("t2").style.display = "none";
  }

  add()
  {
    this.close();
    let id = Date.now().toString();
    this.activityObj2.username = this.username;
    this.activityObj2.id = id;
    
    this.as.addActivity(this.activityObj2).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.activityObj2.title = "";
          this.activityObj2.activity = "";
          this.getActivities();
        }
      },
      err => {
        console.log(err);
        this.toasterror("Dashboard Page","Something went Wrong...Try again...");
      }
    )
    
  }

  getActivities()
  {
    this.as.getActivities(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
          this.length = this.activities.length;
          this.remainder = this.length%3;
          this.level = Math.floor(this.length/3)*3;
          if(this.remainder == 2)
          {
            this.two = this.activities.splice(this.level);
          }
          if(this.remainder == 1)
          {
            this.one = this.activities.splice(this.level);
          }
        }
        else{
          if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
          {
            this.toastwarning("Dashboard Page",res["message"]);
            setTimeout(()=>this.gotologin(),2500);
          }
          else{
            this.toasterror("Dashboard Page",res["message"]);
          }
        }
          
      }
    )
  }

  delete(id)
  {
    this.as.deleteActivity(id).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.getActivities();
        }
      }
    )
  }

  
  save()
  {
    this.as.updateActivity(this.activityObj).subscribe(
      res=>{
        if(res["message"] == ("Session expired. Please login again" || "Unauthorized access. Login to continue"))
        {
          this.toastwarning("Dashboard Page",res["message"]);
          setTimeout(()=>this.gotologin(),2500);
        }
        else{
          this.toastsuccess("Dashboard Page",res["message"]);
          this.getActivities();
        }
      }
    )
  }

  gotoModal(activity)
  {
    this.activityObj.id = activity.id;
    this.activityObj.title = activity.title;
    this.activityObj.activity = activity.activity;
  }

  gotologin()
  {
    this.rt.navigateByUrl("/forms/login");
  }

  remind(id)
  {

  }

  toastsuccess(heading,message)
  {
    this.toastr.success(message,heading);
  }

  toasterror(heading,message)
  {
    this.toastr.error(message,heading);
  }

  toastwarning(heading,message)
  {
    this.toastr.warning(message,heading);
  }

}
