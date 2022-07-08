import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {
  TAG = "ViewContentComponent"
  constructor(private router: Router, public alertService: AlertsService, private uploadService: UploadService) { }
  // structure1: Array<StrureElement> = [
  //   {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert', alert_status: 'created'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert2', alert_status: 'created'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert3', alert_status: 'created'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert4', alert_status: 'created'
  //   },
  //   {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert5', alert_status: 'processed'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert6', alert_status: 'processed'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert7', alert_status: 'processed'
  //   }, {
  //     name: 'demoName', roll_number: 'AS232', email_id: 'demo@gmail.com',
  //     phone_number: '543543534,34534543,345345234,345342543', created_date: 123413123, modified_date: 342345,
  //     processed_date: 23423453, alert_name: 'demoAlert8', alert_status: 'processed'
  //   }
  // ]
  structure: Array<StrureElement> | undefined;
  ngOnInit(): void {
    this.loadAlertData()
  }


  onClickEdit(data: any) {
    this.alertService.setAlertData(data)
    // console.log({ tag: this.TAG + " onClickEdit", serviceAlert: this.alertService.alertData });
    this.router.navigate(['/form_page'])
  }
  onClickSend(data: any) {
    let callback = (data: any) => {
      window.alert('Alert send successfully')
      this.loadAlertData()
    }
    this.uploadService.uploadData({},
      `http://localhost:3000/alert/sendAlert/${data ? data['_id'] : ''}`, 'send', callback)
  }

  onClickDelete(data: any) {
    let callback = () => {
      window.alert('Alert deleted successfully')
      this.loadAlertData()
    }
    this.uploadService.uploadData(null,
      `http://localhost:3000/alert/${data ? data['_id'] : ''}?csv_file=${data.csv_file}`, 'delete', callback)
    console.log({ tag: this.TAG + ' onClickDelete', data });
  }

  loadAlertData() {

    let t: any = [];
    this.uploadService.downLoadData('http://localhost:3000/alert?alert_status=CREATED')
      .subscribe((data: any) => {
        console.log({ tag: this.TAG + ' subscribe--85', data });
        data ? data.data ? data.data.forEach((e: any) => {
          let tData = {
            name: e.name ? e.name : '',
            roll_number: e.roll_number ? e.roll_number : '',
            email_id: e.email_id ? e.email_id : '',
            phone_number: e.phone_number ? e.phone_number[0] : '',
            created_date: e.created_date ? e.created_date : '',
            modified_date: e.modified_date ? e.modified_date : '',
            processed_date: e.processed_date ? e.processed_date : '',
            alert_name: e.alert_name ? e.alert_name : '',
            alert_status: e.alert_status ? e.alert_status : '',
            data_source: e.data_source ? e.data_source : '',
            binding_data: e.binding_data ? e.binding_data : '',
            csv_file: e.csv_file ? e.csv_file : '',
            csv_file_name: e.csv_file_name ? e.csv_file_name : '',
            csv_headers: e.csv_headers ? e.csv_headers : '',
            csv_sample: e.csv_sample ? e.csv_sample : '',
            _id: e._id ? e._id : ''
          }
          t.push(tData)

        }) : '' : '';
        this.structure = t;
        console.log({ tag: this.TAG + ' subscribe--107', structure: this.structure, });
      })

  }

}

export interface StrureElement {
  name: string,
  roll_number: string,
  email_id: string,
  phone_number: string
  created_date: any,
  modified_date: any,
  processed_date: any,
  alert_name: string,
  alert_status: string
  _id: string
  data_source?: string
}