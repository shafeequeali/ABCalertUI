import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderServiceService } from '../../services/header-service.service'

@Component({
  selector: 'app-view-alerts',
  templateUrl: './view-alerts.component.html',
  styleUrls: ['./view-alerts.component.css']
})
export class ViewAlertsComponent implements OnInit, OnChanges {

  TAG = 'ViewAlertsComponent'
  constructor(private headerService: HeaderServiceService) { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.headerService.setHeaderTitle('View Alerts')
  }

  
}
