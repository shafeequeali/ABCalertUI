import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderServiceService } from '../../services/header-service.service'


@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.css']
})
export class CreateAlertComponent implements OnInit, OnChanges {
  TAG = "CREATE ALERT COMPONET"

  constructor(private headerService: HeaderServiceService) { }

  ngOnInit(): void {
    // console.log({ tag: this.TAG + ' ngOnInit' });
  }


  ngOnChanges(changes: SimpleChanges): void {
    // this.headerService.setHeaderTitle('Create Alerts')
    // console.log({ tag: this.TAG + ' ngOnchanges' });

  }
}
