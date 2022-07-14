import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  TAG: string = 'SELECTOR COMPONENT'
  constructor() { }

  ngOnInit(): void {
    // console.log({ tag: this.TAG + ' ngOnInit', value: this.value });
    if (this.name === 'phone_number') {
      this.isPhoneNumber = true
    }
  }


  @Input() label: string | undefined;
  @Input() name: string | undefined;
  // @Input() fieldData: any;
  @Input() svgHeaders: any;
  @Input() required?: any;
  @Input() typeError?: string = ''
  @Input() value?: string = ''
  @Output() setValue = new EventEmitter();
  // @Input() name: string | undefined;
  isPhoneNumber: boolean = false;
  onChange(e: any) {
    // console.log({ tag: this.TAG, value: e.value, name: this.name });
    this.setValue.emit({ key: this.name, value: e.value })
  }

}
