import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {

  TAG = 'RADIO-BUTTON-COMPONENT'
  constructor() { }

  @Input() label: string | undefined;
  @Input() index: string | number | undefined;
  @Input() name: string | undefined; // (type_data,csv_data) are  The values  name atribue of ckeck box
  @Input() checkedValue: string | undefined; // (type_data,csv_data). The values exact what have to name atribue of ckeck box
  @Output() setValue = new EventEmitter();
  @Input() checked: boolean | undefined = true;
  @Input() defaultValue: any;

  isPhNumber: boolean = false

  ngOnInit(): void {
    if (this.index == 2) {
      this.isPhNumber = true
    }
  }

  onChange(e: any) {
    this.setValue.emit({ key: this.name, value: e.value, index: this.index })
    console.log({ tag: this.TAG + ' onchange', label: this.label, index: this.index, name: this.name });
  }


}
