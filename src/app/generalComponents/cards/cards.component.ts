import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadService } from 'src/app/upload.service';
import { StrureElement } from '../../subComponents/view-content/view-content.component'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  TAG = 'CardsComponent'
  constructor(private uploadService: UploadService) { }
  @Input() data: StrureElement | undefined;
  @Input() index: number | undefined;
  @Output() editTrigger = new EventEmitter();
  @Output() deleteTrigger = new EventEmitter();
  @Output() sendTrigger = new EventEmitter();

  buttonDisabled: boolean = false;
  // data1 = {
  //   name: 'shafeeeque ali',
  //   roll_number: '1234KK',
  //   email_id: "demo@gmail.com"
  // }


  ngOnInit(): void {
    console.log({ tag: this.TAG + ' ngOnInit', data: this.data });
    let alert_status = this.data ? this.data.alert_status ? this.data.alert_status : '' : ''
    if (alert_status == 'PROCESSING') {
      this.buttonDisabled = true
    } else {
      this.buttonDisabled = false
    }
  }

  onClickEdit() {
    console.log({ tag: this.TAG + ' onClickEdit', data: this.data });

    this.editTrigger.emit(this.data)
  }
  onClickSend() {
    this.sendTrigger.emit(this.data)
  }
  onClickDelete() {
    this.deleteTrigger.emit(this.data)
  }
}




