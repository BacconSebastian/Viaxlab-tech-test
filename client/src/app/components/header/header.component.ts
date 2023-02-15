import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() itinerario: string = "";

  handleCreateActivity() {
    // Este es un metodo viejo, pero en el trabajo lo aprecian bastante, por lo que muestro un poco este metodo tambien
    let createActivity = document.getElementById("create-activity")
    if (createActivity) {
      createActivity.className = "create-activity-container"
    }
  }
}
