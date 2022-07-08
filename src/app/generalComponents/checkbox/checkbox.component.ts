import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  TAG = 'CHECK-BOX-COMPONENT'
  constructor() { }
  @Input() label: string | undefined;
  @Input() for: string | undefined;
  @Input() name: string | undefined; // (type_data,csv_data) are  The values  name atribue of ckeck box
  @Input() checkedValue: string | undefined; // (type_data,csv_data). The values exact what have to name atribue of ckeck box
  @Output() setValue = new EventEmitter();

  checked: boolean | undefined = false;
  ngOnInit(): void {
  }

  onChange(e: any) {
    if (e.checked) {
      this.setValue.emit({ key: this.for, value: this.name })
      console.log({ tag: this.TAG + ' onchange - if checked true', e });

    } else {
      console.log({ tag: this.TAG + ' onchange -if checked false', e });

    }
    // this.fixChecked();
  }

  // fixChecked() {
  //   if (this.checkedValue === this.name) {
  //     this.checked == true
  //   } else {
  //     this.checked == false
  //   }
  //   console.log({ tag: this.TAG + 'fix checked', checkevalue: this.checkedValue, checked: this.checked });

  // }


}
