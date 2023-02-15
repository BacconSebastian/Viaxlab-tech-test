import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  itinerario: string = "Bariloche 2022"

  private activitiesUrl = 'http://localhost:3001/activities';
  activitiesByDate: any = {};
  activitiesWoDate: Array<any> = [];
  createActivity: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    return this.http.get<any[]>(this.activitiesUrl)
      .subscribe(data => {
        data.forEach(activity => {
          if (!activity.startDate) {
            this.activitiesWoDate.push(activity)
          } else {
            const date = new Date(activity.startDate);
            const formattedDate: any = `${date.getMonth() + 1}/${date.getDate()}`;
            if (!this.activitiesByDate[formattedDate]) {
              this.activitiesByDate[formattedDate] = [];
            }
            this.activitiesByDate[formattedDate].push(activity);
          }
        })
      });
  }
}
