import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-from-priview',
  templateUrl: './from-priview.component.html',
  styleUrls: ['./from-priview.component.css']
})
export class FromPriviewComponent implements OnInit {

  constructor() { }
  @Input() setPreview: boolean = false;
  @Input() data: FormStyle | undefined;
  //show_preview,close_preview
  // setPreview: string = 'close_preview';

  // isPreviewReady1: boolean = false;
  // setPreview1: boolean = false;
  public previewLabel: string = '';
  data1: FormStyle = {
    name: 'demo Name',
    roll_number: "sdsd123",
    email_id: 'demo@gmal.com',
    alert_name: 'demo alert',
  }


  ngOnInit(): void {
  }


}



interface FormStyle {
  [key: string]: any,
}