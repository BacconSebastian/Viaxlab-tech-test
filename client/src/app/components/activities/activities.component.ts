import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent {

  @Input() activitiesByDate: any;
  @Input() activitiesWoDate: any;
  form = new FormGroup({
    newStartDate: new FormControl(''),
    newEndDate: new FormControl(''),
  });

  editActivityId: number | null = null;

  ngOnInit() {
  }

  getDates(obj: any) {
    return Object.keys(obj);
  }

  getHour(date: string) {
    let toDate = new Date(date);
    let time = toDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time
  }

  handleDeleteActivity(activityId: number): void {
    // Elimina la actividad si esta en activitiesByDate
    for (const key of Object.keys(this.activitiesByDate)) {
      const activities = this.activitiesByDate[key];
      const index = activities.findIndex((activity: any) => activity.activityId === activityId);
      if (index !== -1) {
        activities.splice(index, 1);
        break;
      }
    }

    // Elimina la actividad si esta en activitiesWoDate
    const index = this.activitiesWoDate.findIndex((activity: any) => activity.activityId === activityId);
    if (index !== -1) {
      this.activitiesWoDate.splice(index, 1);
    }
  }

  handleEditActivity(activityId: number) {
    this.editActivityId = activityId;
  }

  handleUpdateActivity(activityId: number) {
    const newStartDate = this.form.get('newStartDate')?.value;
    const newEndDate = this.form.get('newEndDate')?.value;

    for (const date in this.activitiesByDate) {
      const activities = this.activitiesByDate[date];
      const index = activities.findIndex((activity: any) => activity.activityId === activityId);
      if (index !== -1) {
        if (!newEndDate || !newEndDate) {
          this.activitiesByDate[date][index].startDate = null;
          this.activitiesByDate[date][index].endDate = null;
          // Lo agregamos a activitiesWoDate
          this.activitiesWoDate.push(this.activitiesByDate[date][index])
          // Lo eliminamos de activitiesByDate
          this.activitiesByDate[date].splice(index, 1)
        } else {
          this.activitiesByDate[date][index].startDate = newStartDate;
          this.activitiesByDate[date][index].endDate = newEndDate;
          if (newStartDate) {
            let parsedDate: string = (newStartDate.split("T")[0].split("-").slice(1, 3).join("/"))
            if (this.activitiesByDate[parsedDate]) {
              this.activitiesByDate[parsedDate].push(this.activitiesByDate[date][index])
            } else {
              this.activitiesByDate[parsedDate] = [this.activitiesByDate[date][index]]
            }
            this.activitiesByDate[date].splice(index, 1)
          }
        }
        break;
      }
    }

    this.cancelEdit();
  }

  handleUpdateActivityWo(activityId: number) {
    const newStartDate = this.form.get('newStartDate')?.value;
    const newEndDate = this.form.get('newEndDate')?.value;

    const index = this.activitiesWoDate.findIndex((activity: any) => activity.activityId === activityId);
    const activity = this.activitiesWoDate[index]


    if (newStartDate && newEndDate) {
      let parsedDate: string = (newStartDate.split("T")[0].split("-").slice(1, 3).join("/"))
      if (this.activitiesByDate[parsedDate]) {
        this.activitiesByDate[parsedDate].push(activity)
      } else {
        this.activitiesByDate[parsedDate] = [activity]
      }
    }

    this.activitiesWoDate.splice(index, 1)

    this.cancelEdit()
  }

  cancelEdit() {
    this.editActivityId = null;
  }

  isEditing(activityId: number) {
    return this.editActivityId === activityId;
  }

  handleCreateActivity() {
    let createActivity = document.getElementById("create-activity")
    if (createActivity) {
      createActivity.className = "create-activity-container"
    }
  }
}
