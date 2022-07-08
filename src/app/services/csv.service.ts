import { FormStyle } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  // public submitSuccess: SubmitStatus = {
  //   isSubmitSuccess: true,
  //   message: 'Please submit the form'
  // };

  // //true or false
  // public isPreviewOk: boolean = true;
  // public previewData: any = {
  //   name: 'demoName',
  //   roll_number: 'demo roll number',
  //   email: 'demo email',
  //   alert_name: 'demo alert'
  // }
}

interface SubmitStatus {
  isSubmitSuccess: boolean,
  message: string,
}
