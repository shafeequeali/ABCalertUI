import { Injectable } from '@angular/core';
import { UploadService } from '../upload.service';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  TAG = 'AlertsService'
  constructor(private uploadService: UploadService) { }
  structure: Array<StrureElement> = [
    {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert', alert_status: 'created'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert2', alert_status: 'created'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert3', alert_status: 'created'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert4', alert_status: 'created'
    },
    {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert5', alert_status: 'processed'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert6', alert_status: 'processed'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert7', alert_status: 'processed'
    }, {
      name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
      phone_number: ['1234123', '1234132'], created_date: 123413123, modified_date: 342345,
      processed_date: 23423453, alert_name: 'demoAlert8', alert_status: 'processed'
    }
  ]

  //.................create alert pate ...starts...
  //type_data,csv_data,not_seted,
  createAlertType: string = 'not_seted';
  isNotFormTypeChoosed: boolean = true;

  setFormMode(type: string) {
    this.createAlertType = type;
    this.isNotFormTypeChoosed = false
  }
  resetFormMode() {
    this.createAlertType = 'not_seted';
    this.isNotFormTypeChoosed = true
  }
  //.................create alert pate ...ends...

  //................. Edit Alert  ...starts...
  data_source: string | undefined;
  isAlertDataAvailable: boolean = false;
  alertData: FormStyle = {
    name: '',
    roll_number: '',
    email_id: '',
    phone_number: [],
    created_date: '',
    modified_date: '',
    processed_date: '',
    alert_name: '',
    alert_status: ''
  }
  setAlertData(data: FormStyle) {
    this.alertData = data;
    this.isAlertDataAvailable = true;
    this.data_source = data['data_source'];
    // console.log({ tag: this.TAG + ' setAlertData', data_source: this.data_source });

  }
  getAlertData() {
    return this.alertData;
  }
  restFormEditData() {
    this.data_source = undefined,
      this.isAlertDataAvailable = false
    this.alertData = {};
    this.resetFormMode();
  }
  //.................Edit alert  ...ends...



}

export interface StrureElement {
  name: string,
  roll_number: string,
  email_id: string,
  phone_number: any
  created_date: any,
  modified_date: any,
  processed_date: any,
  alert_name: string,
  alert_status: string
  _id?: string
}

interface FormStyle {
  [key: string]: any,
}