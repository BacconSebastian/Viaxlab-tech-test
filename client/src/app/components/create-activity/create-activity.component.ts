import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent {
  @Input() activitiesByDate: any;
  @Input() activitiesWoDate: any;
  form = new FormGroup({
    name: new FormControl(''),
    start: new FormControl(''),
    end: new FormControl(''),
  });
  error: string = "";
  activityId: number = 5;

  handleSubmit() {
    if (this.validateForm()) {
      this.activityId++
      const title = this.form.get("name")?.value;
      const startDate = this.form.get("start")?.value;
      const endDate = this.form.get("end")?.value;

      if (startDate && endDate) {
        const activity = {
          activityId: this.activityId,
          title: title,
          type: "ACTIVITY",
          startDate: startDate,
          endDate: endDate,
          status: "DONE",
        };

        const formattedDate: any = `${new Date(startDate).getMonth() + 1}/${new Date(startDate).getDate()}`;

        if (!this.activitiesByDate[formattedDate]) {
          this.activitiesByDate[formattedDate] = [];
        }

        this.activitiesByDate[formattedDate].push(activity);
      } else {
        const activity = {
          activityId: this.activityId,
          title: title,
          type: "ACTIVITY",
          startDate: null,
          endDate: null,
          status: "DONE",
        };

        this.activitiesWoDate.push(activity);
      }

      this.form.reset()
    }
  }

  handleCloseCreateActivity() {
    // Este es un metodo viejo, pero en el trabajo lo aprecian bastante, por lo que muestro un poco este metodo tambien
    let createActivity = document.getElementById("create-activity")
    if (createActivity) {
      createActivity.className = "create-activity-container disabled"
    }
  }

  validateForm() {
    // Aca podrian ir mas validaciones
    return this.form.get("name")?.value
  }
}
