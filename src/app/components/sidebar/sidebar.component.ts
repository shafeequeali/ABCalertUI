import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { HeaderServiceService } from '../../services/header-service.service'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  TAG = 'SIDE BAR COMPONENT'
  constructor(private route: Router, private headerService: HeaderServiceService, private alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  onClickButton(path: string) {
    let hearderTitle = path === "/create_alerts" ? "Create Alerts" :
      path === "/processed_alerts" ? "Processed Alerts" : "View Alerts";
    this.headerService.setHeaderTitle(hearderTitle)
    // console.log({ tag: this.TAG + " onclickButton", path, headerTittle: this.headerService.headerTitle });
    this.alertsService.restFormEditData()
    this.route.navigate([path]);
  }

}
