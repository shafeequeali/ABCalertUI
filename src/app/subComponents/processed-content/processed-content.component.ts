import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/upload.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-processed-content',
  templateUrl: './processed-content.component.html',
  styleUrls: ['./processed-content.component.css'],
})
export class ProcessedContentComponent implements OnInit {
  TAG = 'ProcessedContentComponent';
  constructor(
    public alertService: AlertsService,
    private uploadService: UploadService
  ) {}

  structure: Array<any> | undefined;

  ngOnInit(): void {
    this.loadAlertData();
  }

  onClickDelete(data: any) {
    let callback = () => {
      window.alert('Alert deleted successfully');
      this.loadAlertData();
    };
    this.uploadService.uploadData(
      null,
      `alert/${data ? data['_id'] : ''}?csv_file=${data.csv_file}`,
      'delete',
      callback
    );
    console.log({ tag: this.TAG + ' onClickDelete', data });
  }

  loadAlertData() {
    let t: any = [];
    this.uploadService
      .downLoadData('alert?alert_status=PROCESSED')
      .subscribe((data: any) => {
        console.log({ tag: this.TAG + ' subscribe', data });
        data
          ? data.data
            ? data.data.forEach((e: any) => {
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
                  _id: e._id ? e._id : '',
                };
                t.push(tData);
              })
            : ''
          : '';
        this.structure = t;
        console.log({
          tag: this.TAG + ' subscribe',
          structure: this.structure,
        });
      });
  }
}
