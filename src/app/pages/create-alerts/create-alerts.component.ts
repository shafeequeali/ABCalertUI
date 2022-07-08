import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service'

@Component({
  selector: 'app-create-alerts',
  templateUrl: './create-alerts.component.html',
  styleUrls: ['./create-alerts.component.css']
})
export class CreateAlertsComponent implements OnInit {

  private TAG: string = "CreateAlertsComponent"
  constructor(public alertsService: AlertsService) { }

  ngOnInit(): void {

  }

  onclickChooseButton(type: string) {
    this.alertsService.setFormMode(type)
    // console.log({ tag: this.TAG + ' onclickButton', type, typeInservie: this.alertsService.createAlertType });
  }
  onclickBackButton() {
    this.alertsService.resetFormMode()
  }

}
