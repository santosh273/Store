import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { faTrash,faPencilAlt,faStopwatch,faSave,faTimes,faPlusCircle,faStickyNote} from '@fortawesome/free-solid-svg-icons';

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

  activities;
  odd;
  length;
  level;
  quotient;
  remainder;
  username = localStorage.getItem("username");
  activityObj = {"username":"","id":"","title":"","activity":""};
  activityObj2 = {"username":"","id":"","title":"","activity":""};

  constructor(private as:ActivityService) { }

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
        alert(res["message"]);
      },
      err => {
        console.log(err);
        alert("Something went Wrong...Try again...");
      }
    )
    this.activityObj2.title = "";
    this.activityObj2.activity = "";
    this.getActivities();
  }

  getActivities()
  {
    this.as.getActivities(this.username).subscribe(
      res=>{
        if(res["message"]=="success")
        {
          this.activities = res["activities"];
          this.length = this.activities.length;

          this.quotient = this.length/3;
          this.remainder = this.length%3;
          this.level = Math.floor(this.quotient)*3;
          if((this.remainder == 2) && (this.length%2 == 1))
          {
            this.odd = this.length-3
          }
          
      
          console.log("hi",this.length,this.level,this.remainder);
          
        }
        else{
          alert(res["message"]);
        }
          
      }
    )
  }

  delete(id)
  {
    this.as.deleteActivity(id).subscribe(
      res=>{
        alert(res["message"]);
      }
    )
    this.getActivities();
  }

  
  save()
  {
    console.log(this.activityObj);
    
    this.as.updateActivity(this.activityObj).subscribe(
      res=>{
        alert(res["message"]);
      }
    )
    this.getActivities();
    
  }

  gotoModal(activity)
  {
    this.activityObj.id = activity.id;
    this.activityObj.title = activity.title;
    this.activityObj.activity = activity.activity;
  }

  remind(id)
  {

  }

}
