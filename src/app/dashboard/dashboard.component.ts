import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { faTrash,faPencilAlt,faStopwatch,faSave,faTimes } from '@fortawesome/free-solid-svg-icons';

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

  activities;
  selectedId;
  username = localStorage.getItem("username");
  status = false;
  activityObj = {"username":"","id":"","title":"","activity":""};

  constructor(private as:ActivityService) { }

  ngOnInit(): void {

    this.getActivities();

  }

  addNotes()
  {
    
  }

  onSubmit(activityObj)
  {
    let id = Date.now().toString();
    activityObj.username = this.username;
    activityObj.id = id;
    
    this.as.addActivity(activityObj).subscribe(
      res=>{
        alert(res["message"]);
      },
      err => {
        console.log(err);
        alert("Something went Wrong...Try again...");
      }
    )
    this.getActivities();
  }

  getActivities()
  {
    this.as.getActivities(this.username).subscribe(
      res=>{
        this.activities = res["message"];
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

  edit(id)
  {
    this.status = true;
    this.selectedId = id;

  }
  save(id,title,activity)
  {
    

    this.activityObj.id = id;
    this.activityObj.title = title;
    this.activityObj.activity = activity;
    
    this.as.updateActivity(this.activityObj).subscribe(
      res=>{
        alert(res["message"]);
      }
    )
    this.getActivities();
    this.status = false;
    
  }

}
