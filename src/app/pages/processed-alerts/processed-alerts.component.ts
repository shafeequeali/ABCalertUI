import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderServiceService } from '../../services/header-service.service'

@Component({
  selector: 'app-processed-alerts',
  templateUrl: './processed-alerts.component.html',
  styleUrls: ['./processed-alerts.component.css']
})
export class ProcessedAlertsComponent implements OnInit, OnChanges {

  constructor(private headerService: HeaderServiceService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.headerService.setHeaderTitle('Processed Alerts')
  }
}
